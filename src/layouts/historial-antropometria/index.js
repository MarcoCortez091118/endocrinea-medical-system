import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import "layouts/TextareaStyles.css";

function Antropometria({ patientId }) {
  const [formData, setFormData] = useState({
    waist: "",
    abdomen: "",
    hips: "",
    leftArm: "",
    rightArm: "",
    rightCalf: "",
    leftCalf: "",
  });

  const visibleFieldsMediciones = {
    waist: "Cintura",
    abdomen: "Abdomen",
    hips: "Cadera",
    leftArm: "Brazo Izquierdo",
    rightArm: "Brazo Derecho",
    rightCalf: "Pantorrilla Derecha",
    leftCalf: "Pantorrilla Izquierda",
  };

  const handleInputChange = (event, measurement) => {
    setFormData({ ...formData, [measurement]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };

    try {
      const response = await fetch(
        `https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/${patientId}/nutrition_records`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) throw new Error(`Error al enviar datos: ${response.statusText}`);

      alert("Historial guardado correctamente");
      setFormData({
        waist: "",
        abdomen: "",
        hips: "",
        leftArm: "",
        rightArm: "",
        rightCalf: "",
        leftCalf: "",
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error al guardar el historial.");
    }
  };

  return (
    <SoftBox py={3} >
      <form noValidate autoComplete="off" onSubmit={handleSubmit} >
        <SoftBox component={Card} sx={{ p: 4, mb: 3, boxShadow: 3 }}>
          <SoftTypography variant="h6" color="secondary" mb={2}>
            Exploración Física (Antropometría)
          </SoftTypography>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Object.keys(visibleFieldsMediciones).map((measurement) => (
                  <TableRow key={measurement} style={{ display: "flex", alignItems: "center" }}>
                    <TableCell style={{ borderBottom: "none", flex: 1, fontWeight: "bold" }}>
                      {visibleFieldsMediciones[measurement]}
                    </TableCell>
                    <TableCell style={{ borderBottom: "none", flex: 2 }}>
                      <input
                        type="text"
                        value={formData[measurement]}
                        onChange={(e) => handleInputChange(e, measurement)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "6px",
                          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                          fontSize: "16px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SoftBox>

        <Button type="submit" variant="contained" color="primary" fullWidth style={{ padding: "10px", fontSize: "16px" }}>
          Enviar
        </Button>
      </form>
    </SoftBox>
  );
}

Antropometria.propTypes = {
  patientId: PropTypes.string.isRequired,
};

export default Antropometria;
