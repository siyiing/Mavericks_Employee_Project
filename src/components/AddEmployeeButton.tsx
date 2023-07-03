import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="medium"
        startIcon={<AddCircleIcon />}
        onClick={() => {
          alert("clicked");
        }}
      >
        Add Employee
      </Button>
    </div>
  );
};

export default Header;
