import React, { useEffect, useState, useCallback } from "react";
import { Card, Typography, Button, Box } from "@mui/material";
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

    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",

    });
  };

  const renderAllData = (record) => {
    return (
      <Box sx={{ mt: 2 }}>
        {Object.entries(record).map(([key, value]) => {
          if (!value || key === "id" || key === "updated_at" || key === "created_at") return null;

          const translations = {
            glucose: "Glucosa",
            bloodPressure: "Presión Arterial",
            temperature: "Temperatura",
            heartRate: "Frecuencia Cardíaca",
            weightDates: "Fecha de Peso",
            usualWeight: "Peso Usual",
            maximumWeight: "Peso Máximo",
            minimumWeight: "Peso Mínimo",
            currentWeight: "Peso Actual",
            diagnosis: "Diagnóstico",
            goal: "Objetivo",
            medicationsGoal: "Meta de Medicación",
            nutritionalPlanType: "Tipo de Plan Nutricional",
            specifications: "Especificaciones",
            smoke: "Fuma",
            smokeHistory: "Historial de Fumar",
            smokeOther: "Otros hábitos de fumar",
            alcohol: "Consumo de Alcohol",
            alcoholHistory: "Historial de Alcohol",
            alcoholOther: "Otros hábitos de alcohol",
            surgery: "Cirugías",
            surgeryHistory: "Historial de Cirugías",
            surgeryOther: "Otras Cirugías",
            padecimientoActuales: "Padecimientos Actuales",
            exercise: "Ejercicio",
            exerciseTypes: "Tipo de Ejercicio",
            exerciseDaysPerWeek: "Días de Ejercicio por Semana",
            exerciseIntensity: "Intensidad del Ejercicio",
            sleepInsomnia: "Insomnio",
            sleepHours: "Horas de Sueño",
            medications: "Medicamentos",
            vitamins: "Vitaminas",
            supplements: "Suplementos",
            relevantLabResults: "Resultados de Laboratorio",
            gastrointestinalSymptoms: "Síntomas Gastrointestinales",
            breakfast: "Desayuno",
            snack1: "Colación 1",
            lunch: "Almuerzo",
            snack2: "Colación 2",
            extras: "Extras",
            foodNotLike: "Alimentos que no le gustan",
            drugAllergy: "Alergia a Medicamentos",
            otherDrugAllergies: "Otras Alergias a Medicamentos",
            foodAllergy: "Alergia a Alimentos",
            otherFoodAllergies: "Otras Alergias Alimenticias",
            prohibitedFoods: "Alimentos Prohibidos",
            otherProhibitedFoods: "Otros Alimentos Prohibidos",
          };

          const spanishFamilyTerms = {
            "Mother": "Madre",
            "Father": "Padre",
            "Siblings": "Hermanos",
            "Paternal_Uncles": "Tíos Paternos",
            "Maternal_Uncles": "Tíos Maternos"
          };

          const spanishConditions = {
            "Diabetes": "Diabetes",
            "Hypertension": "Hipertensión",
            "High_Cholesterol": "Colesterol Alto",
            "Heart_Attacks": "Infartos Cardíacos"
          };

          if (key === "familyHistory" && typeof value === "object" && value !== null) {
            return (
              <Box key={key} sx={{ mb: 2 }}>
                <SoftTypography variant="body2" fontWeight="bold" color="primary">
                  Historial Familiar
                </SoftTypography>
                {Object.entries(value).map(([condition, familyMembers]) => (
                  <Box key={condition} sx={{ ml: 2, mb: 1 }}>
                    <SoftTypography variant="body2" fontWeight="bold">
                      {spanishConditions[condition] || condition}
                    </SoftTypography>
                    {familyMembers &&
                      Object.entries(familyMembers).map(([relative, hasCondition]) => (
                        <SoftTypography key={relative} variant="body2">
                          {spanishFamilyTerms[relative] || relative}: {formatBoolean(hasCondition)}
                        </SoftTypography>
                      ))}
                  </Box>
                ))}
              </Box>
            );
          }

          return (
            <SoftTypography key={key} variant="body2">
              <strong>{translations[key] || key}:</strong> {typeof value === "boolean" ? formatBoolean(value) : value}
            </SoftTypography>
          );
        })}
      </Box>
    );
  };

  return (
    <SoftBox mb={3}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h6" color="secondary" mb={2}>
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
            .slice(0, visibleRecords)
            .map((record, index) => {

              const formattedDateTime = formatDateTime(record.created_at);
              return (
                <Card key={index} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
                  <Typography variant="h6" color="primary">
                    Registro {index + 1} - <small>({formattedDateTime})</small>
                  </Typography>
                  {expandedRecord === index ? renderAllData(record) : null}
                  <Button variant="contained" color={expandedRecord === index ? "secondary" : "primary"} onClick={() => toggleExpand(index)} sx={{ mt: 2 }}>
                    {expandedRecord === index ? "Ver menos" : "Ver más"}
                  </Button>
                </Card>
              );
            })
        )}
      </Card>
    </SoftBox>
  );
}

export default NutritionRecords;
