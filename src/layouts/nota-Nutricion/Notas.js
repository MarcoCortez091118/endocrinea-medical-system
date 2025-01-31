/* eslint-disable react/prop-types */
import React, { useState } from "react";
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

function NoteDisplay({ nota }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Subjetivo",
      fields: [
        { id: "symptoms", label: "1. Síntomas *" },
        { id: "energy", label: "2. Energía *" },
        { id: "symptomsGastrointestinal", label: "3. Síntomas gastrointestinales *" },
        { id: "frequencyStraining", label: "3.1. Frecuencia (Estreñimiento)" },
        { id: "frequencyDiarrhea", label: "3.2 Frecuencia (Diarréa)" },
        { id: "currentConditions", label: "4. Enfermedades *" },
        { id: "complications", label: "5. Complicaciones *" },
        { id: "liquids", label: "6. Líquidos *" },
      ],
    },
    {
      label: "Objetivo",
      fields: [
        { id: "TypesExercise", label: "7. Tipo de ejercicio" },
        { id: "exerciseDaysWeek", label: "8. Días a la semana" },
        { id: "exerciseIntensity", label: "9. Intensidad" },
      ],
    },
    {
      label: "Evaluación dietética",
      fields: [
        { id: "breakfast", label: "10. Desayuno" },
        { id: "collation1", label: "11. Colación" },
        { id: "meal", label: "12. Comida" },
        { id: "collation2", label: "13. Colación 2" },
        { id: "extras", label: "14. Extras" },
      ],
    },
    {
      label: "Exploración Física",
      fields: [
        { id: "measurementDates", label: "15. Fecha" },
        { id: "waist", label: "16. Cintura" },
        { id: "abdomen", label: "17. Abdomen" },
        { id: "hips", label: "18. Cadera" },
        { id: "leftArm", label: "19. Brazo Izquierdo" },
        { id: "rightArm", label: "20. Brazo Derecho" },
        { id: "rightCalf", label: "21. Pantorrilla Derecha" },
        { id: "leftCalf", label: "22. Pantorrilla Izquierda" },
      ],
    },
    {
      label: "Plan",
      fields: [{ id: "diagnosis", label: "23. Plan" }],
    },
  ].filter((step) => step.fields.length > 0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <SoftBox sx={{ p: 3, mb: 3, border: "1px solid #ccc", borderRadius: "4px" }}>
      <SoftTypography variant="h6" mb={2}>
        Fecha de creación: {nota.date}
      </SoftTypography>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <SoftBox
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 3,
                }}
              >
                {step.fields.map((field) => (
                  <SoftBox key={field.id}>
                    <label>
                      <SoftTypography variant="body1" fontWeight="bold">
                        {field.label}
                      </SoftTypography>
                    </label>
                    <SoftBox
                      sx={{
                        padding: "8px",
                        background: "#f9f9f9",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <SoftTypography>{nota[field.id] || "No especificado"}</SoftTypography>
                    </SoftBox>
                  </SoftBox>
                ))}
              </SoftBox>
              <Box sx={{
                display: "flex",
                justifyContent: "flex-end", mb: 2
              }} >
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
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}

    </SoftBox>
  );
}

const Notas = ({ notas }) => {
  return (
    <SoftBox mt={4}>
      <SoftTypography variant="h6" color="secondary" mb={2}>
        Notas
      </SoftTypography>
      {notas.length === 0 ? (
        <SoftTypography>No hay notas registradas.</SoftTypography>
      ) : (
        notas.map((nota) => <NoteDisplay key={nota.id} nota={nota} />)
      )}
    </SoftBox>
  );
};

export default Notas;
/* eslint-enable react/prop-types */
