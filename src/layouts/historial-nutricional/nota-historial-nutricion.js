import React, { useEffect, useState, useCallback } from "react";
import { Card, Typography, Button, Box, Grid } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import { useLocation } from "react-router-dom";

function NutritionRecords() {
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

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [visibleRecords, setVisibleRecords] = useState(5);

  const apiUrl = patient?.id
    ? `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/nutritional_records/`
    : null;

  const fetchRecords = useCallback(async () => {
    if (!apiUrl) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al obtener los registros");
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // 🔹 Ahora `fetchRecords` se ejecutará también cuando `records` cambie
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]); // Agregamos 'records' como dependencia para actualizaciones automáticas

  const toggleExpand = (index) => {
    setExpandedRecord(expandedRecord === index ? null : index);
  };

  const formatBoolean = (value) => (value ? "Sí" : "No");

  const formatDateTime = (dateString) => {
    if (!dateString) return "Fecha desconocida";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Fecha inválida";

    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Formato 24 horas
      timeZone: "America/Mexico_City", // Zona horaria específica
    }).format(date);
  };

  const renderAllData = (record) => {
    return (
      <Box sx={{ mt: 2 }}>
        {Object.entries(record).map(([key, value]) => {
          if (!value || key === "id" || key === "updated_at" || key === "created_at") return null;

          const spanishConditions = {
            "Diabetes": "Diabetes",
            "Hypertension": "Hipertensión",
            "High_Cholesterol": "Colesterol Alto",
            "Heart_Attacks": "Infartos Cardíacos"
          };

          const spanishFamilyTerms = {
            "Mother": "Madre",
            "Father": "Padre",
            "Siblings": "Hermanos",
            "Paternal_Uncles": "Tíos Paternos",
            "Maternal_Uncles": "Tíos Maternos"
          };

          const translations = {
            otherFamilyHistory: "Otro familiar diagnosticado con alguna enfermedad",
            drugAllergy: "¿Usted sufre alguna alergia a medicamentos?",
            otherDrugAllergies: "Otras alergias a medicamentos",
            foodAllergy: "¿Usted sufre alguna alergia a algun alimento?",
            otherFoodAllergies: "Otras alergias a alimentos",
            prohibitedFoods: "¿Su RELIGIÓN le impide comer algún tipo de alimento?",
            otherProhibitedFoods: "¿Qué alimentos no puede comer por su religión?",
            exercise: "¿Realiza algún tipo de ejercicio?",
            exerciseTypes: "¿Cuál es el tipo de ejercicio que realiza?",
            exerciseDaysPerWeek: "¿Cuántos días a la semana realiza ejercicio?",
            exerciseIntensity: "¿Con qué intensidad realiza los ejercicios?",
            sleepInsomnia: "¿Usted sufre de insomnio?",
            sleepHours: "¿Cuántas horas duerme por noche?",
            smoke: "¿Fuma o ha fumado en el pasado?",
            smokeHistory: "¿Cuántos cigarros fuma al día?",
            smokeOther: "Especifique cuántos cigarros fuma al día",
            medications: "¿Toma medicamentos? Especifique cuáles y la frecuencia",
            vitamins: "¿Consume vitaminas? Indique cuáles.",
            supplements: "¿Toma suplementos alimenticios? Especifique",
            relevantLabResults: "¿Se ha hecho análisis de laboratorio recientes? Mencione los importantes",
            gastrointestinalSymptoms: "¿Ha tenido síntomas gastrointestinales recientes?",
            breakfast: "Desayuno",
            snack1: "Colación",
            lunch: "Comida",
            snack2: "Colación 2",
            extras: "Extras",
            foodNotLike: "Alimentos que no le gustan",
            glucose: "Glucosa",
            bloodPressure: "TA (Tensión Arterial)",
            temperature: "Temperatura",
            heartRate: "FC (Frecuencia Cardíaca)",
            weightDates: "Fecha de pesaje",
            usualWeight: "Peso Habitual",
            maximumWeight: "Peso Máximo",
            minimumWeight: "Peso Mínimo",
            currentWeight: "Peso Actual",
            diagnosis: "Diagnóstico",
            goal: "Objetivo del paciente",
            medicationsGoal: "Medicamentos y suplementos añadidos",
            nutritionalPlanType: "Tipo de plan nutricional",
            specifications: "Especificaciones",
            alcohol: "¿Consume alcohol?",
            alcoholHistory: "¿Cuántas veces a la semana bebe alcohol?",
            alcoholOther: "Espefique cuántas veces a la semana bebe alcohol",
            surgery: "¿Le han realizado alguna cirugía? Es posible seleccionar varias respuestas",
            surgeryOther: "¿Qué otra cirugía le han realizado?",
          };

          if (key === "familyHistory" && typeof value === "object" && value !== null) {
            return (
              <Box key={key} >
                <SoftTypography variant="subtitle1" fontWeight="bold" color="primary">
                  Historial Familiar <hr></hr>
                </SoftTypography>
                <SoftTypography variant="subtitle2" fontWeight="bold" mb={1} mt={1}>
                  ¿Alguien de su familia ha sido diagnosticado con alguna de las siguientes
                  enfermedades?
                </SoftTypography>
                <Grid container spacing={2}>
                  {Object.entries(value).map(([condition, familyMembers]) => (
                    <Grid item xs={12} sm={6} md={3} key={condition}>
                      <SoftTypography variant="body2" fontWeight="bold">
                        {spanishConditions[condition] || condition}
                      </SoftTypography>
                      {familyMembers &&
                        Object.entries(familyMembers).map(([relative, hasCondition]) => (
                          <SoftTypography key={relative} variant="body2">
                            {spanishFamilyTerms[relative] || relative}: {formatBoolean(hasCondition)}
                          </SoftTypography>
                        ))}
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          }

          if (key === "surgeryHistory" && Array.isArray(value) && value.length > 0) {
            return (
              <Box key={key} sx={{ mt: 2 }}>
                <SoftTypography variant="subtitle1" fontWeight="bold" color="primary">
                  Historial de cirugías <hr></hr>
                </SoftTypography>
                <Grid container spacing={2}>
                  {value.map((surgery, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <SoftTypography variant="body2">{surgery}</SoftTypography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          }

          return (
            <Grid container spacing={2} key={key}>
              {/* Primera columna: Etiqueta */}
              <Grid item xs={6}>
                <SoftTypography variant="body2">
                  <strong>{translations[key] || key}:</strong>
                </SoftTypography>
              </Grid>

              {/* Segunda columna: Valor */}
              <Grid item xs={6}>
                <SoftTypography variant="body2">
                  {typeof value === "boolean" ? formatBoolean(value) : value}
                </SoftTypography>
              </Grid>
            </Grid>
          );

        })}
      </Box>
    );
  };

  return (
    <SoftBox mb={3}>

      <Typography variant="h5" color="secondary" mt={4} ml={2} mb={2}>
        Historial Nutricional del Paciente
      </Typography>

      {loading ? (
        <Typography>Cargando...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : records.length === 0 ? (
        <Typography>No hay registros disponibles.</Typography>
      ) : (
        records
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((record, index) => {

            const formattedDateTime = formatDateTime(record.created_at);
            return (
              <Card key={index} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
                <Typography variant="h6" color="primary">
                  Registro {records.length - index} - <small>({formattedDateTime})</small>
                </Typography>
                {expandedRecord === index ? renderAllData(record) : null}
                <Button variant="contained" color={expandedRecord === index ? "secondary" : "primary"} onClick={() => toggleExpand(index)} sx={{ mt: 2 }}>
                  {expandedRecord === index ? "Ver menos" : "Ver más"}
                </Button>
              </Card>
            );
          })
      )}
    </SoftBox>

  );
}

export default NutritionRecords;
