import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function AddPatient({ open, onClose }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    type: "Privado",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const apiUrl = "https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/create";

    const patientData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phoneNumber: formData.phone,
      email: formData.email,
      type: formData.type,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        console.log("Paciente registrado exitosamente");
        alert("Paciente registrado exitosamente");
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Error al registrar el paciente:", errorData);
        alert("Error al registrar el paciente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error en la solicitud");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar paciente</DialogTitle>
      <DialogContent>
        <label htmlFor="first_name">Nombre del paciente</label>
        <textarea
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          rows="1"
          className="global-textarea"
        />

        <label htmlFor="last_name">Apellidos</label>
        <textarea
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          rows="1"
          className="global-textarea"
        />

        <label htmlFor="phone">Teléfono</label>
        <textarea
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          rows="1"
          className="global-textarea"
        />

        <label htmlFor="email">Email</label>
        <textarea
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          rows="1"
          className="global-textarea"
        />

        <RadioGroup row name="type" value={formData.type} onChange={handleChange}>
          <FormControlLabel value="Privado" control={<Radio />} label="Privado" />
          <FormControlLabel value="De aseguradora" control={<Radio />} label="De aseguradora" />
        </RadioGroup>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cerrar</Button>
        <Button onClick={handleSave} color="primary" variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

// Definición de PropTypes
AddPatient.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddPatient;
