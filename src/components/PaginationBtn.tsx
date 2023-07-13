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

  // useEffect(() => {
  //   if (totalItemCount <= 10) {
  //     dispatch(paginationAction.setPreDisabled({ preDisabled: true }));
  //     dispatch(paginationAction.setNextDisabled({ nextDisabled: true }));
  //     dispatch(paginationAction.setCurPage({ curPage: curPage }));
  //   } else {
  //     dispatch(paginationAction.setCurPage({ curPage: curPage }));
  //     console.log("curpage", curPage);
  //     dispatch(paginationAction.setPreDisabled({ preDisabled: curPage === 1 }));
  //     dispatch(
  //       paginationAction.setNextDisabled({
  //         nextDisabled: curPage === Math.ceil(totalItemCount / itemPerPage),
  //       })
  //     );
  //   }
  // }, []);

  if (totalItemCount <= 10) {
    dispatch(paginationAction.setPreDisabled({ preDisabled: true }));
    dispatch(paginationAction.setNextDisabled({ nextDisabled: true }));
    dispatch(paginationAction.setCurPage({ curPage: curPage }));
  } else {
    dispatch(paginationAction.setCurPage({ curPage: curPage }));
    console.log("curpage", curPage);
    dispatch(paginationAction.setPreDisabled({ preDisabled: curPage === 1 }));
    dispatch(
      paginationAction.setNextDisabled({
        nextDisabled: curPage === Math.ceil(totalItemCount / itemPerPage),
      })
    );
  }

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
