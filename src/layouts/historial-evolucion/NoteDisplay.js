/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Collapse } from "@mui/material";
import { useLocation } from "react-router-dom";

function NoteDisplay({ note, expandedNoteId, onToggle }) {
  const location = useLocation();
  const [patient, setPatient] = useState(location.state?.patient || null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!patient) {
      const storedPatient = localStorage.getItem("selectedPatient");
      if (storedPatient) {
        setPatient(JSON.parse(storedPatient));
      }
    }
  }, [patient]);

  const fields = [
    { id: "presentation", label: "1. Presentación *" },
    { id: "evolution", label: "2. Evolución *" },
    { id: "notes", label: "3. Notas de la sesión *" },
    { id: "tasks", label: "4. Tareas de seguimiento *" },
    { id: "comments", label: "5. Comentarios / Observaciones *" },
    { id: "prognostic", label: "6. Pronóstico *" },
  ];

  const formatDate = (utcDate) => {
    if (!utcDate) return "Fecha no disponible";
    const date = new Date(utcDate);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <Card sx={{ p: 3, mb: 2, borderRadius: 3, boxShadow: 3 }}>
      <SoftTypography variant="h6" fontWeight="bold" color="primary">
        {formatDate(note.created_at)}
      </SoftTypography>

      <Collapse in={expanded}>
        <SoftBox mt={2}>
          {fields.map((field) => (
            <SoftBox key={field.id} sx={{ mb: 1 }}>
              <SoftTypography variant="body1" fontWeight="bold">
                {field.label}:
              </SoftTypography>
              <SoftTypography variant="body1">
                {note[field.id] && note[field.id].trim() !== ""
                  ? note[field.id]
                  : "No especificado"}
              </SoftTypography>
            </SoftBox>
          ))}
        </SoftBox>
      </Collapse>

      <SoftBox mt={2} textAlign="center">
        <Button
          variant="contained"
          color={expanded ? "secondary" : "primary"}
          onClick={() => setExpanded(!expanded)}
          sx={{ width: "100%" }}
        >
          {expanded ? "Ver menos" : "Ver más"}
        </Button>
      </SoftBox>
    </Card>
  );
}

export default NoteDisplay;
/* eslint-enable react/prop-types */
