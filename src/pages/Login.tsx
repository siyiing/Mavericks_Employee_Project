import { Box, TextField, Container, Grid, Button } from "@mui/material";
import Item from "@mui/material/Grid";
import { useAppDispatch } from "../store/hook";
import NotifDialog from "../components/NotifDialog";
import { loginUserThunk } from "../store/features/userThunk";
import classes from "../styles/form.module.css";
import { useEffect, useState } from "react";
import { userActions } from "../store/features/userSlice";
import { notificationDialogActions } from "../store/features/notificationDialogSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    dispatch(
      notificationDialogActions.setLocation({ location: location.pathname })
    );
    dispatch(userActions.setSignUpSuccess({ success: false }));
    dispatch(userActions.setLoginSuccess({ success: false }));
    dispatch(notificationDialogActions.setMessage({ message: "" }));
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (username.length === 0 || username.trim().length === 0) {
      setUsernameError("username should not be empty");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password.length === 0) {
      setPasswordError("password cannot be empty");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const fetchUser = async () => {
    try {
      if (validateForm()) {
        const user = { username, password };
        const response = await dispatch(loginUserThunk(user)).unwrap();

        // do not exist
        if (response.requestState === 1) {
          dispatch(userActions.setLoggedUser({ user: response.user }));
          dispatch(userActions.setAuthToken({ token: response.token }));
          dispatch(userActions.setLoginSuccess({ success: true }));
          dispatch(userActions.setCookie({ cookie: response.token }));
          
          dispatch(
            notificationDialogActions.setMessage({
              message: "logged in sucessfully!",
            })
          );
        } else {
          // requeststate = 0
          if (response.message === "user not found") {
            setUsernameError("user not found");
            dispatch(userActions.setLoginSuccess({ success: false }));
          } else if (response.message === "password incorrect") {
            setPasswordError("incorrect password");
            dispatch(userActions.setLoginSuccess({ success: false }));
          } else {
            // authentication fail
          }
        }
      }
    } catch (e) {
      // setError("Something is wrong.. Cannot connect to server.");
      console.error(e);
    }
  };

  const handleGoSignUpButton = () => {
    navigate("/signup");
  };

  const handleDialogOpen = () => {
    dispatch(notificationDialogActions.setOpen({ open: true }));
    dispatch(userActions.setLoginSuccess({ success: false }));
    handleLoginButton();
  };

  const handleLoginButton = () => {
    setButtonClicked(true);
    fetchUser();
  };

  return (
    <div className={classes.main_grid}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <h1 className={classes.addTitle}>Login</h1>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Container>
              <Box
                sx={{
                  display: "flex",
                  margin: "auto",
                  width: 400,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <TextField
                  sx={{ margin: "10px" }}
                  fullWidth
                  required
                  label="User Name"
                  id="tf_login_username"
                  value={username}
                  onChange={(newValue) => setUsername(newValue.target.value)}
                  error={buttonClicked && !!usernameError}
                  helperText={buttonClicked ? usernameError : ""}
                />

                <TextField
                  fullWidth
                  sx={{ margin: "20px" }}
                  label="Password"
                  id="tf_login_password"
                  value={password}
                  onChange={(newValue) => setPassword(newValue.target.value)}
                  error={buttonClicked && !!passwordError}
                  helperText={buttonClicked ? passwordError : ""}
                  type="password"
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleDialogOpen}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    margin: "20px 20px 10px 20px",
                  }}
                >
                  Login
                </Button>

                <Button
                  fullWidth
                  size="large"
                  variant="text"
                  onClick={handleGoSignUpButton}
                  sx={{
                    fontSize: "1rem",
                    textDecoration: "underline",
                  }}
                >
                  Not an existing user? Sign up here
                </Button>
              </Box>
            </Container>
          </Item>
        </Grid>
      </Grid>
      <NotifDialog />
    </div>
  );
};

export default Login;
