import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AddEmployeeBtn = () => {
  return (
    <div>
      <Link to="/addemployee">
        <Button
          variant="contained"
          color="success"
          size="medium"
          startIcon={<AddCircleIcon />}
        >
          Add Employee
        </Button>
      </Link>
    </div>
  );
};

export default AddEmployeeBtn;
