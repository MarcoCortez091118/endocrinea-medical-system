import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormNotaClinica from "./FormNotaClinica";
import NoteDisplayNotaClinica from "./NoteDisplayNotaClinica";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";

function NotaClinica() {
  const [formData, setFormData] = useState({ medicNote: "" });
  const [notes, setNotes] = useState([]);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const { patient } = location.state || {};
  const patient_id = patient?.id;

  useEffect(() => {
    if (patient_id) {
      fetchNotes();
    } else {
      setErrorMessage("No se encontró información del paciente.");
    }
  }, [patient_id]);

  // ✅ Función para convertir fecha UTC a la hora local del usuario
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
      hour12: false, // Formato 24 horas
    });
  };

  const fetchNotes = async () => {
    setErrorMessage("");
    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient_id}/medical_notes/`
      );

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} (${response.statusText})`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("La API no devolvió un array válido de notas.");
      }

      const formattedNotes = data
        .map((note) => ({
          id: note.id,
          medicNote: note.medicNote,
          date: formatDate(note.created_at), // ✅ Convierte la fecha correctamente
          timestamp: new Date(note.created_at).getTime(), // Para ordenarlo correctamente
        }))
        .sort((a, b) => b.timestamp - a.timestamp); // Ordenar por fecha descendente (más reciente primero)

      setNotes(formattedNotes);
    } catch (error) {
      console.error("⚠️ Error al obtener las notas clínicas:", error);
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!patient_id) {
      setErrorMessage("No se encontró el ID del paciente.");
      return;
    }

    const newNote = { medicNote: formData.medicNote };

    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient_id}/medical_notes/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        }
      );

      if (!response.ok) {
        throw new Error(`Error al enviar la nota clínica: ${response.status} (${response.statusText})`);
      }

      const createdNote = await response.json();

      const newFormattedNote = {
        id: createdNote.id,
        medicNote: createdNote.medicNote,
        date: formatDate(new Date()), // ✅ Convierte la fecha correctamente
        timestamp: new Date().getTime(),
      };

      setNotes((prevNotes) => [newFormattedNote, ...prevNotes]);

      setFormData({ medicNote: "" });
    } catch (error) {
      console.error("⚠️ Error al enviar la nota clínica:", error);
      setErrorMessage(error.message);
    }
  };

  const handleToggle = (id) => {
    setExpandedNoteId((prevId) => (prevId === id ? null : id));
  };

  return (
    <SoftBox py={3}>
      <SoftBox mb={3}>
        <Card sx={{ p: 3, mb: 2 }}>
          <SoftTypography variant="h5" mb={2}>
            Nota Clínica Médica - Endocrinea Care
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Estimado paciente, los siguientes datos serán utilizados para su historial médico.
          </SoftTypography>
        </Card>
      </SoftBox>

      {errorMessage && (
        <Card sx={{ p: 3, mb: 2, backgroundColor: "#ffcccc" }}>
          <SoftTypography variant="h6" color="error" textAlign="center">
            ❌ {errorMessage}
          </SoftTypography>
        </Card>
      )}

      <FormNotaClinica formData={formData} onChange={handleChange} onSubmit={handleSubmit} />

      <SoftBox mt={4}>
        {notes.length > 0 ? (
          <>
            <SoftTypography variant="h4" mb={3} fontWeight="bold" textAlign="center">
              Historial de Notas Clínicas
            </SoftTypography>
            {notes.map((note) => (
              <Card sx={{ p: 3, mb: 3, boxShadow: 3 }} key={note.id}>
                <NoteDisplayNotaClinica note={note} expandedNoteId={expandedNoteId} onToggle={handleToggle} />
              </Card>
            ))}
          </>
        ) : (
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <SoftTypography variant="h6" color="textSecondary" textAlign="center" mb={2}>
              No hay notas clínicas registradas.
            </SoftTypography>
          </Card>
        )}
      </SoftBox>
    </SoftBox>
  );
}

export default NotaClinica;
