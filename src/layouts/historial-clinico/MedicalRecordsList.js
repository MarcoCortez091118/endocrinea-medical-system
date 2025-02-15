import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Snackbar, Grid } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useLocation } from "react-router-dom";

const MedicalRecordsList = () => {
    const [medicalRecords, setMedicalRecords] = useState([]); // Estado para los registros
    const [expandedIndex, setExpandedIndex] = useState(null); // Estado para mostrar detalles
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
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

    // Obtener los registros de la API
    useEffect(() => {
        const fetchMedicalRecords = async () => {
            if (!patient || !patient.id) {
                console.error("Error: No se encontró el paciente.");
                return; // Detener la ejecución si no hay paciente
            }
            try {
                const response = await fetch(
                    `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/medical_records/`
                );
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudieron obtener los registros`);
                }
                const data = await response.json();
                setMedicalRecords(data);
            } catch (error) {
                setSnackbarMessage(error.message);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        };

        fetchMedicalRecords();
    }, [patient]);

    // Función para alternar la visualización de detalles
    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Función para cerrar el Snackbar
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <SoftBox py={3}>
            <SoftTypography variant="h4" mb={3}>
                Registros Médicos
            </SoftTypography>

            {medicalRecords.length === 0 ? (
                <SoftTypography variant="h6">No hay registros disponibles</SoftTypography>
            ) : (
                medicalRecords.map((record, index) => (
                    <Card key={index} sx={{ p: 3, mb: 2, boxShadow: 3 }}>
                        <SoftTypography variant="h6" mb={2}>
                            Registro {index + 1}
                        </SoftTypography>

                        {/* Muestra los primeros 5 datos principales */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <SoftTypography variant="body1">
                                    <strong>¿Fuma?:</strong> {record.smoke || "No especificado"}
                                </SoftTypography>
                                <SoftTypography variant="body1">
                                    <strong>¿Consume alcohol?:</strong> {record.alcohol || "No especificado"}
                                </SoftTypography>
                                <SoftTypography variant="body1">
                                    <strong>¿Hace ejercicio?:</strong> {record.exercise || "No especificado"}
                                </SoftTypography>
                                <SoftTypography variant="body1">
                                    <strong>¿Alergias a medicamentos?:</strong>{" "}
                                    {record.allergicMedicine || "No especificado"}
                                </SoftTypography>
                                <SoftTypography variant="body1">
                                    <strong>¿Ha tenido alguna cirugía?:</strong> {record.surgery || "No especificado"}
                                </SoftTypography>
                            </Grid>
                        </Grid>

                        {/* Botón para ver más detalles */}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => toggleExpand(index)}
                            sx={{ mt: 2 }}
                        >
                            {expandedIndex === index ? "Ver menos" : "Ver más"}
                        </Button>

                        {/* Mostrar más detalles si está expandido */}
                        {expandedIndex === index && (
                            <SoftBox mt={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <SoftTypography variant="body1">
                                            <strong>¿Cirugías adicionales?:</strong>{" "}
                                            {record.surgeryOther || "No especificado"}
                                        </SoftTypography>
                                        <SoftTypography variant="body1">
                                            <strong>¿Enfermedades diagnosticadas?:</strong>{" "}
                                            {record.diagnosedDiseases.length > 0
                                                ? record.diagnosedDiseases.join(", ")
                                                : "No especificado"}
                                        </SoftTypography>
                                        <SoftTypography variant="body1">
                                            <strong>¿Toma medicamentos actualmente?:</strong>{" "}
                                            {record.takeMedications || "No especificado"}
                                        </SoftTypography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <SoftTypography variant="body1">
                                            <strong>¿Fecha de última menstruación?:</strong>{" "}
                                            {record.menstruationDate || "No especificado"}
                                        </SoftTypography>
                                        <SoftTypography variant="body1">
                                            <strong>¿Número de embarazos?:</strong>{" "}
                                            {record.pregnancies || "No especificado"}
                                        </SoftTypography>
                                        <SoftTypography variant="body1">
                                            <strong>¿Complicaciones en embarazos?:</strong>{" "}
                                            {record.pregnanciesComplications.length > 0
                                                ? record.pregnanciesComplications.join(", ")
                                                : "No especificado"}
                                        </SoftTypography>
                                        <SoftTypography variant="body1">
                                            <strong>¿Motivo de consulta?:</strong>{" "}
                                            {record.reasonConsultation.length > 0
                                                ? record.reasonConsultation.join(", ")
                                                : "No especificado"}
                                        </SoftTypography>
                                    </Grid>
                                </Grid>
                            </SoftBox>
                        )}
                    </Card>
                ))
            )}

            {/* Snackbar para mostrar errores */}
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
};

export default MedicalRecordsList;