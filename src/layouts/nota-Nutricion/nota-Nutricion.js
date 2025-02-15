// Importaciones necesarias
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import {
  Grid,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Box,
  TableCell,
  TableRow,
  tableCellClasses,
  Collapse,
} from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Global style textarea
import "layouts/TextareaStyles.css";
import { useLocation } from "react-router-dom";
// Libreria gluestacks

function NotaNutricional(patientId) {

  const [loading, setLoading] = useState(false);
  const [visibleNotes, setVisibleNotes] = useState(10);
  const [formData, setFormData] = useState({
    symptoms: "",
    energy: "",
    liquids: "",
    TypesExercise: "",
    exerciseDaysWeek: "",
    exerciseIntensity: "",
    currentConditions: "",
    complications: "",
    symptomsGastrointestinal: "",
    detailSymptoms: [],
    frequencyStraining: "",
    frequencyDiarrhea: "",
    breakfast: "",
    collation1: "",
    meal: "",
    collation2: "",
    extras: "",
    diagnosis: "",
  });
  const [error, setError] = useState(null);
  const [notas, setNotas] = useState([]);
  const [expandedNotes, setExpandedNotes] = useState({});
  const apiUrl = `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patientId}/nutritional_notes/`;
  const fetchNotas = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error al obtener las notas");
      }
      const data = await response.json();
      setNotas(data);
    } catch (error) {
      console.error("Error al obtener los registros: ", error);
    }
  };

  // 🚀 Llamar la función en `useEffect`
  useEffect(() => {
    fetchNotas();
  }, []);


  const toggleExpand = (index) => {
    setExpandedNotes(expandedNotes === index ? null : index);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Manejamos el cambio de estado civil y limpiamos "otherStatus" si no es "otros"
    if (name === "maritalStatus" && value !== "otros") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        otherStatus: "", // Limpiamos el campo "otherStatus"
      }));
    }
    // Manejamos el cambio de cirugía y limpiamos los campos relacionados
    else if (name === "surgery") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        surgeryHistory: [], // Limpiamos el historial de cirugías
        surgeryOther: "", // Limpiamos el campo de especificaciones
      }));
    }
    // Manejamos casos relacionados con síntomas gastrointestinales
    else if (name === "symptomsGastrointestinal" && value !== "Si") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        detailSymptoms: [], // Limpiamos los detalles si no hay síntomas gastrointestinales
        frequencyStraining: "",
        frequencyDiarrhea: "",
      }));
    }
    // Actualización genérica para los demás campos
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar datos: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Nota enviada con éxito:", result);

      alert("Nota guardada correctamente");

      // 📌 🚀 ACTUALIZAR ESTADO DE NOTAS SIN RECARGAR
      setNotas((prevNotas) => [result, ...prevNotas]);

      // Limpiar el formulario
      setFormData({
        symptoms: "",
        symptomsGastrointestinal: "",
        TypesExercise: "",
        diagnosis: "",
        breakfast: "",
        meal: "",
        exerciseIntensity: "",
        measurementDates: "",
        complications: "",
        detailSymptoms: [],
        frequencyDiarrhea: "",
        extras: "",
        liquids: "",
        energy: "",
        collation1: "",
        currentConditions: "",
        exerciseDaysWeek: "",
        frequencyStraining: "",
        collation2: "",
      });

    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error al guardar la nota. Inténtalo nuevamente.");
    }
  };


  const translations = {
    symptoms: "Síntomas",
    symptomsGastrointestinal: "Síntomas gastrointestinales",
    TypesExercise: "Tipos de ejercicio",
    diagnosis: "Diagnóstico",
    breakfast: "Desayuno",
    meal: "Comida",
    exerciseIntensity: "Intensidad del ejercicio",
    measurementDates: "Fechas de mediciones",
    complications: "Complicaciones",
    leftCalf: "Pantorrilla izquierda",
    detailSymptoms: "Detalle de síntomas",
    frequencyDiarrhea: "Frecuencia de diarrea",
    extras: "Extras",
    liquids: "Líquidos",
    energy: "Energía",
    collation1: "Colación 1",
    currentConditions: "Condiciones actuales",
    exerciseDaysWeek: "Días de ejercicio por semana",
    frequencyStraining: "Frecuencia de esfuerzo",
    collation2: "Colación 2",
  };

  const handleCheckboxChange1 = (e, detalle) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      detailSymptoms: checked
        ? [...prev.detailSymptoms, detalle]
        : prev.detailSymptoms.filter((item) => item !== detalle),
    }));
  };

  const steps = ["Subjetivo", "Objetivo", "Evaluación dietética", "Plan"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <SoftBox py={3}>
      <SoftBox mb={3}>
        <Card sx={{ p: 3, mb: 2 }}>
          <SoftTypography variant="h5" mb={2}>
            Nota Nutricional -
          </SoftTypography>
          <SoftTypography variant="h5" mb={2}>
            Endocrinea Care
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Estimado paciente los siguientes datos de contacto y antecedentes médicos recabados en
            el presente documento serán utilizados para llenar su historial médico.
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Todos sus datos serán tratados con total confidencialidad, la información sera utilizada
            única y exclusivamente para mejorar la calidad de la atención durante su consulta y
            brindarle un mejor servicio.
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Dra. Elizabeth Raquel Juárez <br />
            Mtra. Isbeth Gómez Díaz
            <br />
            LNC Laura Elizabeth Jiménez Criollo (Licenciada en Nutrición Clinica)
            <br />
            Dra. Victoria Sandoval Nava
            <br />
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Circuito Juan Pablo II. PB No. 3113. Colonia Fraccionamiento Las Ánimas, Puebla.
          </SoftTypography>
        </Card>
      </SoftBox>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {/* Generales */}
        {activeStep === 0 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Subjetivo
            </SoftTypography>

            {/* Síntomas */}
            <Grid container spacing={2}>
              {/* Síntomas */}
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="symptoms"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Síntomas:
                  </label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </SoftBox>
              </Grid>

              {/* Energía */}
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="energy"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Energía:
                  </label>
                  <textarea
                    id="energy"
                    name="energy"
                    value={formData.energy}
                    onChange={handleChange}
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </SoftBox>
              </Grid>
            </Grid>

            {/* Síntomas gastrointestinales */}
            <SoftBox mb={2}>
              <label
                htmlFor="symptomsGastrointestinal"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Síntomas gastrointestinales:
              </label>
              <RadioGroup
                id="symptomsGastrointestinal"
                name="symptomsGastrointestinal"
                value={formData.symptomsGastrointestinal}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                {formData.symptomsGastrointestinal === "Si" && (
                  <SoftBox ml={4}>
                    {/* Estreñimiento */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.detailSymptoms?.includes("Estreñimiento")}
                          onChange={(e) => handleCheckboxChange1(e, "Estreñimiento")}
                        />
                      }
                      label="Estreñimiento"
                    />
                    {formData.detailSymptoms?.includes("Estreñimiento") && (
                      <SoftBox ml={4}>
                        <label htmlFor="frequencyStraining">Frecuencia (Estreñimiento):</label>
                        <textarea
                          id="frequencyStraining"
                          name="frequencyStraining"
                          value={formData.frequencyStraining || ""}
                          onChange={handleChange}
                          className="global-textarea"
                          style={{ width: "100%", height: "40px" }}
                        />
                      </SoftBox>
                    )}

                    {/* Diarrea */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.detailSymptoms?.includes("Diarréa")}
                          onChange={(e) => handleCheckboxChange1(e, "Diarréa")}
                        />
                      }
                      label="Diarréa"
                    />
                    {formData.detailSymptoms?.includes("Diarréa") && (
                      <SoftBox ml={4}>
                        <label htmlFor="frequencyDiarrhea">Frecuencia (Diarréa):</label>
                        <textarea
                          id="frequencyDiarrhea"
                          name="frequencyDiarrhea"
                          value={formData.frequencyDiarrhea || ""}
                          onChange={handleChange}
                          className="global-textarea"
                          style={{ width: "100%", height: "40px" }}
                        />
                      </SoftBox>
                    )}
                  </SoftBox>
                )}
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>

            {/* Enfermedades */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="currentConditions"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Enfermedades:
                  </label>
                  <textarea
                    id="currentConditions"
                    name="currentConditions"
                    placeholder="Especifique"
                    value={formData.currentConditions}
                    onChange={handleChange}
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </SoftBox>
              </Grid>

              {/* Complicaciones */}
              <Grid item xs={12} md={4}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="complications"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Complicaciones:
                  </label>
                  <textarea
                    id="complications"
                    name="complications"
                    placeholder="Especifique"
                    value={formData.complications}
                    onChange={handleChange}
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </SoftBox>
              </Grid>

              {/* Líquidos */}
              <Grid item xs={12} md={4}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="liquids"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Líquidos:
                  </label>
                  <textarea
                    id="liquids"
                    name="liquids"
                    placeholder="Especifique"
                    value={formData.liquids}
                    onChange={handleChange}
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
        )}

        {activeStep === 1 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Objetivo
            </SoftTypography>

            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              Ejercicio:
            </SoftTypography>

            <SoftBox mb={2}>
              <Grid container spacing={2} alignItems="center">
                {/* Tipo de ejercicio */}
                <Grid item xs={12} sm={4}>
                  <label
                    htmlFor="TypesExercise"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Tipo de ejercicio:
                  </label>
                  <textarea
                    id="TypesExercise"
                    name="TypesExercise"
                    placeholder="Especifique"
                    value={formData.TypesExercise}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Grid>

                {/* Días a la semana */}
                <Grid item xs={12} sm={4}>
                  <label
                    htmlFor="exerciseDaysWeek"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Días a la semana:
                  </label>
                  <textarea
                    id="exerciseDaysWeek"
                    name="exerciseDaysWeek"
                    placeholder="Especifique"
                    value={formData.exerciseDaysWeek}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Grid>

                {/* Intensidad */}
                <Grid item xs={12} sm={4}>
                  <label
                    htmlFor="exerciseIntensity"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Intensidad:
                  </label>
                  <textarea
                    id="exerciseIntensity"
                    name="exerciseIntensity"
                    placeholder="Especifique"
                    value={formData.exerciseIntensity}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
        )}

        {activeStep === 2 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Evaluación dietética
            </SoftTypography>

            <SoftTypography variant="subtitle2" sx={{ fontWeight: "bold" }} mb={2}>
              RECORDATORIO DE 24 HORAS
            </SoftTypography>

            <Grid container spacing={2}>
              {/* Desayuno */}
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="breakfast"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Desayuno:
                  </label>
                  <textarea
                    id="breakfast"
                    name="breakfast"
                    placeholder="Especifique"
                    value={formData.breakfast}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>

              {/* Colación 1 */}
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="collation1"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Colación:
                  </label>
                  <textarea
                    id="collation1"
                    name="collation1"
                    placeholder="Especifique"
                    value={formData.collation1}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>

              {/* Comida */}
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="meal"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Comida:
                  </label>
                  <textarea
                    id="meal"
                    name="meal"
                    placeholder="Especifique"
                    value={formData.meal}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>

              {/* Colación 2 */}
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="collation2"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Colación 2:
                  </label>
                  <textarea
                    id="collation2"
                    name="collation2"
                    placeholder="Especifique"
                    value={formData.collation2}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>

              {/* Extras */}
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="extras"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Extras:
                  </label>
                  <textarea
                    id="extras"
                    name="extras"
                    placeholder="Especifique"
                    value={formData.extras}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
        )}

        {/* Diagnostico */}
        {activeStep === 3 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            {/* Título del componente */}
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Plan
            </SoftTypography>

            {/* Caja de texto */}
            <SoftBox mb={2}>
              <textarea
                id="diagnosis"
                name="diagnosis"
                value={formData.diagnosis || ""}
                placeholder="Especifique"
                onChange={handleChange}
                required
                rows="4"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  resize: "vertical", // Permite cambiar el tamaño solo en dirección vertical
                  outline: "none",
                }}
              />
            </SoftBox>
          </SoftBox>
        )}

        {/* Boton enviar 
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
          </SoftBox> */}

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
      </form>
      {/* 📌 Sección de notas */}
      <SoftBox mb={3}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <SoftTypography variant="h6" color="secondary" mb={2}>
            Historial de Notas
          </SoftTypography>

          {loading ? (
            <Typography>Cargando...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : notas.length === 0 ? (
            <Typography>No hay notas disponibles.</Typography>
          ) : (
            notas
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, visibleNotes)
              .map((nota, index) => (
                <Card key={index} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
                  <SoftTypography variant="h6" color="primary">
                    Nota {index + 1}
                  </SoftTypography>

                  {/* 📌 Mostrar primeros datos clave */}
                  <SoftTypography variant="body2">
                    <strong>Fecha:</strong> {new Date(nota.created_at).toLocaleDateString()}
                  </SoftTypography>
                  <SoftTypography variant="body2">
                    <strong>Síntomas:</strong> {nota.symptoms || "No especificado"}
                  </SoftTypography>
                  <SoftTypography variant="body2">
                    <strong>Estado de energía:</strong> {nota.energy || "No especificado"}
                  </SoftTypography>
                  <SoftTypography variant="body2">
                    <strong>Consumo de líquidos:</strong> {nota.liquids || "No especificado"}
                  </SoftTypography>
                  <SoftTypography variant="body2">
                    <strong>Tipo de ejercicio:</strong> {nota.TypesExercise || "No especificado"}
                  </SoftTypography>
                  <SoftTypography variant="body2">
                    <strong>Días de ejercicio por semana:</strong>{" "}
                    {nota.exerciseDaysWeek || "No especificado"}
                  </SoftTypography>
                  <SoftTypography variant="body2">
                    <strong>Intensidad del ejercicio:</strong>{" "}
                    {nota.exerciseIntensity || "No especificado"}
                  </SoftTypography>

                  {/* 📌 Información oculta en "Ver más" */}
                  <Collapse in={expandedNotes === index}>
                    <SoftTypography variant="body2">
                      <strong>Condiciones actuales:</strong>{" "}
                      {nota.currentConditions || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Complicaciones:</strong> {nota.complications || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Síntomas gastrointestinales:</strong>{" "}
                      {nota.symptomsGastrointestinal || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Detalles de síntomas:</strong>{" "}
                      {nota.detailSymptoms.length > 0
                        ? nota.detailSymptoms.join(", ")
                        : "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Frecuencia de estreñimiento:</strong>{" "}
                      {nota.frequencyStraining || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Frecuencia de diarrea:</strong>{" "}
                      {nota.frequencyDiarrhea || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Desayuno:</strong> {nota.breakfast || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Colación 1:</strong> {nota.collation1 || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Comida:</strong> {nota.meal || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Colación 2:</strong> {nota.collation2 || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Extras:</strong> {nota.extras || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Diagnóstico:</strong> {nota.diagnosis || "No especificado"}
                    </SoftTypography>
                  </Collapse>

                  {/* 📌 Botón para expandir/cerrar */}
                  <Button
                    variant="contained"
                    color={expandedNotes === index ? "secondary" : "primary"}
                    onClick={() => toggleExpand(index)}
                    sx={{ mt: 2 }}
                  >
                    {expandedNotes === index ? "Ver menos" : "Ver más"}
                  </Button>
                </Card>
              ))
          )}

          {/* 📌 Botón para cargar más notas */}
          {visibleNotes < notas.length && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setVisibleNotes((prev) => prev + 10)}
              >
                Ver más notas
              </Button>
            </Box>
          )}
        </Card>
      </SoftBox>
    </SoftBox>
  );
}

export default NotaNutricional;
