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

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

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
    medicalHistory: {
      // Sección de antecedentes médicos
      AHF: "", // Historial familiar
      PA: "", // Condiciones médicas
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
    console.log("Datos a enviar:", formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateJSON();
    // Aquí puedes enviar los datos generados a tu API si es necesario
  };

  const steps = ['Ficha de identificación', 'Antecedentes médicos', 'Toxicomanías', 'Estilo de vida', 'Evaluación psicológica integral'];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* Informacion estandar */}
        <SoftBox mb={3}>
          <Card sx={{ p: 3, mb: 2 }}>
            <SoftTypography variant="h5" mb={2}>
              Historia Clínica de Psicología -
            </SoftTypography>
            <SoftTypography variant="h5" mb={2}>
              Endocrinea Care
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              Estimado paciente los siguientes datos de contacto y antecedentes médicos recabados en
              el presente documento serán utilizados para llenar su historial médico.
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              Todos sus datos serán tratados con total confidencialidad, la información sera
              utilizada única y exclusivamente para mejorar la calidad de la atención durante su
              consulta y brindarle un mejor servicio.
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
              Lic. Fernando Trejo Martínez
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mt={4}>
              Circuito Juan Pablo II. PB No. 3113. Colonia Fraccionamiento Las Ánimas, Puebla.
            </SoftTypography>
          </Card>
        </SoftBox>

        {activeStep === 0 && (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
              <SoftTypography variant="h6" color="secondary" mb={2}>
                1. Ficha de identificación
              </SoftTypography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <label htmlFor="name">
                    <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                      Nombre
                    </SoftTypography>
                  </label>
                  <textarea
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <SoftBox mb={2}>
                    <label htmlFor="birthDate">
                      <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                        Fecha de nacimiento
                      </SoftTypography>
                    </label>
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

                <Grid item xs={12} sm={3}>
                  <SoftBox mb={2}>
                    <label
                      htmlFor="gender"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      Género
                    </label>
                    <FormControl variant="standard" fullWidth>
                      <Select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Hombre">Hombre</MenuItem>
                        <MenuItem value="Mujer">Mujer</MenuItem>
                      </Select>
                    </FormControl>
                  </SoftBox>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <SoftBox mb={2}>
                    <label
                      htmlFor="gender"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      Estado Civil
                    </label>
                    <FormControl fullWidth variant="outlined">
                      <Select
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
                        <MenuItem value="Single">Soltero/a</MenuItem>
                        <MenuItem value="Married">Casado/a</MenuItem>
                        <MenuItem value="Divorced">Divorciado/a</MenuItem>
                        <MenuItem value="Widowed">Viudo/a</MenuItem>
                      </Select>
                    </FormControl>
                  </SoftBox>
                </Grid>

                {[
                  { id: "highestEducation", label: "Máximo grado de estudios" },
                  { id: "occupation", label: "Ocupación actual" },
                  { id: "religiousBeliefs", label: "Creencias religiosas" },
                ].map((field) => (
                  <Grid item xs={12} sm={4} key={field.id}>
                    <SoftBox mb={2}>
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
                        rows="3"
                        className="global-textarea"
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </SoftBox>
                  </Grid>
                ))}
              </Grid>
            </SoftBox>
          </form>
        )}
        {activeStep === 1 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h6" color="secondary" mb={2}>
              2. Antecedentes médicos
            </SoftTypography>
            <Grid container spacing={2}>
              {/* Campo AHF */}
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label htmlFor="AHF">
                    <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                      Antecedentes Heredofamiliares (AHF)
                    </SoftTypography>
                  </label>
                  <textarea
                    id="AHF"
                    name="medicalHistory.AHF"
                    value={formData.medicalHistory.AHF}
                    onChange={handleChange}
                    rows="3"
                    className="global-textarea"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </SoftBox>
              </Grid>

              {/* Campo P.A */}
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label htmlFor="PA">
                    <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                      Antecedentes Personales Patológicos (P.A)
                    </SoftTypography>
                  </label>
                  <textarea
                    id="PA"
                    name="medicalHistory.PA"
                    value={formData.medicalHistory.PA}
                    onChange={handleChange}
                    rows="3"
                    className="global-textarea"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
        )}
        {activeStep === 2 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h6" color="secondary" mb={2}>
              3. Toxicomanías
            </SoftTypography>
            <SoftBox mb={2}>
              <label htmlFor="substanceAbuse">
                <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                  ¿Consume alguna sustancia tóxica o adictiva?
                </SoftTypography>
              </label>
              <textarea
                id="substanceAbuse"
                name="substanceAbuse"
                value={formData.substanceAbuse}
                onChange={handleChange}
                rows="2"
                className="global-textarea"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </SoftBox>
          </SoftBox>
        )}
        {activeStep === 3 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h6" color="secondary" mb={2}>
              4. Estilo de vida
            </SoftTypography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <SoftBox mb={2}>
                  <label htmlFor="diet">
                    <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                      Alimentación
                    </SoftTypography>
                  </label>
                  <textarea
                    id="diet"
                    name="lifestyle.diet"
                    value={formData.lifestyle.diet}
                    onChange={handleChange}
                    rows="3"
                    className="global-textarea"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <SoftBox mb={2}>
                  <label htmlFor="sleep">
                    <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                      Sueño
                    </SoftTypography>
                  </label>
                  <textarea
                    id="sleep"
                    name="lifestyle.sleep"
                    value={formData.lifestyle.sleep}
                    onChange={handleChange}
                    rows="3"
                    className="global-textarea"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <SoftBox mb={2}>
                  <label htmlFor="physicalActivity">
                    <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                      Actividad física
                    </SoftTypography>
                  </label>
                  <textarea
                    id="physicalActivity"
                    name="lifestyle.physicalActivity"
                    value={formData.lifestyle.physicalActivity}
                    onChange={handleChange}
                    rows="3"
                    className="global-textarea"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label htmlFor="leisure">
                    <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                      Ocio y recreación
                    </SoftTypography>
                  </label>
                  <textarea
                    id="leisure"
                    name="lifestyle.leisure"
                    value={formData.lifestyle.leisure}
                    onChange={handleChange}
                    rows="3"
                    className="global-textarea"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label htmlFor="hygiene">
                    <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                      Higiene
                    </SoftTypography>
                  </label>
                  <textarea
                    id="hygiene"
                    name="lifestyle.hygiene"
                    value={formData.lifestyle.hygiene}
                    onChange={handleChange}
                    rows="3"
                    className="global-textarea"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
        )}
        {activeStep === 4 && (
          <form noValidate autoComplete="off" onSubmit={handleChange}>
            <SoftBox component={Card} sx={{ p: 3, boxShadow: 3, mb: 3 }}>
              <SoftTypography variant="h6" color="secondary" mb={2}>
                5. Evaluación psicológica integral
              </SoftTypography>
              <Grid container spacing={2}>
                {[
                  { name: "familyDynamics", label: "Dinámica y relaciones familiares" },
                  { name: "affectiveRelationships", label: "Relaciones afectivas y de pareja" },
                  { name: "workDynamics", label: "Dinámica laboral o académica" },
                  { name: "psychologicalHistory", label: "Antecedentes psicológicos" },
                  { name: "consultationReason", label: "Motivo de consulta" },
                  { name: "solutionAttempts", label: "Intentos previos de solución" },
                  {
                    name: "signsSymptoms",
                    label: "Signos, síntomas, reacciones fisiológicas, pensamientos y emociones",
                  },
                  {
                    name: "selfHarmingBehaviors",
                    label: "Conductas autolesivas, ideación y comportamiento suicida",
                  },
                  { name: "clinicalAssessment", label: "Valoración clínica" },
                  { name: "diagnosticImpression", label: "Impresión diagnóstica" },
                ].map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <SoftBox mb={2}>
                      <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                        {field.label}
                      </SoftTypography>
                      <textarea
                        id={field.name}
                        name={`otherSections.${field.name}`}
                        value={formData.otherSections[field.name]}
                        onChange={handleChange}
                        rows={3}
                        className="global-textarea"
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          fontSize: "14px",
                          fontFamily: "Arial, sans-serif",
                        }}
                      />
                    </SoftBox>
                  </Grid>
                ))}
              </Grid>
            </SoftBox>
          </form>
        )}
        {/** 
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
        </Grid>*/}

        {/* Stepper */}
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Botones de navegación */}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Atrás
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Siguiente</Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar
            </Button>
          )}
        </Box>
        {/* Botón de reinicio */}
        {activeStep === steps.length && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="outlined" onClick={handleReset}>
              Reiniciar
            </Button>
          </Box>
        )}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ClinicalForm;
