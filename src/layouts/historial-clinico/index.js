// Importaciones necesarias
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
} from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useLocation } from "react-router-dom";

// Global style textarea
import "layouts/TextareaStyles.css";

import MedicalRecordsList from "./MedicalRecordsList";

function HistorialClinico() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [patient, setPatient] = useState(location.state?.patient || null);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  


  useEffect(() => {
    if (!patient) {
      const storedPatient = localStorage.getItem("selectedPatient");
      if (storedPatient) {
        setPatient(JSON.parse(storedPatient));
      }
    }
  }, [patient]);

  const initialFormData = {
    familyHistory: {
      Diabetes: {
        Mother: false,
        Father: false,
        Siblings: false,
        Paternal_Uncles: false,
        Maternal_Uncles: false
      },
      Hypertension: {
        Mother: false,
        Father: false,
        Siblings: false,
        Paternal_Uncles: false,
        Maternal_Uncles: false
      },
      High_Cholesterol: {
        Mother: false,
        Father: false,
        Siblings: false,
        Paternal_Uncles: false,
        Maternal_Uncles: false
      },
      Heart_Attacks: {
        Mother: false,
        Father: false,
        Siblings: false,
        Paternal_Uncles: false,
        Maternal_Uncles: false
      }
    },
    smoke: "",
    smokeHistory: "",
    smokeOther: "",
    alcohol: "",
    alcoholHistory: "",
    alcoholOther: "",
    drug: "",
    drugHistory: "",
    exercise: "",
    allergicMedicine: "",
    allergicFood: "",
    surgery: "",
    surgeryHistory: [],
    surgeryOther: "",
    diagnosedDiseases: [],
    diagnosedDiseasesOther: "",
    takeMedications: "",
    menstruation: "",
    menstruationTrue: "",
    menstruationNull: "",
    menstruationDate: "",
    pregnancies: "",
    otherPregnancies: "",
    pregnanciesComplications: [],
    reasonConsultation: [],
    consultationOther: ""
  };
  const [formData, setFormData] = useState(initialFormData);

  const diseaseTranslations = {
    Diabetes: "Diabetes",
    Hypertension: "Hipertensión",
    High_Cholesterol: "Colesterol alto",
    Heart_Attacks: "Infartos cardíacos",
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    try {
      console.log("Enviando datos:", dataToSend);

      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/medical_records/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseData.message || "Error en la API"}`);
      }

      const responseData = await response.json();

      //const responseData = await response.json(); // 📌 Recibir la nueva nota guardada
      console.log("✅ Nota guardada con éxito:", responseData);

      alert("Su formulario ha sido recibido correctamente. Para ver el registro actualizado, por favor, refresque la página.");

      // 📌 Agregar la nueva nota en la primera posición
      setNotes((prevNotes) => [responseData, ...prevNotes]);

      //setSnackbarMessage("Actualizar pagina.");
      //setSnackbarSeverity("success");
      //setSnackbarOpen(true);
      //alert("Historial guardado correctamente");
      setActiveStep(0);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al enviar:", error);
      setSnackbarMessage(`Hubo un error al enviar: ${error.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);


  const steps = [
    "Antecedentes familiares",
    "Antecedentes personales",
    "Antecedentes Médicos",
    "Antecedentes Ginecológico",
    "Motivo de la consulta",
  ];

  const goToNextStep = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goToPreviousStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <SoftBox py={3}>
      <SoftBox mb={3}>
        <Card sx={{ p: 3, mb: 2 }}>
          <SoftTypography variant="h5" mb={2}>
            Historia Clínica Médica -
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
            Dra.Lizzette Pellegrin Quiroz
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Circuito Juan Pablo II. PB No. 3113. Colonia Fraccionamiento Las Ánimas, Puebla.
          </SoftTypography>
        </Card>
      </SoftBox>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftBox mb={2}>
              <SoftTypography variant="h5" color="secondary" mb={3}>
                Antecedentes familiares
              </SoftTypography>
              <SoftTypography variant="subtitle2" fontWeight="medium" mt={2}>
                En esta sección deberá contestar si alguno de sus familiares tiene diagnosticada
                alguna de las enfermedades especificadas a continuación. Por favor, responda sólo si
                está seguro(a) del diagnóstico.
              </SoftTypography>
            </SoftBox>

            <SoftBox mb={4}>
              <SoftTypography htmlFor="familyHistory" variant="subtitle1" fontWeight="bold" mb={2}>
                ¿Alguien de su familia ha sido diagnosticado con alguna de las siguientes
                enfermedades ?
              </SoftTypography>
              <SoftBox mt={3}>
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
            </SoftBox>
          </SoftBox>
        )}
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
                htmlFor="smoke"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                ¿Fuma?
              </label>
              <RadioGroup
                id="smoke"
                name="smoke"
                value={formData.smoke}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="Si" control={<Radio />} label="Sí" />
              </RadioGroup>
              {formData.smoke === "Si" && (
                <SoftBox ml={4}>
                  <RadioGroup
                    id="smokeHistory"
                    name="smokeHistory"
                    value={formData.smokeHistory}
                    onChange={handleChange}
                    required
                  >
                    <FormControlLabel
                      value="Menos de 5 cigarrillos al mes"
                      control={<Radio />}
                      label="Menos de 5 cigarrillos al mes"
                    />
                    <FormControlLabel
                      value="De 1-5 cigarrillos a la semana"
                      control={<Radio />}
                      label="De 1-5 cigarrillos a la semana"
                    />
                    <FormControlLabel
                      value="De 6-10 cigarrillos a la semana"
                      control={<Radio />}
                      label="De 6-10 cigarrillos a la semana"
                    />
                    <FormControlLabel
                      value="Mas de 20 cigarrillos a la semana"
                      control={<Radio />}
                      label="Mas de 20 cigarrillos a la semana"
                    />
                    <FormControlLabel value="Otros" control={<Radio />} label=" Otros:" />
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
              <RadioGroup
                id="smoke"
                name="smoke"
                value={formData.smoke}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>
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
              </RadioGroup>
              {formData.alcohol === "Si" && (
                <SoftBox ml={4}>
                  <RadioGroup
                    id="alcoholHistory"
                    name="alcoholHistory"
                    value={formData.alcoholHistory}
                    onChange={handleChange}
                    required
                  >
                    <FormControlLabel
                      value="Sólo en fiestas o reuniones."
                      control={<Radio />}
                      label="Sólo en fiestas o reuniones."
                    />
                    <FormControlLabel
                      value="Al menos una vez a la semana hasta llegar a la embriaguez."
                      control={<Radio />}
                      label="Al menos una vez a la semana hasta llegar a la embriaguez."
                    />
                    <FormControlLabel
                      value="Al menos una vez a la semana sin llegar a la embriaguez."
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
              <RadioGroup
                id="alcohol"
                name="alcohol"
                value={formData.alcohol}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>

            <SoftBox mb={2}>
              <label
                htmlFor="drug"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                ¿Consume o ha consumido algún tipo de droga?
              </label>
              <RadioGroup
                id="drug"
                name="drug"
                value={formData.drug}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="Si" control={<Radio />} label="Sí" />
              </RadioGroup>
              {formData.drug === "Si" && (
                <SoftBox mb={2}>
                  <textarea
                    id="drugHistory"
                    name="drugHistory"
                    placeholder=" ¿Cuál o cuáles?"
                    value={formData.drugHistory}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
              )}
              <RadioGroup
                id="drug"
                name="drug"
                value={formData.drug}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="No" control={<Radio />} label=" No" />
              </RadioGroup>
            </SoftBox>

            <SoftBox mb={2}>
              <label
                htmlFor="exercise"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                ¿Actualmente realiza ejercicio?
              </label>
              <RadioGroup
                id="exercise"
                name="exercise"
                value={formData.exercise}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="Al menos 1 día a la semana"
                  control={<Radio />}
                  label="Al menos 1 día a la semana"
                />
                <FormControlLabel
                  value="Al menos 2 días a la semana"
                  control={<Radio />}
                  label="Al menos 2 días a la semana"
                />
                <FormControlLabel value="3 o más días a la semana" control={<Radio />} label="3 o más días a la semana" />
                <FormControlLabel value="No hago ejercicio" control={<Radio />} label="No hago ejercicio" />
              </RadioGroup>
            </SoftBox>
          </SoftBox>
        )}
        {activeStep === 2 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Antecedentes Médicos
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              Sección enfocada a conocer si padece alguna enfermedad y la medicación que actualmente
              utiliza.
            </SoftTypography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="allergicMedicine"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    ¿Es alérgico(a) a algún medicamento? ¿Cuál?
                  </label>
                  <SoftBox mb={2}>
                    <textarea
                      id="allergicMedicine"
                      name="allergicMedicine"
                      placeholder="Especifique"
                      value={formData.allergicMedicine}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                      style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        resize: "none",
                      }}
                    />
                  </SoftBox>
                </SoftBox>
              </Grid>

              {/* Campo: Alergia a alimentos */}
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="allergicFood"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    ¿Es alérgico(a) a algún alimento? ¿Cuál?
                  </label>
                  <SoftBox mb={2}>
                    <textarea
                      id="allergicFood"
                      name="allergicFood"
                      placeholder="Especifique"
                      value={formData.allergicFood}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="global-textarea"
                      style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        resize: "none",
                      }}
                    />
                  </SoftBox>
                </SoftBox>
              </Grid>
            </Grid>

            <SoftBox mb={2}>
              <label
                htmlFor="surgery"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                ¿Le han realizado alguna cirugía? Es posible seleccionar varías respuestas.
              </label>
              <RadioGroup
                id="surgery"
                name="surgery"
                value={formData.surgery}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="Si" control={<Radio />} label="Sí" />
              </RadioGroup>
              {formData.surgery === "Si" && (
                <SoftBox ml={4}>
                  <FormControl component="fieldset">
                    <SoftTypography variant="subtitle2">
                      Seleccione las cirugías que le hayan realizado:
                    </SoftTypography>
                    <SoftBox>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.surgeryHistory.includes("Apendicectomía")}
                            onChange={(e) => handleSurgeryCheckboxChange(e, "Apendicectomía")}
                          />
                        }
                        label="Apendicectomía"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.surgeryHistory.includes("Colecistectomía")}
                            onChange={(e) => handleSurgeryCheckboxChange(e, "Colecistectomía")}
                          />
                        }
                        label="Colecistectomía"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.surgeryHistory.includes("Cesarea")}
                            onChange={(e) => handleSurgeryCheckboxChange(e, "Cesarea")}
                          />
                        }
                        label="Cesarea"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.surgeryHistory.includes("Cirugía bariatríca")}
                            onChange={(e) => handleSurgeryCheckboxChange(e, "Cirugía bariatríca")}
                          />
                        }
                        label="Cirugía bariatríca"
                      />
                      <SoftBox mb={2} display="flex">
                        <label htmlFor="surgeryOther" style={{ marginRight: "8px" }}>
                          Otros:
                        </label>
                        <textarea
                          id="surgeryOther"
                          name="surgeryOther"
                          placeholder="Especifique"
                          value={formData.surgeryOther}
                          onChange={handleChange}
                          required
                          rows="1"
                          className="global-textarea"
                          style={{ width: "100%" }}
                        />
                      </SoftBox>
                    </SoftBox>
                  </FormControl>
                </SoftBox>
              )}
              <RadioGroup
                id="surgery"
                name="surgery"
                value={formData.surgery}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>

            <SoftBox mb={2}>
              <label
                htmlFor="diagnosedDiseases"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                ¿Ha sido diagnósticado con alguna de las siguientes enfermedades?
              </label>
              <SoftTypography variant="subtitle2">
                Es posible seleccionar varías respuestas.
              </SoftTypography>
              <FormControl component="fieldset">
                <SoftBox ml={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.diagnosedDiseases.includes("Diabetes")}
                        onChange={(e) => handleDiagnosedCheckboxChange(e, "Diabetes")}
                      />
                    }
                    label="Diabetes"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.diagnosedDiseases.includes("Hipertensión")}
                        onChange={(e) => handleDiagnosedCheckboxChange(e, "Hipertensión")}
                      />
                    }
                    label="Hipertensión"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.diagnosedDiseases.includes("Hipotiroidismo")}
                        onChange={(e) => handleDiagnosedCheckboxChange(e, "Hipotiroidismo")}
                      />
                    }
                    label="Hipotiroidismo"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.diagnosedDiseases.includes("Hipertiroidismo")}
                        onChange={(e) => handleDiagnosedCheckboxChange(e, "Hipertiroidismo")}
                      />
                    }
                    label="Hipertiroidismo"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.diagnosedDiseases.includes("Hipercolesterolemia")}
                        onChange={(e) => handleDiagnosedCheckboxChange(e, "Hipercolesterolemia")}
                      />
                    }
                    label="Hipercolesterolemia"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.diagnosedDiseases.includes("Hipertrigliceridemia")}
                        onChange={(e) => handleDiagnosedCheckboxChange(e, "Hipertrigliceridemia")}
                      />
                    }
                    label="Hipertrigliceridemia"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.diagnosedDiseases.includes("Resistencia a la insulina")}
                        onChange={(e) =>
                          handleDiagnosedCheckboxChange(e, "Resistencia a la insulina")
                        }
                      />
                    }
                    label="Resistencia a la insulina"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.diagnosedDiseases.includes(
                          "Síndrome de ovario poliquístico"
                        )}
                        onChange={(e) =>
                          handleDiagnosedCheckboxChange(e, "Síndrome de ovario poliquístico")
                        }
                      />
                    }
                    label="Síndrome de ovario poliquístico"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.diagnosedDiseases.includes("Sobrepeso / Obesidad.")}
                        onChange={(e) => handleDiagnosedCheckboxChange(e, "Sobrepeso / Obesidad.")}
                      />
                    }
                    label="Sobrepeso / Obesidad."
                  />
                  <SoftBox mb={2} display="flex">
                    <label htmlFor="diagnosedDiseasesOther" style={{ marginRight: "8px" }}>
                      Otros:
                    </label>
                    <textarea
                      id="diagnosedDiseasesOther"
                      name="diagnosedDiseasesOther"
                      placeholder="Especifique"
                      value={formData.diagnosedDiseasesOther}
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                      style={{ width: "100%" }}
                    />
                  </SoftBox>
                </SoftBox>
              </FormControl>
            </SoftBox>

            <SoftBox mb={2}>
              <label
                htmlFor="takeMedications"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                En caso de tomar medicamentos, ¿Qué medicamentos toma actualmente?. Especificar
                dosis y horario. Ejemplo: Metformina tabletas 850 mg, 1 tableta cada 12 horas.
              </label>
              <SoftBox mb={2} display="flex">
                <textarea
                  id="takeMedications"
                  name="takeMedications"
                  placeholder="Especifique"
                  value={formData.takeMedications}
                  onChange={handleChange}
                  required
                  rows="1"
                  className="global-textarea"
                />
              </SoftBox>
            </SoftBox>
          </SoftBox>
        )}

        {/* Sección de Antecedentes Ginecológicos */}
        {activeStep === 3 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Antecedentes Ginecológicos
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              Sección enfocada únicamente a mujeres, en caso de ser hombre por favor pasar
              directamente a la siguiente sección.
            </SoftTypography>

            <SoftBox sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {/* Edad de inicio de la menstruación */}
              <SoftBox sx={{ flex: "1 1 calc(33.33% - 16px)", minWidth: "200px" }}>
                <label
                  htmlFor="menstruation"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Edad de inicio de menstruación
                </label>
                <textarea
                  id="menstruation"
                  name="menstruation"
                  placeholder="Especifique"
                  value={formData.menstruation}
                  onChange={handleChange}
                  required
                  rows="1"
                  className="global-textarea"
                />
              </SoftBox>

              {/* Edad al dejar de menstruar */}
              <SoftBox sx={{ flex: "1 1 calc(33.33% - 16px)", minWidth: "200px" }}>
                <label
                  htmlFor="menstruationNull"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Edad al dejar de menstruar
                </label>
                <textarea
                  id="menstruationNull"
                  name="menstruationNull"
                  placeholder="Especifique"
                  value={formData.menstruationNull}
                  onChange={handleChange}
                  required
                  rows="1"
                  className="global-textarea"
                />
              </SoftBox>

              {/* Fecha de última menstruación */}
              <SoftBox sx={{ flex: "1 1 calc(33.33% - 16px)", minWidth: "200px" }}>
                <label
                  htmlFor="menstruationDate"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Fecha de última menstruación
                </label>
                <TextField
                  id="menstruationDate"
                  name="menstruationDate"
                  type="date"
                  value={formData.menstruationDate}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </SoftBox>
            </SoftBox>

            <SoftBox ml={2}>
              <SoftBox mb={2}>
                <label
                  htmlFor="pregnancies"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Número de embarazos
                </label>
                <RadioGroup
                  id="pregnancies"
                  name="pregnancies"
                  value={formData.pregnancies}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="0" control={<Radio />} label="0" />
                  <FormControlLabel value="1" control={<Radio />} label="1" />
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                  <FormControlLabel value="3" control={<Radio />} label="3" />
                  <FormControlLabel value="Otros" control={<Radio />} label="Otros" />
                </RadioGroup>
              </SoftBox>
            </SoftBox>
            {formData.pregnancies === "Otros" && (
              <SoftBox mb={2}>
                <textarea
                  id="otherPregnancies"
                  name="otherPregnancies"
                  placeholder="Especifique"
                  value={formData.otherPregnancies}
                  onChange={handleChange}
                  required
                  rows="1"
                  className="global-textarea"
                />
              </SoftBox>
            )}

            {["1", "2", "3", "Otros"].includes(formData.pregnancies) && (
              <FormControl component="fieldset">
                <SoftBox ml={2}>
                  <SoftTypography variant="subtitle2">
                    ¿Presentó alguna complicación durante los embarazos? Es posible seleccionar
                    varias respuestas.
                  </SoftTypography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.pregnanciesComplications.includes("Preeclampsia")}
                        onChange={(e) => handleComplicationsCheckboxChange(e, "Preeclampsia")}
                      />
                    }
                    label="Preeclampsia"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.pregnanciesComplications.includes("Diabetes gestacional")}
                        onChange={(e) =>
                          handleComplicationsCheckboxChange(e, "Diabetes gestacional")
                        }
                      />
                    }
                    label="Diabetes gestacional"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.pregnanciesComplications.includes("Hipertensión")}
                        onChange={(e) => handleComplicationsCheckboxChange(e, "Hipertensión")}
                      />
                    }
                    label="Hipertensión"
                  />
                </SoftBox>
              </FormControl>
            )}

            

            <SoftBox ml={2}>
              <SoftBox mb={2}>
                <label
                  htmlFor="menstruationTrue"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  En caso de seguir menstruando, ¿Cada cuánto llegan los periodos menstruales?
                </label>
                <RadioGroup
                  id="menstruationTrue"
                  name="menstruationTrue"
                  value={formData.menstruationTrue}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="Cada 21-30 días" control={<Radio />} label="Cada 21-30 días" />
                  <FormControlLabel value="Cada 31-40 días" control={<Radio />} label="Cada 31-40 días" />
                  <FormControlLabel value="Tardan más de 40 días" control={<Radio />} label="Tardan más de 40 días" />
                </RadioGroup>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        )}

        {activeStep === 4 && (
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Motivo de la consulta
            </SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              Sección enfocada a conocer la razón de su asistencia a la consulta.
            </SoftTypography>

            <SoftBox mb={2}>
              <label
                htmlFor="reasonConsultation"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Motivo de su consulta (Puede seleccionar varias opciones).
              </label>
              <SoftBox ml={2}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.reasonConsultation.includes("Control de diabetes")}
                        onChange={(e) => handleReasonsCheckboxChange(e, "Control de diabetes")}
                        aria-label="Control de diabetes"
                      />
                    }
                    label="Control de diabetes"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.reasonConsultation.includes("Control de hipertensión")}
                        onChange={(e) => handleReasonsCheckboxChange(e, "Control de hipertensión")}
                        aria-label="Control de hipertensión"
                      />
                    }
                    label="Control de hipertensión"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.reasonConsultation.includes("Control de peso")}
                        onChange={(e) => handleReasonsCheckboxChange(e, "Control de peso")}
                        aria-label="Control de peso"
                      />
                    }
                    label="Control de peso"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.reasonConsultation.includes(
                          "Control de resistencia a la insulina"
                        )}
                        onChange={(e) =>
                          handleReasonsCheckboxChange(e, "Control de resistencia a la insulina")
                        }
                        aria-label="Control de resistencia a la insulina"
                      />
                    }
                    label="Control de resistencia a la insulina"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.reasonConsultation.includes("Control de tiroides")}
                        onChange={(e) => handleReasonsCheckboxChange(e, "Control de tiroides")}
                        aria-label="Control de tiroides"
                      />
                    }
                    label="Control de tiroides"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.reasonConsultation.includes("Chequeo general")}
                        onChange={(e) => handleReasonsCheckboxChange(e, "Chequeo general")}
                        aria-label="Chequeo general"
                      />
                    }
                    label="Chequeo general"
                  />
                  <SoftBox mb={2} mt={1} display="flex">
                    <SoftTypography variant="subtitle2" style={{ marginRight: "8px" }}>
                      Otros:
                    </SoftTypography>
                    <textarea
                      id="consultationOther"
                      name="consultationOther"
                      placeholder="Especifique"
                      value={formData.consultationOther}
                      onChange={handleChange}
                      rows="1"
                      className="global-textarea"
                      style={{ width: "100%" }}
                      aria-label="Otros motivos de consulta"
                    />
                  </SoftBox>
                </FormControl>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        )}
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Botones de navegación */}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={goToPreviousStep}
            sx={{ mr: 1 }}
          >
            Atrás
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep < steps.length - 1 ? (
            <Button onClick={goToNextStep}>Siguiente</Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar
            </Button>
          )}
        </Box>
      </form>

      {/* Notas registradas */}
      <MedicalRecordsList />
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

    </SoftBox>
  );
}

export default HistorialClinico;
