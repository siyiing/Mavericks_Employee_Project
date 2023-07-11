import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackToHomeBtn = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => navigate("/")}
      >
        Back Home
      </Button>
    </div>
  );
};

export default BackToHomeBtn;
