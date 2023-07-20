import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
  Grid,
  Button,
  FormHelperText,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Item from "@mui/material/Grid";
import { useAppDispatch } from "../store/hook";
import NotifDialog from "../components/NotifDialog";
import { createUserThunk } from "../store/features/userThunk";
import classes from "../styles/form.module.css";
import { useState, useEffect } from "react";
import { UserI, userActions } from "../store/features/userSlice";
import { notificationDialogActions } from "../store/features/notificationDialogSlice";
import { useLocation } from "react-router-dom";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [departmentId, setDept] = useState<number>(0);
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [rePasswordError, setRePasswordError] = useState<string>("");
  const [deptError, setDeptError] = useState<string>("");

  // const [showPassword, setShowPassword] = useState(false);
  // const [showRePassword, setShowRePassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    
    dispatch(
      notificationDialogActions.setLocation({ location: location.pathname })
    );
  }, []);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  const handleDeptChange = (event: SelectChangeEvent<typeof departmentId>) => {
    setDept(+event.target.value);
    setDeptError("");
  };

  const validateForm = () => {
    let isValid = true;
    const regex = /[ `!@#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/; // allow '_' and '-'

    if (
      username.length < 2 ||
      username.length > 30 ||
      username.trim().length === 0
    ) {
      setUsernameError(
        "username should be at least 2 characters and not exceed 30 characters"
      );
      isValid = false;
    } else if (regex.test(username)) {
      setUsernameError("username can only include '-' or '_' signs");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password.length < 8) {
      setPasswordError("password should be at least 8 characters");
      setRePasswordError("please try again");
      isValid = false;
    } else if (!rePassword.match(password)) {
      setPasswordError("password does not match. please try again");
      setRePasswordError("please try again");
      isValid = false;
    } else {
      setPasswordError("");
      setRePasswordError("");
    }

    if (!departmentId) {
      setDeptError("please select a department");
      isValid = false;
    } else {
      setDeptError("");
    }

    return isValid;
  };

  const handleDialogOpen = () => {
    dispatch(notificationDialogActions.setOpen({ open: true }));
    dispatch(userActions.setSignUpSuccess({ success: false }));
    handleInsertButton();
  };

  const handleInsertButton = async () => {
    setButtonClicked(true);
    let response: any;

    if (validateForm()) {
      // create user
      const user = { username, password: password, departmentId };
      response = await dispatch(createUserThunk(user)).unwrap();

      if (response === "OK") {
        dispatch(userActions.setSignUpSuccess({ success: true }));
        dispatch(
          notificationDialogActions.setMessage({
            message: "user created sucessfully !",
          })
        );
      } else {
        // error
        if (response === "Bad Request")
          dispatch(userActions.setSignUpSuccess({ success: false }));
        setUsernameError("username already exist");
      }
    } else {
      dispatch(userActions.setSignUpSuccess({ success: false }));
    }
  };

  return (
    <div className={classes.main_grid}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <h1 className={classes.addTitle}>Sign Up</h1>
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
                  sx={{ margin: "10px 20px 20px 20px" }}
                  fullWidth
                  required
                  label="User Name"
                  id="tf_username"
                  value={username}
                  onChange={(newValue) => setUsername(newValue.target.value)}
                  error={buttonClicked && !!usernameError}
                  helperText={buttonClicked ? usernameError : ""}
                  inputProps={{
                    minLength: 2,
                    maxLength: 30,
                  }}
                />
                <FormControl
                  fullWidth
                  sx={{ margin: "20px" }}
                  error={buttonClicked && !!deptError}
                >
                  {buttonClicked && deptError ? (
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ color: "#b53737" }}
                    >
                      Department
                    </InputLabel>
                  ) : (
                    <InputLabel id="demo-simple-select-label">
                      Department
                    </InputLabel>
                  )}

                  <Select
                    labelId="demo-simple-select-label"
                    id="select_dept"
                    value={departmentId}
                    label="Department"
                    onChange={handleDeptChange}
                  >
                    <MenuItem value={0}></MenuItem>
                    <MenuItem value={1}>HR</MenuItem>
                    <MenuItem value={2}>PS</MenuItem>
                    <MenuItem value={3}>ADMIN</MenuItem>
                  </Select>
                  {buttonClicked && deptError && (
                    <FormHelperText sx={{ color: "#b53737" }}>
                      {deptError}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={buttonClicked && !!passwordError}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showRePassword ? "text" : "password"}
                    value={rePassword}
                    onChange={(newValue) =>
                      setRePassword(newValue.target.value)
                    }
                    error={buttonClicked && !!rePasswordError}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl> */}

                <TextField
                  fullWidth
                  sx={{ margin: "20px" }}
                  label="Password"
                  id="tf_password"
                  value={password}
                  onChange={(newValue) => setPassword(newValue.target.value)}
                  error={buttonClicked && !!passwordError}
                  helperText={buttonClicked ? passwordError : ""}
                  type="password"
                />

                <TextField
                  fullWidth
                  sx={{ margin: "20px" }}
                  label="Re-enter Password"
                  id="tf_re_password"
                  value={rePassword}
                  onChange={(newValue) => setRePassword(newValue.target.value)}
                  error={buttonClicked && !!rePasswordError}
                  helperText={buttonClicked ? rePasswordError : ""}
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
                    margin: "20px 20px 100px 20px",
                  }}
                >
                  Sign Up
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

export default SignUp;
