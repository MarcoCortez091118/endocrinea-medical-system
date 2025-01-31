import React, { useEffect, useState } from "react";
import { Card, Typography, Box, Button, Collapse } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";

function NutritionRecords() {
  const [records, setRecords] = useState([]);
  const [expandedRecord, setExpandedRecord] = useState(null);
  const apiUrl = "https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/10000003/nutrition_records";

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error("Error al obtener registros nutricionales:", error);
      }
    };

    fetchRecords();
  }, []);

  const toggleExpand = (index) => {
    setExpandedRecord(expandedRecord === index ? null : index);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // 🔹 Diccionario de traducciones
  const translations = {
    name: "Nombre",
    gender: "Género",
    reasonVisit: "Motivo de la visita",
    birthDate: "Fecha de nacimiento",
    occupation: "Ocupación",

    familyHistory: "Historial Familiar",
    Diabetes: "Diabetes",
    Hypertension: "Hipertensión",
    "High Cholesterol": "Colesterol Alto",
    "Heart Attacks": "Infartos",
    Mother: "Madre",
    Father: "Padre",
    Siblings: "Hermanos",
    "Paternal Uncles": "Tíos Paternos",
    "Maternal Uncles": "Tíos Maternos",

    otherFamilyHistory: "Otros antecedentes familiares",
    drugAllergy: "Alergia a medicamentos",
    otherDrugAllergies: "Otras alergias a medicamentos",
    foodAllergy: "Alergia a alimentos",
    otherFoodAllergies: "Otras alergias a alimentos",

    prohibitedFoods: "Alimentos prohibidos",
    otherProhibitedFoods: "Otros alimentos prohibidos",
    exercise: "Ejercicio",
    exerciseTypes: "Tipos de ejercicio",
    exerciseDaysPerWeek: "Días de ejercicio por semana",
    exerciseIntensity: "Intensidad del ejercicio",

    sleepInsomnia: "Insomnio",
    sleepHours: "Horas de sueño",

    medications: "Medicamentos",
    vitamins: "Vitaminas",
    supplements: "Suplementos",

    relevantLabResults: "Resultados de laboratorio relevantes",
    gastrointestinalSymptoms: "Síntomas gastrointestinales",
    breakfast: "Desayuno",
    snack1: "Colación 1",
    lunch: "Almuerzo",
    snack2: "Colación 2",
    extras: "Extras",

    foodNotLike: "Alimentos que no le gustan",
    glucose: "Glucosa",
    bloodPressure: "Presión arterial",
    temperature: "Temperatura",
    heartRate: "Frecuencia cardíaca",
    weightDates: "Fechas de peso",
    usualWeight: "Peso usual",
    maximumWeight: "Peso máximo",
    minimumWeight: "Peso mínimo",
    currentWeight: "Peso actual",

    measurementDates: "Fechas de medidas",
    waist: "Cintura",
    abdomen: "Abdomen",
    hips: "Caderas",
    leftArm: "Brazo izquierdo",
    rightArm: "Brazo derecho",
    rightCalf: "Pantorrilla derecha",
    leftCalf: "Pantorrilla izquierda",
    newMeasurements: "Nuevas mediciones",

    diagnosis: "Diagnóstico",

    goal: "Objetivo",
    medicationsGoal: "Meta de medicamentos",
    nutritionalPlanType: "Tipo de plan nutricional",
    specifications: "Especificaciones",

    smoke: "Fumador",
    smokeHistory: "Historial de fumador",
    smokeOther: "Otros detalles sobre fumar",
    alcohol: "Consumo de alcohol",
    alcoholHistory: "Historial de consumo de alcohol",
    alcoholOther: "Otros detalles sobre alcohol",

    surgery: "Cirugías",
    surgeryHistory: "Historial de cirugías",
    surgeryOther: "Otras cirugías",
  };

  return (
    <SoftBox mb={3}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
      <Typography variant="h6" color="secondary" mb={2}>
        Historial Nutricional del Paciente
      </Typography>
      {records.length === 0 ? (
        <Typography variant="body1">No hay registros disponibles.</Typography>
      ) : (
        records.map((record, index) => (
          <Card key={index} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <Typography variant="h6" color="primary">
              Registro {index + 1}
            </Typography>
            {Object.entries(record)
              .slice(0, 5)
              .map(([key, value]) => (
                <SoftTypography key={key} variant="body2" sx={{ mt: 1 }}>
                  <strong>{translations[key] || key}:</strong>{" "}
                  {typeof value === "object" ? (
                    <ul>
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <li key={subKey}>
                          <strong>{translations[subKey] || subKey}:</strong>{" "}
                          {typeof subValue === "object"
                            ? Object.entries(subValue)
                                .map(
                                  ([relative, hasCondition]) =>
                                    `${translations[relative] || relative}: ${
                                      hasCondition ? "Sí" : "No"
                                    }`
                                )
                                .join(", ")
                            : subValue.toString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    value.toString()
                  )}
                </SoftTypography>
              ))}

            <Collapse in={expandedRecord === index}>
              {Object.entries(record)
                .slice(5)
                .map(([key, value]) => (
                  <SoftTypography key={key} variant="body2" sx={{ mt: 1 }}>
                    <strong>{translations[key] || key}:</strong>{" "}
                    {typeof value === "object" ? (
                      <ul>
                        {Object.entries(value).map(([subKey, subValue]) => (
                          <li key={subKey}>
                            <strong>{translations[subKey] || subKey}:</strong>{" "}
                            {typeof subValue === "object"
                              ? Object.entries(subValue)
                                  .map(
                                    ([relative, hasCondition]) =>
                                      `${translations[relative] || relative}: ${
                                        hasCondition ? "Sí" : "No"
                                      }`
                                  )
                                  .join(", ")
                              : subValue.toString()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      value.toString()
                    )}
                  </SoftTypography>
                ))}
            </Collapse>
            <Button
              variant="contained"
              color={expandedRecord === index ? "secondary" : "primary"}
              onClick={() => toggleExpand(index)}
              sx={{ mt: 2 }}
            >
              {expandedRecord === index ? "Ver menos" : "Ver más"}
            </Button>
          </Card>
        ))
      )}
      </Card>
      
    </SoftBox>
  );
}

export default NutritionRecords;
