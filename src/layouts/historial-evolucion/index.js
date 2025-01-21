import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import NativeSelect from "@mui/material/NativeSelect";

function HistorialEvolucion() {
  const [formData, setFormData] = useState({
    presentation: "",
    evolution: "",
    notes: "",
    tasks: "",
    comments: "",
    prognostic: "",
  });
  const [age, setAge] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { ...formData };

    /*
    const blob = new Blob([JSON.stringify(dataToSend, null, 2)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "historial-evolucion.txt";
    link.click();
    URL.revokeObjectURL(url);
    */

    console.log("Datos a enviar:", formData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <SoftBox mb={3}>
            <Card sx={{ p: 3, mb: 2 }}>
              <SoftTypography variant="h5" mb={2}>
                Nota de evolución - Endocrinea Care
              </SoftTypography>
              <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
                Los siguientes datos serán utilizados para llenar su historial médico. La
                información será tratada con total confidencialidad.
              </SoftTypography>
            </Card>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
                <SoftTypography variant="h6" color="secondary" mb={2}>
                  Información del paciente
                </SoftTypography>

                <SoftBox
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // Una columna en pantallas pequeñas y dos en pantallas medianas o más grandes
                    gap: 3,
                  }}
                >
                  {[
                    { id: "presentation", label: "1. Presentación *" },
                    { id: "evolution", label: "2. Evolución *" },
                    { id: "notes", label: "3. Notas de la sesión *" },
                    { id: "tasks", label: "4. Tareas de seguimiento *" },
                    { id: "comments", label: "5. Comentarios / Observaciones *" },
                    { id: "prognostic", label: "6. Pronóstico *" },
                  ].map((field) => (
                    <SoftBox key={field.id}>
                      <label htmlFor={field.id}>
                        <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                          {field.label}
                        </SoftTypography>
                      </label>
                      <textarea
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className="global-textarea"
                        rows={3}
                      />
                    </SoftBox>
                  ))}
                </SoftBox>
              </SoftBox>

              <SoftBox textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ color: "white" }}
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>
              </SoftBox>
            </form>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default HistorialEvolucion;
