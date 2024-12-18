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
} from "@mui/material";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

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
    foodRestrictions: "",
    gender: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
        <SoftBox mt={4}>
          <Card>
            <SoftBox p={3}>
              <form noValidate autoComplete="off">
                <SoftBox mb={2}>
                  <TextField
                    fullWidth
                    label="Correo electrónico *"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <TextField
                    fullWidth
                    label="Número telefónico con Whatsapp"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <TextField
                    fullWidth
                    label="Nombre completo"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <TextField
                    fullWidth
                    label="Fecha de nacimiento"
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "15px" },
                    }}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <TextField
                    fullWidth
                    label="Edad"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <TextField
                    fullWidth
                    label="Ciudad"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <TextField
                    fullWidth
                    label="Ocupación"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        fontSize: "15px",
                      }}
                    >
                      Estado civil
                    </InputLabel>
                    <Select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                    >
                      <MenuItem value="Casado(a)">Casado(a)</MenuItem>
                      <MenuItem value="Unión libre">Unión libre</MenuItem>
                      <MenuItem value="Soltero(a)">Soltero(a)</MenuItem>
                      <MenuItem value="Otros">Otros</MenuItem>
                    </Select>
                  </FormControl>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    ¿Su religión le impide comer algún tipo de alimento?
                  </SoftTypography>
                  <RadioGroup
                    row
                    name="foodRestrictions"
                    value={formData.foodRestrictions}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Género
                  </SoftTypography>
                  <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                    <FormControlLabel value="H" control={<Radio />} label="Hombre" />
                    <FormControlLabel value="M" control={<Radio />} label="Mujer" />
                    <FormControlLabel value="Otros" control={<Radio />} label="Otros" />
                  </RadioGroup>
                </SoftBox>
                <SoftBox mt={4}>
                  <Card>
                    <SoftBox p={3}>
                      <SoftTypography variant="h5">Antecedentes familiares</SoftTypography>
                      <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                        En esta sección deberá contestar si alguno de sus familiares tiene
                        diagnosticada alguna de las enfermedades especificadas a continuación. Por
                        favor, responda sólo si está seguro(a) del diagnóstico.
                      </SoftTypography>
                      <SoftTypography variant="subtitle2" fontWeight="medium" mt={3}>
                        ¿Alguien de su familia ha sido diagnosticado con alguna de las siguientes
                        enfermedades?
                      </SoftTypography>
                    </SoftBox>
                  </Card>
                </SoftBox>
                <Grid item xs={12}>
                  <Card>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        color: "white !important",
                        style: { fontSize: "15px" },
                      }}
                    >
                      {"Enviar"}
                    </Button>
                  </Card>
                </Grid>
              </form>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default HistorialClinico;
