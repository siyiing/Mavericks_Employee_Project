import { useState } from "react";
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
} from "@mui/material";
import Item from "@mui/material/Grid";
import { Department } from "../store/features/employeeSlice";
import classes from "../styles/addemployee.module.css";
import { useAppDispatch } from "../store/hook";
import { createEmployeeThunk } from "../store/features/employeeThunk";
import { Link } from "react-router-dom";
import "../components/EmployeeList.css";
import { useLocation } from "react-router-dom";

const AddEmployee = () => {
  const [name, setName] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);

  const [nameError, setNameError] = useState<string>("");
  const [deptError, setDeptError] = useState<string>("");
  const [salaryError, setSalaryError] = useState<string>("");

  const [buttonClicked, setButtonClicked] = useState(false);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleDeptChange = (event: SelectChangeEvent<typeof dept>) => {
    setDept(event.target.value);
    setDeptError("");
  };

  const validateForm = () => {
    let isValid = true;

    if (name.length < 4 || name.length > 30) {
      setNameError(
        "name should be at least 4 characters and not exceed 30 characters"
      );
      isValid = false;
    } else {
      setNameError("");
    }

    if (!dept) {
      setDeptError("please select a department");
      isValid = false;
    } else {
      setDeptError("");
    }

    if (salary <= 0) {
      setSalaryError("salary must be a positive number");
      isValid = false;
    } else {
      setSalaryError("");
    }

    return isValid;
  };

  const handleInsertButton = () => {
    setButtonClicked(true);
    if (validateForm()) {
      let edept: Department = Department[dept as keyof typeof Department];

      const emp = { name, department: edept, salary };
      dispatch(createEmployeeThunk(emp));
      console.log(typeof edept);
      console.log(name + dept, salary);
    }
  };

  return (
    <div className={classes.main_grid}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <h1 className={classes.addTitle}>Insert New Employee</h1>
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
                  sx={{ margin: "20px" }}
                  fullWidth
                  required
                  label="Name"
                  id="tf_name"
                  value={name}
                  onChange={(newValue) => setName(newValue.target.value)}
                  error={buttonClicked && !!nameError}
                  helperText={buttonClicked ? nameError : ""}
                  inputProps={{
                    minLength: 4,
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
                    value={dept}
                    label="Department"
                    onChange={handleDeptChange}
                  >
                    <MenuItem value={Department.HR}>HR</MenuItem>
                    <MenuItem value={Department.PS}>PS</MenuItem>
                    <MenuItem value={Department.ADMIN}>ADMIN</MenuItem>
                  </Select>
                  {buttonClicked && deptError && (
                    <FormHelperText sx={{ color: "#b53737" }}>
                      {deptError}
                    </FormHelperText>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  sx={{ margin: "20px" }}
                  label="Salary ($)"
                  id="tf_salary"
                  value={salary}
                  onChange={(newValue) => setSalary(+newValue.target.value)}
                  error={buttonClicked && !!salaryError}
                  helperText={buttonClicked ? salaryError : ""}
                  type="number"
                  inputProps={{ min: 0 }}
                />

                {location.pathname === "/addemployee" ? (
                  <Link to="/">
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleInsertButton}
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        margin: "20px 20px 100px 20px",
                      }}
                    >
                      Insert New Employee
                    </Button>
                  </Link>
                ) : (
                  <Link to="/">
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleInsertButton}
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        margin: "20px 20px 100px 20px",
                      }}
                    >
                      Update Employee Details
                    </Button>
                  </Link>
                )}
              </Box>
            </Container>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddEmployee;
