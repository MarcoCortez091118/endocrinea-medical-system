// Importaciones necesarias
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import {
  TextField,
  MenuItem,
  Select,
  Grid,
  Button,
  FormControl,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  tableCellClasses,
} from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { styled } from "@mui/system";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Global style textarea
import "layouts/TextareaStyles.css";
import NutritionRecords from "./nota-historial-nutricion";

// Libreria gluestacks

function HistorialNutricional({ patientId }) {
  {
    /* Variables */
  }
  const [formData, setFormData] = useState({
    familyHistory: {
      Diabetes: {
        Mother: false,
        Father: false,
        Siblings: false,
        "Paternal Uncles": false,
        "Maternal Uncles": false,
      },
      Hypertension: {
        Mother: false,
        Father: false,
        Siblings: false,
        "Paternal Uncles": false,
        "Maternal Uncles": false,
      },
      "High Cholesterol": {
        Mother: false,
        Father: false,
        Siblings: false,
        "Paternal Uncles": false,
        "Maternal Uncles": false,
      },
      "Heart Attacks": {
        Mother: false,
        Father: false,
        Siblings: false,
        "Paternal Uncles": false,
        "Maternal Uncles": false,
      },
    },

    otherFamilyHistory: "",

    drugAllergy: "",
    otherDrugAllergies: "",
    foodAllergy: "",
    otherFoodAllergies: "",
    prohibitedFoods: "",
    otherProhibitedFoods: "",

    exercise: "",
    exerciseTypes: "",
    exerciseDaysPerWeek: "",
    exerciseIntensity: "",

    sleepInsomnia: false,
    sleepHours: "",

    medications: "",
    vitamins: "",
    supplements: "",

    relevantLabResults: "",
    gastrointestinalSymptoms: "",

    breakfast: "",
    snack1: "",
    lunch: "",
    snack2: "",
    extras: "",

    foodNotLike: "",

    glucose: "",
    bloodPressure: "",
    temperature: "",
    heartRate: "",

    weightDates: "",
    usualWeight: "",
    maximumWeight: "",
    minimumWeight: "",
    currentWeight: "",

    diagnosis: "",

    goal: "",
    medicationsGoal: "",
    nutritionalPlanType: "",
    specifications: "",

    smoke: "",
    smokeHistory: "",
    smokeOther: "",
    alcohol: "",
    alcoholHistory: "",
    alcoholOther: "",

    surgery: "",
    surgeryHistory: [],
    surgeryOther: "",
  });

  // Maneja el cambio de los checkboxes
  const handleCheckboxChange = (e, disease, familyMember) => {
    setFormData((prev) => ({
      ...prev,
      familyHistory: {
        ...prev.familyHistory,
        [disease]: {
          ...prev.familyHistory[disease],
          [familyMember]: e.target.checked,
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si es un checkbox de antecedentes familiares
    if (name.startsWith("familyHistory")) {
      const [_, disease, familyMember] = name.split(".");

      setFormData((prevData) => ({
        ...prevData,
        familyHistory: {
          ...prevData.familyHistory,
          [disease]: {
            ...prevData.familyHistory[disease],
            [familyMember]: checked, // Checkbox: true/false
          },
        },
      }));
    }
    // Si cambia el estado civil y no es "Otros", limpiamos el campo otherStatus
    else if (name === "maritalStatus" && value !== "otros") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        otherStatus: "", // Limpiamos el campo "otherStatus"
      }));
    }
    // Si cambia el estado de cirugía, limpiamos otros campos relacionados
    else if (name === "surgery") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        surgeryHistory: [], // Limpiamos el historial de cirugías si cambia
        surgeryOther: "", // Limpiamos el campo de especificaciones
      }));
    }
    // Caso general
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value, // Maneja checkboxes generales
      }));
    }
  };

  const [notas, setNotas] = useState([]); // Almacena las notas enviadas
  const [mostrarNotas, setMostrarNotas] = useState(false); // Controla la visualización de la sección de notas

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl =
      "https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/10000003/nutrition_records";

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
      console.log("Historial enviado con éxito:", result);

      alert("Historial guardado correctamente");

      setNotas((prevNotas) => [
        { id: result.id, created_at: new Date().toISOString(), ...formData },
        ...prevNotas,
      ]);

      setMostrarNotas(true);
      // Limpiar el formulario
      setFormData({
        familyHistory: {},
        otherFamilyHistory: "",
        drugAllergy: "",
        otherDrugAllergies: "",
        foodAllergy: "",
        otherFoodAllergies: "",
        prohibitedFoods: "",
        otherProhibitedFoods: "",
        exercise: "",
        exerciseTypes: "",
        exerciseDaysPerWeek: "",
        exerciseIntensity: "",
        sleepInsomnia: false,
        sleepHours: "",
        medications: "",
        vitamins: "",
        supplements: "",
        relevantLabResults: "",
        gastrointestinalSymptoms: "",
        breakfast: "",
        snack1: "",
        lunch: "",
        snack2: "",
        extras: "",
        foodNotLike: "",
        glucose: "",
        bloodPressure: "",
        temperature: "",
        heartRate: "",
        weightDates: "",
        usualWeight: "",
        maximumWeight: "",
        minimumWeight: "",
        currentWeight: "",
        diagnosis: "",
        goal: "",
        medicationsGoal: "",
        nutritionalPlanType: "",
        specifications: "",
        smoke: "",
        smokeHistory: "",
        smokeOther: "",
        alcohol: "",
        alcoholHistory: "",
        alcoholOther: "",
        surgery: "",
        surgeryHistory: [],
        surgeryOther: "",
      });
      console.log("Datos a enviar:", formData);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error al guardar el historial. Inténtalo nuevamente.");
      console.log("Datos a enviar:", formData);
    }
  };

  const data = [
    ["Frutas", "Verduras", "Carne", "Leche", "Queso"],
    ["Yogurt", "Tortilla", "Pan", "Arroz", "Pasta"],
    ["Leguminosas", "Azúcares", "Galletas", "Aceites", "Aceites con proteína"],
    ["Comida Rápida", "Refresco", "Jugos", "Aguas de Sabor", "Agua simple"],
  ];

  const [columnsMediciones, setColumnsMediciones] = useState([]);
  const [datesMediciones, setDatesMediciones] = useState([]);
  const [columnsPesos, setColumnsPesos] = useState([]);
  const [datesPesos, setDatesPesos] = useState([]);

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

  const visibleFieldsPesos = {
    usualWeight: "Peso Habitual",
    maximumWeight: "Peso Máximo",
    minimumWeight: "Peso Mínimo",
    currentWeight: "Peso Actual",
  };

  const diseaseTranslations = {
    Diabetes: "Diabetes",
    Hypertension: "Hipertensión",
    "High Cholesterol": "Colesterol Alto",
    "Heart Attacks": "Infartos Cardíacos",
  };
  
  

  const handleInputChange = (event, measurement) => {
    setFormData({
      ...formData,
      [measurement]: event.target.value,
    });
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

  const handleChange1 = (rowIndex, colIndex, value) => {
    const key = data[rowIndex][colIndex]; // Obtén la clave basada en `data`
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value, // Actualiza el valor de la clave correspondiente
    }));
  };

  const steps = [
    "Antecedentes Heredo Familiares", // Antecedentes Heredo Familiares
    "Antecedentes personales", // Antecedentes personales
    "Antecedentes Médicos", // Antecedentes Médicos
    "Evaluación dietética", // Evaluación dietética
    "Frecuencia de alimentos", // Frecuencia de alimentos
    "Signos vitales", // Signos vitales
    "Diagnóstico", // Diagnóstico
    "Plan y Objetivo", // Plan y Objetivo
  ];

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
            Historia Clínica Nutricional -
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
        {/* Antecedentes Heredo Familiares*/}
        {activeStep === 0 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            {/* Título principal */}
            <SoftBox mb={2}>
              <SoftTypography variant="h5" color="secondary" mb={3}>
                Antecedentes Heredo Familiares
              </SoftTypography>
              <SoftTypography variant="subtitle2" fontWeight="medium" mt={2}>
                En esta sección deberá contestar si alguno de sus familiares tiene diagnosticada
                alguna de las enfermedades especificadas a continuación. Por favor, responda sólo si
                está seguro(a) del diagnóstico.
              </SoftTypography>
            </SoftBox>

            {/* Tabla de antecedentes familiares */}
            <SoftBox mb={4}>
              <SoftTypography variant="body1" fontWeight="bold" mb={2}>
                ¿Alguien de su familia ha sido diagnosticado con alguna de las siguientes
                enfermedades?
              </SoftTypography>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                    <th style={{ padding: "10px", fontWeight: "bold" }}></th>
                    <th style={{ padding: "10px", fontWeight: "bold" }}>Madre</th>
                    <th style={{ padding: "10px", fontWeight: "bold" }}>Padre</th>
                    <th style={{ padding: "10px", fontWeight: "bold" }}>Hermanos</th>
                    <th style={{ padding: "10px", fontWeight: "bold" }}>Tíos paternos</th>
                    <th style={{ padding: "10px", fontWeight: "bold" }}>Tíos maternos</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(formData.familyHistory).map((disease) => (
                    <tr key={disease} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px", textAlign: "left", fontWeight: "medium" }}>
                        {diseaseTranslations[disease]}
                      </td>
                      {Object.keys(formData.familyHistory[disease]).map((familyMember) => (
                        <td key={familyMember} style={{ padding: "8px" }}>
                          <input
                            type="checkbox"
                            checked={formData.familyHistory[disease][familyMember]}
                            onChange={(e) => handleCheckboxChange(e, disease, familyMember)}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </SoftBox>

            {/* Campo de texto para "Otros" */}
            <SoftBox>
              <SoftTypography variant="body1" fontWeight="bold" mb={1}>
                Otros:
              </SoftTypography>
              <textarea
                id="otherFamilyHistory"
                name="otherFamilyHistory"
                placeholder="Especifique"
                value={formData.otherFamilyHistory}
                onChange={handleChange}
                rows="2"
                className="global-textarea"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  fontFamily: "Arial, sans-serif",
                }}
              />
            </SoftBox>
          </SoftBox>
        )}
        {/* ANTECEDENTES PERSONALES NO PATOLÓGICOS */}
        {activeStep === 1 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Antecedentes personales
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              En esta sección recabaremos información sobre sus antecedentes médicos.
            </SoftTypography>

            <SoftBox mb={2}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                ¿Usted sufre alguna alergia a medicamentos?
              </label>
              <RadioGroup
                id="drugAllergy"
                name="drugAllergy"
                value={formData.drugAllergy}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="Si" control={<Radio />} label="Si" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>
            {formData.drugAllergy === "Si" && (
              <SoftBox ml={2}>
                <textarea
                  id="otherDrugAllergies"
                  name="otherDrugAllergies"
                  placeholder="Especifique"
                  value={formData.otherDrugAllergies}
                  onChange={handleChange}
                  required
                  rows="1"
                  className="global-textarea"
                />
              </SoftBox>
            )}

            <SoftBox mb={2}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                ¿Usted sufre alguna alergia a algun alimento?
              </label>
              <RadioGroup
                id="foodAllergy"
                name="foodAllergy"
                value={formData.foodAllergy}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>
            {formData.foodAllergy === "Si" && (
              <SoftBox ml={2}>
                <textarea
                  id="otherFoodAllergies"
                  name="otherFoodAllergies"
                  placeholder="Especifique"
                  value={formData.otherFoodAllergies}
                  onChange={handleChange}
                  required
                  rows="1"
                  className="global-textarea"
                />
              </SoftBox>
            )}

            <SoftBox mb={2}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                ¿Su RELIGIÓN le impide comer algún tipo de alimento?
              </label>
              <RadioGroup
                id="prohibitedFoods"
                name="prohibitedFoods"
                value={formData.prohibitedFoods}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>
            {formData.prohibitedFoods === "Si" && (
              <SoftBox ml={2}>
                <textarea
                  id="otherProhibitedFoods"
                  name="otherProhibitedFoods"
                  placeholder="Especifique"
                  value={formData.otherProhibitedFoods}
                  onChange={handleChange}
                  required
                  rows="1"
                  className="global-textarea"
                />
              </SoftBox>
            )}

            <SoftBox mb={2}>
              <SoftBox mb={2}>
                <label
                  htmlFor="name"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  ¿Realiza algún tipo de ejercicio?
                </label>
                <RadioGroup
                  id="exercise"
                  name="exercise"
                  value={formData.exercise}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </SoftBox>

              {formData.exercise === "Si" && (
                <>
                  <SoftBox mb={2}>
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      ¿Cuál es el tipo de ejercicio que realiza?
                    </label>
                    <textarea
                      id="exerciseTypes"
                      name="exerciseTypes"
                      placeholder="Especifique"
                      value={formData.exerciseTypes} // Nota: El nombre debe coincidir con los datos del formulario
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>

                  <SoftBox mb={2}>
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      ¿Cuántos días a la semana realiza ejercicio?
                    </label>
                    <RadioGroup
                      id="exerciseDaysPerWeek"
                      name="exerciseDaysPerWeek"
                      value={formData.exerciseDaysPerWeek}
                      onChange={handleChange}
                      required
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Al menos 1 día a la semana"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Al menos 2 días a la semana"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="3 o más días a la semana"
                      />
                      <FormControlLabel value="4" control={<Radio />} label="No hago ejercicio" />
                    </RadioGroup>
                  </SoftBox>

                  <SoftBox mb={2}>
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      ¿Con qué intensidad realiza los ejercicios?
                    </label>
                    <RadioGroup
                      id="exerciseIntensity"
                      name="exerciseIntensity"
                      placeholder="Especifique"
                      value={formData.exerciseIntensity}
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    >
                      <FormControlLabel value="Leve" control={<Radio />} label="Leve" />
                      <FormControlLabel value="Moderado" control={<Radio />} label="Moderado" />
                      <FormControlLabel value="Intenso" control={<Radio />} label="Intenso" />
                    </RadioGroup>
                  </SoftBox>
                </>
              )}
            </SoftBox>

            <SoftBox mb={2}>
              <SoftBox mb={2}>
                <label
                  htmlFor="name"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  ¿Usted sufre de insomnio?
                </label>
                <RadioGroup
                  id="sleepInsomnia"
                  name="sleepInsomnia"
                  value={formData.sleepInsomnia}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {formData.sleepInsomnia === "Si" && (
                  <SoftBox ml={4}>
                    <SoftTypography
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      ¿Cuántas horas duerme por noche?
                    </SoftTypography>
                    <RadioGroup
                      id="sleepHours"
                      name="sleepHours"
                      value={formData.sleepHours}
                      onChange={handleChange}
                      required
                    >
                      <FormControlLabel
                        value="Menos de 4 horas"
                        control={<Radio />}
                        label="Menos de 4 horas"
                      />
                      <FormControlLabel value="4-5 horas" control={<Radio />} label="4-5 horas" />
                      <FormControlLabel value="6-7 horas" control={<Radio />} label="6-7 horas" />
                      <FormControlLabel
                        value="8 horas (recomendado)"
                        control={<Radio />}
                        label="8 horas (recomendado)"
                      />
                      <FormControlLabel
                        value="Más de 8 horas"
                        control={<Radio />}
                        label="Más de 8 horas"
                      />
                    </RadioGroup>
                  </SoftBox>
                )}
              </SoftBox>
            </SoftBox>

            <SoftBox mb={2}>
              <SoftBox mb={2}>
                <label
                  htmlFor="name"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  ¿Fuma o ha fumado en el pasado?
                </label>
                <RadioGroup
                  id="smoke"
                  name="smoke"
                  value={formData.smoke}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {formData.smoke === "Si" && (
                  <SoftBox mb={2}>
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      ¿Cuántos cigarros fuma al día?
                    </label>
                    <RadioGroup
                      id="smokeHistory"
                      name="smokeHistory"
                      value={formData.smokeHistory}
                      onChange={handleChange}
                      required
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Menos de 5 cigarrillos al mes"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="De 1 a 5 cigarrillos a la semana"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="De 6 a 10 cigarrillos a la semana"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Mas de 20 cigarrillos a la semana"
                      />
                      <FormControlLabel value="Otros" control={<Radio />} label="Otros:" />
                    </RadioGroup>
                    {formData.smokeHistory === "Otros" && (
                      <SoftBox mb={2}>
                        <textarea
                          id="smokeOther"
                          name="smokeOther"
                          placeholder="Especifique"
                          value={formData.smokeOther}
                          onChange={handleChange}
                          required
                          rows="1"
                          className="global-textarea"
                        />
                      </SoftBox>
                    )}
                  </SoftBox>
                )}
              </SoftBox>
            </SoftBox>

            <SoftBox mb={2}>
              <SoftBox mb={2}>
                <label
                  htmlFor="alcohol"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  ¿Consume alcohol?
                </label>
                <RadioGroup
                  id="alcohol"
                  name="alcohol"
                  value={formData.alcohol}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {formData.alcohol === "Si" && (
                  <SoftBox mb={2}>
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      ¿Cuántas veces a la semana bebe alcohol?
                    </label>
                    <RadioGroup
                      id="alcoholHistory"
                      name="alcoholHistory"
                      value={formData.alcoholHistory}
                      onChange={handleChange}
                      required
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Sólo en fiestas o reuniones."
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Al menos una vez a la semana hasta llegar a la embriaguez."
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Al menos una vez a la semana sin llegar a la embriaguez."
                      />
                      <FormControlLabel value="Otros" control={<Radio />} label=" Otros:" />
                    </RadioGroup>
                    {formData.alcoholHistory === "Otros" && (
                      <SoftBox mb={2}>
                        <textarea
                          id="alcoholOther"
                          name="alcoholOther"
                          placeholder="Especifique"
                          value={formData.alcoholOther}
                          onChange={handleChange}
                          required
                          rows="1"
                          className="global-textarea"
                        />
                      </SoftBox>
                    )}
                  </SoftBox>
                )}
              </SoftBox>
            </SoftBox>
          </SoftBox>
        )}
        {/* Antecedentes medicos */}
        {activeStep === 2 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Antecedentes Médicos
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              Sección enfocada a conocer si padece alguna enfermedad y la medicación que actualmente
              utiliza.
            </SoftTypography>

            {/* Cirugías */}
            <SoftBox mb={3}>
              <label
                htmlFor="surgery"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                ¿Le han realizado alguna cirugía? Es posible seleccionar varias respuestas.
              </label>
              <RadioGroup
                id="surgery"
                name="surgery"
                value={formData.surgery}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {formData.surgery === "Si" && (
                <SoftBox ml={4} mt={2}>
                  <SoftTypography
                    variant="subtitle2"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Seleccione las cirugías que le hayan realizado:
                  </SoftTypography>
                  <SoftBox>
                    {["Apendicectomía", "Colecistectomía", "Cesárea", "Cirugía bariátrica"].map(
                      (surgery) => (
                        <FormControlLabel
                          key={surgery}
                          control={
                            <Checkbox
                              checked={formData.surgeryHistory.includes(surgery)}
                              onChange={(e) => handleSurgeryCheckboxChange(e, surgery)}
                            />
                          }
                          label={surgery}
                        />
                      )
                    )}
                  </SoftBox>
                  <SoftBox mb={2} display="flex" alignItems="center">
                    <label htmlFor="surgeryOther" style={{ marginRight: "8px" }}>
                      Otros:
                    </label>
                    <textarea
                      id="surgeryOther"
                      name="surgeryOther"
                      placeholder="Especifique"
                      value={formData.surgeryOther}
                      onChange={handleChange}
                      rows="1"
                      className="global-textarea"
                      style={{ width: "100%" }}
                    />
                  </SoftBox>
                </SoftBox>
              )}
            </SoftBox>

            {/* Padecimientos y medicamentos */}
            <SoftBox
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr", // Dos columnas
                gap: 2, // Espaciado entre elementos
              }}
            >
              {[
                {
                  id: "padecimientoActuales",
                  label: "¿Tiene alguna condición de salud actual?",
                },
                {
                  id: "medications",
                  label: "¿Toma medicamentos? Especifique cuáles y la frecuencia.",
                },
                {
                  id: "vitamins",
                  label: "¿Consume vitaminas? Indique cuáles.",
                },
                {
                  id: "supplements",
                  label: "¿Toma suplementos alimenticios? Especifique.",
                },
                {
                  id: "relevantLabResults",
                  label:
                    "¿Se ha hecho análisis de laboratorio recientes? Mencione los importantes.",
                },
                {
                  id: "gastrointestinalSymptoms",
                  label: "¿Ha tenido síntomas gastrointestinales recientes?.",
                },
              ].map((field) => (
                <SoftBox mb={3} key={field.id}>
                  <label
                    htmlFor={field.id}
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    {field.label}
                  </label>
                  <textarea
                    id={field.id}
                    name={field.id}
                    placeholder="Especifique"
                    value={formData[field.id]}
                    onChange={handleChange}
                    rows="2"
                    className="global-textarea"
                    style={{ width: "100%" }}
                  />
                </SoftBox>
              ))}
            </SoftBox>
          </SoftBox>
        )}
        {/* Evaluacion dietetica */}
        {activeStep === 3 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Evaluación dietética
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              RECORDATORIO DE 24 HORAS
            </SoftTypography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Desayuno:
                  </label>
                  <textarea
                    id="breakfast"
                    name="breakfast"
                    placeholder="Especifique"
                    value={formData.breakfast}
                    onChange={handleChange}
                    required
                    rows="2"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Colación:
                  </label>
                  <textarea
                    id="snack1"
                    name="snack1"
                    placeholder="Especifique"
                    value={formData.snack1}
                    onChange={handleChange}
                    required
                    rows="2"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Comida:
                  </label>
                  <textarea
                    id="lunch"
                    name="lunch"
                    placeholder="Especifique"
                    value={formData.lunch}
                    onChange={handleChange}
                    required
                    rows="2"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Colación 2:
                  </label>
                  <textarea
                    id="snack2"
                    name="snack2"
                    placeholder="Especifique"
                    value={formData.snack2}
                    onChange={handleChange}
                    required
                    rows="2"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Extras:
                  </label>
                  <textarea
                    id="extras"
                    name="extras"
                    placeholder="Especifique"
                    value={formData.extras}
                    onChange={handleChange}
                    required
                    rows="2"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
        )}
        {/* Frecuencia de alimentos */}
        {activeStep === 4 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Frecuencia de alimentos
            </SoftTypography>
            <SoftBox mb={2}>
              <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
                Descripción de la frecuencia de los alimentos:
              </SoftTypography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((item, colIndex) => (
                          <TableCell key={colIndex}>
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <InputLabel id={`select-label-${item}`}>{item}</InputLabel>
                                <Select
                                  labelId={`select-label-${item}`}
                                  id={`select-${item}`}
                                  value={formData[item] || ""} // Usa la clave de `formData` como valor
                                  onChange={(event) =>
                                    handleChange1(rowIndex, colIndex, event.target.value)
                                  }
                                >
                                  <MenuItem value="Nunca">Nunca</MenuItem>
                                  <MenuItem value="Rara vez">Rara vez</MenuItem>
                                  <MenuItem value="A veces">A veces</MenuItem>
                                  <MenuItem value="Frecuentemente">Frecuentemente</MenuItem>
                                  <MenuItem value="Siempre">Siempre</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Alimentos que no le gustan:
              </label>
              <textarea
                id="foodNotLike"
                name="foodNotLike"
                placeholder="Especifique"
                value={formData.foodNotLike}
                onChange={handleChange}
                required
                rows="1"
                className="global-textarea"
              />
            </SoftBox>
          </SoftBox>
        )}

        {/* Signos vitales */}
        {activeStep === 5 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Signos vitales
            </SoftTypography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <label>
                  <SoftTypography variant="body1" fontWeight="bold" color="textPrimary">
                    Glucosa
                  </SoftTypography>
                </label>
                <textarea
                  id="glucose"
                  name="glucose"
                  placeholder="Especifique"
                  value={formData.glucose}
                  onChange={handleChange}
                  rows="1"
                  className="global-textarea"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <label>
                  <SoftTypography variant="body1" fontWeight="bold" color="textPrimary">
                    TDA (Presión Arterial)
                  </SoftTypography>
                </label>
                <textarea
                  id="bloodPressure"
                  name="bloodPressure"
                  placeholder="Especifique"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  rows="1"
                  className="global-textarea"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <label>
                  <SoftTypography variant="body1" fontWeight="bold" color="textPrimary">
                    FC (Frecuencia Cardíaca)
                  </SoftTypography>
                </label>
                <textarea
                  id="heartRate"
                  name="heartRate"
                  placeholder="Especifique"
                  value={formData.heartRate}
                  onChange={handleChange}
                  rows="1"
                  className="global-textarea"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <label>
                  <SoftTypography variant="body1" fontWeight="bold" color="textPrimary">
                    Temperatura
                  </SoftTypography>
                </label>
                <textarea
                  id="temperature"
                  name="temperature"
                  placeholder="Especifique"
                  value={formData.temperature}
                  onChange={handleChange}
                  rows="1"
                  className="global-textarea"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </Grid>
            </Grid>

            <SoftBox mb={2} mt={3}>
              <SoftTypography variant="body1" fontWeight="bold" color="textPrimary">
                Pesos
              </SoftTypography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableBody>
                    {/* Fila de Fechas */}
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        Fecha
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          type="date"
                          value={formData.weightDates}
                          onChange={(e) =>
                            setFormData({ ...formData, weightDates: e.target.value })
                          }
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </StyledTableCell>
                      {datesPesos.map((date, colIndex) => (
                        <StyledTableCell key={`date-col-${colIndex}`} align="center">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => {
                              const updatedDates = [...datesPesos];
                              updatedDates[colIndex] = e.target.value;
                              setDatesPesos(updatedDates);
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
                    {/* Fila de Medidas */}
                    {Object.keys(visibleFieldsPesos).map((measurement, rowIndex) => (
                      <StyledTableRow key={measurement}>
                        <StyledTableCell component="th" scope="row">
                          {visibleFieldsPesos[measurement]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <textarea
                            value={formData[measurement]}
                            onChange={(e) => handleInputChange(e, measurement)}
                            style={{
                              width: "100%",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            }}
                            className="global-textarea"
                          />
                        </StyledTableCell>
                        {columnsPesos.map((col, colIndex) => (
                          <StyledTableCell key={`cell-${colIndex}-${rowIndex}`} align="center">
                            <textarea
                              type="text"
                              value={col[rowIndex] || ""}
                              onChange={(e) =>
                                handleNewMeasurementChange(e, rowIndex, colIndex, "pesos")
                              }
                              style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                              className="global-textarea"
                            />
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <SoftBox mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ color: "white" }}
                  onClick={() => addColumn("pesos")}
                >
                  Agregar Columna
                </Button>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        )}


        {/* Diagnostico */}
        {activeStep === 6 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            {/* Título del componente */}
            <SoftTypography variant="h6" color="secondary" mb={2}>
              Diagnóstico
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

        {/* Objetivo y Plan */}
        {activeStep === 7 && (
          <SoftBox component={Card} sx={{ p: 3, boxShadow: 3 }}>
            <SoftTypography variant="h6" color="secondary" mb={2}>
              Plan y Objetivo
            </SoftTypography>

            <Grid container spacing={2}>
              {[
                {
                  id: "goal",
                  label: "Objetivo",
                  placeholder: "Escriba el goal...",
                  value: formData.goal,
                },
                {
                  id: "medicationsGoal",
                  label: "Medicamentos y suplementos añadidos",
                  placeholder: "Escriba los medicamentos o suplementos...",
                  value: formData.medicationsGoal,
                },
                {
                  id: "nutritionalPlanType",
                  label: "Tipo de plan nutricional",
                  placeholder: "Escriba el tipo de plan nutricional...",
                  value: formData.nutritionalPlanType,
                },
                {
                  id: "specifications",
                  label: "Especificaciones",
                  placeholder: "Escriba las especificaciones...",
                  value: formData.specifications,
                },
              ].map((field) => (
                <Grid item xs={12} md={6} key={field.id}>
                  <SoftBox mb={2}>
                    <label htmlFor={field.id}>
                      <SoftTypography variant="body1" color="textPrimary" fontWeight="bold">
                        {field.label}
                      </SoftTypography>
                    </label>
                    <textarea
                      id={field.id}
                      name={field.id}
                      value={field.value}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      required
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
                </Grid>
              ))}
            </Grid>
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
          </SoftBox>*/}

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
      {
        /* Sección de notas 
      <Card sx={{ p: 3, mt: 4, boxShadow: 3 }}>{mostrarNotas && <Notas notas={notas} />}</Card>
   */
        <NutritionRecords />
      }
    </SoftBox>
  );
}
HistorialNutricional.propTypes = {
  patientId: PropTypes.string.isRequired,
};
export default HistorialNutricional;
