import { Box, Button } from "@mui/material";

type PaginationBtnProps = {
  preDisabled: boolean;
  nextDisabled: boolean;
  curPage: number;
  onPageChange: (page: number) => void;
};

const PaginationBtn = ({
  preDisabled,
  nextDisabled,
  curPage,
  onPageChange,
}: PaginationBtnProps) => {
  const handlePreviousPage = () => {
    onPageChange(curPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(curPage + 1);
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
