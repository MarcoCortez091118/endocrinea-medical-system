import React, { useEffect, useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useLocation } from "react-router-dom";

function HistoryNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const { patient } = location.state || {}; 

  useEffect(() => {
    if (patient?.id) {
      const fetchNotes = async () => {
        try {
          const response = await fetch(
            `https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/${patient.id}/ehr`
          );
          if (!response.ok) {
            throw new Error("Estamos realizando algunos ajustes para mejorar el servicio. Puede que la información no esté disponible por ahora, pero estamos en ello.");
          }
          const data = await response.json();
          setNotes(data); 
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchNotes();
    } else {
      setLoading(false); 
      setError("No se encontró información del paciente.");
    }
  }, [patient?.id]);

  if (loading) {
    return <Typography>Cargando datos...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Card style={{ padding: "16px", marginTop: "16px", borderRadius: "8px" }}>
      <Box>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <React.Fragment key={index}>
              <Box display="flex" mb={2}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mr={2}
                  position="relative"
                >
                 
                  <FiberManualRecordIcon
                    style={{
                      color: "#1976d2",
                      fontSize: "14px",
                    }}
                  />
                </Box>

                
                <Box flexGrow={1}>
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                  >
                    Fecha: {note.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ fontSize: "14px", marginTop: "8px" }}
                  >
                    <strong>Título:</strong> {note.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ fontSize: "14px", marginTop: "8px" }}
                  >
                    <strong>Nombre del paciente:</strong> {note.first_name} {note.last_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ fontSize: "14px", marginTop: "8px" }}
                    dangerouslySetInnerHTML={{ __html: note.value }}
                  ></Typography>
                </Box>
              </Box>
              {index < notes.length - 1 && (
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
          ))
        ) : (
          <Typography>No hay notas disponibles.</Typography>
        )}
      </Box>
    </Card>
  );
}

export default HistoryNotes;
