import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { Box, Grid } from "@mui/material";
import Item from "@mui/material/Grid";
import { fetchEmployeesByDeptIdThunk } from "../store/features/employeeThunk"; // fetchAllEmployeesThunk
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { EmployeeI, employeeAction } from "../store/features/employeeSlice";
import Pagination from "./Pagination";
import NotifDialog from "./NotifDialog";
import { notificationDialogActions } from "../store/features/notificationDialogSlice";
import { deleteDialogActions } from "../store/features/deleteDialogSlice";
import { employeeFormActions } from "../store/features/employeeFormSlice";

const EmployeeList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState<string | null>(null);
  const [empList, setEmpList] = useState<EmployeeI[]>([]);

  const fetchedEmployees = useAppSelector((state) => state.employee.employees);
  const curPage = useAppSelector((state) => state.pagination.curPage);
  const itemPerPage = useAppSelector((state) => state.pagination.itemPerPage);

  const loggedUser = useAppSelector((state) => state.user.loggedUser);

  const handleFetchUserType = (response: any) => {
    if (
      Array.isArray(response) &&
      response.length > 0 &&
      typeof response[0] === "object"
    )
      return true;
    else return false;
  };

  const handleDeleteClickOpen = (emp: EmployeeI) => {
    dispatch(employeeFormActions.setEmployeeData({ empData: emp }));
    dispatch(deleteDialogActions.setOpen({ open: true }));
  };

  // THIS IS TO FETCH EMPLOYEE BY THE LOGGED IN DEPARTMENT ID
  const fetchEmployee = async () => {
    try {
      const response = await dispatch(
        fetchEmployeesByDeptIdThunk(loggedUser.departmentId)
      ).unwrap();
      const result = handleFetchUserType(response);

      if (!result) setError("No permission to access this page.");
    } catch (e) {
      setError("Something is wrong.. Cannot connect to server.");
      console.error(e);
    }
  };

  // THIS FETCH ALL WITHOUT FILTERING
  // const fetchEmployee = async () => {
  //   try {
  //     const response = await dispatch(fetchAllEmployeesThunk()).unwrap(); // unwrap helps to tell me which status it is

  //     if (response.requestState === 0)
  //       setError("A token is required for authentication");
  //   } catch (e) {
  //     setError("Something is wrong.. Cannot connect to server.");
  //     console.error(e);
  //   }
  // };

  useEffect(() => {
    fetchEmployee();
  }, []);

  useEffect(() => {
    dispatch(
      notificationDialogActions.setLocation({ location: location.pathname })
    );
    dispatch(
      employeeAction.setTotalCount({ totalCount: fetchedEmployees.length })
    );
    dispatch(employeeFormActions.setSuccess({ success: false }));

    const result = handleFetchUserType(fetchedEmployees);

    if (result) {
      const sortedEmployees = [...fetchedEmployees].sort(
        (a, b) => (a.id || 0) - (b.id || 0)
      ); // sort employees by id in ascending order
      const startItem = (curPage - 1) * itemPerPage;
      const endItem = startItem + itemPerPage;
      setEmpList(sortedEmployees.slice(startItem, endItem));
    } else {
      setEmpList([]);
    }
  }, [curPage, fetchedEmployees]); // slice the list anytime the page or the full list is updated

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
        ) : fetchedEmployees.length === 0 ? (
          <Typography color="error" variant="h6" sx={{ textAlign: "center" }}>
            {"No Existing Employee"}
          </Typography>
        ) : (
          <Grid
            container
            spacing="30"
            sx={{
              width: "60%",
            }}
          >
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
        <Pagination />
      </Box>

      <DeleteDialog refreshEmployees={fetchEmployee} />

      <NotifDialog />
    </div>
  );
};

export default EmployeeList;
