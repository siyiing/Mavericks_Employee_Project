import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./EmployeeList.css";
import { useAppSelector } from "../store/store";
// import { handleClickOpen } from "DeleteDialog.tsx";

const EmployeeList = () => {
  const employees = useAppSelector((state) => state.employee.employees);

  return (
    <div className="card">
      {employees.map((employee) => (
        <Card sx={{ display: "flex", maxWidth: 200, maxHeight: 150 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {employee.id}
                {employee.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {employee.department}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${employee.salary}
              </Typography>
            </CardContent>
          </Box>
          <CardActions>
            <ModeEditIcon
              key={employee.id}
              style={{ color: "orange" }}
              onClick={() => {
                alert(employee.id + "edit clicked");
              }}
            />
            <DeleteIcon
              key={employee.id}
              style={{ color: "red" }}
              onClick={() => {
                // handleClickOpen
              }}
            />
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default EmployeeList;
