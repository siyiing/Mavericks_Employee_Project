import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const BackBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBackButton = () => {
    if (
      location.pathname === "/addemployee" ||
      location.pathname === "/editemployee"
    )
      navigate("/employeelist");

    if (location.pathname === "/signup") navigate("/login");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<ArrowBackIosIcon />}
        onClick={handleBackButton}
      >
        {!isSmallScreen && "Back"}
      </Button>
    </div>
  );
};

export default BackBtn;
