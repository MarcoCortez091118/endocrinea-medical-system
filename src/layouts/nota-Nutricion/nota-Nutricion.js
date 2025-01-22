// Importaciones necesarias
import React, { useState } from "react";
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

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

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

function NotaNutricional() {
  {
    /* Variables */
  }
  const [formData, setFormData] = useState({
    sintomas: "",
    energia: "",
    liquidos: "",
    ejercicio: "",
    TiposEjercicios: "",
    ejercicioDiasSemana: "",
    ejercicioIntensidad: "",

    padecimientosActuales: "",
    complicaciones: "",

    
    sintomasGastrointestinales: "",
    detalleSintomas: [],
    frecuenciaEstrenimiento: "",
    frecuenciaDiarrea: "",

    desayuno: "",
    colacion1: "",
    comina: "",
    colacion2: "",
    extras: "",

    fechaMediciones: "",
    cintura: "",
    abdomen: "",
    cadera: "",
    brazoIzquierdo: "",
    brazoDerecho: "",
    pantorrillaDerecha: "",
    pantorrillaIzquierda: "",
    nuevasMediciones: [],

    diagnostico: "",
  });

  // Maneja el cambio de los checkboxes
  const handleCheckboxChange = (e, disease, familyMember) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      familyHistory: {
        ...prevData.familyHistory,
        [disease]: {
          ...prevData.familyHistory[disease],
          [familyMember]: checked,
        },
      },
    }));
  };

  const handleSurgeryCheckboxChange = (e, surgeryType) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      surgeryHistory: checked
        ? [...prevData.surgeryHistory, surgeryType] // Agregar si está marcado
        : prevData.surgeryHistory.filter((item) => item !== surgeryType), // Quitar si está desmarcado
    }));
  };

  const handleDiagnosedCheckboxChange = (e, disease) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      diagnosedDiseases: checked
        ? [...prevData.diagnosedDiseases, disease] // Agrega la enfermedad si está seleccionada
        : prevData.diagnosedDiseases.filter((item) => item !== disease), // Remueve la enfermedad si se deselecciona
    }));
  };

  const handleComplicationsCheckboxChange = (e, complications) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      pregnanciesComplications: checked
        ? [...prevData.pregnanciesComplications, complications] // Agrega la enfermedad si está seleccionada
        : prevData.pregnanciesComplications.filter((item) => item !== complications), // Remueve la enfermedad si se deselecciona
    }));
  };

  const handleReasonsCheckboxChange = (e, reasons) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      reasonConsultation: checked
        ? [...prevData.reasonConsultation, reasons] // Agrega la enfermedad si está seleccionada
        : prevData.reasonConsultation.filter((item) => item !== reasons), // Remueve la enfermedad si se deselecciona
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si cambia el estado civil y no es "Otros", limpiamos el campo otherStatus
    if (name === "maritalStatus" && value !== "otros") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        otherStatus: "", // Limpiamos el campo "otherStatus"
      }));
    } else if (name === "surgery") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        surgeryHistory: [], // Limpiamos el historial de cirugías si cambia
        surgeryOther: "", // Limpiamos el campo de especificaciones
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData };
    if (dataToSend.maritalStatus !== "Otros") {
      delete dataToSend.otherStatus;
    }

    // Aquí debes enviar formData a la API
    /* 
    try {
      // Aquí iría la lógica para enviar los datos a la API
      const response = await fetch('https://api.example.com/submit-historial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Historial enviado exitosamente');
        // Manejar la respuesta de éxito aquí
      } else {
        console.error('Error al enviar el historial');
        // Manejar errores aquí
      }
    } catch (error) {
      console.error('Error:', error);
    }
    */

    /*
    const blob = new Blob([JSON.stringify(dataToSend, null, 2)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "historial-clinico.txt";
    link.click();
    URL.revokeObjectURL(url);
    */

    console.log("Datos a enviar:", formData);
  };

  const [columnsMediciones, setColumnsMediciones] = useState([]);
  const [datesMediciones, setDatesMediciones] = useState([]);
  const [columnsPesos, setColumnsPesos] = useState([]);
  const [datesPesos, setDatesPesos] = useState([]);
  const [actualDate] = useState(new Date().toISOString().split("T")[0]); // Fecha para "Actual"

  // Mapeo de nombres legibles para las claves
  const visibleFieldsMediciones = {
    cintura: "Cintura",
    abdomen: "Abdomen",
    cadera: "Cadera",
    brazoIzquierdo: "Brazo Izquierdo",
    brazoDerecho: "Brazo Derecho",
    pantorrillaDerecha: "Pantorrilla Derecha",
    pantorrillaIzquierda: "Pantorrilla Izquierda",
  };

  const handleInputChange = (event, measurement) => {
    setFormData({
      ...formData,
      [measurement]: event.target.value,
    });
  };

  const handleNewMeasurementChange = (event, rowIndex, colIndex, tableType) => {
    if (tableType === "mediciones") {
      const updatedColumns = [...columnsMediciones];
      updatedColumns[colIndex][rowIndex] = event.target.value;
      setColumnsMediciones(updatedColumns);
    } else if (tableType === "pesos") {
      const updatedColumns = [...columnsPesos];
      updatedColumns[colIndex][rowIndex] = event.target.value;
      setColumnsPesos(updatedColumns);
    }
  };

  const addColumn = (tableType) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Fecha actual en formato "YYYY-MM-DD"
    if (tableType === "mediciones") {
      const newColumn = Object.keys(visibleFieldsMediciones).map(() => ""); // Nueva columna vacía
      setColumnsMediciones([...columnsMediciones, newColumn]);
      setDatesMediciones([...datesMediciones, currentDate]);
    } else if (tableType === "pesos") {
      const newColumn = Object.keys(visibleFieldsPesos).map(() => ""); // Nueva columna vacía
      setColumnsPesos([...columnsPesos, newColumn]);
      setDatesPesos([...datesPesos, currentDate]);
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

  const [values, setValues] = React.useState({});
  const handleChange1 = (rowIndex, colIndex, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [`${rowIndex}-${colIndex}`]: value,
    }));
  };

  const handleCheckboxChange1 = (e, value) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      detalleSintomas: isChecked
        ? [...(prev.detalleSintomas || []), value]
        : prev.detalleSintomas.filter((item) => item !== value),
    }));
  };
  

   const steps = ['Subjetivo', 'Objetivo', 'Evaluación dietética', 'Exploración Física ', 'Plan'];
  
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
      
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card sx={{p: 3, mb: 2 }}>
            <SoftTypography variant="h5" mb={2}>Nota Nutricional -</SoftTypography>
            <SoftTypography variant="h5" mb={2}>Endocrinea Care</SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              Estimado paciente los siguientes datos de contacto y antecedentes médicos recabados
              en el presente documento serán utilizados para llenar su historial médico.
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              Todos sus datos serán tratados con total confidencialidad, la información sera
              utilizada única y exclusivamente para mejorar la calidad de la atención durante su
              consulta y brindarle un mejor servicio.
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
                    htmlFor="sintomas"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Síntomas:
                  </label>
                  <textarea
                    id="sintomas"
                    name="sintomas"
                    value={formData.sintomas}
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
                    htmlFor="energia"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Energía:
                  </label>
                  <textarea
                    id="energia"
                    name="energia"
                    value={formData.energia}
                    onChange={handleChange}
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </SoftBox>
              </Grid>
            </Grid>


            {/* Síntomas gastrointestinales */}
            <SoftBox mb={2}>
              <label htmlFor="sintomasGastrointestinales" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Síntomas gastrointestinales:
              </label>
              <RadioGroup
                id="sintomasGastrointestinales"
                name="sintomasGastrointestinales"
                value={formData.sintomasGastrointestinales}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                {formData.sintomasGastrointestinales === "Si" && (
                  <SoftBox ml={4}>
                    {/* Estreñimiento */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.detalleSintomas?.includes("Estreñimiento")}
                          onChange={(e) => handleCheckboxChange1(e, "Estreñimiento")}
                        />
                      }
                      label="Estreñimiento"
                    />
                    {formData.detalleSintomas?.includes("Estreñimiento") && (
                      <SoftBox ml={4}>
                        <label htmlFor="frecuenciaEstrenimiento">Frecuencia (Estreñimiento):</label>
                        <textarea
                          id="frecuenciaEstrenimiento"
                          name="frecuenciaEstrenimiento"
                          value={formData.frecuenciaEstrenimiento || ""}
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
                          checked={formData.detalleSintomas?.includes("Diarréa")}
                          onChange={(e) => handleCheckboxChange1(e, "Diarréa")}
                        />
                      }
                      label="Diarréa"
                    />
                    {formData.detalleSintomas?.includes("Diarréa") && (
                      <SoftBox ml={4}>
                        <label htmlFor="frecuenciaDiarrea">Frecuencia (Diarréa):</label>
                        <textarea
                          id="frecuenciaDiarrea"
                          name="frecuenciaDiarrea"
                          value={formData.frecuenciaDiarrea || ""}
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
                    htmlFor="padecimientosActuales"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Enfermedades:
                  </label>
                  <textarea
                    id="padecimientosActuales"
                    name="padecimientosActuales"
                    placeholder="Especifique"
                    value={formData.padecimientosActuales}
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
                    htmlFor="complicaciones"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Complicaciones:
                  </label>
                  <textarea
                    id="complicaciones"
                    name="complicaciones"
                    placeholder="Especifique"
                    value={formData.complicaciones}
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
                    htmlFor="liquidos"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Líquidos:
                  </label>
                  <textarea
                    id="liquidos"
                    name="liquidos"
                    placeholder="Especifique"
                    value={formData.liquidos}
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
                  <label htmlFor="TiposEjercicios" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Tipo de ejercicio:
                  </label>
                  <textarea
                    id="TiposEjercicios"
                    name="TiposEjercicios"
                    placeholder="Especifique"
                    value={formData.TiposEjercicios}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Grid>

                {/* Días a la semana */}
                <Grid item xs={12} sm={4}>
                  <label htmlFor="ejercicioDiasSemana" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Días a la semana:
                  </label>
                  <textarea
                    id="ejercicioDiasSemana"
                    name="ejercicioDiasSemana"
                    placeholder="Especifique"
                    value={formData.ejercicioDiasSemana}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Grid>

                {/* Intensidad */}
                <Grid item xs={12} sm={4}>
                  <label htmlFor="ejercicioIntensidad" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Intensidad:
                  </label>
                  <textarea
                    id="ejercicioIntensidad"
                    name="ejercicioIntensidad"
                    placeholder="Especifique"
                    value={formData.ejercicioIntensidad}
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
            <SoftTypography variant="h5" color="secondary" mb={3}>Evaluación dietética</SoftTypography>

            <SoftTypography variant="subtitle2" sx={{ fontWeight: "bold" }} mb={2}>
              RECORDATORIO DE 24 HORAS
            </SoftTypography>

            <Grid container spacing={2}>
              {/* Desayuno */}
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label htmlFor="desayuno" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Desayuno:
                  </label>
                  <textarea
                    id="desayuno"
                    name="desayuno"
                    placeholder="Especifique"
                    value={formData.desayuno}
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
                  <label htmlFor="colacion1" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Colación:
                  </label>
                  <textarea
                    id="colacion1"
                    name="colacion1"
                    placeholder="Especifique"
                    value={formData.colacion1}
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
                  <label htmlFor="comida" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Comida:
                  </label>
                  <textarea
                    id="comida"
                    name="comida"
                    placeholder="Especifique"
                    value={formData.comida}
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
                  <label htmlFor="colacion2" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Colación 2:
                  </label>
                  <textarea
                    id="colacion2"
                    name="colacion2"
                    placeholder="Especifique"
                    value={formData.colacion2}
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
                  <label htmlFor="extras" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
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
              <Table sx={{ minWidth: 700 }} aria-label="tabla de mediciones">
                <TableBody>
                  {/* Fila de fechas */}
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Fecha
                    </StyledTableCell>
                    <StyledTableCell align="center">{actualDate}</StyledTableCell>
                    {datesMediciones.map((date, colIndex) => (
                      <StyledTableCell key={`date-col-${colIndex}`} align="center">
                        {date}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>

                  {/* Filas dinámicas de mediciones */}
                  {Object.keys(visibleFieldsMediciones).map((measurement, rowIndex) => (
                    <StyledTableRow key={measurement}>
                      {/* Nombre de la medición */}
                      <StyledTableCell component="th" scope="row">
                        {visibleFieldsMediciones[measurement]}
                      </StyledTableCell>

                      {/* Entrada para el valor actual */}
                      <StyledTableCell>
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          value={formData[measurement] || ""}
                          onChange={(e) => handleInputChange(e, measurement)}
                        />
                      </StyledTableCell>

                      {/* Columnas dinámicas de datos históricos */}
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
                onClick={() => addColumn("mediciones")}
              >
                Agregar Columna
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
                id="diagnostico"
                name="diagnostico"
                value={formData.diagnostico || ""}
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
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
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
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="outlined" onClick={handleReset}>
                Reiniciar
              </Button>
            </Box>
          )}

        </form>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default NotaNutricional;
