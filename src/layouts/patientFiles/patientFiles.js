import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import { Card, Tabs, Tab, Divider } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import "./PatientDetails.css"; // Importar archivo CSS

// Importar las secciones
import Documentos from "./documentos";
import DatosPaciente from "./DatosPaciente";
import Citas from "./citas";
import NotaClinico from "layouts/nota-Clinica/nota-Clinica";
import HistorialEvolucion from "layouts/historial-evolucion";
import NotaNutricional from "layouts/nota-Nutricion/nota-Nutricion";
import HCP from "layouts/FormsHistoryPsychological";
import HCN from "layouts/historial-nutricional";
import HCM from "layouts/historial-clinico";
import NoteDisplay from "../historial-evolucion/NoteDisplay";
import HistoryNotes from "layouts/notesHistory/historyNotes";


function PatientDetails() {
  const location = useLocation();
  const { patient } = location.state || {}; // Datos del paciente seleccionados

  const [activeTab, setActiveTab] = useState(0); // Estado para la primera fila de pestañas
  const [activeSubTab, setActiveSubTab] = useState(null); // Estado para la segunda fila de pestañas

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setActiveSubTab(null); // Al cambiar el tab principal, desactivar el sub-tab
  };

  const handleSubTabChange = (event, newValue) => {
    setActiveSubTab(newValue);
    setActiveTab(null); // Al cambiar el sub-tab, desactivar el tab principal
  };

  const renderTabContent = () => {
    if (activeSubTab !== null) return null; // Oculta el contenido del tab principal si hay un sub-tab activo

    switch (activeTab) {
      case 0:
        return <Citas />;
      case 1:
        return <HistoryNotes />;  
      case 2:
        return <Documentos />;
      case 3:
        return <DatosPaciente />;
      case 4:
        return return <HistorialEvolucion patientId={patient?.id} />;
      case 5:
        return <NotaClinico />;
      case 6:
        return <NotaNutricional />;
      case 7:
        return <NoteDisplay patientId={patient?.id} />; // 👈 Pasamos el ID del paciente a NoteDisplay
      default:
        return null;
    }
  };

  const renderSubTabContent = () => {
    if (activeTab !== null) return null; // Oculta el contenido del sub-tab si hay un tab principal activo

    switch (activeSubTab) {
      case 0:
        return <HCP />;
      case 1:
        return <HCN />;
      case 2:
        return <HCM />;
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
                backgroundColor: "#183A64",
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
              {patient ? patient.name.charAt(0) : "N"}
            </SoftBox>
            <SoftTypography variant="h6" mt={2}>
              {patient ? patient.name.toUpperCase() : "Nombre del paciente".toUpperCase()}
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
          {/* Primera fila de pestañas */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            TabIndicatorProps={{ style: { display: "none" } }} // Sin indicador predeterminado
          >
            <Tab
              label="Citas"
              className={activeTab === 0 ? "tab-active" : "tab"}
            />
            <Tab
              label="Historial de Notas"
              className={activeTab === 1 ? "tab-active" : "tab"}
            />
            <Tab
              label="Documentos"
              className={activeTab === 2 ? "tab-active" : "tab"}
            />
            <Tab
              label="Datos del Paciente"
              className={activeTab === 3 ? "tab-active" : "tab"}
            />
            <Tab
              label="Nota de Evolución"
              className={activeTab === 4 ? "tab-active" : "tab"}
            />
            <Tab
              label="Nota Clínica Médica"
              className={activeTab === 5 ? "tab-active" : "tab"}
            />
            <Tab
              label="Nota Nutricional"
              className={activeTab === 6 ? "tab-active" : "tab"}
            />
          </Tabs>

          <Divider style={{ margin: "16px 0" }} />

          {/* Segunda fila de pestañas */}
          <Tabs
            value={activeSubTab}
            onChange={handleSubTabChange}
            TabIndicatorProps={{ style: { display: "none" } }} // Sin indicador predeterminado
          >
            <Tab label="HCP" className={activeSubTab === 0 ? "sub-tab-active" : "sub-tab"} />
            <Tab label="HCN" className={activeSubTab === 1 ? "sub-tab-active" : "sub-tab"} />
            <Tab label="HCM" className={activeSubTab === 2 ? "sub-tab-active" : "sub-tab"} />
          </Tabs>

          <Divider style={{ margin: "16px 0" }} />

          {/* Contenido de la pestaña principal (solo si no hay sub-tab activo) */}
          {renderTabContent()}

          {/* Contenido del sub-tab (solo si no hay tab principal activo) */}
          {renderSubTabContent()}
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PatientDetails;
