import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { notificationDialogActions } from "../store/features/notificationDialogSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotifDialog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const open = useAppSelector((state) => state.notificationdialog.open);
  const message = useAppSelector((state) => state.notificationdialog.message);
  const location = useAppSelector((state) => state.notificationdialog.location);
  const success = useAppSelector((state) => state.employeeform.success);

  const handleClose = () => {
    dispatch(notificationDialogActions.setOpen({ open: false }));

    if (
      (location === "/addemployee" || location === "/editemployee") &&
      success
    )
      navigate("/");
  };

  useEffect(() => {
    handleClose();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
        {message}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  // return success ? (
  //   <Dialog
  //     open={open}
  //     onClose={handleClose}
  //     aria-labelledby="alert-dialog-title"
  //     aria-describedby="alert-dialog-description"
  //   >
  //     <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
  //       {message}
  //     </DialogTitle>
  //     <DialogActions>
  //       <Button onClick={handleClose}>Close</Button>
  //     </DialogActions>
  //   </Dialog>
  // ) : null;
};

export default NotifDialog;
