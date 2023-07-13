// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import { Typography, Grid } from "@mui/material";
// import Item from "@mui/material/Grid";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";

// type EmployeeGridProps = {
//     employee: any;
// }


const EmployeeGrid = () => {
//   const navigate = useNavigate();

  return (
    <></>
    // <Grid container spacing="30" sx={{ width: "60%" }}>
    //   {empList.map((emp) => (
    //     <Grid
    //       item
    //       key={emp.id}
    //       xs={12}
    //       md={6}
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Item>
    //         <Card
    //           sx={{
    //             display: "flex",
    //             width: 300,
    //             height: 110,
    //             backgroundColor: "#eeeeee",
    //             color: "#00446d",
    //           }}
    //         >
    //           <CardContent sx={{ flexGrow: 1 }}>
    //             <Typography variant="h5" sx={{ fontWeight: "bold" }}>
    //               {emp.name}
    //             </Typography>
    //             <Typography variant="body1">{emp.department}</Typography>
    //             <Typography variant="body1">${emp.salary}</Typography>
    //           </CardContent>

    //           <CardActions>
    //             <ModeEditIcon
    //               style={{ color: "orange" }}
    //               onClick={() => {
    //                 navigate("/editemployee", {
    //                   state: { employees: emp },
    //                 });
    //               }}
    //             />

    //             <DeleteIcon
    //               style={{ color: "red" }}
    //               onClick={() => handleDeleteClickOpen(emp)}
    //             />
    //           </CardActions>
    //         </Card>
    //       </Item>
    //     </Grid>
    //   ))}
    // </Grid>
  );
};

export default EmployeeGrid;
