import { useLocation } from "react-router-dom";
import AddEmployeeBtn from "./AddEmployeeBtn";
import BackBtn from "./BackBtn";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import LogOutBtn from "./LogOutBtn";

const Header = () => {
  const location = useLocation();
  return (
    <>
      <Box sx={{ height: 75 }}>
        <AppBar position="fixed" sx={{ backgroundColor: "#00446d" }}>
          <Toolbar>
            <Typography
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#ffffff",
              }}
              // onClick={() => navigate("/")}
            >
              Employees
            </Typography>
            {location.pathname === "/addemployee" ||
            location.pathname === "/editemployee" ? (
              <>
                <BackBtn />
                <LogOutBtn />
              </>
            ) : location.pathname === "/signup" ? (
              <BackBtn />
            ) : location.pathname === "/login" ? null : (
              <>
                <AddEmployeeBtn />
                <LogOutBtn />
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
