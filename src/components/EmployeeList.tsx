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
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [empData, setEmpData] = useState({});
  const [error, setError] = useState<string | null>(null);

  const [curPage, setCurPage] = useState(1);
  const [fullEmp, setFullEmp] = useState<EmployeeI[]>([]); // add a state for the full list
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
  };

  const fetchEmployee = async () => {
    try {
      const result = await dispatch(fetchAllEmployeesThunk()).unwrap(); // unwrap helps to tell me which status it is
      setFullEmp(result);
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
    ); // Sort employees by id in ascending order
    const startItem = (curPage - 1) * ITEMS_PER_PAGE;
    const endItem = startItem + ITEMS_PER_PAGE;
    setEmpList(sortedEmployees.slice(startItem, endItem));
  }, [curPage, fetchedEmployees]); // slice the list anytime the page or the full list is updated

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
            {empList.map(
              (
                emp // employees
              ) => (
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
                        <Typography variant="body1">
                          {emp.department}
                        </Typography>
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
              )
            )}
          </Grid>
        )}
        <Pagination
          totalCount={count}
          curPage={curPage}
          displayCount={ITEMS_PER_PAGE}
          onPageChange={setCurPage}
        />
      </Box>
    </div>
  );
};

export default EmployeeList;
