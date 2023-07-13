import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteEmployeeThunk } from "../store/features/employeeThunk";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { notificationDialogActions } from "../store/features/notificationDialogSlice";
import { deleteDialogActions } from "../store/features/deleteDialogSlice";

const DeleteDialog = ({
  refreshEmployees,
}: {
  refreshEmployees: () => void;
}) => {
  const dispatch = useAppDispatch();

  const open = useAppSelector((state) => state.deletedialog.open);
  const empData = useAppSelector((state) => state.employeeform.employee);

  const handleDeleteClickClose = () => {
    dispatch(deleteDialogActions.setOpen({ open: false }));
    dispatch(notificationDialogActions.setOpen({ open: true }));
  };

  const deleteEmployee = async (id: number) => {
    try {
      await dispatch(deleteEmployeeThunk(id));
      dispatch(
        notificationDialogActions.setMessage({
          message: "delete successfully.",
        })
      );
      refreshEmployees();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteButton = (id: number | undefined) => {
    if (typeof id === "number") deleteEmployee(id);
    handleDeleteClickClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDeleteClickClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
        {"Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <div>
          {`Deleting ${empData.name} with ID: ${empData.id} in ${empData.department} department with a salary of $${empData.salary}.`}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClickClose}>Cancel</Button>
        <Button onClick={() => handleDeleteButton(empData.id)}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
