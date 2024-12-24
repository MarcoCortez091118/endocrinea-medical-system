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

function HistorialEvolucion() {
  const [formData, setFormData] = useState({
    presentation: "",
    evolution: "",
    notes: "",
    tasks: "",
    comments: "",
    prognostic: "",
  });

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

    const blob = new Blob([JSON.stringify(dataToSend, null, 2)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = "historial-evolucion.txt";
    link.click();
    // Liberar memoria del objeto URL
    URL.revokeObjectURL(url);

    console.log("Datos a enviar:", formData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" flexDirection="column" alignItems="flex-start" p={3}>
                <SoftTypography variant="h4">Historial de evolución -</SoftTypography>
                <SoftTypography variant="h4">Endocrinea Care</SoftTypography>
                <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                  Estimado paciente los siguientes datos de contacto y antecedentes médicos recabados
                  en el presente documento serán utilizados para llenar su historial médico.
                </SoftTypography>
                <SoftTypography variant="subtitle2" fontWeight="medium" mt={2}>
                  Todos sus datos serán tratados con total confidencialidad, la información sera
                  utilizada única y exclusivamente para mejorar la calidad de la atención durante su
                  consulta y brindarle un mejor servicio.
                </SoftTypography>
                <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                  Dr. Francisco Javier Porquillo. C.P. 10550033 / 12467290 <br />
                  Dra. Carolain Ulrrich García. C.P. 13035875 <br />
                  Dra. Elizabeth Raquel Juárez Juárez. C.P. 1075112 / 12550599 <br />
                  Dra. Isbeth Gómez Díaz. C.P. 12611063 <br />
                  Dra. Victoria Sandoval Nava. C.P. 10101155 / 12655823
                </SoftTypography>
                <SoftTypography variant="subtitle2" fontWeight="medium" mt={4}>
                  Circuito Juan Pablo II. PB No. 3113. Colonia Fraccionamiento Las Ánimas, Puebla.
                </SoftTypography>
              </SoftBox>
            </Card>
          </SoftBox>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <SoftBox mt={4}>
              <Card>
                <SoftBox p={3}>
                  <SoftBox mb={2}>
                    <label htmlFor="presentation">1. Presentación *</label>
                    <textarea
                      id="presentation"
                      name="presentation"
                      value={formData.presentation}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>

                  <SoftBox mb={2}>
                    <label htmlFor="evolution">2. Evolución  *</label>
                    <textarea
                      id="evolution"
                      name="evolution"
                      value={formData.evolution}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>

                  <SoftBox mb={2}>
                    <label htmlFor="notes">3. Notas de la sesión *</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>

                  <SoftBox mb={2}>
                    <label htmlFor="tasks">4. Tareas de seguimiento *</label>
                    <textarea
                      id="tasks"
                      name="tasks"
                      value={formData.tasks}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>

                  <SoftBox mb={2}>
                    <label htmlFor="comments">5. Comentarios / Observaciones *</label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>

                  <SoftBox mb={2}>
                    <label htmlFor="prognostic">6. Pronostico *</label>
                    <textarea
                      id="prognostic"
                      name="prognostic"
                      value={formData.prognostic}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>

                </SoftBox>
              </Card>

              <SoftBox mt={2}>
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

            </SoftBox>
          </form>

        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default HistorialEvolucion;
