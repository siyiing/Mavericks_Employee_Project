import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const LogOutBtn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    navigate("/login")
  }


  return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<LogoutIcon />}
        sx={{ marginLeft: "10px" }}
        onClick={handleLogout}
      >
        {!isSmallScreen && "Log Out"}
      </Button>
    </div>
  );
};

export default LogOutBtn;
