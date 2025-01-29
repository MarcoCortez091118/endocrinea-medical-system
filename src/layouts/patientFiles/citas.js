import React, { useEffect, useState } from "react";
import { Card, Typography, Box, Button } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useLocation } from "react-router-dom";

function Citas() {
  const [citas, setCitas] = useState([]);
  const location = useLocation();
  const { patient } = location.state || {};

  useEffect(() => {
    if (patient?.id) {
      // Llamada a la API para obtener las citas
      const fetchAppointments = async () => {
        try {
          const response = await fetch(
            `https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/${patient.id}/appointments`
          );
          if (!response.ok) {
            throw new Error("Error al obtener las citas");
          }
          const data = await response.json();

          // Ordenar las citas por fecha de inicio (start_time) de más reciente a más antigua
          const sortedCitas = data
            .map((appointment) => ({
              fecha: new Date(appointment.start_time).toLocaleDateString(),
              hora: new Date(appointment.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              profesional: appointment.agenda ?? "No especificado",
              tipo: appointment.service ?? "No especificado",
              estado: appointment.status ?? "No especificado",
              estadoColor:
                appointment.status === "ConfirmedByAdmin" ||
                  appointment.status === "ConfirmedByPatient"
                  ? "green"
                  : appointment.status === "CanceledByPatient" ||
                    appointment.status === "CanceledByUser"
                    ? "red"
                    : appointment.status === "Scheduled"
                      ? "gray"
                      : "orange",
              timestamp: new Date(appointment.start_time).getTime(), // Para ordenar correctamente
            }))
            .sort((a, b) => b.timestamp - a.timestamp); // Ordena de más reciente a más antiguo

          setCitas(sortedCitas);
        } catch (error) {
          console.error("Error al obtener las citas:", error);
        }
      };

      fetchAppointments();
    }
  }, [patient?.id]);

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
