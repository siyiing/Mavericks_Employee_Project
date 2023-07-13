import { Box, Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { paginationAction } from "../store/features/paginationSlice";
import { useEffect } from "react";

const PaginationBtn = () => {
  const dispatch = useAppDispatch();
  const curPage = useAppSelector((state) => state.pagination.curPage);
  const totalItemCount = useAppSelector((state) => state.employee.totalCount);
  const itemPerPage = useAppSelector((state) => state.pagination.itemPerPage);
  const preDisabled = useAppSelector((state) => state.pagination.preDisabled);
  const nextDisabled = useAppSelector((state) => state.pagination.nextDisabled);

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
  }, [curPage]); // depend on curPage to refresh when page change

  useEffect(() => {
    const totalPage = Math.ceil(totalItemCount / itemPerPage);
    if (totalPage !== curPage)
      dispatch(paginationAction.setCurPage({ curPage: totalPage }));
  }, [totalItemCount]); // depend on curPage to refresh when page change

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
