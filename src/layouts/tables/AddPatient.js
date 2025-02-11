import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import SoftTypography from "components/SoftTypography";

function AddPatient({ open, onClose, onPatientAdded }) {
  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    type: "Privado",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [alert, setAlert] = useState({ severity: "", message: "", show: false });

  
  useEffect(() => {
    if (open) {
      setFormData(initialFormData);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const apiUrl = "https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/create";

    const patientData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phoneNumber: formData.phone,
      gender: formData.gender,
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
        const newPatient = await response.json();
        console.log("Paciente registrado exitosamente:", newPatient);

        setAlert({
          severity: "success",
          message: "Paciente registrado exitosamente.",
          show: true,
        });

        if (onPatientAdded) {
          onPatientAdded(newPatient);
        }

        setTimeout(() => {
          setAlert({ ...alert, show: false });
          onClose();
        }, 3000);
      } else {
        const errorData = await response.json();
        setAlert({
          severity: "error",
          message: `Error al registrar el paciente: ${
            errorData.detail || "Verifica los datos ingresados"
          }`,
          show: true,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setAlert({
        severity: "error",
        message: "Ocurrió un error en la solicitud. Inténtalo nuevamente.",
        show: true,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography
          fontWeight="bold"
          sx={{ color: "#183A64", fontWeight: "bold", display: "block", marginBottom: "4px" }}
        >
          Agregar paciente
        </Typography>
      </DialogTitle>
      <DialogContent>
        
        {alert.show && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, show: false })}
            sx={{ marginBottom: "16px" }}
          >
            <AlertTitle>{alert.severity === "success" ? "Éxito" : "Error"}</AlertTitle>
            {alert.message}
          </Alert>
        )}

        <Grid container spacing={2}>
          {/* Nombre */}
          <Grid item xs={12} sm={6}>
            <SoftTypography variant="subtitle2" fontWeight="medium">
              Nombre del paciente
            </SoftTypography>
            <textarea
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              rows="1"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                resize: "none",
              }}
            />
          </Grid>

          
          <Grid item xs={12} sm={6}>
            <SoftTypography variant="subtitle2" fontWeight="medium">
              Apellidos
            </SoftTypography>
            <textarea
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              rows="1"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                resize: "none",
              }}
            />
          </Grid>

        
          <Grid item xs={12} sm={6}>
            <SoftTypography variant="subtitle2" fontWeight="medium">
              Teléfono
            </SoftTypography>
            <textarea
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              rows="1"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                resize: "none",
              }}
            />
          </Grid>

        
          <Grid item xs={12} sm={6}>
            <SoftTypography variant="subtitle2" fontWeight="medium">
              Email
            </SoftTypography>
            <textarea
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              rows="1"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                resize: "none",
              }}
            />
          </Grid>

         
          <Grid item xs={12} sm={6}>
            
            <SoftTypography variant="subtitle2" fontWeight="medium">
              Género
            </SoftTypography>

            <FormControl fullWidth>
              <Select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Seleccionar género
                </MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
                <MenuItem value="No especificado">No especificado</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          
          <Grid item xs={12} sm={6}>
            <SoftTypography variant="subtitle2" fontWeight="medium">
              Tipo de paciente
            </SoftTypography>

            <RadioGroup
              row
              name="type"
              value={formData.type}
              onChange={handleChange}
              sx={{ margin: "0 10px" }} 
            >
              <FormControlLabel value="Privado" control={<Radio />} label="Privado" />
              <FormControlLabel value="De aseguradora" control={<Radio />} label="De aseguradora" />
            </RadioGroup>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ color: "#183A64", borderColor: "#183A64" }}
        >
          Cerrar
        </Button>

        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          sx={{ color: "#FFFFFF" }} 
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddPatient.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPatientAdded: PropTypes.func,
};

export default AddPatient;
