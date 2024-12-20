import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card"; // Importación de Card

// Soft UI Dashboard React examples
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Función para enviar los datos del formulario
import { sendFormData } from "./sendFormData";
// Global style textarea
import "layouts/TextareaStyles.css";

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
        {/* Card envuelve el formulario */}
        <Card>
          <SoftBox component="form" onSubmit={handleSubmit} p={3}>
            <Grid container spacing={3}>
              {/* Sección 1: Ficha de Identificación */}
              <Grid item xs={12}>
                <SoftTypography variant="h6" fontWeight="regular">
                  1. Ficha de Identificación
                </SoftTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <label htmlFor="email">Nombre </label>
                  <textarea
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <SoftBox mb={2}>
                      <label htmlFor="birthDate">Fecha de nacimiento </label>
                      <TextField
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    </SoftBox>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel
                          sx={{
                            color: "#054eeb",
                            fontSize: "15px",  // Cambiar el tamaño de la fuente de la etiqueta
                          }}
                        >
                          Sexo
                        </InputLabel>
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



                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel
                          sx={{
                            color: "#054eeb",
                            fontSize: "15px",  // Cambiar el tamaño de la fuente de la etiqueta
                          }}
                        >
                          Estado Civil
                        </InputLabel>
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


                      <Grid item xs={12} sm={6}>
                        <SoftBox mb={2}>
                          <label htmlFor="fullName">Máximo grado de estudios </label>
                          <textarea
                            id="maxiestudios"
                            name="maxiestudios"
                            value={formData.maxiestudios}
                            onChange={handleChange}
                            required
                            rows="1"
                            className="global-textarea"
                          />
                        </SoftBox>
                      </Grid>

                  <Grid item xs={12} sm={6}>
                      <SoftBox mb={2}>
                      <label htmlFor="fullName"> Ocupación actual </label>
                      <textarea
                        id="ocupacion"
                        name="ocupacion"
                        value={formData.ocupacion}
                        onChange={handleChange}
                        required
                        rows="1"
                        className="global-textarea"
                      />
                    </SoftBox>
                </Grid>

                <Grid item xs={12} sm={6}>
                      <SoftBox mb={2}>
                      <label htmlFor="fullName"> Creencias religiosas </label>
                      <textarea
                        id="creencias"
                        name="creencias"
                        value={formData.creencias}
                        onChange={handleChange}
                        required
                        rows="1"
                        className="global-textarea"
                      />
                    </SoftBox>
                </Grid>
                </Grid>
              </Grid>

            {/* Sección 2: Antecedentes Médicos */}
            <Grid item xs={12}>
              <SoftTypography variant="h6" fontWeight="regular">
                2. Antecedentes Médicos
              </SoftTypography>             
              <SoftBox mb={2}>
                  <label htmlFor="fullName"> AHF </label>
                  <textarea
                    id="AHF"
                    name="AHF"
                    value={formData.AHF}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <label htmlFor="fullName"> P.A </label>
                  <textarea
                    id="PA"
                    name="PA"
                    value={formData.PA}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
            
            </Grid>

            {/* Sección 3: Toxicomanías */}
            <Grid item xs={12}>
              <SoftTypography variant="h6" fontWeight="regular">
                3. Toxicomanías
              </SoftTypography>
                <textarea
                  id="toxicomanias"
                  name="toxicomanias"
                  value={formData.toxicomanias}
                  onChange={handleChange}
                  required
                  rows="1"
                  className="global-textarea"
                />
                    
            </Grid>

            {/* Estilo de vida */}
            <Grid item xs={12}>
              <SoftTypography variant="h6" fontWeight="regular">
                4. Estilo de vida
              </SoftTypography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <SoftBox mb={2}>
                    <label htmlFor="fullName">  Alimentación </label>
                    <textarea
                      id="alimentacion"
                      name="alimentacion"
                      value={formData.alimentacion}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <SoftBox mb={2}>
                    <label htmlFor="fullName">  Sueño </label>
                    <textarea
                      id="sueno"
                      name="sueno"
                      value={formData.sueno}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <SoftBox mb={2}>
                    <label htmlFor="fullName">  Actividad física </label>
                    <textarea
                      id="actividadFisica"
                      name="actividadFisica"
                      value={formData.actividadFisica}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SoftBox mb={2}>
                    <label htmlFor="fullName">  Ocio y recreación </label>
                    <textarea
                      id="ocio"
                      name="ocio"
                      value={formData.ocio}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12}>
                  <SoftBox mb={2}>
                    <label htmlFor="fullName">  Higiene </label>
                    <textarea
                      id="higiene"
                      name="higiene"
                      value={formData.higiene}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>
                </Grid>
              </Grid>
            </Grid>

            <SoftBox component="form" onSubmit={handleSubmit} noValidate sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {[
          { name: "dinamicaFamilia", label: "5. Dinámica y relaciones familiares" },
          { name: "relacionesAfectivas", label: "6. Relaciones afectivas y de pareja" },
          { name: "dinamicaLaboral", label: "7. Dinámica laboral o académica" },
          { name: "antecedentesPsicologicos", label: "8. Antecedentes psicológicos" },
          { name: "motivoConsulta", label: "9. Motivo de consulta" },
          { name: "intentosSolucion", label: "10. Intentos previos de solución" },
          {
            name: "signosSintomas",
            label:
              "11. Signos, síntomas, reacciones fisiológicas, pensamientos y emociones",
          },
          {
            name: "conductasAutolesivas",
            label: "12. Conductas autolesivas, ideación y comportamiento suicida",
          },
          { name: "valoracionClinica", label: "13. Valoración clínica" },
          { name: "impresionDiagnostica", label: "14. Impresión diagnóstica" },
        ].map((field) => (
          <Grid item xs={12} key={field.name}>
            <SoftTypography variant="h6" fontWeight="regular">
              {field.label}
            </SoftTypography>
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              rows={3}
              className="global-textarea"
            />
          </Grid>
        ))}
      </Grid>
    </SoftBox>   

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  sx={{
                    
                    mt: 3,
                    backgroundColor: "#054eeb",
                    "&:hover": { backgroundColor: "#054eeb" },
                      color: "white !important",
                    
                  }}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ClinicalForm;
