import React, { useState } from "react";
import FormNotaClinica from "./FormNotaClinica";
import NoteDisplayNotaClinica from "./NoteDisplayNotaClinica";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";

function NotaClinica() {
  const [formData, setFormData] = useState({
    medicNote: "", // Inicializa correctamente el objeto
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      id: notes.length + 1,
      medicNote: formData.medicNote,
      date: new Date().toLocaleString(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setFormData({ medicNote: "" }); // Resetea el formulario
    console.log("Datos a enviar:", formData);
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
            Nota Clínica Médica -
          </SoftTypography>
          <SoftTypography variant="h5" mb={2}>
            Endocrinea Care
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Estimado paciente los siguientes datos de contacto y antecedentes médicos recabados en el presente documento serán utilizados para llenar su historial médico.
          </SoftTypography>
        </Card>
      </SoftBox>

      {/* Formulario */}
      <FormNotaClinica
        formData={formData} // Asegúrate de pasar formData
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* Visualización de notas */}
      <SoftBox mt={4}>
        {notes.length > 0 ? (
          <>
            <SoftTypography variant="h4" mb={3} fontWeight="bold" textAlign="center">
              Historial de Notas Clínicas
            </SoftTypography>
            {notes.map((note) => (
              <Card sx={{ p: 3, mb: 3, boxShadow: 3 }} key={note.id}>
                <NoteDisplayNotaClinica
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

export default NotaClinica;
