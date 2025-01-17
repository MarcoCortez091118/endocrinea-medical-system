// Importaciones necesarias
import React, { useState } from "react";
import Card from "@mui/material/Card";
import {
  TextField,
  MenuItem,
  Select as MuiSelect,
  Input,
  Grid,
  Button,
  FormControl as MuiFormControl,
  InputLabel,
  FormControlLabel as MuiFormControlLabel,
  Radio,
  RadioGroup,
  DatePicker,
  Checkbox,
  Box as MuiBox,
  NativeSelect,
  FormLabel as MuiFormLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Global style textarea
import "layouts/TextareaStyles.css";
import button from "assets/theme/components/button";
import { Code, Margin, WidthFull } from "@mui/icons-material";

// Libreria gluestacks

function HistorialNutricional() {
  {
    /* Variables */
  }
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    reasonVisit: "",
    birthDate: "",
    occupation: "",

    familyHistory: {
      Diabetes: {
        Madre: false,
        Padre: false,
        Hermanos: false,
        "Tíos paternos": false,
        "Tíos maternos": false,
      },
      Hipertensión: {
        Madre: false,
        Padre: false,
        Hermanos: false,
        "Tíos paternos": false,
        "Tíos maternos": false,
      },
      Cancer: {
        Madre: false,
        Padre: false,
        Hermanos: false,
        "Tíos paternos": false,
        "Tíos maternos": false,
      },
      Infartos: {
        Madre: false,
        Padre: false,
        Hermanos: false,
        "Tíos paternos": false,
        "Tíos maternos": false,
      },
    },

    otherFamilyHistory: "",

    alergiaMedicamentos: "",
    otrosAlergiaMedicamentos: "",
    alergiaAlimentos: "",
    otrosAlergiaAlimentos: "",
    alimentosProibidos: "",
    otrosAlimentosProibidos: "",

    ejercicio: "",
    TiposEjercicios: "",
    ejercicioDiasSemana: "",
    ejercicioIntensidad: "",

    suenoInsomnio: false,
    suenoHoras: "",

    tabaquismo: false,
    alcoholismo: "",

    cirugias: "",
    padecimientosActuales: "",
    medicamentos: "",
    vitaminas: "",
    suplementos: "",

    laboratiosRelevantes: "",
    sintomasGastrointestinales: "",

    desayuno: "",
    colacion1: "",
    comina: "",
    colacion2: "",
    extras: "",

    frutas: "",
    verduras: "",
    carne: "",
    leche: "",
    queso: "",
    yogurt: "",
    tortilla: "",
    pan: "",
    arroz: "",
    pasta: "",
    leguminosas: "",
    azucares: "",
    galletas: "",
    aceites: "",
    aceitesProteina: "",
    comidaRapida: "",
    refresco: "",
    jugos: "",
    aguasSabor: "",
    aguaSimple: "",
    alimentosNoGustan: "",

    glucosa: "",
    presionArterial: "",
    temperatura: "",
    frecuenciaCardiaca: "",

    fechaPesos: "",
    pesoHabitual: "",
    pesoMaximo: "",
    pesoMinimo: "",
    pesoActual: "",

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

    objetivo: "",
    medicamentos: "",
    tipoPlanNutricional: "",
    especificaciones: "",

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
    consultationOther: "",
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
  const [actualDate] = useState(new Date().toISOString().split("T")[0]); // Fecha para "Actual"

  const optionsGender = [
    { label: "Hombre", value: "male" },
    { label: "Mujer", value: "female" },
  ];

  // Mapeo de nombres legibles para las claves
  const visibleFieldsMediciones = {
    fechaMediciones: "Fecha",
    cintura: "Cintura",
    abdomen: "Abdomen",
    cadera: "Cadera",
    brazoIzquierdo: "Brazo Izquierdo",
    brazoDerecho: "Brazo Derecho",
    pantorrillaDerecha: "Pantorrilla Derecha",
    pantorrillaIzquierda: "Pantorrilla Izquierda",
  };

  const visibleFieldsPesos = {
    fechaPesos: "Fecha",
    pesoHabitual: "Peso Habitual",
    pesoMaximo: "Peso Máximo",
    pesoMinimo: "Peso Mínimo",
    pesoActualPeso: "Peso Actual",
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>
              Generales
            </SoftTypography>
            <Grid container spacing={1} alignItems="center">
              {/* Nombre */}
              <Grid item xs={12} sm={3}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Nombre:
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
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  />
                </SoftBox>
              </Grid>

              {/* Género */}
              <Grid item xs={12} sm={3}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="gender"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Género:
                  </label>
                  <MuiFormControl variant="standard" fullWidth>
                    <MuiSelect
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
                    </MuiSelect>
                  </MuiFormControl>
                </SoftBox>
              </Grid>

              {/* Fecha de nacimiento */}
              <Grid item xs={12} sm={3}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="birthDate"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Fecha de nacimiento:
                  </label>
                  <TextField
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </SoftBox>
              </Grid>

              {/* Ocupación */}
              <Grid item xs={12} sm={3}>
                <SoftBox mb={2}>
                  <label
                    htmlFor="occupation"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Ocupación:
                  </label>
                  <textarea
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    rows="1"
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
            </Grid>

            {/* Motivo de visita */}
            <SoftBox mt={3}>
              <label
                htmlFor="reasonVisit"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Motivo de visita:
              </label>
              <textarea
                id="reasonVisit"
                name="reasonVisit"
                value={formData.reasonVisit}
                onChange={handleChange}
                rows="2"
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
          </SoftBox>

          {/* Antecedentes Heredo Familiares*/}
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
                        {disease}
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

          {/* ANTECEDENTES PERSONALES NO PATOLÓGICOS */}
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
                id="alergiaMedicamentos"
                name="alergiaMedicamentos"
                value={formData.alergiaMedicamentos}
                onChange={handleChange}
                required
              >
                <MuiFormControlLabel value="Si" control={<Radio />} label="Si" />
                <MuiFormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>
            {formData.alergiaMedicamentos === "Si" && (
              <SoftBox ml={2}>
                <textarea
                  id="otrosAlergiaMedicamentos"
                  name="otrosAlergiaMedicamentos"
                  placeholder="Especifique"
                  value={formData.otrosAlergiaMedicamentos}
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
                id="alergiaAlimentos"
                name="alergiaAlimentos"
                value={formData.alergiaAlimentos}
                onChange={handleChange}
                required
              >
                <MuiFormControlLabel value="Si" control={<Radio />} label="Sí" />
                <MuiFormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>
            {formData.alergiaAlimentos === "Si" && (
              <SoftBox ml={2}>
                <textarea
                  id="otrosAlergiaAlimentos"
                  name="otrosAlergiaAlimentos"
                  placeholder="Especifique"
                  value={formData.otrosAlergiaAlimentos}
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
                id="alimentosProibidos"
                name="alimentosProibidos"
                value={formData.alimentosProibidos}
                onChange={handleChange}
                required
              >
                <MuiFormControlLabel value="Si" control={<Radio />} label="Sí" />
                <MuiFormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </SoftBox>
            {formData.alimentosProibidos === "Si" && (
              <SoftBox ml={2}>
                <textarea
                  id="otrosAlimentosProhibidos"
                  name="otrosAlimentosProhibidos"
                  placeholder="Especifique"
                  value={formData.otrosAlimentosProibidos}
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
                  id="ejercicio"
                  name="ejercicio"
                  value={formData.ejercicio}
                  onChange={handleChange}
                  required
                >
                  <MuiFormControlLabel value="Si" control={<Radio />} label="Sí" />
                  <MuiFormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </SoftBox>

              {formData.ejercicio === "Si" && (
                <>
                  <SoftBox mb={2}>
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      ¿Cuál es el tipo de ejercicio que realiza?
                    </label>
                    <textarea
                      id="tiposEjercicio"
                      name="tiposEjercicio"
                      placeholder="Especifique"
                      value={formData.tiposEjercicio} // Nota: El nombre debe coincidir con los datos del formulario
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
                      id="exercise"
                      name="exercise"
                      value={formData.exercise}
                      onChange={handleChange}
                      required
                    >
                      <MuiFormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Al menos 1 día a la semana"
                      />
                      <MuiFormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Al menos 2 días a la semana"
                      />
                      <MuiFormControlLabel
                        value="3"
                        control={<Radio />}
                        label="3 o más días a la semana"
                      />
                      <MuiFormControlLabel
                        value="4"
                        control={<Radio />}
                        label="No hago ejercicio"
                      />
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
                      id="ejercicioIntensidad"
                      name="ejercicioIntensidad"
                      placeholder="Especifique"
                      value={formData.ejercicioIntensidad}
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    >
                      <MuiFormControlLabel value="Leve" control={<Radio />} label="Leve" />
                      <MuiFormControlLabel value="Moderado" control={<Radio />} label="Moderado" />
                      <MuiFormControlLabel value="Intenso" control={<Radio />} label="Intenso" />
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
                  id="suenoInsomnio"
                  name="suenoInsomnio"
                  value={formData.suenoInsomnio}
                  onChange={handleChange}
                  required
                >
                  <MuiFormControlLabel value="Si" control={<Radio />} label="Sí" />
                  <MuiFormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {formData.suenoInsomnio === "Si" && (
                  <SoftBox ml={4}>
                    <SoftTypography
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                    >
                      ¿Cuántas horas duerme por noche?
                    </SoftTypography>
                    <RadioGroup
                      id="suenoHoras"
                      name="suenoHoras"
                      value={formData.suenoHoras}
                      onChange={handleChange}
                      required
                    >
                      <MuiFormControlLabel
                        value="Menos de 4 horas"
                        control={<Radio />}
                        label="Menos de 4 horas"
                      />
                      <MuiFormControlLabel
                        value="4-5 horas"
                        control={<Radio />}
                        label="4-5 horas"
                      />
                      <MuiFormControlLabel
                        value="6-7 horas"
                        control={<Radio />}
                        label="6-7 horas"
                      />
                      <MuiFormControlLabel
                        value="8 horas (recomendado)"
                        control={<Radio />}
                        label="8 horas (recomendado)"
                      />
                      <MuiFormControlLabel
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
                  <MuiFormControlLabel value="Si" control={<Radio />} label="Sí" />
                  <MuiFormControlLabel value="No" control={<Radio />} label="No" />
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
                      <MuiFormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Menos de 5 cigarrillos al mes"
                      />
                      <MuiFormControlLabel
                        value="2"
                        control={<Radio />}
                        label="De 1 a 5 cigarrillos a la semana"
                      />
                      <MuiFormControlLabel
                        value="3"
                        control={<Radio />}
                        label="De 6 a 10 cigarrillos a la semana"
                      />
                      <MuiFormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Mas de 20 cigarrillos a la semana"
                      />
                      <MuiFormControlLabel value="Otros" control={<Radio />} label="Otros:" />
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
                  <MuiFormControlLabel value="Si" control={<Radio />} label="Sí" />
                  <MuiFormControlLabel value="No" control={<Radio />} label="No" />
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
                      <MuiFormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Sólo en fiestas o reuniones."
                      />
                      <MuiFormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Al menos una vez a la semana hasta llegar a la embriaguez."
                      />
                      <MuiFormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Al menos una vez a la semana sin llegar a la embriaguez."
                      />
                      <MuiFormControlLabel value="Otros" control={<Radio />} label=" Otros:" />
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

          {/* Antecedentes medicos */}
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
                <MuiFormControlLabel value="Si" control={<Radio />} label="Sí" />
                <MuiFormControlLabel value="No" control={<Radio />} label="No" />
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
                        <MuiFormControlLabel
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
            {[
              {
                id: "padecimientoActuales",
                label: "¿Tiene algún padecimiento o condición de salud actual que deba mencionar?",
              },
              {
                id: "medicamentos",
                label:
                  "¿Está tomando algún medicamento actualmente? Si es así, por favor especifique cuáles y con qué frecuencia.",
              },
              {
                id: "vitaminas",
                label: "¿Consume alguna vitamina regularmente? Si es así, indique cuáles.",
              },
              {
                id: "suplementos",
                label:
                  "¿Está consumiendo algún suplemento alimenticio o nutricional? Si es así, por favor especifique.",
              },
              {
                id: "laboratoriosRelevantes",
                label:
                  "¿Se ha realizado algún análisis de laboratorio reciente que considere importante mencionar? (por ejemplo, análisis de sangre, pruebas hormonales, etc.)",
              },
              {
                id: "sintomasGastrointestinales",
                label:
                  "¿Ha experimentado recientemente algún síntoma gastrointestinal, como dolor abdominal, náuseas, acidez, estreñimiento o diarrea?",
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

          {/* Evaluacion dietetica */}
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>Evaluación dietética</SoftTypography>
            <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
              RECORDATORIO DE 24 HORAS
            </SoftTypography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Desayuno:</label>
                  <textarea
                    id="desayuno"
                    name="desayuno"
                    placeholder="Especifique"
                    value={formData.desayuno}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Colación:</label>
                  <textarea
                    id="colacion1"
                    name="colacion1"
                    placeholder="Especifique"
                    value={formData.colacion1}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Comida:</label>
                  <textarea
                    id="comida"
                    name="comida"
                    placeholder="Especifique"
                    value={formData.comida}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Colación 2:</label>
                  <textarea
                    id="colacion2"
                    name="colacion2"
                    placeholder="Especifique"
                    value={formData.colacion2}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Extras:</label>
                  <textarea
                    id="extras"
                    name="extras"
                    placeholder="Especifique"
                    value={formData.extras}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>

          {/* Frecuencia de alimentos */}
          <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <SoftTypography variant="h5" color="secondary" mb={3}>Frecuencia de alimentos</SoftTypography>
            <SoftBox mb={2}>
              <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>Descripción de la frecuencia de los alimentos:</SoftTypography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((item, colIndex) => (
                          <TableCell key={colIndex}>
                            <Box sx={{ minWidth: 120 }}>
                              <MuiFormControl fullWidth>
                                <InputLabel id={`select-label-${rowIndex}-${colIndex}`}>
                                  {item}
                                </InputLabel>
                                <MuiSelect
                                  labelId={`select-label-${rowIndex}-${colIndex}`}
                                  id={`select-${rowIndex}-${colIndex}`}
                                  value={values[`${rowIndex}-${colIndex}`] || ""}
                                  onChange={(event) =>
                                    handleChange1(rowIndex, colIndex, event.target.value)
                                  }
                                >
                                  <MenuItem value="Nunca">Nunca</MenuItem>
                                  <MenuItem value="Rara vez">Rara vez</MenuItem>
                                  <MenuItem value="A veces">A veces</MenuItem>
                                  <MenuItem value="Frecuentemente">Frecuentemente</MenuItem>
                                  <MenuItem value="Siempre">Siempre</MenuItem>
                                </MuiSelect>
                              </MuiFormControl>
                            </Box>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <label>Alimentos que no le gustan:</label>
              <textarea
                id="alimentosNoGustan"
                name="alimentosNoGustan"
                placeholder="Especifique"
                value={formData.alimentosNoGustan}
                onChange={handleChange}
                required
                rows="1"
                className="global-textarea"
              />
            </SoftBox>
          </SoftBox>


          {/* Signos vitales y mediciones */}
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">SIGNOS VITALES</SoftTypography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <label>Glucosa:</label>
                      <textarea
                        id="glucosa"
                        name="glucosa"
                        placeholder="Especifique"
                        value={formData.glucosa}
                        rows="1"
                        className="global-textarea"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <label>Glucosa:</label>
                      <textarea
                        id="glucosa"
                        name="glucosa"
                        placeholder="Especifique"
                        value={formData.glucosa}
                        rows="1"
                        className="global-textarea"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <label>TDA:</label>
                      <textarea
                        id="presionArterial"
                        name="presionArterial"
                        placeholder="Especifique"
                        value={formData.presionArterial}
                        rows="1"
                        className="global-textarea"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <label>TDA:</label>
                      <textarea
                        id="presionArterial"
                        name="presionArterial"
                        placeholder="Especifique"
                        value={formData.presionArterial}
                        rows="1"
                        className="global-textarea"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <label>FC:</label>
                      <textarea
                        id="frecuenciaCardiaca"
                        name="frecuenciaCardiaca"
                        placeholder="Especifique"
                        value={formData.frecuenciaCardiaca}
                        rows="1"
                        className="global-textarea"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <label>Temperatura:</label>
                      <textarea
                        id="temperatura"
                        name="temperatura"
                        placeholder="Especifique"
                        value={formData.temperatura}
                        rows="1"
                        className="global-textarea"
                      />
                    </Grid>
                  </Grid>

                  <SoftBox mb={2}>
                    {/* Tabla de pesos */}
                    <div className="overflow-x-auto mt-8">
                      <h2 className="text-md font-bold">Pesos</h2>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                          <TableBody>
                            {/* Fecha Row */}
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                Fecha
                              </StyledTableCell>
                              <StyledTableCell align="center">{actualDate}</StyledTableCell>
                              {datesPesos.map((date, colIndex) => (
                                <StyledTableCell key={`date-col-${colIndex}`} align="center">
                                  {date}
                                </StyledTableCell>
                              ))}
                            </StyledTableRow>
                            {/* Medidas Rows */}
                            {Object.keys(visibleFieldsPesos).map((measurement, rowIndex) => (
                              <StyledTableRow key={measurement}>
                                <StyledTableCell component="th" scope="row">
                                  {visibleFieldsPesos[measurement]}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <input
                                    type="text"
                                    value={formData[measurement]}
                                    onChange={(e) => handleInputChange(e, measurement)}
                                    style={{
                                      width: "100%",
                                      padding: "8px",
                                      border: "1px solid #ccc",
                                      borderRadius: "4px",
                                      boxSizing: "border-box",
                                    }}
                                  />
                                </StyledTableCell>
                                {columnsPesos.map((col, colIndex) => (
                                  <StyledTableCell
                                    key={`cell-${colIndex}-${rowIndex}`}
                                    align="center"
                                  >
                                    <input
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
                                        boxSizing: "border-box",
                                      }}
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
                    </div>
                  </SoftBox>

                  <SoftBox mb={2}>
                    {/* Tabla de mediciones */}
                    <div className="overflow-x-auto mt-4">
                      <h2 className="text-md font-bold">Mediciones</h2>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                          <TableBody>
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
                            {Object.keys(visibleFieldsMediciones).map((measurement, rowIndex) => (
                              <StyledTableRow key={measurement}>
                                <StyledTableCell component="th" scope="row">
                                  {visibleFieldsMediciones[measurement]}
                                </StyledTableCell>
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
                                        handleNewMeasurementChange(
                                          e,
                                          rowIndex,
                                          colIndex,
                                          "mediciones"
                                        )
                                      }
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
                          onClick={() => addColumn("mediciones")}
                          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Agregar Columna
                        </Button>
                      </SoftBox>
                    </div>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          {/* Diagnostico */}
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">Diagnostico</SoftTypography>
                  <SoftBox mb={2}>
                    <textarea
                      id="diagnostico"
                      value={formData.diagnostico}
                      placeholder="Especifique"
                      onChange={handleChange}
                      required
                      rows="4"
                      className="global-textarea"
                    />
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          {/* Objetivo y Plan */}
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">Plan y objetivo</SoftTypography>
                  <SoftBox mb={2}>
                    <label>
                      <SoftTypography variant="body2">OBJETIVO:</SoftTypography>
                    </label>
                    <textarea
                      id="objetivo"
                      value={formData.objetivo}
                      placeholder="Especifique"
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>
                  <label>
                    <SoftTypography variant="body2">
                      MEDICAMENTOS Y SUPLEMENTOS AÑADIDOS:
                    </SoftTypography>
                  </label>
                  <SoftBox mb={2}>
                    <textarea
                      id="medicamentos"
                      value={formData.medicamentos}
                      placeholder="Especifique"
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>
                  <label>
                    <SoftTypography variant="body2">TIPO DE PLAN NUTRICIONAL:</SoftTypography>
                  </label>
                  <SoftBox mb={2}>
                    <textarea
                      id="tipoPlanNutricional"
                      value={formData.tipoPlanNutricional}
                      placeholder="Especifique"
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>
                  <label>
                    <SoftTypography variant="body2">ESPECIFICACIONES:</SoftTypography>
                  </label>
                  <SoftBox mb={2}>
                    <textarea
                      id="especificaciones"
                      value={formData.especificaciones}
                      placeholder="Especifique"
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          {/* Boton enviar */}
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
          </SoftBox>
        </form>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default HistorialNutricional;
