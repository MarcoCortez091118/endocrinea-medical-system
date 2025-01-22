import React, { useState } from "react";
import Form from "./Form";
import NoteDisplay from "./NoteDisplay";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";

function HistorialEvolucion() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newNote = {
      id: notes.length + 1,
      date: new Date().toLocaleString(),
      ...formData,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setFormData({
      presentation: "",
      evolution: "",
      notes: "",
      tasks: "",
      comments: "",
      prognostic: "",
    });
  };

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
        {notes.length > 0 ? (
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

export default HistorialEvolucion;
