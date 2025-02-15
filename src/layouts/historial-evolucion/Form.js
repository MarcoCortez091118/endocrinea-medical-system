/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useLocation } from "react-router-dom";

function Form({ formData, onChange, onSubmit }) {
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

  const [loading, setLoading] = useState(false);

  const fields = [
    { id: "presentation", label: "1. Presentación *" },
    { id: "evolution", label: "2. Evolución *" },
    { id: "notes", label: "3. Notas de la sesión *" },
    { id: "tasks", label: "4. Tareas de seguimiento *" },
    { id: "comments", label: "5. Comentarios / Observaciones *" },
    { id: "prognostic", label: "6. Pronóstico *" },
  ];
  const handleSubmit = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault(); // ✅ Evita recargar la página
    } else {
      console.warn("⚠️ handleSubmit fue llamado sin un evento válido.");
    }

    if (!patient || !patient.id) {
      alert("Error: No se ha seleccionado un paciente.");
      return;
    }

    setLoading(true);

    const apiUrl = `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/psychology_notes/`;

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      let result = null;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        }
      } catch (jsonError) {
        console.warn("⚠️ No se pudo parsear la respuesta JSON:", jsonError);
      }

      if (response.ok) {
        console.log("✅ Nota guardada con éxito:", result || "Sin contenido en respuesta.");
        alert("✅ Nota guardada con éxito");

        if (typeof onSubmit === "function") {
          onSubmit();
        }
      } else {
        console.error("⚠️ Error en la respuesta:", response.status, response.statusText, result);
        alert(`⚠️ Error al guardar la nota: ${response.statusText}`);
      }
    } catch (error) {
      console.error("❌ Error en la petición:", error);
      alert("❌ Hubo un error de conexión.");
    } finally {
      setLoading(false);
    }
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
                value={formData[field.id] || ""}
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
