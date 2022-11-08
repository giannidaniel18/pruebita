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
  Stack,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { format, parseISO } from "date-fns";
import { useBranchContext } from "../../../context/BranchContext";
import { Link as ReactLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SettingsIcon from "@mui/icons-material/Settings";
import { AdminDrawerUpdate } from "./AdminDrawers";
import ConfirmationAlert from "../../common/ConfirmationAlert";
import { deleteRamo, updateRamo } from "../../../services/ramos";
import StatusSwitch from "../../common/StatusSwitch";
import SnackBar from "../../common/SnackBar";

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
    label: "Admministrar",
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

export default function TableAbmRamos({ branches, updateRamos }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState({});
  const [confirmationState, setConfirmationState] = useState({});
  const [requestStatus, setRequestStatus] = useState({});
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("titulo_Ramo");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const { updateStatusBranch, updateBranch, deleteBranch } = useBranchContext();

  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const resetDrawerDataToHandle = () => {
    setDrawerDataToHandle({});
  };
  const onSettingDrawerDataToHandle = (e) => {
    onToggleDrawerVisibleMode();

    setDrawerDataToHandle({
      id: e.currentTarget.id,
      type: "ramo",
      method: "update",
      data: [{ inputName: "ramo", label: "Ramo", multiline: false, valueToUpdate: e.currentTarget.name }],
    });
  };

  const handleConfirmationToDelete = (e) => {
    setConfirmationState({
      onOpen: true,
      typeConfirm: "Eliminar",
      title: "Ramo",
      id: e.currentTarget.id,
    });
  };

  const getConfirmation = (confirmation) => {
    if (confirmation) handleDeleteBranch(confirmationState.id);
    setConfirmationState({});
  };

  const onUpdateBranch = (updatedBranch) => {
    const newTitle = { titulo: updatedBranch.ramo };
    updateRamo(drawerDataToHandle.id, newTitle).then((resp) => {
      if (resp.data.statusCode === 200) {
        setRequestStatus({ responseStatus: "success", text: resp.data.message, status: true });
      } else {
        setRequestStatus({ responseStatus: "error", text: "Error al actualizar el nombre del ramo", status: true });
      }
      updateRamos();
    });
  };

  const handleChange = (branchId, newStatus) => {
    const newState = { estado: newStatus };
    const enpdointResponse = updateRamo(branchId, newState).then((resp) => {
      if (resp.data.statusCode === 200) {
        setRequestStatus({ responseStatus: "success", text: resp.data.message, status: true });
      } else {
        setRequestStatus({ responseStatus: "error", text: "Error al actualizar el estado del ramo", status: true });
      }
      updateRamos();
    });
    return enpdointResponse;
  };
  const handleDeleteBranch = (idBranch) => {
    deleteRamo(idBranch).then((resp) => {
      // console.log(resp.data.message);
      updateRamos();
    });
  };

  const rows = branches.map((ramo) =>
    createData(
      ramo.id,
      ramo.titulo,
      ramo.createdAt,
      ramo.updatedAt,
      <IconButton component={ReactLink} to={`${ramo.id}`} aria-label="Editar">
        <SettingsIcon />
      </IconButton>,
      <Stack direction="row" justifyContent={"center"} alignItems="center" spacing={1}>
        <IconButton size="small" id={ramo.id} name={ramo.titulo} onClick={onSettingDrawerDataToHandle}>
          <ModeEditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" id={ramo.id} name={ramo.titulo} onClick={handleConfirmationToDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <StatusSwitch ramoId={ramo.id} status={ramo.estado} onChange={handleChange} />
        {/* <Switch
          id={ramo.id}
          checked={ramo.estado}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        /> */}
      </Stack>
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
                    <TableCell align="right" width={5}>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {drawerVisibleMode && (
        <AdminDrawerUpdate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={onUpdateBranch}
          dataType="Ramo"
        />
      )}
      {confirmationState.onOpen && (
        <ConfirmationAlert
          onOpen={confirmationState.onOpen}
          typeConfirm={confirmationState.typeConfirm}
          title={confirmationState.title}
          desc={confirmationState.desc}
          confirmation={getConfirmation}
        />
      )}
      {requestStatus.status && (
        <SnackBar
          title={requestStatus.text}
          severity={requestStatus.responseStatus}
          status={requestStatus.status}
          time={new Date()}
        />
      )}
    </Box>
  );
}
