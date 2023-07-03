import { useState } from "react";

const DeleteDialog = () => {

  const [deleteAlertOpen, setDeleteAlertVisibility] = useState(false);

  const handleClickOpen = () => {
    setDeleteAlertVisibility(true);
  }

  const handleClickClose = () => {
    setDeleteAlertVisibility(false);
  }



  return (
    <div>
     
    </div>
  );
};

export default DeleteDialog;
