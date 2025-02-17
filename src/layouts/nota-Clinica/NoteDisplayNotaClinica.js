/* eslint-disable react/prop-types */
import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card"; // Importación de Card

function NoteDisplayNotaClinica({ note, expandedNoteId, onToggle }) {
  const isExpanded = expandedNoteId === note.id;

  return (
    <SoftBox>
      <SoftBox>
        <SoftTypography variant="h6" color="primary">
        Fecha: {note.date}
        </SoftTypography>
      </SoftBox>
      <Card
        sx={{ p: 3, mb: 3, boxShadow: 3 }}
      >
        <SoftTypography variant="body2">
          {isExpanded
            ? note.medicNote // Mostrar todo si está expandido
            : note.medicNote.split("\n").slice(0, 3).join("\n") + (note.medicNote.split("\n").length > 3 ? "..." : "")}
        </SoftTypography>
      </Card>
      <SoftBox textAlign="right" mt={2}>
        {note.medicNote.split("\n").length > 3 && ( // Mostrar el botón solo si hay más de 3 líneas
          <button
            style={{
              padding: "5px 10px",
              background: isExpanded ? "#ff4d4d" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={() => onToggle(note.id)}
          >
            {isExpanded ? "Leer menos" : "Leer más"}
          </button>
        )}
      </SoftBox>
    </SoftBox>
  );
}

export default NoteDisplayNotaClinica;
/* eslint-enable react/prop-types */
