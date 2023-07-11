import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { Box, Grid } from "@mui/material";
import Item from "@mui/material/Grid";
import { fetchAllEmployeesThunk } from "../store/features/employeeThunk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { EmployeeI } from "../store/features/employeeSlice";
import Pagination from "./Pagination";

// import { actions } from '../store/features/employeeSlice'

const EmployeeList = () => {
  const dispatch = useAppDispatch();
  // const employee = useAppSelector(employeeState);
  const employees = useAppSelector((state) => state.employee.employees);
  const navigate = useNavigate();

  const count = employees.length;

  const [open, setOpen] = useState(false);
  const [empData, setEmpData] = useState({});
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClickOpen = (emp: EmployeeI) => {
    setEmpData(emp);
    setOpen(true);
  };

  const handleDeleteClickClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      await dispatch(fetchAllEmployeesThunk()).unwrap(); // unwrap helps to tell me which status it is
      setError("");
    } catch (e) {
      setError("Something is wrong.. Cannot connect to server.");
      console.error(e);
    }
  };

  // useEffect(()=> {
  //   dispatch(actions.changePage(false));
  // }, [])

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {error ? (
          <Typography color="error" variant="h6" sx={{ textAlign: "center" }}>
            {error}
          </Typography>
        ) : (
          <Grid
            container
            spacing="30"
            sx={{ width: "60%" }}
            // backgroundColor: "red"
          >
            {employees.map((emp) => (
              <Grid
                item
                key={emp.id}
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Item>
                  <Card
                    sx={{
                      display: "flex",
                      width: 300,
                      height: 110,
                      backgroundColor: "#eeeeee",
                      color: "#00446d",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {emp.name}
                      </Typography>
                      <Typography variant="body1">{emp.department}</Typography>
                      <Typography variant="body1">${emp.salary}</Typography>
                    </CardContent>

                    <CardActions>
                      <ModeEditIcon
                        style={{ color: "orange" }}
                        onClick={() => {
                          navigate("/editemployee", {
                            state: { employees: emp },
                          });
                        }}
                      />

                      <DeleteIcon
                        style={{ color: "red" }}
                        onClick={() => handleDeleteClickOpen(emp)}
                      />
                      <DeleteDialog
                        open={open}
                        handleClose={handleDeleteClickClose}
                        employee={empData}
                        refreshEmployees={fetchEmployee}
                      />
                    </CardActions>
                  </Card>
                </Item>
              </Grid>
            ))}
          </Grid>
        )}
        <Pagination totalCount={count} curPage={1} displayCount={10} />
      </Box>
    </div>
  );
};

export default EmployeeList;
