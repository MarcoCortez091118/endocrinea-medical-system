import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Importar PropTypes
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useLocation } from "react-router-dom";

function MedicalRecordDisplay({ record }) {
    const location = useLocation();
    const patient = location.state?.patient; // Asegurar que `patient` se obtiene correctamente
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar si el paciente está seleccionado
        if (!patient || !patient.id) {
            alert("Error: No se ha seleccionado un paciente.");
            return;
        }

        setLoading(true); // Mostrar estado de carga

        try {
            const apiUrl = `https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/${patient.id}/medical_records`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Error al obtener los registros médicos");
            }

            const data = await response.json();
            console.log("Datos recibidos:", data);
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!record) return null;

    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
          label: "Antecedentes Familiares",
          fields: [
            { id: "familyHistoryDiabetes", label: "Diabetes", options: ["Mother", "Father", "Siblings", "Paternal Uncles", "Maternal Uncles"] },
            { id: "familyHistoryHypertension", label: "Hipertensión", options: ["Mother", "Father", "Siblings", "Paternal Uncles", "Maternal Uncles"] },
            { id: "familyHistoryHighCholesterol", label: "Colesterol Alto", options: ["Mother", "Father", "Siblings", "Paternal Uncles", "Maternal Uncles"] },
            { id: "familyHistoryHeartAttacks", label: "Ataques al Corazón", options: ["Mother", "Father", "Siblings", "Paternal Uncles", "Maternal Uncles"] },
          ],
        },
        {
          label: "Hábitos Personales",
          fields: [
            { id: "smoke", label: "Fuma", other: "smokeHistory", extra: "smokeOther" },
            { id: "alcohol", label: "Consume Alcohol", other: "alcoholHistory", extra: "alcoholOther" },
            { id: "drug", label: "Consumo de Drogas", other: "drugHistory" },
            { id: "exercise", label: "Ejercicio" },
          ],
        },
        {
          label: "Historial Médico",
          fields: [
            { id: "allergicMedicine", label: "Alergias a Medicamentos" },
            { id: "allergicFood", label: "Alergias a Alimentos" },
            { id: "surgery", label: "Cirugías", other: "surgeryHistory", extra: "surgeryOther" },
            { id: "diagnosedDiseases", label: "Enfermedades Diagnosticadas", other: "diagnosedDiseasesOther" },
            { id: "takeMedications", label: "Medicamentos Actuales" },
          ],
        },
        {
          label: "Historial Gineco-Obstétrico",
          fields: [
            { id: "menstruation", label: "Menstruación" },
            { id: "menstruationTrue", label: "Menstruación Regular" },
            { id: "menstruationNull", label: "Menstruación Ausente" },
            { id: "menstruationDate", label: "Última Fecha de Menstruación" },
            { id: "pregnancies", label: "Número de Embarazos", other: "otherPregnancies" },
            { id: "pregnanciesComplications", label: "Complicaciones en Embarazos" },
          ],
        },
        {
          label: "Motivo de Consulta",
          fields: [{ id: "reasonConsultation", label: "Motivo de la Consulta", other: "consultationOther" }],
        },
      ].filter((step) => step.fields.length > 0);
      
      

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleReset = () => setActiveStep(0);

    const formatDate = (isoString) => {
        if (!isoString) return "Fecha no disponible";
        const date = new Date(isoString);
        return date.toLocaleString("es-MX", {
            timeZone: "America/Mexico_City",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <SoftBox sx={{ p: 3, mb: 3, border: "1px solid #ccc", borderRadius: "4px" }}>
            <SoftTypography variant="h6" mb={2}>
                Fecha de Creación: {formatDate(record.created_at)}
            </SoftTypography>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                            <SoftBox sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
                                {step.fields.map((field) => {
                                    let value = record[field.id] || "No especificado";
                                    if (record[field.other]) value += ` (${record[field.other]})`;
                                    if (record[field.extra]) value += ` (${record[field.extra]})`;
                                    if (Array.isArray(value)) value = value.length > 0 ? value.join(", ") : "No especificado";

                                    return (
                                        <SoftBox key={field.id}>
                                            <label>
                                                <SoftTypography variant="body1" fontWeight="bold">
                                                    {field.label}
                                                </SoftTypography>
                                            </label>
                                            <SoftBox sx={{ padding: "8px", background: "#f9f9f9", borderRadius: "4px", border: "1px solid #ddd" }}>
                                                <SoftTypography>{value}</SoftTypography>
                                            </SoftBox>
                                        </SoftBox>
                                    );
                                })}
                            </SoftBox>
                            <Box sx={{ display: "flex",
                    justifyContent: "flex-end", mb: 2 }} >
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={index === steps.length - 1}
                  >
                    Continuar
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Regresar
                  </Button>
                </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </SoftBox>
    );
}

MedicalRecordDisplay.propTypes = {
    record: PropTypes.object.isRequired,
};

const MedicalRecordsList = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const patient = location.state?.patient; // Obtener paciente correctamente

    useEffect(() => {
        if (!patient?.id) return;

        const fetchRecords = async () => {
            try {
                const apiUrl = `https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/${patient.id}/medical_records`;
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error("Error al obtener registros médicos");
                const data = await response.json();
                setRecords(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [patient]);

    return (
        <SoftBox mt={4}>
            <SoftTypography variant="h4" color="secondary" mb={2}>
                <hr /><br></br>Historial Médico
            </SoftTypography>
            {loading ? "Cargando..." : error ? error : records.map((record) => <MedicalRecordDisplay key={record.id} record={record} />)}
        </SoftBox>
    );
};

export default MedicalRecordsList;
