import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { userActions } from "../store/features/userSlice";
import { logoutThunk } from "../store/features/userThunk";
import { notificationDialogActions } from "../store/features/notificationDialogSlice";
import NotifDialog from "./NotifDialog";

const LogOutBtn = () => {
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const token = useAppSelector((state) => state.user.authToken);

  const handleLogout = async () => {
    const response = await dispatch(logoutThunk(token)).unwrap();

    if (response.success === 1) {
      dispatch(userActions.setAuthToken({ token: "" }));
      dispatch(
        notificationDialogActions.setMessage({ message: "logout successfully" })
      );
      dispatch(notificationDialogActions.setOpen({ open: true }));
    } else {
      dispatch(
        notificationDialogActions.setMessage({ message: "logout failed" })
      );
      dispatch(userActions.setCookie({ cookie: "" }));
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<LogoutIcon />}
        sx={{ marginLeft: "10px" }}
        onClick={handleLogout}
      >
        {!isSmallScreen && "Log Out"}
      </Button>
      <NotifDialog />
    </>
  );
};

export default LogOutBtn;
