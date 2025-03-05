import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import useUsuarioTableData from "./data/authorsTableData";
import useNewPatientsTableData from "./data/newPatientsTableData"; // Importar la nueva tabla
import CustomPagination from "./CustomPagination";
import { useNavigate } from "react-router-dom";
import AddPatient from "./AddPatient";
import SoftAvatar from "components/SoftAvatar";
import team2 from "assets/images/team-2.jpg";

function Tables() {
  const { columns, rows } = useUsuarioTableData();
  const { newColumns, newRows } = useNewPatientsTableData(); // Obtener datos de la nueva API
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const displayedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const [openModal, setOpenModal] = useState(false);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddPatientClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
