/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useLocation } from "react-router-dom";

function NoteDisplay({ note, expandedNoteId, onToggle }) {

  const location = useLocation();
  const [patient, setPatient] = useState(location.state?.patient || null);

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

  // 🔹 Función para convertir fecha UTC a la hora local
  const formatDate = (utcDate) => {
    if (!utcDate) return "Fecha no disponible";

    // Crear objeto de fecha en UTC
    const date = new Date(utcDate);

    // 🔹 Ajustar manualmente la hora a la zona local
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    // 🔹 Formatear la fecha correctamente
    return localDate.toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // ✅ Formato de 24 horas
    });
  };

  return (
    <SoftBox sx={{ p: 3, mb: 3, border: "1px solid #ccc", borderRadius: "4px" }}>
      {/* 🔹 Mostrar fecha correctamente convertida a la hora local */}
      <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <SoftTypography variant="h6">
          Fecha de creación: {formatDate(note.created_at)}
        </SoftTypography>
      </SoftBox>

      {/* 🔹 Información de la nota */}
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
              <SoftTypography>
                {note[field.id] && note[field.id].trim() !== "" ? note[field.id] : "No especificado"}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        ))}
      </SoftBox>

      {/* 🔹 Botón para expandir/cerrar detalles */}
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
