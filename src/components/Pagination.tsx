import { Box, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
        <Box sx={{ display: "flex" }}>
          <Button size="small" disabled sx={{ fontWeight: "bold" }}>
            Previous
          </Button>
          {curPage}
          <Button size="small" disabled sx={{ fontWeight: "bold" }}>
            Next
          </Button>
        </Box>
      ) : (
        <Box sx={{ fontWeight: "bold" }}>
          <Button
            size="small"
            disabled={curPage === 1}
            onClick={() => onPageChange(curPage - 1)}
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
            disabled={curPage === Math.ceil(totalCount / displayCount)}
            onClick={() => onPageChange(curPage + 1)}
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
      )}
    </Box>
  );
};

export default Pagination;
