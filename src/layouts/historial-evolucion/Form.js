/* eslint-disable react/prop-types */
import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useLocation } from "react-router-dom";

function Form({ formData, onChange, onSubmit }) {
  const location = useLocation();
  const { patient } = location.state || {};
  const [loading, setLoading] = useState(false); // Estado para mostrar carga

  const fields = [
    { id: "presentation", label: "1. Presentación *" },
    { id: "evolution", label: "2. Evolución *" },
    { id: "notes", label: "3. Notas de la sesión *" },
    { id: "tasks", label: "4. Tareas de seguimiento *" },
    { id: "comments", label: "5. Comentarios / Observaciones *" },
    { id: "prognostic", label: "6. Pronóstico *" },
  ];

  // 🔹 Función para enviar datos a la API
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 🔸 Validar si el paciente está seleccionado
    if (!patient || !patient.id) {
      alert("Error: No se ha seleccionado un paciente.");
      return;
    }

    setLoading(true); // Mostrar estado de carga

    const apiUrl = `https://endocrinea-fastapi-datacolletion.azurewebsites.net/psychology/${patient.id}/note`;

    const requestBody = {
      presentation: formData.presentation,
      evolution: formData.evolution,
      notes: formData.notes,
      tasks: formData.tasks,
      comments: formData.comments,
      prognostic: formData.prognostic,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Nota guardada con éxito:", result);
        alert("Nota guardada con éxito");

        // Resetear formulario
        onSubmit();
      } else {
        console.error("Error al guardar la nota:", response.statusText);
        alert("Error al guardar la nota. Inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Hubo un error de conexión.");
    }

    setLoading(false); // Ocultar estado de carga
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
          disabled={loading} // 🔹 Deshabilita el botón si está cargando
          style={{
            padding: "10px 20px",
            background: loading ? "#999" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </SoftBox>
    </form>
  );
}

export default Form;
/* eslint-enable react/prop-types */
