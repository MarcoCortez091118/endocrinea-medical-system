// Importaciones necesarias
import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
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
import { useNavigate } from "react-router-dom";
import Dashboard from "layouts/dashboard";
import routes from "routes";
import AddPatient from "./AddPatient";

function Tables() {
  const { columns, rows } = useUsuarioTableData();
  const navigate = useNavigate(); // Hook para redirigir

  const [page, setPage] = useState(1);
  const rowsPerPage = 10; 
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const displayedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const [openModal, setOpenModal] = useState(false); 
  const handlePageChange = (newPage) => {setPage(newPage);};
  const handleAddPatientClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleAddClick = () => {
    console.log("Agregar botón clicado"); 
  };

  const handleRowClick = () => {
    navigate("/dashboard");
  };

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            {/* Contenedor del título y el botón */}
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftTypography variant="h6">Table Leads</SoftTypography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPatientClick}
                sx={{
                  padding: "8px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                  fontSize: "10px",
                  minWidth: "60px",
                  minHeight: "30px",
                }}
              >
                <span style={{ fontSize: "32px", lineHeight: "0.9" }}>+</span>
                <span style={{ fontSize: "16px" }}>Agregar paciente</span>
              </Button>
            </SoftBox>

            <SoftBox
              sx={{
                "& .MuiTableRow-root": {
                  cursor: "pointer", 
                  "&:hover": {
                    backgroundColor: "#f5f5f5", 
                  },
                },
              }}
            >
              <Table
                columns={columns}
                rows={displayedRows.map((row) => ({
                  ...row,
                  onClick: handleRowClick, 
                }))}
              />
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

      {/* Modal para agregar paciente */}
      <AddPatient open={openModal} onClose={handleCloseModal} />
    </DashboardLayout>
  );
}

export default Tables;
