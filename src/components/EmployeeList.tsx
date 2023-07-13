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
import NotifDialog from "./NotifDialog";

const EmployeeList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [empData, setEmpData] = useState({});
  const [error, setError] = useState<string | null>(null);

  const [curPage, setCurPage] = useState(1);
  const [empList, setEmpList] = useState<EmployeeI[]>([]);
  const ITEMS_PER_PAGE = 10;

  const fetchedEmployees = useAppSelector((state) => state.employee.employees);
  const count = fetchedEmployees.length;

  const handleDeleteClickOpen = (emp: EmployeeI) => {
    setEmpData(emp);
    setOpen(true);
  };

  const handleDeleteClickClose = () => {
    setOpen(false);
    handleDialogOpen();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const fetchEmployee = async () => {
    try {
      await dispatch(fetchAllEmployeesThunk()).unwrap(); // unwrap helps to tell me which status it is
    } catch (e) {
      setError("Something is wrong.. Cannot connect to server.");
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [dispatch]); // depend on curPage to refresh when page change

  useEffect(() => {
    const sortedEmployees = [...fetchedEmployees].sort(
      (a, b) => (a.id || 0) - (b.id || 0)
    ); // sort employees by id in ascending order
    const startItem = (curPage - 1) * ITEMS_PER_PAGE;
    const endItem = startItem + ITEMS_PER_PAGE;
    setEmpList(sortedEmployees.slice(startItem, endItem));
  }, [curPage, fetchedEmployees]); // slice the list anytime the page or the full list is updated

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
        ) : count == 0 ? (
          <Typography color="error" variant="h6" sx={{ textAlign: "center" }}>
            {"No Existing Employee"}
          </Typography>
        ) : (
          <Grid container spacing="30" sx={{ width: "60%" }}>
            {empList.map((emp) => (
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
                    </CardActions>
                  </Card>
                </Item>
              </Grid>
            ))}
          </Grid>
        )}
        <Pagination
          totalCount={count}
          curPage={curPage}
          displayCount={ITEMS_PER_PAGE}
          onPageChange={setCurPage}
        />
      </Box>

      <DeleteDialog
        open={open}
        handleClose={handleDeleteClickClose}
        employee={empData}
        refreshEmployees={fetchEmployee}
      />
      <NotifDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        message={"delete successfully"}
      />
    </div>
  );
};

export default EmployeeList;
