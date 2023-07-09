import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const BackToHomeBtn = () => {
  return (
    <div>
      <Link to="/">
        <Button
          variant="contained"
          color="success"
          size="medium"
          startIcon={<ArrowBackIosIcon />}
        >
          Back Home
        </Button>
      </Link>
    </div>
  );
};

export default BackToHomeBtn;
