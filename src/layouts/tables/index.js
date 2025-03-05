import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import useNewPatientsTableData from "./data/newPatientsTableData";
import CustomPagination from "./CustomPagination";
import { useNavigate } from "react-router-dom";
import AddPatient from "./AddPatient";


function Tables() {
  const [searchQuery, setSearchQuery] = useState("");
  const { newColumns, newRows } = useNewPatientsTableData(searchQuery);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const totalPages = Math.ceil(newRows.length / rowsPerPage);
  const displayedRows = newRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const [openModal, setOpenModal] = useState(false);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddPatientClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (patient) => {
    if (patient) {
      const patientData = {
        name: patient.nombre,
        id: patient.id,
        email: patient.correo,
        phone: patient.teléfono,
      };

      localStorage.setItem("selectedPatient", JSON.stringify(patientData));

      navigate("/PatientDetails", { state: { patient: patientData } });
    } else {
      console.error("No se pasaron datos del paciente.");
    }
  };
  const [newPage, setNewPage] = useState(1);
  const totalNewPages = Math.ceil(newRows.length / rowsPerPage);
  const displayedNewRows = newRows.slice((newPage - 1) * rowsPerPage, newPage * rowsPerPage);
  const handleNewPageChange = (newPage) => setNewPage(newPage);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Pacientes Endocrinea</SoftTypography>

              <SoftBox pr={1} flex={1} ml={5} mr={5} maxWidth="500px">
                <SoftInput
                  placeholder="Buscar datos del paciente"
                  icon={{ component: "search", direction: "left" }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </SoftBox>

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
                  "&:hover": { backgroundColor: "#f5f5f5" },
                },
              }}
            >
              <Table columns={newColumns} rows={displayedNewRows} />
            </SoftBox>
            <CustomPagination
              page={newPage}
              totalPages={totalNewPages}
              onPageChange={handleNewPageChange}
            />
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
      <AddPatient open={openModal} onClose={handleCloseModal} />
    </DashboardLayout>
  );
}

export default Tables;
