import React from "react";
import { Card, Typography, Box, Grid, Button } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const citas = [
  {
    fecha: "7 de may, 2024",
    hora: "12:20",
    profesional: "Victoria Sandoval Nava",
    especialidad: "Nutrición",
    tipo: "Visitas sucesivas",
    estado: "No ha venido",
    estadoColor: "red",
  },
  {
    fecha: "13 de feb, 2024",
    hora: "13:00",
    profesional: "Victoria Sandoval Nava",
    especialidad: "Nutrición",
    tipo: "Visitas sucesivas",
    estado: "Visita realizada",
    estadoColor: "green",
  },
  {
    fecha: "19 de ene, 2024",
    hora: "09:40",
    profesional: "Victoria Sandoval Nava",
    especialidad: "Nutrición",
    tipo: "Visitas sucesivas",
    estado: "Visita realizada",
    estadoColor: "green",
  },
  {
    fecha: "19 de dic, 2023",
    hora: "13:00",
    profesional: "Victoria Sandoval Nava",
    especialidad: "Nutrición",
    tipo: "Visitas sucesivas",
    estado: "Cita cancelada",
    estadoColor: "red",
  },
  {
    fecha: "19 de dic, 2023",
    hora: "12:20",
    profesional: "Victoria Sandoval Nava",
    especialidad: "Nutrición",
    tipo: "Visitas sucesivas",
    estado: "Visita realizada",
    estadoColor: "green",
  },
  {
    fecha: "25 de nov, 2023",
    hora: "13:20",
    profesional: "Victoria Sandoval Nava",
    especialidad: "Nutrición",
    tipo: "Visitas sucesivas",
    estado: "Visita realizada",
    estadoColor: "green",
  },
  {
    fecha: "24 de nov, 2023",
    hora: "11:40",
    profesional: "Victoria Sandoval Nava",
    especialidad: "Nutrición",
    tipo: "Visitas sucesivas",
    estado: "Visita realizada",
    estadoColor: "green",
  },
];

function Citas() {
  return (
    <Card style={{ padding: "16px", marginTop: "16px", borderRadius: "8px" }}>
      <Box>
        {citas.map((cita, index) => (
          <React.Fragment key={index}>
          <Box display="flex" key={index} mb={2}>
            {/* Contenedor para el punto y la línea */}
            
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mr={2}
              position="relative"
            >
              {/* Punto del estado */}
              <FiberManualRecordIcon
                style={{
                  color: cita.estadoColor,
                  fontSize: "14px",
                }}
              />
              {/* Línea vertical */}
              {index < citas.length - 1 && (
                <Box
                  style={{
                    width: "2px",
                    height: "140px",
                    backgroundColor: "#e0e0e0",
                    position: "absolute",
                    top: "16px",
                    zIndex: 1,
                  }}
                />
              )}
            </Box>

            {/* Detalles de la cita */}
            <Box flexGrow={1}>
              <Typography
                variant="body2"
                style={{ fontWeight: "bold", fontSize: "14px" }}
              >
                {cita.fecha}
              </Typography>
              <Typography variant="body2" style={{ fontSize: "14px" }}>
                {cita.hora}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                <strong>Profesional:</strong> {cita.profesional}
              </Typography>
              <Typography variant="body2" style={{ fontSize: "14px" }}>
                {cita.tipo}
              </Typography>
              <Typography
                variant="body2"
                style={{ fontSize: "14px", color: "#757575" }}
              >
                {cita.especialidad}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  fontSize: "14px",
                  color: cita.estadoColor,
                }}
              >
                {cita.estado}
              </Typography>
            </Box>

            {/* Botón Modificar Cita */}
            <Box>
  <Button
    variant="outlined"
    size="small"
    style={{
      fontSize: "12px", // Tamaño de texto
      textTransform: "none", // Evita que el texto sea todo en mayúsculas
      padding: "4px 8px", // Espaciado interno
      fontWeight: "bold", // Grosor de la fuente
      color: "#1976d2", // Color del texto
      borderColor: "#1976d2", // Color del borde
    }}
  >
    Modificar cita
  </Button>
</Box>

          </Box>
           {index < citas.length - 1 && (
            <Box
              style={{
                height: "1px",
                backgroundColor: "#e0e0e0",
                margin: "8px 0",
                width: "100%",
              }}
            />
          )}
            </React.Fragment>
        ))}
      </Box>
    </Card>
  );
}

export default Citas;
