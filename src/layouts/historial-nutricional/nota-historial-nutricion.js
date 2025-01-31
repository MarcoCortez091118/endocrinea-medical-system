import React, { useEffect, useState } from "react";
import { Card, Typography, Box, Button, Collapse } from "@mui/material";

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
      second: "2-digit"
    });
  };

  return (
    <Box py={3}>
      <Typography variant="h5" color="secondary" mb={3}>
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
            {Object.entries(record).slice(0, 5).map(([key, value]) => (
              <Typography key={key} variant="body1" sx={{ mt: 1 }}>
                <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value.toString()}
              </Typography>
            ))}
            <Collapse in={expandedRecord === index}>
              {Object.entries(record).slice(5).map(([key, value]) => (
                <Typography key={key} variant="body1" sx={{ mt: 1 }}>
                  <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value.toString()}
                </Typography>
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
    </Box>
  );
}

export default NutritionRecords;
