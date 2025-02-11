// Importaciones necesarias
import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  tableCellClasses,
} from "@mui/material";

import { styled } from "@mui/system";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Global style textarea
import "layouts/TextareaStyles.css";

// Libreria gluestacks

function antropometria({ patientId }) {
  {
    /* Variables */
  }
  const [formData, setFormData] = useState({
    waist: "",
    abdomen: "",
    hips: "",
    leftArm: "",
    rightArm: "",
    rightCalf: "",
    leftCalf: "",
    newMeasurements: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl =
      "https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients/10000003/nutrition_records";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar datos: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Historial enviado con éxito:", result);

      alert("Historial guardado correctamente");

      setNotas((prevNotas) => [
        { id: result.id, created_at: new Date().toISOString(), ...formData },
        ...prevNotas,
      ]);

      setMostrarNotas(true);
      // Limpiar el formulario
      setFormData({
        waist: "",
        abdomen: "",
        hips: "",
        leftArm: "",
        rightArm: "",
        rightCalf: "",
        leftCalf: "",
        diagnosis: "",
      });
      console.log("Datos a enviar:", formData);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error al guardar el historial. Inténtalo nuevamente.");
    }
  };

  const [columnsMediciones, setColumnsMediciones] = useState([]);
  const [datesMediciones, setDatesMediciones] = useState([]);

  // Mapeo de nombres legibles para las claves
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
    setFormData({
      ...formData,
      [measurement]: event.target.value,
    });
  };

  const handleNewMeasurementChange = (event, rowIndex, colIndex, tableType) => {
    const { value } = event.target;
    if (tableType === "mediciones") {
      setColumnsMediciones((prevColumns) => {
        const updatedColumns = [...prevColumns];
        if (!updatedColumns[colIndex]) updatedColumns[colIndex] = [];
        updatedColumns[colIndex][rowIndex] = value;
        return updatedColumns;
      });
    }
  };

  const addColumn = (tableType) => {
    if (tableType === "mediciones") {
      const newColumn = Object.keys(visibleFieldsMediciones).map(() => ""); // Nueva columna vacía
      setColumnsMediciones([...columnsMediciones, newColumn]);
      setDatesMediciones([...datesMediciones, ""]); // Agregar un campo vacío para la fecha
    } 
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <SoftBox py={3}>
      <SoftBox mb={3}>
        <Card sx={{ p: 3, mb: 2 }}>
          <SoftTypography variant="h5" mb={2}>
            Antropometría -
          </SoftTypography>
          <SoftTypography variant="h5" mb={2}>
            Endocrinea Care
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Estimado paciente los siguientes datos de contacto y antecedentes médicos recabados en
            el presente documento serán utilizados para llenar su historial médico.
          </SoftTypography>
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Todos sus datos serán tratados con total confidencialidad, la información sera utilizada
            única y exclusivamente para mejorar la calidad de la atención durante su consulta y
            brindarle un mejor servicio.
          </SoftTypography>
          {/** 
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Dra. Elizabeth Raquel Juárez <br />
            Mtra. Isbeth Gómez Díaz
            <br />
            LNC Laura Elizabeth Jiménez Criollo (Licenciada en Nutrición Clinica)
            <br />
            Dra. Victoria Sandoval Nava
            <br />
          </SoftTypography>*/}
          <SoftTypography variant="subtitle2" fontWeight="medium" mb={2}>
            Circuito Juan Pablo II. PB No. 3113. Colonia Fraccionamiento Las Ánimas, Puebla.
          </SoftTypography>
        </Card>
      </SoftBox>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <SoftBox component={Card} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
          <div className="overflow-x-auto mt-4">
            <SoftTypography variant="h6" color="secondary" mb={2}>
              Exploración Física (antropometría)
            </SoftTypography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableBody>
                

                  {/* Fila de Mediciones */}
                  {Object.keys(visibleFieldsMediciones).map((measurement, rowIndex) => (
                    <StyledTableRow key={measurement}>
                      <StyledTableCell component="th" scope="row">
                        {visibleFieldsMediciones[measurement]}
                      </StyledTableCell>
                      {/* Input para cada medición en la fila */}
                      <StyledTableCell>
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          value={formData[measurement]}
                          onChange={(e) => handleInputChange(e, measurement)}
                        />
                      </StyledTableCell>

                      {/* Celdas para las columnas de mediciones */}
                      {columnsMediciones.map((col, colIndex) => (
                        <StyledTableCell key={`cell-${colIndex}-${rowIndex}`}>
                          <input
                            type="text"
                            style={{
                              width: "100%",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            }}
                            value={col[rowIndex] || ""}
                            onChange={(e) =>
                              handleNewMeasurementChange(e, rowIndex, colIndex, "mediciones")
                            }
                          />
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <SoftBox mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ color: "white" }}
                onClick={() => addColumn("mediciones")}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Agregar Columna
              </Button>
            </SoftBox>
          </div>
        </SoftBox>

        {/* Boton enviar */}
        <SoftBox mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ color: "white" }}
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </SoftBox>
      </form>

      
    </SoftBox>
  );
}
antropometria.propTypes = {
  patientId: PropTypes.string.isRequired,
};
export default antropometria;
