import React, { useState, useEffect } from "react";
import { Card, Grid, TextField, MenuItem, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import SoftBox from "components/SoftBox";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SoftTypography from "components/SoftTypography";
import "layouts/TextareaStyles.css";
import { label } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { color } from "framer-motion";
import { useLocation } from "react-router-dom";
const PatientDetailsForm = () => {
  const [patientData, setPatientData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    city: "",
    country: "",
    neighborhood: "",
    address_number: "",
    postal_code: "",
    province: "",
    state: "",
    street: "",
    allergies: "",
    born_city: "",
    born_state: "",
    date_of_birth: "",
    document: "",
    education: "",
    gender: "",
    insurance: "",
    insurance_card_number: "",
    marital_status: "",
    medications: "",
    nation_healthcare_number: "",
    nationality: "",
    observations: "",
    other_information: "",
    precedents: "",
    profession: "",
    religion: "",
    signed_data_marketing: false,
    signed_data_privacy: false,
    status: "",
    type: "",
    number: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const location = useLocation();
  const [patient, setPatient] = useState(location.state?.patient || null);

  useEffect(() => {
    if (!patient) {
      const storedPatient = localStorage.getItem("selectedPatient");
      if (storedPatient) {
        setPatient(JSON.parse(storedPatient));
      }
    }
  }, [patient]);

  const fetchPatientData = async () => {
    if (!patient || !patient.id) return;

    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching patient data");
      }

      const data = await response.json();
      setPatientData(data);
    } catch (error) {
      setSnackbar({ open: true, message: "Error al obtener datos del paciente", severity: "error" });
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    if (patient && patient.id) {
      fetchPatientData();
    }
  }, [patient]);

  const [relatedPersons, setRelatedPersons] = useState([]);
  const [authorizedPerson, setAuthorizedPerson] = useState("");
  const [legalRepresentative, setLegalRepresentative] = useState("");
  const [showAuthorizedDropdown, setShowAuthorizedDropdown] = useState(false);
  const [showRepresentativeDropdown, setShowRepresentativeDropdown] = useState(false);
  const handleAddRelatedPerson = () => {
    const newRelatedPersons = [
      ...patientData.relatedPersons,
      { name: "", relation: "", profession: "" },
    ];
    setPatientData({ ...patientData, relatedPersons: newRelatedPersons });
  };

  const handleRelatedPersonChange = (index, field, value) => {
    const updatedPersons = [...patientData.relatedPersons];
    updatedPersons[index][field] = value;
    setPatientData({ ...patientData, relatedPersons: updatedPersons });
  };

  const handleAuthorizedPersonChange = (value) => {
    setPatientData({ ...patientData, authorizedPerson: value });
  };

  const handleLegalRepresentativeChange = (value) => {
    setPatientData({ ...patientData, legalRepresentative: value });
  };

  const handleCheckboxChange = (checkboxType) => {
    if (checkboxType === "authorized") {
      setShowAuthorizedDropdown(!showAuthorizedDropdown);
    } else if (checkboxType === "representative") {
      setShowRepresentativeDropdown(!showRepresentativeDropdown);
    }
  };
  const handleRemoveRelatedPerson = (index) => {
    const updatedPersons = relatedPersons.filter((_, i) => i !== index);
    setRelatedPersons(updatedPersons);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatientData({
      ...patientData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(patientData),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating patient data");
      }

      await fetchPatientData(); // Get updated data from API
      setSnackbar({ open: true, message: "Datos actualizados correctamente", severity: "success" });

    } catch (error) {
      console.error("Error updating patient data:", error);
      setSnackbar({ open: true, message: "Error al actualizar los datos", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("JSON generado: ", JSON.stringify(patientData, null, 2));
    // Generar el objeto JSON con los datos
    const jsonData = {
      first_name: patientData.first_name,
      last_name: patientData.last_name,
      phone: patientData.phone,
      email: patientData.email,
      city: patientData.city,
      country: patientData.country,
      neighborhood: patientData.neighborhood,
      address_number: patientData.address_number,
      postal_code: patientData.postal_code,
      province: patientData.province,
      state: patientData.state,
      street: patientData.street,
      allergies: patientData.allergies,
      born_city: patientData.born_city,
      born_state: patientData.born_state,
      date_of_birth: patientData.date_of_birth,
      document: patientData.document,
      education: patientData.education,
      gender: patientData.gender,
      insurance: patientData.insurance,
      insurance_card_number: patientData.insurance_card_number,
      marital_status: patientData.marital_status,
      medications: patientData.medications,
      nation_healthcare_number: patientData.nation_healthcare_number,
      nationality: patientData.nationality,
      observations: patientData.observations,
      other_information: patientData.other_information,
      precedents: patientData.precedents,
      profession: patientData.profession,
      religion: patientData.religion,
      signed_data_marketing: patientData.signed_data_marketing,
      signed_data_privacy: patientData.signed_data_privacy,
      status: patientData.status,
      type: patientData.type,
      number: patientData.number,
    };

    // Mostrar el JSON en consola
    console.log("JSON generado: ", JSON.stringify(jsonData, null, 2));
  };

  const steps = [
    "Datos generales",
    "Datos administrativos",
    "Datos de contacto",
    "Datos complementarios",
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
    <form onSubmit={handleSubmit}>
      {activeStep === 0 && (
        <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
          <Typography vvariant="h5" color="secondary" mb={3}>
            Datos generales del paciente
          </Typography>
          <Grid container spacing={2}>
            {/* Nombre */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="first_name"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Nombre*
              </label>
              <textarea
                id="first_name"
                name="first_name"
                value={patientData.first_name}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Apellidos */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="last_name"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Apellidos*
              </label>
              <textarea
                id="last_name"
                name="last_name"
                value={patientData.last_name}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Fecha de nacimiento */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="date_of_birth"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Fecha de nacimiento*
              </label>
              <TextField
                fullWidth
                type="date"
                name="date_of_birth"
                InputLabelProps={{ shrink: true }}
                value={patientData.date_of_birth}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Género */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="gender"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Género*
              </label>
              <FormControl fullWidth>
                <Select
                  id="gender"
                  name="gender"
                  value={patientData.gender}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Seleccionar género
                  </MenuItem>
                  <MenuItem value="male">Masculino</MenuItem>
                  <MenuItem value="female">Femenino</MenuItem>
                  <MenuItem value="other">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Tipo de paciente */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Tipo de paciente
              </Typography>
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="private"
                    checked={patientData.type === "private"}
                    onChange={handleChange}
                  />
                  Privado
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="insured"
                    checked={patientData.type === "insured"}
                    onChange={handleChange}
                  />
                  De aseguradora
                </label>
              </div>
            </Grid>
          </Grid>
        </SoftBox>
      )}
      {activeStep === 1 && (
        <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
          <Typography variant="h5" color="secondary" mb={3} gutterBottom>
            Datos administrativos
          </Typography>
          <Grid container spacing={2}>
            {/* Estado del paciente */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="status"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Estado del paciente
              </label>
              <select
                id="status"
                name="status"
                value={patientData.status}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <option value="">Selecciona una opción</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </Grid>

            {/* Numero x */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="number"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Numero socio
              </label>
              <textarea
                id="number"
                name="number"
                value={patientData.number}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Numero de seguro social */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="nation_healthcare_number"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Numero de seguro social
              </label>
              <textarea
                id="nation_healthcare_number"
                name="nation_healthcare_number"
                value={patientData.nation_healthcare_number}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Ciudad de nacimiento */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="born_city"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Ciudad de nacimiento
              </label>
              <textarea
                id="born_city"
                name="born_city"
                value={patientData.born_city}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Nacionalidad */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="nationality"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Nacionalidad
              </label>
              <textarea
                id="nationality"
                name="nationality"
                value={patientData.nationality}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Estado de nacimiento */}
            <Grid item xs={12}>
              <label
                htmlFor="born_state"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Estado de nacimiento
              </label>
              <textarea
                id="born_state"
                name="born_state"
                value={patientData.born_state}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Tipo de identificación */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="insurance"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Tipo de identificación
              </label>
              <select
                id="insurance"
                name="insurance"
                value={patientData.insurance}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <option value="CURP">CURP</option>
                <option value="INE">INE</option>
                <option value="PASAPORTE">Pasaporte</option>
              </select>
            </Grid>

            {/* Número de identificación */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="insurance_card_number"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Número de identificación
              </label>
              <textarea
                id="insurance_card_number"
                name="insurance_card_number"
                value={patientData.insurance_card_number}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Consentimiento */}
            <Grid item xs={12}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                <input
                  type="checkbox"
                  name="signed_data_privacy"
                  checked={patientData.signed_data_privacy}
                  onChange={handleChange}
                />
                <span style={{ marginLeft: "8px" }}>
                  Consentimiento para el tratamiento de sus datos para fines sanitarios firmado.
                </span>
              </label>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                <input
                  type="checkbox"
                  name="signed_data_marketing"
                  checked={patientData.signed_data_marketing}
                  onChange={handleChange}
                />
                <span style={{ marginLeft: "8px" }}>
                  Acepto recibir avisos de marketing y promociones.
                </span>
              </label>
            </Grid>
          </Grid>
        </SoftBox>
      )}
      {activeStep === 2 && (
        <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
          <Typography variant="h5" color="secondary" mb={3} gutterBottom>
            Datos de contacto
            <Typography variant="subtitle2" fontWeight="medium" mt={2} gutterBottom>
              Estos contactos se usarán para las notificaciones, mensajes y otras comunicaciones.
            </Typography>
          </Typography>

          <Grid container spacing={2}>
            {/* Teléfono */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="phone"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Teléfono
              </label>
              <textarea
                id="phone"
                name="phone"
                value={patientData.phone}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="email"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Email
              </label>
              <textarea
                id="email"
                name="email"
                value={patientData.email}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Calle */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="street"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Calle
              </label>
              <textarea
                id="street"
                name="street"
                value={patientData.street}
                onChange={handleAddressChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Número */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="address_number"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Número
              </label>
              <textarea
                id="address_number"
                name="address_number"
                value={patientData.address_number}
                onChange={handleAddressChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Código Postal */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="postal_code"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Código postal
              </label>
              <textarea
                id="postal_code"
                name="postal_code"
                value={patientData.postal_code}
                onChange={handleAddressChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Colonia */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="neighborhood"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Colonia
              </label>
              <textarea
                id="neighborhood"
                name="neighborhood"
                value={patientData.neighborhood}
                onChange={handleAddressChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Provincia */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="province"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Provincia
              </label>
              <textarea
                id="province"
                name="province"
                value={patientData.province}
                onChange={handleAddressChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Ciudad */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="city"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Ciudad
              </label>
              <textarea
                id="city"
                name="city"
                value={patientData.city}
                onChange={handleAddressChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Estado */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="state"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Estado
              </label>
              <select
                id="state"
                name="state"
                value={patientData.state}
                onChange={handleAddressChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <option value="">Selecciona un estado</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Ciudad de México">Ciudad de México</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Colima">Colima</option>
                <option value="Durango">Durango</option>
                <option value="Estado de México">Estado de México</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
              </select>
            </Grid>

            {/* País */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="country"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                País
              </label>
              <textarea
                id="country"
                name="country"
                value={patientData.country}
                onChange={handleAddressChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>
          </Grid>
        </SoftBox>
      )}
      {activeStep === 3 && (
        <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
          <Typography variant="h5" color="secondary" mb={3} gutterBottom>
            Datos complementarios
            <Typography variant="subtitle2" fontWeight="medium" mt={2} gutterBottom>
              Proporciona información adicional relevante para el perfil del paciente.
            </Typography>
          </Typography>

          <Grid container spacing={2}>
            {/* Religión */}
            <Grid item xs={12} sm={3}>
              <label
                htmlFor="religion"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Religión
              </label>
              <textarea
                id="religion"
                name="religion"
                value={patientData.religion}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>

            {/* Estado Civil */}
            <Grid item xs={12} sm={3}>
              <label
                htmlFor="marital_status"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Estado civil
              </label>
              <select
                id="marital_status"
                name="marital_status"
                value={patientData.marital_status}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <option value="">Selecciona una opción</option>
                <option value="single">Soltero(a)</option>
                <option value="married">Casado(a)</option>
                <option value="divorced">Divorciado(a)</option>
                <option value="widowed">Viudo(a)</option>
              </select>
            </Grid>

            {/* Educación */}
            <Grid item xs={12} sm={3}>
              <label
                htmlFor="education"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Educación
              </label>
              <select
                id="education"
                name="education"
                value={patientData.education}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <option value="">Selecciona una opción</option>
                <option value="primary">Primaria</option>
                <option value="secondary">Secundaria</option>
                <option value="highschool">Preparatoria</option>
                <option value="university">Universidad</option>
              </select>
            </Grid>

            {/* Profesión */}
            <Grid item xs={12} sm={3}>
              <label
                htmlFor="profession"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Profesión
              </label>
              <textarea
                id="profession"
                name="profession"
                value={patientData.profession}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
              />
            </Grid>
            {/* Alergias */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="allergies"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Alergias
              </label>
              <textarea
                id="allergies"
                name="allergies"
                value={patientData.allergies}
                onChange={handleChange}
                rows="2"
                className="global-textarea"
              />
            </Grid>
            {/* Medicacion */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="medications"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Medicación
              </label>
              <textarea
                id="medications"
                name="medications"
                value={patientData.medications}
                onChange={handleChange}
                rows="2"
                className="global-textarea"
              />
            </Grid>
            {/* Observaciones */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="observations"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Observaciones
              </label>
              <textarea
                id="observations"
                name="observations"
                value={patientData.observations}
                onChange={handleChange}
                rows="2"
                className="global-textarea"
              />
            </Grid>
            {/* Otra info */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="other_information"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Otra información
              </label>
              <textarea
                id="other_information"
                name="other_information"
                value={patientData.other_information}
                onChange={handleChange}
                rows="2"
                className="global-textarea"
              />
            </Grid>
            {/* antecedentes */}
            <Grid item xs={12} sm={6}>
              <label
                htmlFor="precedents"
                style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
              >
                Antecedentes
              </label>
              <textarea
                id="precedents"
                name="precedents"
                value={patientData.precedents}
                onChange={handleChange}
                rows="2"
                className="global-textarea"
              />
            </Grid>

          </Grid>
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
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Atrás
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Siguiente</Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E67E22",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#c17900", // Darker shade for hover effect
              },
              "&:focus:not(:hover)": {
                backgroundColor: "#E67E22", // Keep the original color on focus
                boxShadow: "0px 0px 8px rgba(230, 126, 34, 0.5)", // Custom focus shadow
              },
            }}
            onClick={handleUpdate}
          >
            Actualizar y guardar
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
      {/** 
      <SoftBox mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ color: "white" }}
          onClick={handleSubmit}
        >
          guardar
        </Button>
      </SoftBox>*/}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};
export default PatientDetailsForm;
