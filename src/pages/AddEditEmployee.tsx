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
import { Department, EmployeeI } from "../store/features/employeeSlice";
import classes from "../styles/addemployee.module.css";
import { useAppDispatch } from "../store/hook";
import {
  createEmployeeThunk,
  updateEmployeeThunk,
} from "../store/features/employeeThunk";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  const navigate = useNavigate();

  // to set and display the employee in the form
  const editEmp = location.state?.employees;
  const curEmp = editEmp;

  useEffect(() => {
    if (location.pathname === "/editemployee" && editEmp) {
      setName(editEmp.name);
      setDept(editEmp.department);
      setSalary(editEmp.salary);
    }
  }, [editEmp, location.pathname]);

  const insertEmployee = async (employee: EmployeeI) => {
    try {
      await dispatch(createEmployeeThunk(employee)).unwrap(); // unwrap helps to tell me which status it is
    } catch (e) {
      console.error(e);
    }
  };

  const updateEmployee = async (employee: EmployeeI) => {
    try {
      await dispatch(updateEmployeeThunk(employee));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeptChange = (event: SelectChangeEvent<typeof dept>) => {
    setDept(event.target.value);
    setDeptError("");
  };

  const validateForm = () => {
    let isValid = true;

    if (/\d/.test(name)) {
      setNameError("name should not contain numeric values");
      isValid = false;
    } else if (name.length < 4 || name.length > 30) {
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
      let edept: Department = Department[dept as keyof typeof Department]; // get department in form of enum value
      const emp = { name, department: edept, salary };
      insertEmployee(emp);
      navigate("/");
    }
  };

  const handleUpdateButton = () => {
    setButtonClicked(true);
    if (validateForm()) {
      let edept: Department = Department[dept as keyof typeof Department]; // get department in form of enum value
      const emp = { id: editEmp.id, name, department: edept, salary };

      if (
        emp.name === curEmp.name &&
        emp.department === curEmp.department &&
        emp.salary === curEmp.salary
      ) {
        alert("Update failed. No changes was made.");
      } else {
        updateEmployee(emp);
        navigate("/");
      }
    }
  };

  return (
    <div className={classes.main_grid}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            {location.pathname === "/addemployee" ? (
              <h1 className={classes.addTitle}>Insert New Employee</h1>
            ) : (
              <h1 className={classes.addTitle}>Update Employee Details</h1>
            )}
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
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleUpdateButton}
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      margin: "20px 20px 100px 20px",
                    }}
                  >
                    Update Employee Details
                  </Button>
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
