import { Box, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PaginationBtn from "./PaginationBtn";

interface PageProps {
  totalCount: number;
  curPage: number;
  displayCount: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({
  totalCount,
  curPage,
  displayCount,
  onPageChange,
}: PageProps) => {
  let startRange;
  if (totalCount === 0) startRange = 0;
  else {
    startRange = (curPage - 1) * displayCount + 1;
  }
  const endRange = Math.min(curPage * displayCount, totalCount);

  const checkIfPage = () => {
    if (totalCount <= 10) return true;
    else return false;
  };

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
          {totalCount}
          {" entries"}
        </Typography>
      )}

      {checkIfPage() ? (
        <PaginationBtn
          preDisabled={true}
          nextDisabled={true}
          curPage={curPage}
          onPageChange={onPageChange}
        />
      ) : (
        <PaginationBtn
          preDisabled={curPage === 1}
          nextDisabled={curPage === Math.ceil(totalCount / displayCount)}
          curPage={curPage}
          onPageChange={onPageChange}
        />
      )}
    </Box>
  );
};

export default Pagination;
