import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { notificationDialogActions } from "../store/features/notificationDialogSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userActions } from "../store/features/userSlice";

const NotifDialog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const open = useAppSelector((state) => state.notificationdialog.open);
  const message = useAppSelector((state) => state.notificationdialog.message);
  const location = useAppSelector((state) => state.notificationdialog.location);
  const success = useAppSelector((state) => state.employeeform.success);
  const signupSuccess = useAppSelector((state) => state.user.signup_success);
  const loginSuccess = useAppSelector((state) => state.user.login_success);
  const token = useAppSelector((state) => state.user.authToken);
  const cookie = useAppSelector((state) => state.user.cookie);

  const handleClose = () => {
    dispatch(notificationDialogActions.setOpen({ open: false }));

    if (token) {
      // have token
      if (
        (location === "/addemployee" || location === "/editemployee") &&
        success
      )
        navigate("/");

      if (location === "/signup" && signupSuccess) navigate("/login");

      if (location === "/login" && loginSuccess) navigate("/");
    } else if (!token && message === "logout successfully") {
      navigate("/login");
    } else if (cookie) {
      dispatch(userActions.setAuthToken({ token: cookie }));
    } else {
      // no token
      if (!loginSuccess && location !== "/login") {
        navigate("/login");

        if (location === "/signup") navigate("/signup");
      }
    }
  };

  useEffect(() => {
    handleClose();
  }, []);

  return message !== "" ? (
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
  ) : null;
};

export default NotifDialog;
