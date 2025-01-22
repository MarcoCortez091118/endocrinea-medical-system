/* eslint-disable react/prop-types */
import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function NoteDisplay({ note, expandedNoteId, onToggle }) {
  const fields = [
    { id: "presentation", label: "1. Presentación *" },
    { id: "evolution", label: "2. Evolución *" },
    { id: "notes", label: "3. Notas de la sesión *" },
    { id: "tasks", label: "4. Tareas de seguimiento *" },
    { id: "comments", label: "5. Comentarios / Observaciones *" },
    { id: "prognostic", label: "6. Pronóstico *" },
  ];

  return (
    <SoftBox sx={{ p: 3, mb: 3, border: "1px solid #ccc", borderRadius: "4px" }}>
      <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <SoftTypography variant="h6">
          Fecha de creación: {note.date}
        </SoftTypography>
      </SoftBox>
      <SoftBox
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {fields.slice(0, expandedNoteId === note.id ? fields.length : 2).map((field) => (
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
              <SoftTypography>{note[field.id]}</SoftTypography>
            </SoftBox>
          </SoftBox>
        ))}
      </SoftBox>
      <SoftBox mt={2} sx={{ textAlign: "right" }}>
        <button
          style={{
            padding: "5px 10px",
            background: expandedNoteId === note.id ? "#ff4d4d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => onToggle(expandedNoteId === note.id ? null : note.id)}
        >
          {expandedNoteId === note.id ? "Leer menos" : "Leer más"}
        </button>
      </SoftBox>
    </SoftBox>
  );
}

export default NoteDisplay;
/* eslint-enable react/prop-types */
