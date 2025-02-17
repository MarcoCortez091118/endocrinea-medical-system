/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Snackbar, Grid, Collapse } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useLocation } from "react-router-dom";

const MedicalRecordsList = ({record}) => {
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
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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

  const spanishFamilyTerms = {
    Mother: "Madre",
    Father: "Padre",
    Siblings: "Hermanos",
    Paternal_Uncles: "Tíos Paternos",
    Maternal_Uncles: "Tíos Maternos",
  };

  const spanishConditions = {
    Diabetes: "Diabetes",
    Hypertension: "Hipertensión",
    High_Cholesterol: "Colesterol Alto",
    Heart_Attacks: "Infartos Cardíacos",
  };

  // Función para formatear valores booleanos como "Sí" o "No"
  const formatBoolean = (value) => (value ? "Sí" : "No");
  const formatDate = (utcDate) => {
    if (!utcDate) return "Fecha no disponible";

    const date = new Date(utcDate);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    return localDate.toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
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
              Registro {index + 1} - <small>{formatDate(record.created_at)}</small>
            </SoftTypography>

            {expandedIndex === index && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {record.familyHistory && typeof record.familyHistory === "object" && (
                      <SoftBox mb={2}>
                        <SoftTypography variant="body2" fontWeight="bold" color="primary">
                          Historial Familiar
                        </SoftTypography>
                        {Object.entries(record.familyHistory).map(([condition, familyMembers]) => (
                          <SoftBox key={condition} sx={{ ml: 2, mb: 1 }}>
                            <SoftTypography variant="body2" fontWeight="bold">
                              {spanishConditions[condition] || condition}
                            </SoftTypography>
                            {familyMembers &&
                              Object.entries(familyMembers).map(([relative, hasCondition]) => (
                                <SoftTypography key={relative} variant="body2">
                                  {spanishFamilyTerms[relative] || relative}:{" "}
                                  {formatBoolean(hasCondition)}
                                </SoftTypography>
                              ))}
                          </SoftBox>
                        ))}
                      </SoftBox>
                    )}
                    <SoftTypography variant="body2">
                      <strong>¿Fuma?:</strong> {record.smoke || "No especificado"}
                    </SoftTypography>
                    {record.smokeHistory && (
                      <SoftTypography variant="body2">
                        <strong></strong> {record.smokeHistory}
                      </SoftTypography>
                    )}
                    {record.smokeOther && (
                      <SoftTypography variant="body2">
                        <strong>Otros: </strong> {record.smokeOther}
                      </SoftTypography>
                    )}
                    <SoftTypography variant="body2">
                      <strong>¿Consume alcohol?:</strong> {record.alcohol || "No especificado"}
                    </SoftTypography>
                    {record.alcoholHistory && (
                      <SoftTypography variant="body2">
                        <strong></strong> {record.alcoholHistory}
                      </SoftTypography>
                    )}
                    {record.alcoholOther && (
                      <SoftTypography variant="body2">
                        <strong>Otros: </strong> {record.alcoholOther}
                      </SoftTypography>
                    )}
                    <SoftTypography variant="body2">
                      <strong>¿Consume o ha consumido algún tipo de droga?:</strong> {record.drug || "No especificado"}
                    </SoftTypography>
                    {record.drugHistory && (
                      <SoftTypography variant="body2">
                        <strong></strong> {record.drugHistory}
                      </SoftTypography>
                    )}
                    <SoftTypography variant="body2">
                      <strong>¿Hace ejercicio?:</strong> {record.exercise || "No especificado"}
                    </SoftTypography>
                    
                    <SoftTypography variant="body2">
                      <strong>¿Alergias a medicamentos?:</strong>{" "}
                      {record.allergicMedicine || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>¿Ha tenido alguna cirugía?:</strong>{" "}
                      {record.surgery || "No especificado"}
                    </SoftTypography>
                    {record.surgeryHistory && record.surgeryHistory.length > 0 && (
                      <SoftBox mt={1}>
                        <SoftTypography variant="body2" fontWeight="bold">
                          Cirugías realizadas:
                        </SoftTypography>
                        <ul style={{ margin: 0, paddingLeft: "20px" }}>
                          {record.surgeryHistory.map((surgery, index) => (
                            <li key={index}>
                              <SoftTypography variant="body2">{surgery}</SoftTypography>
                            </li>
                          ))}
                        </ul>
                      </SoftBox>
                    )}

                    {/* Mostrar otras cirugías si existen */}
                    {record.surgeryOther && (
                      <SoftTypography variant="body2">
                        <strong>Otros:</strong> {record.surgeryOther}
                      </SoftTypography>
                    )}

                    <SoftTypography variant="body2">
                      <strong>¿Ha sido diagnosticado con alguna enfermedad?:</strong>{" "}
                      {record.diagnosedDiseases && record.diagnosedDiseases.length > 0
                        ? "Sí"
                        : "No especificado"}
                    </SoftTypography>

                    {/* Mostrar la lista de enfermedades si diagnosedDiseases tiene datos */}
                    {record.diagnosedDiseases && record.diagnosedDiseases.length > 0 && (
                      <SoftBox mt={1}>
                        <SoftTypography variant="body2" fontWeight="bold">
                          Enfermedades diagnosticadas:
                        </SoftTypography>
                        <ul style={{ margin: 0, paddingLeft: "20px" }}>
                          {record.diagnosedDiseases.map((disease, index) => (
                            <li key={index}>
                              <SoftTypography variant="body2">{disease}</SoftTypography>
                            </li>
                          ))}
                        </ul>
                      </SoftBox>
                    )}

                    {/* Mostrar otras enfermedades si existen */}
                    {record.diagnosedDiseasesOther && (
                      <SoftTypography variant="body2">
                        <strong>Otros:</strong> {record.diagnosedDiseasesOther}
                      </SoftTypography>
                    )}

                    <SoftTypography variant="body2">
                      <strong>¿Qué medicamentos toma actualmente?:</strong>{" "}
                      {record.takeMedications || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Edad de inicio de menstruación:</strong>{" "}
                      {record.menstruation || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Edad al dejar de menstruar:</strong>{" "}
                      {record.menstruationNull || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Fecha de última menstruación:</strong>{" "}
                      {record.menstruationDate || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Número de embarazos:</strong>{" "}
                      {record.pregnancies || "No especificado"}
                    </SoftTypography>

                    {/* Mostrar complicaciones en embarazos si existen */}
                    {record.pregnanciesComplications &&
                      record.pregnanciesComplications.length > 0 && (
                        <SoftBox mt={1}>
                          <SoftTypography variant="body2" fontWeight="bold">
                            Complicaciones durante los embarazos:
                          </SoftTypography>
                          <ul style={{ margin: 0, paddingLeft: "20px" }}>
                            {record.pregnanciesComplications.map((complication, index) => (
                              <li key={index}>
                                <SoftTypography variant="body2">{complication}</SoftTypography>
                              </li>
                            ))}
                          </ul>
                        </SoftBox>
                      )}

                    {/* Mostrar otros embarazos si existen */}
                    {record.otherPregnancies && (
                      <SoftTypography variant="body2">
                        <strong>Otros:</strong> {record.otherPregnancies}
                      </SoftTypography>
                    )}
                    <SoftTypography variant="body2">
                      <strong>¿Cada cuánto llegan los periodos menstruales?:</strong>{" "}
                      {record.menstruationTrue || "No especificado"}
                    </SoftTypography>
                    <SoftTypography variant="body2">
                      <strong>Motivo de consulta:</strong>{" "}
                      {record.reasonConsultation && record.reasonConsultation.length > 0
                        ? "Sí"
                        : "No especificado"}
                    </SoftTypography>

                    {/* Mostrar los motivos de consulta si existen */}
                    {record.reasonConsultation && record.reasonConsultation.length > 0 && (
                      <SoftBox mt={1}>
                        <SoftTypography variant="body2" fontWeight="bold">
                          Motivos de consulta seleccionados:
                        </SoftTypography>
                        <ul style={{ margin: 0, paddingLeft: "20px" }}>
                          {record.reasonConsultation.map((reason, index) => (
                            <li key={index}>
                              <SoftTypography variant="body2">{reason}</SoftTypography>
                            </li>
                          ))}
                        </ul>
                      </SoftBox>
                    )}

                    {/* Mostrar otros motivos de consulta si existen */}
                    {record.consultationOther && (
                      <SoftTypography variant="body2">
                        <strong>Otros:</strong> {record.consultationOther}
                      </SoftTypography>
                    )}
                  </Grid>
                </Grid>
              </>
            )}
            {/* Botón para ver más detalles */}
            <Button
              variant="contained"
              color={expandedIndex === index ? "secondary" : "primary"}
              onClick={() => toggleExpand(index)}
              sx={{ mt: 2 }}
            >
              {expandedIndex === index ? "Ver menos" : "Ver más"}
            </Button>
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
/* eslint-disable react/prop-types */