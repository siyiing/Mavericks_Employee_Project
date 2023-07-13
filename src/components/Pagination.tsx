import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PaginationBtn from "./PaginationBtn";
import { useAppSelector } from "../store/hook";

const Pagination = () => {
  const curPage = useAppSelector((state) => state.pagination.curPage);
  const totalItemCount = useAppSelector(
    (state) => state.employee.totalCount
  );
  const itemPerPage = useAppSelector((state) => state.pagination.itemPerPage);

  let startRange;

  if (totalItemCount === 0) startRange = 0;
  else {
    startRange = (curPage - 1) * itemPerPage + 1;
  }
  const endRange = Math.min(curPage * itemPerPage, totalItemCount);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        height: 40,
      }}
    >
      {!isSmallScreen && (
        <Typography variant="body1">
          {"Showing "}
          <b>
            {startRange}-{endRange}
          </b>
          {" out of "}
          {totalItemCount}
          {" entries"}
        </Typography>
      )}
      <PaginationBtn />
    </Box>
  );
};

export default Pagination;
