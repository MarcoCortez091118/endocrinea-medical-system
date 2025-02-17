import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Form from "./Form";
import NoteDisplay from "./NoteDisplay";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";

function HistorialEvolucion() {
  const location = useLocation();
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
  const [patient, setPatient] = useState(location.state?.patient || null);

  useEffect(() => {
    if (!patient) {
      const storedPatient = localStorage.getItem("selectedPatient");
      if (storedPatient) {
        setPatient(JSON.parse(storedPatient));
      }
    }
  }, []);

  useEffect(() => {
    if (!patient || !patient.id) return;

    const fetchNotes = async () => {
      try {
        console.log("📌 Haciendo petición con patientId:", patient.id);

        const response = await fetch(
          `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/psychology_notes/`
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("📌 Datos recibidos de la API:", data);

        const sortedNotes = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setNotes(sortedNotes);
      } catch (err) {
        console.error("❌ Error al cargar notas:", err);
        setError("Error al cargar las notas");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    } else {
      console.warn("⚠️ handleSubmit fue llamado sin un evento válido.");
    }
  
    if (!patient || !patient.id) {
      alert("⚠️ Error: No se ha seleccionado un paciente.");
      return;
    }
  
    console.log("📌 Enviando nota para patientId:", patient.id);
  
    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/psychology_notes/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error al guardar la nota: ${response.statusText}`);
      }
  
      const newNote = await response.json();
      console.log("✅ Nota guardada con éxito:", newNote);
  
      setNotes((prevNotes) => [newNote, ...prevNotes]);

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

  const handleToggle = (id) => {
    setExpandedNoteId(id === expandedNoteId ? null : id);
  };

  return (
    <SoftBox py={3}>
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

      <Form formData={formData} onChange={handleChange} onSubmit={handleSubmit} />

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
              No hay notas clínicas registradas.
            </SoftTypography>
          </Card>
        )}
      </SoftBox>
    </SoftBox>
  );
}

export default HistorialEvolucion;
