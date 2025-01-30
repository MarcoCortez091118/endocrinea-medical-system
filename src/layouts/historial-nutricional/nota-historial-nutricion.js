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
      label: "Información General",
      fields: [
        { id: "name", label: "1. Nombre del Paciente" },
        { id: "gender", label: "2. Género" },
        { id: "birthDate", label: "3. Fecha de Nacimiento" },
        { id: "occupation", label: "4. Ocupación" },
        { id: "reasonVisit", label: "5. Motivo de la Visita" },
      ],
    },
    {
      label: "Antecedentes Heredo-Familiares",
      fields: [
        { id: "familyHistory", label: "6. Antecedentes Familiares" },
        { id: "otherFamilyHistory", label: "7. Otros Antecedentes Familiares" },
      ],
    },
  ];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <SoftBox sx={{ p: 3, mb: 3, border: "1px solid #ccc", borderRadius: "4px" }}>
      <SoftTypography variant="h6" mb={2}>
        Fecha de creación: {new Date(nota.created_at).toLocaleString()}
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
                      <SoftTypography>
                        {typeof nota[field.id] === "object"
                          ? Object.entries(nota[field.id])
                              .map(([condition, relatives]) =>
                                `${condition}: ${Object.entries(relatives)
                                  .filter(([_, hasCondition]) => hasCondition)
                                  .map(([relative]) => relative)
                                  .join(", ") || "Ninguno"}`
                              )
                              .join(" | ")
                          : nota[field.id] || "No especificado"}
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                ))}
              </SoftBox>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={index === steps.length - 1}
                >
                  Continuar
                </Button>
                <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Regresar
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Todos los pasos completados</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reiniciar
          </Button>
        </Paper>
      )}
    </SoftBox>
  );
}

const NotasHistorialNutricional = ({ notas }) => {
  return (
    <SoftBox mt={4}>
      <SoftTypography variant="h6" color="secondary" mb={2}>
        Historial Nutricional
      </SoftTypography>
      {notas.length === 0 ? (
        <SoftTypography>No hay registros de historial nutricional.</SoftTypography>
      ) : (
        notas.map((nota) => <NoteDisplay key={nota.id} nota={nota} />)
      )}
    </SoftBox>
  );
};

export default NotasHistorialNutricional;

/* eslint-disable react/prop-types */