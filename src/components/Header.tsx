import { useLocation, useNavigate } from "react-router-dom";
import AddEmployeeBtn from "./AddEmployeeBtn";
import BackToHomeBtn from "./BackToHomeBtn";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
              onClick={() => navigate("/")}
            >
              Employees
            </Typography>

            {location.pathname === "/addemployee" ||
            location.pathname === "/editemployee" ? (
              <BackToHomeBtn />
            ) : (
              <AddEmployeeBtn />
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
