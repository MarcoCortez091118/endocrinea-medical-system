import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import { Card, Tabs, Tab, Divider } from "@mui/material";
import SoftTypography from "components/SoftTypography";

// Importar las secciones

import Documentos from "./documentos";
import DatosPaciente from "./DatosPaciente";
import Citas from "./citas";


function PatientDetails() {
  const location = useLocation();
  const { patient } = location.state || {}; // Datos del paciente seleccionados

  const [activeTab, setActiveTab] = useState(0); // Control de pestañas

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Citas />;
      case 1:
        return <Documentos />;
      case 2:
        return <DatosPaciente />;
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
          </SoftBox>
        </Card>

        {/* Panel Derecho - Contenido de pestañas */}
        <SoftBox style={{ width: "75%" }}>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
            <Tab label="citas" />
            <Tab label="documentos" />
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
