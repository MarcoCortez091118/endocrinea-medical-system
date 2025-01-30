// Importaciones necesarias
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Notas from "./Notas";
import Card from "@mui/material/Card";
import {
  TextField,
  MenuItem,
  Select,
  Input,
  Grid,
  Button,
  FormControl,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  DatePicker,
  Checkbox,
  Box,
  NativeSelect,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
} from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Global style textarea
import "layouts/TextareaStyles.css";
import button from "assets/theme/components/button";
import { Code, Margin, WidthFull } from "@mui/icons-material";

// Libreria gluestacks

function NotaNutricional({ patientId }) {
  {
    /* Variables */
  }
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

    measurementDates: "",
    waist: "",
    abdomen: "",
    hips: "",
    leftArm: "",
    rightArm: "",
    rightCalf: "",
    leftCalf: "",
    newMeasurements: [],

    diagnosis: "",
  });

  const [notas, setNotas] = useState([]); // Almacena las notas enviadas
  const [mostrarNotas, setMostrarNotas] = useState(false); // Controla la visualización de la sección de notas

  const handleChange = (e) => {
    const { name, value } = e.target;

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

  // Reemplázalo con el ID real del paciente
  //const patientId = "12345"; // Reemplázalo con el ID del paciente
  const apiUrl = `https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/${patientId}/nutrition_notes`;

  // ✅ Obtener notas al cargar la página
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.statusText}`);
        }
        const data = await response.json();
        setNotas(data); // Guardar notas en el estado
        setMostrarNotas(true);
      } catch (error) {
        console.error("Error al obtener notas:", error);
      }
    };

    fetchNotas();
  }, [apiUrl]); // Se ejecuta cuando cambia el `apiUrl`

  // ✅ Enviar notas con POST
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

      const newNote = {
        id: result.id, // Usar el ID de la API
        created_at: new Date().toISOString(), // Fecha actual
        ...formData,
      };

      setNotas((prevNotas) => [newNote, ...prevNotas]); // Agregar nueva nota al estado
      setMostrarNotas(true);

      // Limpiar el formulario
      setFormData({
        symptoms: "",
        symptomsGastrointestinal: "",
        abdomen: "",
        TypesExercise: "",
        leftArm: "",
        waist: "",
        diagnosis: "",
        breakfast: "",
        meal: "",
        rightArm: "",
        rightCalf: "",
        exerciseIntensity: "",
        measurementDates: "",
        complications: "",
        leftCalf: "",
        detailSymptoms: [],
        frequencyDiarrhea: "",
        extras: "",
        liquids: "",
        energy: "",
        collation1: "",
        hips: "",
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

  

  const [columnsMediciones, setColumnsMediciones] = useState([]);
  const [datesMediciones, setDatesMediciones] = useState([]);
  const [lastMeasurements, setLastMeasurements] = useState(null);

  // Mapeo de nombres legibles para las claves
  const visibleFieldsMediciones = {
    waist: "Cintura",
    abdomen: "Abdomen",
    hips: "Cadera",
    leftArm: "Brazo Izquierdo",
    rightArm: "Brazo Derecho",
    rightCalf: "Pantorrilla Derecha",
    leftCalf: "Pantorrilla Izquierda",
  };

  const handleInputChange = (event, measurement) => {
    setFormData({
      ...formData,
      [measurement]: event.target.value,
    });
  };

  const showPreviousMeasurements = () => {
    if (columnsMediciones.length > 0) {
      // Si hay registros, mostramos la última columna en la tabla
      const lastColumn = columnsMediciones[columnsMediciones.length - 1];
      const lastDate = datesMediciones[columnsMediciones.length - 1];
      setLastMeasurements({ data: lastColumn, date: lastDate });
    } else {
      // Si no hay registros, mostramos una alerta
      alert("No hay registros previos para comparar.");
    }
  };

  const handleNewMeasurementChange = (event, rowIndex, colIndex, tableType) => {
    const { value } = event.target;
    if (tableType === "pesos") {
      setColumnsPesos((prevColumns) => {
        const updatedColumns = [...prevColumns];
        // Asegúrate de que la columna y la fila existan antes de asignar valores
        if (!updatedColumns[colIndex]) updatedColumns[colIndex] = [];
        updatedColumns[colIndex][rowIndex] = value;
        return updatedColumns;
      });
    } else if (tableType === "mediciones") {
      setColumnsMediciones((prevColumns) => {
        const updatedColumns = [...prevColumns];
        if (!updatedColumns[colIndex]) updatedColumns[colIndex] = [];
        updatedColumns[colIndex][rowIndex] = value;
        return updatedColumns;
      });
    }
  };

  const addColumn = (tableType) => {
    if (tableType === "mediciones") {
      const newColumn = Object.keys(visibleFieldsMediciones).map(() => ""); // Nueva columna vacía
      setColumnsMediciones([...columnsMediciones, newColumn]);
      setDatesMediciones([...datesMediciones, ""]); // Agregar un campo vacío para la fecha
    } else if (tableType === "pesos") {
      const newColumn = Object.keys(visibleFieldsPesos).map(() => ""); // Nueva columna vacía
      setColumnsPesos((prevColumns) => [...prevColumns, newColumn]);
      setDatesPesos((prevDates) => [...prevDates, ""]); // Agregar un campo vacío para la fecha
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleCheckboxChange1 = (e, detalle) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      detailSymptoms: checked
        ? [...prev.detailSymptoms, detalle]
        : prev.detailSymptoms.filter((item) => item !== detalle),
    }));
  };

  const steps = ["Subjetivo", "Objetivo", "Evaluación dietética", "Exploración Física ", "Plan"];

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
        {/* mediciones */}
        {activeStep === 3 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            {/* Título de la tabla */}
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Exploración Física (antropometría)
            </SoftTypography>

            {/* Contenedor de la tabla */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableBody>
                  {/* Fila de Fechas */}
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Fecha
                    </StyledTableCell>
                    {/* Campo de fecha actual */}
                    <StyledTableCell align="center">
                      <input
                        type="date"
                        value={formData.measurementDates}
                        onChange={(e) =>
                          setFormData({ ...formData, measurementDates: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </StyledTableCell>
                    {/* Campos de fecha para las columnas existentes */}
                    {datesMediciones.map((date, colIndex) => (
                      <StyledTableCell key={`date-col-${colIndex}`} align="center">
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => {
                            const updatedDates = [...datesMediciones];
                            updatedDates[colIndex] = e.target.value;
                            setDatesMediciones(updatedDates); // Actualiza la fecha en el estado
                          }}
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>

                  {/* Mostrar registro anterior si existe */}
                  {lastMeasurements && (
                    <>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          Registro Anterior
                        </StyledTableCell>
                        <StyledTableCell align="center" colSpan={columnsMediciones.length + 1}>
                          {lastMeasurements.date || "Fecha no disponible"}
                        </StyledTableCell>
                      </StyledTableRow>
                      {Object.keys(visibleFieldsMediciones).map((measurement, rowIndex) => (
                        <StyledTableRow key={`prev-${measurement}`}>
                          <StyledTableCell component="th" scope="row">
                            {visibleFieldsMediciones[measurement]}
                          </StyledTableCell>
                          <StyledTableCell>
                            {lastMeasurements.data[rowIndex] || "Sin datos"}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </>
                  )}

                  {/* Fila de Mediciones */}
                  {Object.keys(visibleFieldsMediciones).map((measurement, rowIndex) => (
                    <StyledTableRow key={measurement}>
                      <StyledTableCell component="th" scope="row">
                        {visibleFieldsMediciones[measurement]}
                      </StyledTableCell>
                      {/* Input para cada medición en la fila */}
                      <StyledTableCell>
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          value={formData[measurement]}
                          onChange={(e) => handleInputChange(e, measurement)}
                        />
                      </StyledTableCell>

                      {/* Celdas para las columnas de mediciones */}
                      {columnsMediciones.map((col, colIndex) => (
                        <StyledTableCell key={`cell-${colIndex}-${rowIndex}`}>
                          <input
                            type="text"
                            style={{
                              width: "100%",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            }}
                            value={col[rowIndex] || ""}
                            onChange={(e) =>
                              handleNewMeasurementChange(e, rowIndex, colIndex, "mediciones")
                            }
                          />
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Botón para agregar columna */}
            <SoftBox mt={2}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                style={{ color: "white" }}
                onClick={showPreviousMeasurements} // Cambiar de addColumn a showPreviousMeasurements
              >
                Mostrar registro anterior
              </Button>
            </SoftBox>
          </SoftBox>
        )}
        {/* Diagnostico */}
        {activeStep === 4 && (
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
      {/* Sección de notas */}
      <Card sx={{ p: 3, mb: 3, boxShadow: 3 }}>{mostrarNotas && <Notas notas={notas} />}</Card>
        
        
      </SoftBox>
  );
}
NotaNutricional.propTypes = {
  patientId: PropTypes.string.isRequired,
};
export default NotaNutricional;
