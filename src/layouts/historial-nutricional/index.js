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
  FormLabel as MuiFormLabel,
} from "@mui/material";
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

  {/* Variables */}
  const [formData, setFormData] = useState({
    name:"",
    gender:"",
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
      "Cancer": {
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
    
    alergiaMedicamentos: "",
    otrosAlergiaMedicamentos: "",
    alergiaAlimentos: "",
    otrosAlergiaAlimentos: "",
    alimentosProibidos: "",
    otrosAlimentosProibidos: "",
    
    ejercicio:"",
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
    
    fechaPesos:"",
    pesoHabitual: "",
    pesoMaximo: "",
    pesoMinimo: "",
    pesoActual: "",
    
    fechaMediciones:"",
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
  const visibleFieldsMediciones  = {
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


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" flexDirection="column" alignItems="flex-start" p={3}>
              <SoftTypography variant="h4">Historia Clínica Nutricional -</SoftTypography>
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
                Dra. Elizabeth Raquel Juárez <br/>
                Mtra. Isbeth Gómez Díaz<br/>
                LNC Laura Elizabeth Jiménez Criollo (Licenciada en Nutrición Clinica)<br/>
                Dra. Victoria Sandoval Nava<br/>
              </SoftTypography>
              <SoftTypography variant="subtitle2" fontWeight="medium" mt={4}>
                Circuito Juan Pablo II. PB No. 3113. Colonia Fraccionamiento Las Ánimas, Puebla.
              </SoftTypography>
            </SoftBox>
          </Card>
        </SoftBox>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftTypography variant="h5">Generales</SoftTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <label>
                      Nombre:
                    </label>
                    <textarea
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="global-textarea"
                      />
                      
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  </Grid>

                </Grid>
                <SoftBox mb={2}>
                  <label htmlFor="reasonVisit">Motivo de visita *</label>
                  <textarea
                    id="reasonVisit"
                    name="reasonVisit"
                    value={formData.reasonVisit}
                    onChange={handleChange}
                    required
                    className="global-textarea"
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <label htmlFor="birthDate">Fecha de nacimiento *</label>
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

                <SoftBox mb={2}>
                  <label htmlFor="occupation">Ocupación *</label>
                  <textarea
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          {/* Antecedentes Heredo Familiares*/}
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">Antecedentes Heredo familiares</SoftTypography>
                  <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                    En esta sección deberá contestar si alguno de sus familiares tiene diagnosticada
                    alguna de las enfermedades especificadas a continuación. Por favor, responda
                    sólo si está seguro(a) del diagnóstico.
                  </SoftTypography>
                    {/*  */}
                    <SoftBox mb={2}>
                    <label htmlFor="religion">
                      ¿Alguien de su familia ha sido diagnosticado con alguna de las siguientes
                      enfermedades ?
                    </label>
                    <SoftBox mt={3}>
                      <table>
                        <thead>
                          <tr>
                            <th className="ancho"></th>
                            <th className="ancho">Madre</th>
                            <th className="ancho">Padre</th>
                            <th className="ancho">Hermanos</th>
                            <th className="ancho">Tíos paternos</th>
                            <th className="ancho">Tíos maternos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(formData.familyHistory).map((disease) => (
                            <tr key={disease}>
                              <td style={{ padding: "8px" }}>{disease}</td>
                              {Object.keys(formData.familyHistory[disease]).map((familyMember) => (
                                <td
                                  key={familyMember}
                                  style={{ textAlign: "center", padding: "8px" }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.familyHistory[disease][familyMember]}
                                    onChange={(e) => handleCheckboxChange(e, disease, familyMember)}
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
              </SoftBox>
            </Card>
          </SoftBox>
        
          {/* ANTECEDENTES PERSONALES NO PATOLÓGICOS */}
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">Antecedentes personales</SoftTypography>
                  <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                    En esta sección recabaremos información sobre sus antecedentes médicos.
                  </SoftTypography>
                  <SoftBox mb={2}>
                    <label htmlFor="alergiaMedicamentos">
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
                    <SoftBox mb={2}>
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
                </SoftBox>
                <SoftBox mb={2}>
                  <label htmlFor="alergiaAlimentos">
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
                    <label htmlFor="alimentosProibidos">
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
                   {
                    formData.alimentosProibidos === "Si" && (
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
                   <Card>
                    <SoftBox p={3}>
                        <SoftBox mb={2}>
                            <SoftTypography variant="h5">Ejercicio:</SoftTypography>
                            <SoftBox mb={2}>
                                <label>¿Realiza algún tipo de ejercicio?</label>
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
                                        <label>¿Cuál es el tipo de ejercicio que realiza?</label>
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
                                        <label>¿Cuántos días a la semana realiza ejercicio?</label>
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
                                        <label>
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
                                            <MuiFormControlLabel value="Leve" control={<Radio />} label="Leve"/>
                                            <MuiFormControlLabel value="Moderado" control={<Radio />} label="Moderado"/>
                                            <MuiFormControlLabel value="Intenso" control={<Radio />} label="Intenso"/>
                                        </RadioGroup>
                                    </SoftBox>
                                </>
                            )}
                        </SoftBox>
                    </SoftBox>
                   </Card>
                   <br></br>
                   <Card>
                    <SoftBox p={3}>
                        <SoftBox mb={2}>
                            <SoftTypography variant="h5">Sueño:</SoftTypography>
                            <SoftBox mb={2}>
                                <label>¿Usted sufre de insomnio?</label>
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
                            </SoftBox>
                            <SoftBox mb={2}>
                                <label>¿Cuántas horas duerme por noche?</label>
                                <RadioGroup
                                id="suenoHoras"
                                name="suenoHoras"
                                value={formData.suenoHoras}
                                onChange={handleChange}
                                required
                                >
                                    <MuiFormControlLabel value="Menos de 4 horas" control={<Radio />} label="Menos de 4 horas" />
                                    <MuiFormControlLabel value="4-5 horas" control={<Radio />} label="4-5 horas" />
                                    <MuiFormControlLabel value="6-7 horas" control={<Radio />} label="6-7 horas" />
                                    <MuiFormControlLabel value="8 horas (recomendado)" control={<Radio />} label="8 horas (recomendado)" />
                                    <MuiFormControlLabel value="Más de 8 horas" control={<Radio />} label="Más de 8 horas" />
                                </RadioGroup>
                            </SoftBox>
                        </SoftBox>
                    </SoftBox>
                   </Card>
                   <br></br>
                   <Card>
                    <SoftBox p={3}>
                        <SoftBox mb={2}>
                            <SoftTypography variant="h5">Tabaquismo:</SoftTypography>
                            <SoftBox mb={2}>
                                <label>¿Fuma o ha fumado en el pasado?</label>
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
                                            <label>¿Cuántos cigarros fuma al día?</label>
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
                                            {
                                                formData.smokeHistory === "Otros" && (
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
                    </SoftBox>
                   </Card>
                   <br></br>
                   <Card>
                    <SoftBox p={3}>
                        <SoftBox mb={2}>
                            <SoftTypography variant="h5">Alcoholismo:</SoftTypography>
                            <SoftBox mb={2}>
                                <label htmlFor="alcohol">
                                    ¿Consume alcohol?
                                </label>
                                <RadioGroup
                                id="alcohol"
                                name="alcohol"
                                value={formData.alcohol}
                                onChange={handleChange}
                                required
                                >
                                    <MuiFormControlLabel value="Si" control={<Radio />} label="Sí"/>
                                    <MuiFormControlLabel value="No" control={<Radio />} label="No"/>
                                </RadioGroup>
                                {formData.alcohol === "Si" && (
                                    <SoftBox mb={2}>
                                        <label>
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
                   </Card>
              </SoftBox>
            </Card>         
          </SoftBox>

          {/* Antecedentes medicos */}
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">Antecedentes Médicos</SoftTypography>
                  <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                    Sección enfocada a conocer si padece alguna enfermedad y la medicación que
                    actualmente utiliza.
                  </SoftTypography>
                  <SoftBox mb={2}>
                  <label htmlFor="surgery">
                    ¿Le han realizado alguna cirugía? Es posible seleccionar varías respuestas.
                  </label>
                  <RadioGroup
                    id="surgery"
                    name="surgery"
                    value={formData.surgery}
                    onChange={handleChange}
                    required
                  >
                    <MuiFormControlLabel value="Si" control={<Radio />} label="Sí" />
                  </RadioGroup>
                  {formData.surgery === "Si" && (
                    <SoftBox ml={4}>
                      <MuiFormControl component="fieldset">
                        <SoftTypography variant="subtitle2">
                          Seleccione las cirugías que le hayan realizado:
                        </SoftTypography>
                        <SoftBox>
                          <MuiFormControlLabel
                            control={
                              <Checkbox
                                checked={formData.surgeryHistory.includes("Apendicectomía")}
                                onChange={(e) => handleSurgeryCheckboxChange(e, "Apendicectomía")}
                              />
                            }
                            label="Apendicectomía"
                          />
                          <MuiFormControlLabel
                            control={
                              <Checkbox
                                checked={formData.surgeryHistory.includes("Colecistectomía")}
                                onChange={(e) => handleSurgeryCheckboxChange(e, "Colecistectomía")}
                              />
                            }
                            label="Colecistectomía"
                          />
                          <MuiFormControlLabel
                            control={
                              <Checkbox
                                checked={formData.surgeryHistory.includes("Cesarea")}
                                onChange={(e) => handleSurgeryCheckboxChange(e, "Cesarea")}
                              />
                            }
                            label="Cesarea"
                          />
                          <MuiFormControlLabel
                            control={
                              <Checkbox
                                checked={formData.surgeryHistory.includes("Cirugía bariatríca")}
                                onChange={(e) =>
                                  handleSurgeryCheckboxChange(e, "Cirugía bariatríca")
                                }
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
                      </MuiFormControl>
                    </SoftBox>
                  )}
                  <RadioGroup
                    id="surgery"
                    name="surgery"
                    value={formData.surgery}
                    onChange={handleChange}
                    required
                  >
                    <MuiFormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </SoftBox>
                <SoftBox mb={2}>
                    <label>
                        ¿Tiene algún padecimiento o condición de salud actual que deba mencionar?
                    </label>
                    <textarea
                    id="padecimientoActuales"
                    name="padecimientoActuales"
                    placeholder="Especifique"
                    value={formData.padecimientoActuales}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <label>
                    ¿Está tomando algún medicamento actualmente? Si es así, por favor especifique cuáles y con qué frecuencia.
                    </label>
                    <textarea
                    id="medicamentos"
                    name="medicamentos"
                    placeholder="Especifique"
                    value={formData.medicamentos}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <label>
                    ¿Consume alguna vitamina regularmente? Si es así, indique cuáles.
                    </label>
                    <textarea
                    id="vitaminas"
                    name="vitaminas"
                    placeholder="Especifique"
                    value={formData.vitaminas}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <label>
                    ¿Está consumiendo algún suplemento alimenticio o nutricional? Si es así, por favor especifique.
                    </label>
                    <textarea
                    id="suplementos"
                    name="suplementos"
                    placeholder="Especifique"
                    value={formData.suplementos}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <label>
                    ¿Se ha realizado algún análisis de laboratorio reciente que considere importante mencionar? (por ejemplo, análisis de sangre, pruebas hormonales, etc.)
                    </label>
                    <textarea
                    id="laboratoriosRelevantes"
                    name="laboratoriosRelevantes"
                    placeholder="Especifique"
                    value={formData.laboratoriosRelevantes}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <label>
                    ¿Ha experimentado recientemente algún síntoma gastrointestinal, como dolor abdominal, náuseas, acidez, estreñimiento o diarrea?
                    </label>
                    <textarea
                    id="sintomasGastrointestinales"
                    name="sintomasGastrointestinales"
                    placeholder="Especifique"
                    value={formData.sintomasGastrointestinales}
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

          {/* Evaluacion dietetica */}
          <SoftBox mt={4}>
              <Card>
                <SoftBox p={3}>
                  <SoftBox mb={2}>
                    <SoftTypography variant="h4">Evaluación dietética</SoftTypography>
                    <SoftTypography variant="subtitle2" sx={{ fontWeight: 'bold' }} mt={3}>
                      RECORDATORIO DE 24 HORAS
                    </SoftTypography>
                    <SoftBox mb={2}>
                      <label>
                          Desayuno:
                      </label>
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
                    <SoftBox mb={2}>
                      <label>
                          Colacion:
                      </label>
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
                    <SoftBox mb={2}>
                      <label>
                          Comida:
                      </label>
                      <textarea
                      id="comida"
                      name="comida"
                      placeholder="Especifique"
                      value={formData.comina}
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <label>
                          Colacion 2:
                      </label>
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
                    <SoftBox mb={2}>
                      <label>
                          Extras:
                      </label>
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
                  </SoftBox>
              </SoftBox>
              </Card>
          </SoftBox>            

          {/* Frecuencia de alimentos */}
          <SoftBox mt={4}>
              <Card>
                <SoftBox p={3}>
                  <SoftBox mb={2}>
                    <SoftTypography variant="h4">FRECUENCIA DE ALIMENTOS</SoftTypography>
                    <SoftBox mb={2}>
                      <label>
                        Descripcion de la frecuencia de los alimentos:
                      </label>
                      <table>
                        <tbody>
                          {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((item, colIndex) => (
                                <td key={colIndex}>
                                  <label>{item}</label>
                                  <select>
                                    <option value="Nunca">Nunca</option>
                                    <option value="Rara vez">Rara vez</option>
                                    <option value="A veces">A veces</option>
                                    <option value="Frecuentemente">Frecuentemente</option>
                                    <option value="Siempre">Siempre</option>
                                  </select>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <label>
                        Alimentos que no le gustan:
                      </label>
                      <textarea
                      id="alimentosNoGustan"
                      name="alimentosNoGustan"
                      placeholder="Especifique"
                      value={formData.alimentosNoGustan}
                      rows="1"
                      className="global-textarea"
                      />
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </Card>
          </SoftBox>

          {/* Signos vitales y mediciones */}
          <SoftBox mt={4}>
              <Card>
                <SoftBox p={3}>
                  <SoftBox mb={2}>
                    <SoftTypography variant="h4">SIGNOS VITALES</SoftTypography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <label>
                          Glucosa:
                        </label>
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
                        <label>
                          Glucosa:
                        </label>
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
                        <label>
                          TDA:
                        </label>
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
                        <label>
                          TDA:
                        </label>
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
                        <label>
                          FC:
                        </label>
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
                        <label>
                          Temperatura:
                        </label>
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
                        <table className="min-w-full border border-gray-300">
                          <thead>
                            <tr>
                              <th className="border border-gray-300 px-4 py-2 text-left">Medida</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Actual</th>
                              {columnsPesos.map((_, colIndex) => (
                                <th
                                  key={`col-${colIndex}`}
                                  className="border border-gray-300 px-4 py-2 text-left"
                                >
                                  Medición {colIndex + 1}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2 font-bold">Fecha</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{actualDate}</td>
                              {datesPesos.map((date, colIndex) => (
                                <td
                                  key={`date-col-${colIndex}`}
                                  className="border border-gray-300 px-4 py-2 text-center"
                                >
                                  {date}
                                </td>
                              ))}
                            </tr>
                            {Object.keys(visibleFieldsPesos).map((measurement, rowIndex) => (
                              <tr key={measurement}>
                                <td className="border border-gray-300 px-4 py-2">
                                  {visibleFieldsPesos[measurement]}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full border border-gray-300 px-2 py-1"
                                    value={formData[measurement]}
                                    onChange={(e) => handleInputChange(e, measurement)}
                                  />
                                </td>
                                {columnsPesos.map((col, colIndex) => (
                                  <td key={`cell-${colIndex}-${rowIndex}`} className="border border-gray-300 px-4 py-2">
                                    <input
                                      type="text"
                                      className="w-full border border-gray-300 px-2 py-1"
                                      value={col[rowIndex] || ""}
                                      onChange={(e) =>
                                        handleNewMeasurementChange(e, rowIndex, colIndex, "pesos")
                                      }
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button
                          onClick={() => addColumn("pesos")}
                          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Agregar Columna
                        </button>
                      </div>
                    </SoftBox>

                    <SoftBox mb={2}>
                      {/* Tabla de mediciones */}
                      <div className="overflow-x-auto mt-4">
                        <h2 className="text-md font-bold">Mediciones</h2>
                        <table className="min-w-full border border-gray-300">
                          <thead>
                            <tr>
                              <th className="border border-gray-300 px-4 py-2 text-left">Medida</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Actual</th>
                              {columnsMediciones.map((_, colIndex) => (
                                <th
                                  key={`col-${colIndex}`}
                                  className="border border-gray-300 px-4 py-2 text-left"
                                >
                                  Medición {colIndex + 1}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2 font-bold">Fecha</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{actualDate}</td>
                              {datesMediciones.map((date, colIndex) => (
                                <td
                                  key={`date-col-${colIndex}`}
                                  className="border border-gray-300 px-4 py-2 text-center"
                                >
                                  {date}
                                </td>
                              ))}
                            </tr>
                            {Object.keys(visibleFieldsMediciones).map((measurement, rowIndex) => (
                              <tr key={measurement}>
                                <td className="border border-gray-300 px-4 py-2">
                                  {visibleFieldsMediciones[measurement]}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full border border-gray-300 px-2 py-1"
                                    value={formData[measurement]}
                                    onChange={(e) => handleInputChange(e, measurement)}
                                  />
                                </td>
                                {columnsMediciones.map((col, colIndex) => (
                                  <td key={`cell-${colIndex}-${rowIndex}`} className="border border-gray-300 px-4 py-2">
                                    <input
                                      type="text"
                                      className="w-full border border-gray-300 px-2 py-1"
                                      value={col[rowIndex] || ""}
                                      onChange={(e) =>
                                        handleNewMeasurementChange(e, rowIndex, colIndex, "mediciones")
                                      }
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button
                          onClick={() => addColumn("mediciones")}
                          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Agregar Columna
                        </button>
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
                      rows="1"
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
                      <SoftTypography variant="body2">MEDICAMENTOS Y SUPLEMENTOS AÑADIDOS:</SoftTypography>
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
