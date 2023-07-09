import { useLocation } from "react-router-dom";
import AddEmployee from "./AddEmployeeBtn";
import BackToHomeBtn from "./BackToHomeBtn";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

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
            >
              Employees
            </Typography>

            {location.pathname === "/addemployee" ? (
              <BackToHomeBtn />
            ) : (
              <AddEmployee />
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
