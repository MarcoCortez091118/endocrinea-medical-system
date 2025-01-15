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
    name: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    highestEducation: "",
    occupation: "",
    religiousBeliefs: "",
    medicalHistory: { // Sección de antecedentes médicos
      AHF: "", // Historial familiar
      PA: "",  // Condiciones médicas
    },
    substanceAbuse: "",
    lifestyle: {
      diet: "",
      sleep: "",
      physicalActivity: "",
      leisure: "",
      hygiene: "",
    },
    otherSections: {
      familyDynamics: "",
      affectiveRelationships: "",
      workDynamics: "",
      psychologicalHistory: "",
      consultationReason: "",
      solutionAttempts: "",
      signsSymptoms: "",
      selfHarmingBehaviors: "",
      clinicalAssessment: "",
      diagnosticImpression: "",
    },
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Manejo para campos anidados con "." en el nombre
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const generateJSON = () => {
    const jsonData = {
      identification: {
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        highestEducation: formData.highestEducation,
        occupation: formData.occupation,
        religiousBeliefs: formData.religiousBeliefs,
      },
      medicalHistory: formData.medicalHistory,
      substanceAbuse: formData.substanceAbuse,
      lifestyle: formData.lifestyle,
      otherSections: formData.otherSections,
    };

    console.log("Generated JSON:", JSON.stringify(jsonData, null, 2));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateJSON();
    // Aquí puedes enviar los datos generados a tu API si es necesario
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
      <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" flexDirection="column" alignItems="flex-start" p={3}>
            <SoftTypography variant="h4" fontWeight="medium" mb={2}>
              Historia Clínica de Psicología -</SoftTypography>
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


        {/* Card envuelve el formulario */}
        <Card>
          <SoftBox component="form" onSubmit={handleSubmit} p={3}>
            <Grid container spacing={3}>
              
              <Grid item xs={12}>
                <SoftTypography variant="h6" fontWeight="regular">
                  1. Ficha de Identificación
                </SoftTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <label htmlFor="name">Nombre </label>
                  <textarea
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    </SoftBox>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel
                          sx={{
                            color: "#183A64",
                            fontSize: "15px",  // Cambiar el tamaño de la fuente de la etiqueta
                          }}
                        >
                          Sexo
                        </InputLabel>
                        <Select
                          label="Gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          sx={{
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#183A64",
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>Seleccionar</em>
                          </MenuItem>
                          <MenuItem value="Male">Masculino</MenuItem>
                          <MenuItem value="Female">Femenino</MenuItem>
                          <MenuItem value="Other">Otro</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel
                          sx={{
                            color: "#183A64",
                            fontSize: "15px",  // Cambiar el tamaño de la fuente de la etiqueta
                          }}
                        >
                          Estado Civil
                        </InputLabel>
                        <Select
                          label="Marital Status"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleChange}
                          sx={{
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#183A64",
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>Seleccionar</em>
                          </MenuItem>
                          <MenuItem value="Single">Soltero/a</MenuItem>
                          <MenuItem value="Married">Casado/a</MenuItem>
                          <MenuItem value="Divorced">Divorciado/a</MenuItem>
                          <MenuItem value="Widowed">Viudo/a</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>


                      <Grid item xs={12} sm={6}>
                        <SoftBox mb={2}>
                          <label htmlFor="highestEducation">Máximo grado de estudios </label>
                          <textarea
                            id="highestEducation"
                            name="highestEducation"
                            value={formData.highestEducation}
                            onChange={handleChange}
                            rows="1"
                            className="global-textarea"
                          />
                        </SoftBox>
                      </Grid>

                  <Grid item xs={12} sm={6}>
                      <SoftBox mb={2}>
                      <label htmlFor="occupation"> Ocupación actual </label>
                      <textarea
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        rows="1"
                        className="global-textarea"
                      />
                    </SoftBox>
                </Grid>

                <Grid item xs={12} sm={6}>
                      <SoftBox mb={2}>
                      <label htmlFor="religiousBeliefs"> Creencias religiosas </label>
                      <textarea
                        id="religiousBeliefs"
                        name="religiousBeliefs"
                        value={formData.religiousBeliefs}
                        onChange={handleChange}
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
                  <label htmlFor="AHF"> AHF </label>
                  <textarea
                    id="AHF"
                    name="medicalHistory.AHF"
                    value={formData.medicalHistory.AHF}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <label htmlFor="PA"> P.A </label>
                  <textarea
                    id="PA"
                    name="medicalHistory.PA"
                    value={formData.medicalHistory.PA}
                    onChange={handleChange}
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
                  id="substanceAbuse"
                  name="substanceAbuse"
                  value={formData.substanceAbuse}
                  onChange={handleChange}
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
                    <label htmlFor="diet">  Alimentación </label>
                    <textarea
                      id="diet"
                      name="lifestyle.diet"
                      value={formData.lifestyle.diet}
                      onChange={handleChange}
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <SoftBox mb={2}>
                    <label htmlFor="sleep">  Sueño </label>
                    <textarea
                      id="sleep"
                      name="lifestyle.sleep"
                      value={formData.lifestyle.sleep}
                      onChange={handleChange}
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <SoftBox mb={2}>
                    <label htmlFor="physicalActivity">  Actividad física </label>
                    <textarea
                      id="physicalActivity"
                      name="lifestyle.physicalActivity"
                      value={formData.lifestyle.physicalActivity}
                      onChange={handleChange}
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SoftBox mb={2}>
                    <label htmlFor="leisure">  Ocio y recreación </label>
                    <textarea
                      id="leisure"
                      name="lifestyle.leisure"
                      value={formData.lifestyle.leisure}
                      onChange={handleChange}
                      rows="2"
                      className="global-textarea"
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12}>
                  <SoftBox mb={2}>
                    <label htmlFor="hygiene">  Higiene </label>
                    <textarea
                      id="hygiene"
                      name="lifestyle.hygiene"
                      value={formData.lifestyle.hygiene}
                      onChange={handleChange}
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
                  { name: "familyDynamics", label: "5. Dinámica y relaciones familiares" },
                  { name: "affectiveRelationships", label: "6. Relaciones afectivas y de pareja" },
                  { name: "workDynamics", label: "7. Dinámica laboral o académica" },
                  { name: "psychologicalHistory", label: "8. Antecedentes psicológicos" },
                  { name: "consultationReason", label: "9. Motivo de consulta" },
                  { name: "solutionAttempts", label: "10. Intentos previos de solución" },
                  {
                    name: "signsSymptoms",
                    label:
                      "11. Signos, síntomas, reacciones fisiológicas, pensamientos y emociones",
                  },
                  {
                    name: "selfHarmingBehaviors",
                    label: "12. Conductas autolesivas, ideación y comportamiento suicida",
                  },
                  { name: "clinicalAssessment", label: "13. Valoración clínica" },
                  { name: "diagnosticImpression", label: "14. Impresión diagnóstica" },
                ].map((field) => (
                  <Grid item xs={12} key={field.name}>
                    <SoftTypography variant="h6" fontWeight="regular">
                      {field.label}
                    </SoftTypography>
                    <textarea
                      id={field.name}
                      name={`otherSections.${field.name}`}
                      value={formData.otherSections[field.name]}
                      onChange={handleChange}
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
                    backgroundColor: "#183A64",
                    "&:hover": { backgroundColor: "#183A64" },
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
