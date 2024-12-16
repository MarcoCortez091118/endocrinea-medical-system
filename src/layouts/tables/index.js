// Importaciones necesarias
import React, { useState } from "react";
import Card from "@mui/material/Card";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
// Data
import useUsuarioTableData from "./data/authorsTableData";
import CustomPagination from "./CustomPagination";

function Tables() {
  const { columns, rows } = useUsuarioTableData();

  const [page, setPage] = useState(1);
  const rowsPerPage = 10; 
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const displayedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" flexDirection="column" alignItems="flex-start" p={3}>
              <SoftTypography variant="h6">Table Leads</SoftTypography>
              <SoftTypography
                variant="subtitle2"
                color="secondary"
                fontWeight="medium"
                mt={2}
              >
                Pacientes
              </SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={displayedRows} />
            </SoftBox>
            <CustomPagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
