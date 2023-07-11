import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const AddEmployeeBtn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Button
        variant="contained" 
        color="success"
        size="medium"
        startIcon={<AddCircleIcon />}
        onClick={() => navigate("/addemployee")}
      >
        {!isSmallScreen && "Add Employee"}
      </Button>
    </div>
  );
};

export default AddEmployeeBtn;
