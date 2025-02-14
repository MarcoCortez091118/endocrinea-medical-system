import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import NoteDisplay from "./NoteDisplay";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";

function HistorialEvolucion({ patientId }) {
  const [formData, setFormData] = useState({
    presentation: "",
    evolution: "",
    notes: "",
    tasks: "",
    comments: "",
    prognostic: "",
  });

  const [notes, setNotes] = useState([]);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patientId}/psychology_notes/`;

  // 🔹 Cargar las notas al inicio en orden descendente
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();

        // 🔹 Ordenar notas por fecha de más reciente a más antigua
        const sortedNotes = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setNotes(sortedNotes);
      } catch (err) {
        setError("Error al cargar las notas");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchNotes();
    }
  }, [patientId]);

  // 🔹 Manejo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 🔹 Enviar la nueva nota a la API y actualizar UI en orden descendente
  const handleSubmit = async (event) => {
    if (event) event.preventDefault(); // ✅ Evita la recarga de la página
    console.log("📌 Datos a enviar:", formData);

    if (!patientId) {
      alert("⚠️ Error: No se ha seleccionado un paciente.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar la nota: ${response.statusText}`);
      }

      const newNote = await response.json(); // 📌 Recibir la nueva nota guardada
      console.log("✅ Nota guardada con éxito:", newNote);

      // 📌 Agregar la nueva nota en la primera posición
      setNotes((prevNotes) => [newNote, ...prevNotes]);

      // 📌 Resetear el formulario después de guardar
      setFormData({
        presentation: "",
        evolution: "",
        notes: "",
        tasks: "",
        comments: "",
        prognostic: "",
      });

    } catch (error) {
      console.error("❌ Error en la petición:", error);
      alert("❌ Hubo un error al guardar la nota.");
    }
  };

  // 🔹 Expandir/Cerrar nota en la UI
  const handleToggle = (id) => {
    setExpandedNoteId(id === expandedNoteId ? null : id);
  };

  return (
    <SoftBox py={3}>
      {/* Tarjeta introductoria */}
      <SoftBox mb={3}>
        <Card sx={{ p: 3, mb: 2 }}>
          <SoftTypography variant="h5" mb={2}>
            Nota de evolución - Endocrinea Care
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Los siguientes datos serán utilizados para llenar su historial médico. La información será tratada con total confidencialidad.
          </SoftTypography>
        </Card>
      </SoftBox>

      {/* Formulario */}
      <Form formData={formData} onChange={handleChange} onSubmit={handleSubmit} />

      {/* Notas registradas */}
      <SoftBox mt={4}>
        {loading ? (
          <SoftTypography variant="body1" textAlign="center">Cargando notas...</SoftTypography>
        ) : error ? (
          <SoftTypography variant="body1" color="error" textAlign="center">{error}</SoftTypography>
        ) : notes.length > 0 ? (
          <>
            <SoftTypography variant="h4" mb={3} fontWeight="bold" textAlign="center">
              Historial de Notas de Evolución
            </SoftTypography>
            {notes.map((note) => (
              <Card sx={{ p: 3, mb: 3, boxShadow: 3 }} key={note.id}>
                <NoteDisplay
                  note={note}
                  expandedNoteId={expandedNoteId}
                  onToggle={handleToggle}
                />
              </Card>
            ))}
          </>
        ) : (
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <SoftTypography
              variant="h6"
              color="textSecondary"
              textAlign="center"
              mb={2}
            >
              Visualización de Notas Registradas:
            </SoftTypography>
            <SoftTypography variant="body1" textAlign="center">
              No hay notas clínicas registradas.
            </SoftTypography>
          </Card>
        )}
      </SoftBox>
    </SoftBox>
  );
}

HistorialEvolucion.propTypes = {
  patientId: PropTypes.string.isRequired,
};

export default HistorialEvolucion;
