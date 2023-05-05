import { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import StatusSwitch from "components/common/StatusSwitch";
import SnackBar from "components/common/SnackBar";
import SettingsIcon from "@mui/icons-material/Settings";
import TextImputControlSmall from "components/common/TextImputControlSmall";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import BackspaceIcon from "@mui/icons-material/Backspace";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  {
    id: "titulo_Ramo",
    numeric: false,
    disablePadding: true,
    filter: true,
    align: "left",
    label: "Ramo",
  },
  {
    id: "fechaCreacion",
    numeric: true,
    disablePadding: false,
    filter: true,
    align: "left",
    label: "Creado el",
  },
  {
    id: "fechaModificacion",
    numeric: false,
    disablePadding: false,
    filter: true,
    align: "left",
    label: "Ultima modificación",
  },
  {
    id: "negocio",
    numeric: false,
    disablePadding: false,
    filter: true,
    align: "left",
    label: "Unidad de negocio",
  },
  {
    id: "configurar",
    numeric: false,
    disablePadding: false,
    filter: false,
    align: "center",
    label: "Configurar",
  },
  {
    id: "estado",
    numeric: false,
    disablePadding: false,
    filter: false,
    align: "center",
    label: "Estado",
  },
];
function createData(id, titulo_Ramo, fechaCreacion, fechaModificacion, negocio, editar, estado) {
  return {
    id,
    titulo_Ramo,
    fechaCreacion,
    fechaModificacion,
    negocio,
    editar,
    estado,
  };
}
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.filter ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function TableAbmRamos({ branches, onUpdateRamoStatus, requestStatus }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("titulo_Ramo");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredBranches, SetFilteredBranches] = useState(branches);
  const { control, resetField } = useForm();

  useEffect(() => {
    SetFilteredBranches(branches);
  }, [branches]);

  const handleChangeStatusBranch = async (branchId, newStatus) => {
    const newState = { estado: newStatus };
    const enpdointResponse = await onUpdateRamoStatus(branchId, newState);
    return enpdointResponse;
  };

  const rows = filteredBranches.map((ramo) =>
    createData(
      ramo.id,
      ramo.titulo,
      ramo.createdAt,
      ramo.updatedAt,
      ramo.negocio,
      <IconButton component={ReactLink} to={`${ramo.id}`} aria-label="Editar">
        <SettingsIcon />
      </IconButton>,
      <Stack direction="row" justifyContent={"center"} alignItems="center" spacing={1}>
        <StatusSwitch idToUpdate={ramo.id} status={ramo.estado} onChangeFunc={handleChangeStatusBranch} />
      </Stack>
    )
  );
  //FILTERING
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFilterByTitle = (e) => {
    const texto = e.target.value.toLowerCase();
    let newArrayofBranches = [];

    for (let branch of branches) {
      let titulo = branch.titulo.toLowerCase();
      if (titulo.indexOf(texto) !== -1) {
        newArrayofBranches = [...newArrayofBranches, branch];
      }
    }
    SetFilteredBranches(newArrayofBranches);
  };
  const HandleClearFilter = () => {
    resetField("titulo_ramo");
    SetFilteredBranches(branches);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h5" py={3}>
        Administración de Ramos
      </Typography>
      <Stack spacing={2}>
        {/* Extraer a componente en common */}
        <Box id="boxFilter">
          <Stack direction="row" alignItems={"center"} spacing={1} flex={1}>
            <ManageSearchIcon />
            <Typography variant="overline">Filtrar por titulo del ramo </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Box width={500}>
              <form onChange={handleFilterByTitle}>
                <TextImputControlSmall control={control} name="titulo_ramo" label="Buscar Ramo" />
              </form>
            </Box>
            <Button endIcon={<BackspaceIcon />} onClick={HandleClearFilter}>
              Limpiar
            </Button>
          </Stack>
        </Box>

        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.titulo_Ramo}
                      </TableCell>
                      <TableCell align="left">{format(parseISO(row.fechaCreacion), "dd/MM/yyyy")}</TableCell>
                      <TableCell align="left">{format(parseISO(row.fechaModificacion), "dd/MM/yyyy")}</TableCell>
                      <TableCell align="left">{row.negocio}</TableCell>
                      <TableCell align="center" width={5}>
                        {row.editar}
                      </TableCell>
                      <TableCell align="center">{row.estado}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {requestStatus.status && <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} />}
    </Box>
  );
}
