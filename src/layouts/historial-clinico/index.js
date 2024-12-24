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
import { Margin, WidthFull } from "@mui/icons-material";

function HistorialClinico() {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    fullName: "",
    birthDate: "",
    age: "",
    city: "",
    occupation: "",
    maritalStatus: "",
    otherStatus: "",
    religion: "",
    otherReligion: "",
    gender: "",
    otherGender: "",
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
      "Colesterol alto": {
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

    // Convertir los datos a JSON y crear un archivo TXT para descargar
    const blob = new Blob([JSON.stringify(dataToSend, null, 2)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = "historial-clinico.txt";
    link.click();
    // Liberar memoria del objeto URL
    URL.revokeObjectURL(url);

    console.log("Datos a enviar:", formData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" flexDirection="column" alignItems="flex-start" p={3}>
              <SoftTypography variant="h4">Historia Clínica -</SoftTypography>
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
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <label htmlFor="email">Correo electrónico *</label>
                  <textarea
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>

                <SoftBox mb={2}>
                  <label htmlFor="phoneNumber">Numero teléfonico con WhatsApp *</label>
                  <textarea
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
                  />
                </SoftBox>

                <SoftBox mb={2}>
                  <label htmlFor="fullName">
                    Nombre completo (Nombre / Apellido paterno / Apellido materno) *
                  </label>
                  <textarea
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    rows="1"
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
                  <label htmlFor="age">Edad *</label>
                  <TextField
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    fullWidth
                    className="global-textarea"
                  />
                </SoftBox>

                <SoftBox mb={2}>
                  <label htmlFor="city">Ciudad o municipio de residencia actual *</label>
                  <textarea
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    rows="1"
                    className="global-textarea"
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

                <SoftBox mb={2}>
                  <label htmlFor="maritalStatus">Estado civil *</label>
                  <RadioGroup
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    required
                  >
                    <FormControlLabel value="Soltero(a)" control={<Radio />} label="Soltero(a)" />
                    <FormControlLabel value="Casado(a)" control={<Radio />} label="Casado(a)" />
                    <FormControlLabel value="Union Libre" control={<Radio />} label="Unión libre" />
                    <FormControlLabel value="Otros" control={<Radio />} label="Otros" />
                  </RadioGroup>
                </SoftBox>
                {formData.maritalStatus === "Otros" && (
                  <SoftBox mb={2}>
                    <textarea
                      id="otherStatus"
                      name="otherStatus"
                      placeholder="Especifique"
                      value={formData.otherStatus}
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>
                )}

                <SoftBox mb={2}>
                  <label htmlFor="religion">
                    ¿Su RELIGIÓN le impide comer algún tipo de alimento?
                  </label>
                  <RadioGroup
                    id="religion"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                  >
                    <FormControlLabel value="Si" control={<Radio />} label="Si" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </SoftBox>
                {formData.religion === "Si" && (
                  <SoftBox mb={2}>
                    <textarea
                      id="otherReligion"
                      name="otherReligion"
                      placeholder="Especifique"
                      value={formData.otherReligion}
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>
                )}

                <SoftBox mb={2}>
                  <label htmlFor="gender">Genero</label>
                  <RadioGroup
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <FormControlLabel value="H" control={<Radio />} label="H" />
                    <FormControlLabel value="M" control={<Radio />} label="M" />
                    <FormControlLabel value="Otros" control={<Radio />} label="Otros" />
                  </RadioGroup>
                </SoftBox>
                {formData.gender === "Otros" && (
                  <SoftBox mb={2}>
                    <textarea
                      id="otherGender"
                      name="otherGender"
                      placeholder="Especifique"
                      value={formData.otherGender}
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>
                )}
              </SoftBox>
            </Card>
          </SoftBox>

          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">Antecedentes familiares</SoftTypography>
                  <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                    En esta sección deberá contestar si alguno de sus familiares tiene diagnosticada
                    alguna de las enfermedades especificadas a continuación. Por favor, responda
                    sólo si está seguro(a) del diagnóstico.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
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

          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">Antecedentes personales</SoftTypography>
                  <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                    En esta sección recabaremos información sobre sus antecedentes médicos.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <label htmlFor="smoke">¿Fuma?</label>
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
                          value="1"
                          control={<Radio />}
                          label="Menos de 5 cigarrillos al mes"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="De 1-5 cigarrillos a la semana"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="De 6-10 cigarrillos a la semana"
                        />
                        <FormControlLabel
                          value="4"
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
                  <label htmlFor="alcohol">¿Consume alcohol?</label>
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
                  <label htmlFor="drug">¿Consume o ha consumido algún tipo de droga?</label>
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
                  <label htmlFor="exercise">¿Actualmente realiza ejercicio?</label>
                  <RadioGroup
                    id="exercise"
                    name="exercise"
                    value={formData.exercise}
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
              </SoftBox>
            </Card>
          </SoftBox>

          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">Antecedentes Médicos</SoftTypography>
                  <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                    Sección enfocada a conocer si padece alguna enfermedad y la medicación que
                    actualmente utiliza.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <label htmlFor="allergicMedicine">
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
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>
                </SoftBox>

                <SoftBox mb={2}>
                  <label htmlFor="allergicFood">¿Es alérgico(a) a algún alimento? ¿Cuál?</label>
                  <SoftBox mb={2}>
                    <textarea
                      id="allergicFood"
                      name="allergicFood"
                      placeholder="Especifique"
                      value={formData.allergicFood}
                      onChange={handleChange}
                      required
                      rows="1"
                      className="global-textarea"
                    />
                  </SoftBox>
                </SoftBox>

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
                  <label htmlFor="diagnosedDiseases">
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
                            onChange={(e) =>
                              handleDiagnosedCheckboxChange(e, "Hipercolesterolemia")
                            }
                          />
                        }
                        label="Hipercolesterolemia"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.diagnosedDiseases.includes("Hipertrigliceridemia")}
                            onChange={(e) =>
                              handleDiagnosedCheckboxChange(e, "Hipertrigliceridemia")
                            }
                          />
                        }
                        label="Hipertrigliceridemia"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.diagnosedDiseases.includes(
                              "Resistencia a la insulina"
                            )}
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
                            onChange={(e) =>
                              handleDiagnosedCheckboxChange(e, "Sobrepeso / Obesidad.")
                            }
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
                  <label htmlFor="takeMedications">
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
            </Card>
          </SoftBox>

          {formData.gender === "M" && (
            <SoftBox mt={4}>
              <Card>
                <SoftBox p={3}>
                  <SoftBox mb={2}>
                    <SoftTypography variant="h4">Antecedentes Ginecológicos</SoftTypography>
                    <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                      Sección enfocada únicamente a mujeres, en caso de ser hombre por favor pasar
                      directamente a la siguiente sección.
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>

                <SoftBox p={3}>
                  <SoftBox mb={2}>
                    <label htmlFor="menstruation">¿A qué edad comenzó a menstruar?</label>
                    <SoftBox mb={2} display="flex">
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
                  </SoftBox>
                </SoftBox>

                <SoftBox p={3}>
                  <SoftBox mb={2}>
                    <label htmlFor="menstruationNull">
                      En caso de haber dejado de menstruar, ¿A qué edad dejó de menstruar?
                    </label>
                    <SoftBox mb={2} display="flex">
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
                  </SoftBox>
                </SoftBox>

                <SoftBox p={3}>
                  <SoftBox mb={2}>
                    <label htmlFor="menstruationDate">
                      En caso de que su periodo siga llegando, ¿Cuál es la fecha de inicio de su
                      última menstruación?
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
                    <label htmlFor="pregnancies">Número de embarazos</label>
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
                {["1", "2", "3"].includes(formData.pregnancies) && (
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
                            checked={formData.pregnanciesComplications.includes(
                              "Diabetes gestacional"
                            )}
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

                <SoftBox ml={2}>
                  <SoftBox mb={2}>
                    <label htmlFor="menstruationTrue">
                      En caso de seguir menstruando, ¿Cada cuánto llegan los periodos menstruales?
                    </label>
                    <RadioGroup
                      id="menstruationTrue"
                      name="menstruationTrue"
                      value={formData.menstruationTrue}
                      onChange={handleChange}
                      required
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Cada 21-30 dias" />
                      <FormControlLabel value="2" control={<Radio />} label="Cada 31-40 dias" />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Tardan mas de 40 días"
                      />
                    </RadioGroup>
                  </SoftBox>
                </SoftBox>
              </Card>
            </SoftBox>
          )}

          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <SoftTypography variant="h4">Motivo de la consulta.</SoftTypography>
                  <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                    Sección enfocada a conocer la razón de su asistencia a la consulta.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          <SoftBox mt={4}>
            <Card>
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <label htmlFor="reasonConsultation">
                    Motivo de su consulta (Puede seleccionar varias opciones).
                  </label>
                  <SoftBox ml={2}>
                    <FormControl component="fieldset">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.reasonConsultation.includes("Control de diabetes")}
                            onChange={(e) =>
                              handleReasonsCheckboxChange(e, "Control de diabetes")
                            }
                          />
                        }
                        label="Control de diabetes"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.reasonConsultation.includes("Control de hipertensión")}
                            onChange={(e) =>
                              handleReasonsCheckboxChange(e, "Control de hipertensión")
                            }
                          />
                        }
                        label="Control de hipertensión"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.reasonConsultation.includes("Control de peso")}
                            onChange={(e) =>
                              handleReasonsCheckboxChange(e, "Control de peso")
                            }
                          />
                        }
                        label="Control de peso"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.reasonConsultation.includes("Control de resistencia a la insulina")}
                            onChange={(e) =>
                              handleReasonsCheckboxChange(e, "Control de resistencia a la insulina")
                            }
                          />
                        }
                        label="Control de resistencia a la insulina"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.reasonConsultation.includes("Control de tiroides")}
                            onChange={(e) =>
                              handleReasonsCheckboxChange(e, "Control de tiroides")
                            }
                          />
                        }
                        label="Control de tiroides"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.reasonConsultation.includes("Chequeo general")}
                            onChange={(e) =>
                              handleReasonsCheckboxChange(e, "Chequeo general")
                            }
                          />
                        }
                        label="Chequeo general"
                      />
                      <SoftBox mb={2} mt={1} display="flex">
                        <SoftTypography variant="subtitle2">Otros: </SoftTypography>
                        <textarea
                          id="consultationOther"
                          name="consultationOther"
                          placeholder="Especifique"
                          value={formData.consultationOther}
                          onChange={handleChange}
                          required
                          rows="1"
                          className="global-textarea"
                          style={{ width: "100%" }}
                        />
                      </SoftBox>
                    </FormControl>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

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

export default HistorialClinico;
