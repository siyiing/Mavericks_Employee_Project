import { Box, Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { paginationAction } from "../store/features/paginationSlice";
import { useEffect } from "react";
import { employeeFormActions } from "../store/features/employeeFormSlice";
import { notificationDialogActions } from "../store/features/notificationDialogSlice";

const PaginationBtn = () => {
  const dispatch = useAppDispatch();
  const curPage = useAppSelector((state) => state.pagination.curPage);
  const totalItemCount = useAppSelector((state) => state.employee.totalCount);
  const itemPerPage = useAppSelector((state) => state.pagination.itemPerPage);
  const preDisabled = useAppSelector((state) => state.pagination.preDisabled);
  const nextDisabled = useAppSelector((state) => state.pagination.nextDisabled);
  const success = useAppSelector((state) => state.employeeform.success);
  const message = useAppSelector((state) => state.notificationdialog.message);

  const checkItemCount = () => {
    if (totalItemCount <= 10) {
      dispatch(paginationAction.setPreDisabled({ preDisabled: true }));
      dispatch(paginationAction.setNextDisabled({ nextDisabled: true }));
    } else {
      dispatch(paginationAction.setPreDisabled({ preDisabled: curPage === 1 }));
      dispatch(
        paginationAction.setNextDisabled({
          nextDisabled: curPage === Math.ceil(totalItemCount / itemPerPage),
        })
      );
    }
  };

  useEffect(() => {
    checkItemCount();
  }, [curPage, totalItemCount]); // depend on curPage to refresh when page change

  useEffect(() => {
    const totalPage = Math.ceil(totalItemCount / itemPerPage);
    if (totalPage !== 0 && totalPage < curPage)
      dispatch(paginationAction.setCurPage({ curPage: totalPage }));
    else if (
      success &&
      totalPage != curPage &&
      message === "insert sucessfully !"
    ) {
      dispatch(paginationAction.setCurPage({ curPage: totalPage }));
      dispatch(employeeFormActions.setSuccess({ success: false }));
      dispatch(notificationDialogActions.setMessage({ message: "" }));
    }
  }, [totalItemCount, success]); // depend on curPage to refresh when page change

  const handlePreviousPage = () => {
    dispatch(paginationAction.setCurPage({ curPage: curPage - 1 }));
  };

  const handleNextPage = () => {
    dispatch(paginationAction.setCurPage({ curPage: curPage + 1 }));
  };

  return (
    <Box sx={{ display: "flex", fontWeight: "bold" }}>
      <Button
        size="small"
        disabled={preDisabled}
        onClick={handlePreviousPage}
        sx={{
          fontWeight: "bold",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Previous
      </Button>
      {curPage}
      <Button
        size="small"
        disabled={nextDisabled}
        onClick={handleNextPage}
        sx={{
          fontWeight: "bold",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Next
      </Button>
    </Box>
  );
};
export default PaginationBtn;
