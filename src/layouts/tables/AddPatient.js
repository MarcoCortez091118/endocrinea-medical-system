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
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    type: "Privado",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Datos del paciente guardados:", formData);
    onClose(); // Cierra el modal
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar paciente</DialogTitle>
      <DialogContent>
        <label htmlFor="fullName"> Nombre del paciente </label>
            <textarea
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            rows="1"
            className="global-textarea"
        />
        <label htmlFor="fullName"> Apellidos </label>
            <textarea
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            rows="1"
            className="global-textarea"
        />
        <label htmlFor="fullName"> Teléfono </label>
            <textarea
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            rows="1"
            className="global-textarea"
        />
        <label htmlFor="fullName"> Email </label>
            <textarea
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            rows="1"
            className="global-textarea"
        />
        <RadioGroup
          row
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <FormControlLabel value="Privado" control={<Radio />} label="Privado" />
          <FormControlLabel value="De aseguradora" control={<Radio />} label="De aseguradora" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cerrar
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Guardar
        </Button>
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
