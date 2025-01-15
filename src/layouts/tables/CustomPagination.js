import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CustomPagination({ page, totalPages, onPageChange }) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => onPageChange(value)}
        siblingCount={1}
        boundaryCount={1}
        color="standard"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "grey",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            color: "#FFFFFF",
            backgroundColor: "#183A64",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#183A64",
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "grey",
          },
        }}
      />
    </Stack>
  );
}

CustomPagination.propTypes = {
  page: PropTypes.number.isRequired,       
  totalPages: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired, 
};
