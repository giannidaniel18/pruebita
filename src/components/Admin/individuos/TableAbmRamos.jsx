import { useState } from "react";
import PropTypes from "prop-types";
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
  Switch,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { visuallyHidden } from "@mui/utils";
import { format, parseISO } from "date-fns";
import { useBranchContext } from "../../../context/BranchContext";
import { Link as ReactLink } from "react-router-dom";

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
    label: "Ramo",
  },
  {
    id: "fechaCreacion",
    numeric: true,
    disablePadding: false,
    label: "Creado el",
  },
  {
    id: "fechaModificacion",
    numeric: false,
    disablePadding: false,
    label: "Ultima modificación",
  },
  {
    id: "editar",
    numeric: false,
    disablePadding: false,
    label: "Editar",
  },
  {
    id: "estado",
    numeric: false,
    disablePadding: false,
    label: "Estado",
  },
];
function createData(id, titulo_Ramo, fechaCreacion, fechaModificacion, editar, estado) {
  return {
    id,
    titulo_Ramo,
    fechaCreacion,
    fechaModificacion,
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
          <TableCell key={headCell.id} align={"left"} sortDirection={orderBy === headCell.id ? order : false}>
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

export default function TableAbmRamos({ branches }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("titulo_Ramo");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { updateStatusBranch } = useBranchContext();

  const handleChange = (event) => {
    updateStatusBranch(event.target.id, event.target.checked);
  };

  const rows = branches.map((ramo) =>
    createData(
      ramo.id,
      ramo.titulo,
      ramo.createdAt,
      ramo.updatedAt,
      <IconButton component={ReactLink} to={`${ramo.id}`} aria-label="Editar">
        <BorderColorIcon />
      </IconButton>,
      <Switch id={ramo.id} checked={ramo.estado} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
    )
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                    <TableCell align="left">{row.editar}</TableCell>
                    <TableCell align="left">{row.estado}</TableCell>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
