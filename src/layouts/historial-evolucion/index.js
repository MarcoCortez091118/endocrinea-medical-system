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
  const [presentacion, setPresentacion] = useState("");
  const [evolucion, setEvolucion] = useState("");
  const [notas, setNotas] = useState("");
  const [tareas, setTareas] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [pronostico, setPronostico] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = (fieldName, value) => {
    const errors = {};
    if (!value || value.trim().length === 0) {
      errors[fieldName] = "Este campo es obligatorio.";
    } else if (value.trim().length < 5) {
      errors[fieldName] = `El campo ${fieldName} debe tener al menos 5 caracteres.`;
    }
    return errors[fieldName] || "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors({ ...errors, [name]: fieldError });

    switch (name) {
      case "presentacion":
        setPresentacion(value);
        break;
      case "evolucion":
        setEvolucion(value);
        break;
      case "notas":
        setNotas(value);
        break;
      case "tareas":
        setTareas(value);
        break;
      case "comentarios":
        setComentarios(value);
        break;
      case "pronostico":
        setPronostico(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const validationErrors = {
      presentacion: validateField("presentacion", presentacion),
      evolucion: validateField("evolucion", evolucion),
      notas: validateField("notas", notas),
      tareas: validateField("tareas", tareas),
      comentarios: validateField("comentarios", comentarios),
      pronostico: validateField("pronostico", pronostico),
    };
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      setMessage("Por favor, corrija los errores antes de enviar.");
      return;
    }

    setLoading(true);
    const payload = {
      presentacion,
      evolucion,
      notas,
      tareas,
      comentarios,
      pronostico,
    };
    try {
      const result = await registerUser(payload); // Llamar a la peticion de la API
      setMessage(`¡Se envio el formulario!`);
    } catch (error) {
      console.error("Error recibido:", error);
      const errorMessage =
        typeof error.message === "string" ? error.message : "Ocurrió un error desconocido.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
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
          <Card style={{ maxWidth: "none" }}>
            <SoftBox display="flex" flexDirection="column" alignItems="flex-start" p={3}>
              <SoftTypography variant="subtitle2" color="secondary" fontWeight="medium" mt={2}>
                Nota de evolución
              </SoftTypography>
            </SoftBox>

            <SoftBox component="form" onSubmit={handleSubmit} noValidate sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    {[ 
                      { name: "presentacion", label: "Presentación", value: presentacion },
                      { name: "evolucion", label: "Evolución", value: evolucion },
                      { name: "notas", label: "Notas de la sesión", value: notas },
                      { name: "tareas", label: "Tareas de seguimiento", value: tareas },
                      { name: "comentarios", label: "Comentarios/Observaciones", value: comentarios },
                      { name: "pronostico", label: "Pronóstico", value: pronostico },
                    ].map((field) => (
                      <Grid item xs={12} key={field.name}>
                                    <SoftTypography variant="h6" fontWeight="regular">
                                      {field.label}
                                    </SoftTypography>
                        <textarea
                          className="global-textarea"
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                          rows="3"
                          placeholder={field.label}
                        ></textarea>
                      </Grid>
                    ))}
                  </Grid>


              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    color: "white !important",
                  }}
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                {message && (
                  <SoftTypography variant="body2" color={errors ? "error" : "success"}>
                    {message}
                  </SoftTypography>
                )}
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default HistorialEvolucion;
