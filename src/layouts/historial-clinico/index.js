// Importaciones necesarias
import React, { useState } from "react";
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
  DatePicker,
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si cambia el estado civil y no es "Otros", limpiamos el campo otherStatus
    if ((name === "maritalStatus" && value !== "otros")) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        otherStatus: "", // Limpiamos el campo "otherStatus"
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
                  <label htmlFor="fullName">Nombre completo (Nombre / Apellido paterno / Apellido materno) *</label>
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
                  <label htmlFor="religion">¿Su RELIGIÓN le impide comer algún tipo de alimento?</label>
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
                  <label htmlFor="religion">Genero</label>
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
                    En esta sección deberá contestar si alguno de sus familiares
                    tiene diagnosticada alguna de las enfermedades especificadas a
                    continuación. Por favor, responda sólo si está seguro(a) del
                    diagnóstico.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          <SoftBox mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ color: 'white' }}>
              Enviar
            </Button>
          </SoftBox>
        </form>
      </SoftBox >
      <Footer />
    </DashboardLayout >
  );
}

export default HistorialClinico;
