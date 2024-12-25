import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card, Tabs, Tab, Divider, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button } from "@mui/material";
import { Download, Edit, Delete } from "@mui/icons-material";

function PatientDetails() {
  const location = useLocation();
  const { patient } = location.state || {}; // Datos del paciente seleccionados

  const [activeTab, setActiveTab] = useState(0); // Control de pestañas

  // Estado de archivos subidos (simulación de datos cargados)
  const files = [
    {
      id: 1,
      name: "Aaron Martinez Morales pqte platino vig septiembre",
      author: "Erika Guadalupe Munguía",
      date: "29/10/2024",
    },
    {
      id: 2,
      name: "A.C. Aaron Martinez Morales Dra Laura",
      author: "Erika Guadalupe Munguía",
      date: "02/08/2024",
    },
    {
      id: 3,
      name: "A.C. Aaron Martinez Morales Dra Caro",
      author: "Erika Guadalupe Munguía",
      date: "01/08/2024",
    },
  ];

  // Manejar cambio de pestañas
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Contenido de cada pestaña
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Citas
        return (
          <Card style={{ padding: "16px" }}>
            <SoftTypography variant="h6">Citas</SoftTypography>
            <SoftTypography variant="body2" mt={2}>
              Aquí puedes gestionar las citas del paciente. (Contenido en desarrollo)
            </SoftTypography>
          </Card>
        );

      case 1: // Documentos
        return (
          <Card style={{ padding: "16px" }}>
            <SoftTypography variant="h6">Documentos</SoftTypography>
            <SoftBox display="flex" gap={2} mt={2} mb={2}>
              <Button variant="outlined" startIcon={<i className="fas fa-upload" />}>Subir archivo</Button>
              <Button variant="contained" color="success">Crear documento</Button>
              <Button variant="text" startIcon={<i className="fas fa-file-medical" />}>Solicitar resultados de una prueba</Button>
            </SoftBox>
            <Divider />

            {/* Tabla de Archivos */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Autor</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Button variant="outlined" size="small">PDF</Button>
                    </TableCell>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.author}</TableCell>
                    <TableCell>{file.date}</TableCell>
                    <TableCell>
                      <IconButton color="primary"><Download /></IconButton>
                      <IconButton color="warning"><Edit /></IconButton>
                      <IconButton color="error"><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        );

      case 2: // Datos del paciente
        return (
          <Card style={{ padding: "16px" }}>
            <SoftTypography variant="h6">Datos del Paciente</SoftTypography>
            <SoftTypography variant="body2" mt={2}>
              Aquí puedes ver y editar la información del paciente. (Contenido en desarrollo)
            </SoftTypography>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} display="flex" gap={2}>
        {/* Panel Izquierdo - Información del paciente */}
        <Card style={{ width: "25%", padding: "16px" }}>
          <SoftBox display="flex" flexDirection="column" alignItems="center">
            <SoftBox
              style={{
                backgroundColor: "#a8dadc",
                width: 70,
                height: 70,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontSize: "18px",
              }}
            >
              {patient ? `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}` : "?"}
            </SoftBox>
            <SoftTypography variant="h6" mt={2}>
              {patient ? `${patient.firstName} ${patient.lastName}` : "Nombre del paciente"}
            </SoftTypography>
            <SoftTypography variant="body2" color="textSecondary">
              Nº {patient?.id || "000"}
            </SoftTypography>
            <SoftTypography mt={1} variant="body2">
              {patient?.email || "Email no proporcionado"}
            </SoftTypography>
            <SoftTypography variant="body2">
              {patient?.phone || "Teléfono no proporcionado"}
            </SoftTypography>
            <Divider style={{ width: "100%", margin: "16px 0" }} />
            <SoftTypography variant="body2" color="textSecondary">
              <b>Notas</b>
            </SoftTypography>
            <SoftTypography variant="body2" mt={1}>
              12/07/24 Info Platino <br />
              PLATINO TRIMESTRAL <br />
              16/07/24 AL 30/09/24
            </SoftTypography>
          </SoftBox>
        </Card>

        {/* Panel Derecho - Contenido de pestañas */}
        <SoftBox style={{ width: "75%" }}>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
            <Tab label="Citas" />
            <Tab label="Documentos" />
            <Tab label="Datos del Paciente" />
          </Tabs>
          <Divider style={{ margin: "16px 0" }} />
          {renderTabContent()}
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PatientDetails;
