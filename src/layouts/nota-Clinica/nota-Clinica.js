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

function NotaClinico() {
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" flexDirection="column" alignItems="flex-start" p={3}>
              <SoftTypography variant="h4">Nota Clínica Médica -</SoftTypography>
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
                  <label htmlFor="email">Información de la nota clinica</label>
                  <textarea
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    rows="4"
                    className="global-textarea"
                  />
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

export default NotaClinico;
