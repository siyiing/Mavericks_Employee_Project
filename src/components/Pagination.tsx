import { Box, Typography, Button } from "@mui/material";

interface PageProps {
  totalCount: number;
  curPage: number;
  displayCount: number;
}

const Pagination: React.FC<PageProps> = ({
  totalCount,
  curPage,
  displayCount,
}) => {
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
      <Typography variant="body1">
        {"Showing "}
        <b>
          {startRange}-{endRange}
        </b>
        {" out of "}
        {totalCount}
        {" entries"}
      </Typography>

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
          <Button size="small" sx={{ fontWeight: "bold" }}>
            Previous
          </Button>
          {curPage}
          <Button size="small" sx={{ fontWeight: "bold" }}>
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Pagination;
