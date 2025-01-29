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
import CustomPagination from "./CustomPagination";
import { useNavigate } from "react-router-dom";
import AddPatient from "./AddPatient";
import SoftAvatar from "components/SoftAvatar";
import team2 from "assets/images/team-2.jpg";

function Tables() {
  const { columns, rows } = useUsuarioTableData();
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
    console.log("Paciente seleccionado:", patient); // Verifica los datos
    if (patient) {
      navigate("/PatientDetails", {
        state: {
          patient: {
            name: patient.nombre,
            id: patient.id,
            email: patient.correo,
            phone: patient.teléfono,
          },
        }
      });
    } else {
      console.error("No se pasaron datos del paciente.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftTypography variant="h6">Pacientes</SoftTypography>
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
                columns={[
                  ...columns,
                  { name: "Acciones", align: "center" }, // Agrega una columna para acciones
                ]}
                rows={displayedRows.map((row) => ({
                  ...row,
                  foto: (
                    <SoftAvatar src={team2} size="sm" variant="rounded" />
                  ),
                  id: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                      {row.id}
                    </SoftTypography>
                  ),
                  nombre: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                      {row.nombre}
                    </SoftTypography>
                  ),
                  teléfono: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                      {row.teléfono}
                    </SoftTypography>
                  ),
                  correo: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                      {row.correo}
                    </SoftTypography>
                  ),
                  género: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                      {row.género}
                    </SoftTypography>
                  ),
                  estatus: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                      {row.estatus}
                    </SoftTypography>
                  ),
                  Acciones: (
                    <Button
                      onClick={() => handleRowClick(row)}
                      variant="text"
                      color="primary"
                    >
                      Ver Detalles
                    </Button>
                  ),
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

      <AddPatient open={openModal} onClose={handleCloseModal} />
    </DashboardLayout>
  );
}

export default Tables;
