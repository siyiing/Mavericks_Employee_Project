import { Typography } from "@mui/material";
import classes from "../styles/form.module.css";

const NotFound = () => {
  return (
    <div className={classes.notfound}>
      <Typography variant="h2"> Page Not Found</Typography>
    </div>
  );
};

export default NotFound;
