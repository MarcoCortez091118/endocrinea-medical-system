/* eslint-disable react/prop-types */
import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Form({ formData, onChange, onSubmit }) {
  const fields = [
    { id: "presentation", label: "1. Presentación *" },
    { id: "evolution", label: "2. Evolución *" },
    { id: "notes", label: "3. Notas de la sesión *" },
    { id: "tasks", label: "4. Tareas de seguimiento *" },
    { id: "comments", label: "5. Comentarios / Observaciones *" },
    { id: "prognostic", label: "6. Pronóstico *" },
  ];

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <SoftBox component="div" sx={{ p: 3, boxShadow: 3, mb: 3 }}>
        <SoftTypography variant="h6" color="secondary" mb={2}>
          Información del paciente
        </SoftTypography>
        <SoftBox
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {fields.map((field) => (
            <SoftBox key={field.id}>
              <label htmlFor={field.id}>
                <SoftTypography variant="body1" fontWeight="bold">
                  {field.label}
                </SoftTypography>
              </label>
              <textarea
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={onChange}
                rows={3}
                className="global-textarea"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </SoftBox>
          ))}
        </SoftBox>
      </SoftBox>
      <SoftBox textAlign="center">
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Enviar
        </button>
      </SoftBox>
    </form>
  );
}

export default Form;
/* eslint-enable react/prop-types */
