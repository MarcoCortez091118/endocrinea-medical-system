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
    fechaMediciones: "Fecha",
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
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" flexDirection="column" alignItems="flex-start" p={3}>
              <SoftTypography variant="h4">Nota Nutricional -</SoftTypography>
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
                Dra. Elizabeth Raquel Juárez <br />
                Mtra. Isbeth Gómez Díaz
                <br />
                LNC Laura Elizabeth Jiménez Criollo (Licenciada en Nutrición Clinica)
                <br />
                Dra. Victoria Sandoval Nava
                <br />
              </SoftTypography>
              <SoftTypography variant="subtitle2" fontWeight="medium" mt={4}>
                Circuito Juan Pablo II. PB No. 3113. Colonia Fraccionamiento Las Ánimas, Puebla.
              </SoftTypography>
            </SoftBox>
          </Card>
        </SoftBox>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {/* Generales */}
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftTypography variant="h5">Subjetivo</SoftTypography>
                <SoftBox mb={2}>
                  <label htmlFor="sintomas" style={{ display: "block", marginBottom: "8px" }}>
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
                <SoftBox mb={2}>
                  <label htmlFor="energia" style={{ display: "block", marginBottom: "8px" }}>
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

                <SoftBox mb={2}>
                  <label htmlFor="sintomasGastrointestinales">Sintomas gastrointestinales:</label>
                  <RadioGroup
                    id="sintomasGastrointestinales"
                    name="sintomasGastrointestinales"
                    value={formData.sintomasGastrointestinales}
                    onChange={handleChange}
                    required
                    >
                    <MuiFormControlLabel value="Si" control={<Radio />} label="Sí" />
                    </RadioGroup>
                    {formData.sintomasGastrointestinales === "Si" && (
                    <>
                        <SoftBox ml={4}>
                        <label>Síntomas:</label>
                        <MuiFormControlLabel
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
                            />
                        </SoftBox>
                        )}

                        <MuiFormControlLabel
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
                            />
                        </SoftBox>
                        )}
                        </SoftBox>
                        
                    </>
                    )}


                  <RadioGroup
                    id="sintomasGastrointestinales"
                    name="sintomasGastrointestinales"
                    value={formData.sintomasGastrointestinales}
                    onChange={handleChange}
                    required
                  >
                    <MuiFormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </SoftBox>
                <SoftBox mb={2}>
                  <label>Enfermedades:</label>
                  <textarea
                    id="padecimientoActuales"
                    name="padecimientoActuales"
                    placeholder="Especifique"
                    value={formData.padecimientosActuales}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <label>Complicaciones:</label>
                  <textarea
                    id="complicaciones"
                    name="complicaciones"
                    placeholder="Especifique"
                    value={formData.complicaciones}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <label>Liquidos:</label>
                  <textarea
                    id="liquidos"
                    name="liquidos"
                    placeholder="Especifique"
                    value={formData.liquidos}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftTypography variant="h5">Objetivo</SoftTypography>
                <SoftTypography variant="subtitle2">Ejercicio:</SoftTypography>
                <SoftBox mb={2}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <label>Tipo de ejercicio:</label>
                      <textarea
                        id="TiposEjercicios"
                        name="TiposEjercicios"
                        placeholder="Especifique"
                        value={formData.TiposEjercicios}
                        onChange={handleChange}
                        rows="1"
                        className="global-textarea"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <label>Días a la semana:</label>
                      <textarea
                        id="ejercicioDiasSemana"
                        name="ejercicioDiasSemana"
                        placeholder="Especifique"
                        value={formData.ejercicioDiasSemana}
                        onChange={handleChange}
                        rows="1"
                        className="global-textarea"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <label>Intensidad:</label>
                      <textarea
                        id="ejercicioIntensidad"
                        name="ejercicioIntensidad"
                        placeholder="Especifique"
                        value={formData.ejercicioIntensidad}
                        onChange={handleChange}
                        rows="1"
                        className="global-textarea"
                      />
                    </Grid>
                  </Grid>
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
                  <SoftTypography variant="subtitle2" sx={{ fontWeight: "bold" }} mt={3}>
                    RECORDATORIO DE 24 HORAS
                  </SoftTypography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <SoftBox mb={2}>
                        <label>Desayuno:</label>
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
                        <label>Colacion:</label>
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
                        <label>Comida:</label>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SoftBox mb={2}>
                        <label>Colacion 2:</label>
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
                        <label>Extras:</label>
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
              </SoftBox>
            </Card>
          </SoftBox>

          {/* mediciones */}
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftBox mb={2}>
                    {/* Tabla de mediciones */}
                    <div className="overflow-x-auto mt-4">
                      <h2 className="text-md font-bold">Exploración Física (antropometría):</h2>
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
                  <SoftTypography variant="h4">Plan:</SoftTypography>
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

export default NotaNutricional;
