import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteEmployeeThunk } from "../store/features/employeeThunk";
import { useAppDispatch } from "../store/hook";

type DeleteDialogProps = {
  open: boolean;
  handleClose: () => void;
  employee: any;
};

const DeleteDialog = ({
  open,
  handleClose,
  employee,
  refreshEmployees,
}: DeleteDialogProps & { refreshEmployees: () => void }) => {
  const dispatch = useAppDispatch();

  const deleteEmployee = async (id: number) => {
    try {
      await dispatch(deleteEmployeeThunk(id));
      refreshEmployees();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteButton = (id: number) => {
    deleteEmployee(id);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
        {"Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <div>
          {`Deleting ${employee.name} with ID: ${employee.id} in ${employee.department} department with a salary of $${employee.salary}.`}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleDeleteButton(employee.id)}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
