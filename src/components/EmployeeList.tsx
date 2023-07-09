import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../store/hook";
import { Grid } from "@mui/material";
import Item from "@mui/material/Grid";
import { fetchAllEmployeesThunk } from "../store/features/employeeThunk";
import { useAppDispatch } from "../store/hook";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const dispatch = useAppDispatch();
  // const employee = useAppSelector(employeeState);
  const employees = useAppSelector((state) => state.employee.employees);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      await dispatch(fetchAllEmployeesThunk()).unwrap(); // unwrap helps to tell me which status it is 
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="emp_list">
      <Grid container spacing="30" sx={{ width: "60%" }}>
        {employees.map((emp) => (
          <Grid
            item
            key={emp.id}
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Item>
              <Card sx={{ width: 300, height: 180, border: "1px solid red" }}>
                <Box>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {emp.id}
                      {emp.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {emp.department}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${emp.salary}
                    </Typography>
                  </CardContent>
                </Box>
                <CardActions>
                  <Link to="/editemployee">
                    <ModeEditIcon
                      style={{ color: "orange" }}  
                    />
                  </Link>

                  <DeleteIcon
                    style={{ color: "red" }}
                    onClick={() => {
                      alert(emp.id + "delete clicked");
                    }}
                  />
                </CardActions>
              </Card>
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EmployeeList;
