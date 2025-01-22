/* eslint-disable react/prop-types */
import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function NoteDisplayNotaClinica({ note, expandedNoteId, onToggle }) {
  const isExpanded = expandedNoteId === note.id;

  return (
    <SoftBox>
      <SoftBox>
        <SoftTypography variant="body1" fontWeight="bold">
          Fecha de creación: {note.date}
        </SoftTypography>
      </SoftBox>
      <SoftBox
        sx={{
          padding: "8px",
          background: "#f9f9f9",
          borderRadius: "4px",
          border: "1px solid #ddd",
          marginTop: "8px",
        }}
      >
        <SoftTypography>
          {isExpanded
            ? note.medicNote // Mostrar todo si está expandido
            : note.medicNote.split("\n").slice(0, 3).join("\n") + (note.medicNote.split("\n").length > 3 ? "..." : "")}
        </SoftTypography>
      </SoftBox>
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
