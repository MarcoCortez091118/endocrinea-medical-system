import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
// Soft UI Dashboard React examples
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Función para enviar los datos del formulario

import { sendFormData } from "./sendFormData";
function ClinicalForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    fechaNacimiento: "",
    sexo: "",
    estadoCivil: "",
    maxEstudios: "",
    ocupacion: "",
    creencias: "",
    antecedentesMedicos: "",
    toxicomanias: "",
    estiloVida: {
      alimentacion: "",
      sueno: "",
      actividadFisica: "",
      ocio: "",
      higiene: "",
    },
    otrasSecciones: {
      dinamicaFamilia: "",
      relacionesAfectivas: "",
      dinamicaLaboral: "",
      antecedentesPsicologicos: "",
      motivoConsulta: "",
      intentosSolucion: "",
      signosSintomas: "",
      conductasAutolesivas: "",
      valoracionClinica: "",
      impresionDiagnostica: "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendFormData(formData); // Enviar los datos del formulario
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftTypography variant="h4" fontWeight="medium" mb={2}>
          Historia Clínica de Psicología
        </SoftTypography>
        <SoftBox component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Sección 1: Ficha de Identificación */}
            <Grid item xs={12}>
              <SoftTypography variant="h6" fontWeight="regular">
                1. Ficha de Identificación
              </SoftTypography>
              <Grid container spacing={2}>
                {/* Nombre */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre completo"
                    variant="outlined"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>

                {/* Fecha de Nacimiento */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fecha de nacimiento"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>

                {/* Sexo */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel sx={{ color: "#000" }}>Sexo</InputLabel>
                    <Select
                      label="Sexo"
                      name="sexo"
                      value={formData.sexo}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#054eeb",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Seleccionar</em>
                      </MenuItem>
                      <MenuItem value="Masculino">Masculino</MenuItem>
                      <MenuItem value="Femenino">Femenino</MenuItem>
                      <MenuItem value="Otro">Otro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Estado Civil */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel sx={{ color: "#000" }}>Estado Civil</InputLabel>
                    <Select
                      label="Estado Civil"
                      name="estadoCivil"
                      value={formData.estadoCivil}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#054eeb",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Seleccionar</em>
                      </MenuItem>
                      <MenuItem value="Soltero/a">Soltero/a</MenuItem>
                      <MenuItem value="Casado/a">Casado/a</MenuItem>
                      <MenuItem value="Divorciado/a">Divorciado/a</MenuItem>
                      <MenuItem value="Viudo/a">Viudo/a</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Otros campos */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Máximo grado de estudios"
                    variant="outlined"
                    name="maxEstudios"
                    value={formData.maxEstudios}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ocupación actual"
                    variant="outlined"
                    name="ocupacion"
                    value={formData.ocupacion}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Creencias religiosas"
                    variant="outlined"
                    name="creencias"
                    value={formData.creencias}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Sección 2: Antecedentes Médicos */}
            <Grid item xs={12}>
              <SoftTypography variant="h6" fontWeight="regular">
                2. Antecedentes Médicos
              </SoftTypography>
              <TextField
                fullWidth
                label="AHF"
                variant="outlined"
                multiline
                rows={2}
                name="antecedentesMedicos"
                value={formData.antecedentesMedicos}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#054eeb",
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                }}
              />
              <TextField
                fullWidth
                label="P.A"
                variant="outlined"
                multiline
                rows={2}
                name="toxicomanias"
                value={formData.toxicomanias}
                onChange={handleChange}
                required
                sx={{
                  mt: 2,
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#054eeb",
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                }}
              />
            </Grid>

            {/* Sección 3: Toxicomanías */}
            <Grid item xs={12}>
              <SoftTypography variant="h6" fontWeight="regular">
                3. Toxicomanías
              </SoftTypography>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                name="toxicomanias"
                value={formData.toxicomanias}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#054eeb",
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                }}
              />
            </Grid>

            {/* Estilo de vida */}
            <Grid item xs={12}>
              <SoftTypography variant="h6" fontWeight="regular">
                4. Estilo de vida
              </SoftTypography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Alimentación"
                    variant="outlined"
                    name="estiloVida.alimentacion"
                    value={formData.estiloVida.alimentacion}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Sueño"
                    variant="outlined"
                    name="estiloVida.sueno"
                    value={formData.estiloVida.sueno}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Actividad física"
                    variant="outlined"
                    name="estiloVida.actividadFisica"
                    value={formData.estiloVida.actividadFisica}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ocio y recreación"
                    variant="outlined"
                    name="estiloVida.ocio"
                    value={formData.estiloVida.ocio}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Higiene"
                    variant="outlined"
                    name="estiloVida.higiene"
                    value={formData.estiloVida.higiene}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#054eeb",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Otras Secciones */}
            {[
              "5. Dinámica y relaciones familiares",
              "6. Relaciones afectivas y de pareja",
              "7. Dinámica laboral o académica",
              "8. Antecedentes psicológicos",
              "9. Motivo de consulta",
              "10. Intentos previos de solución",
              "11. Signos, síntomas, reacciones fisiológicas, pensamientos y emociones",
              "12. Conductas autolesivas, ideación y comportamiento suicida",
              "13. Valoración clínica",
              "14. Impresión diagnóstica",
            ].map((section, index) => (
              <Grid item xs={12} key={index}>
                <SoftTypography variant="h6" fontWeight="regular">
                  {section}
                </SoftTypography>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={2}
                  name={`otrasSecciones.${section.replace(/[^a-zA-Z0-9]/g, "")}`}
                  value={formData.otrasSecciones[section.replace(/[^a-zA-Z0-9]/g, "")]}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#054eeb",
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#054eeb" },
                  }}
                />
              </Grid>
            ))}

            {/* Botón de envío */}
             {/* Botón de Enviar */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{
                  mt: 3,
                  backgroundColor: "#054eeb",
                  "&:hover": { backgroundColor: "#054eeb" },
                }}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ClinicalForm;
