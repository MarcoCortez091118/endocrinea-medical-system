import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import "layouts/TextareaStyles.css";
import { useLocation } from "react-router-dom";

function Antropometria() {

  const location = useLocation();
  const [patient, setPatient] = useState(location.state?.patient || null);

  useEffect(() => {
    if (!patient) {
      const storedPatient = localStorage.getItem("selectedPatient");
      if (storedPatient) {
        setPatient(JSON.parse(storedPatient));
      }
    }
  }, [patient]);

  const [formData, setFormData] = useState({
    waist: "",
    abdomen: "",
    hips: "",
    leftArm: "",
    rightArm: "",
    rightCalf: "",
    leftCalf: "",
  });

  const [progressRecords, setProgressRecords] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [chartUrl, setChartUrl] = useState("");

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

  const fetchProgressRecords = async () => {
    if (!patient?.id) return;
    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/progress_records/`
      );
      if (!response.ok) throw new Error("Error al obtener registros");

      const data = await response.json();
      setProgressRecords(data);
    } catch (error) {
      console.error("Error obteniendo registros:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData };

    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/progress_records/`,
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

      fetchProgressRecords();
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error al guardar el historial.");
    }
  };

  useEffect(() => {
    fetchProgressRecords();
  }, [patient]);

  const toggleChart = async () => {
    if (showChart) {
      setShowChart(false);
    } else {
      try {
        const response = await fetch(
          `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/progress_records/chart`
        );
        if (!response.ok) throw new Error("Error al obtener la gráfica");

        const imageUrl = URL.createObjectURL(await response.blob());
        setChartUrl(imageUrl);
        setShowChart(true);
      } catch (error) {
        console.error("Error obteniendo la gráfica:", error);
      }
    }
  };

  const downloadPdf = async () => {
    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patient.id}/progress_records/pdf`
      );
      if (!response.ok) throw new Error("Error al descargar el PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Reporte_Antropometria_${patient.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando el PDF:", error);
    }
  };

  return (
    <SoftBox py={3}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <SoftBox component={Card} sx={{ p: 4, mb: 3, boxShadow: 2, borderRadius: "10px" }}>
          <SoftTypography variant="h6" color="secondary" mb={2}>
            Exploración Física (Antropometría)
          </SoftTypography>

          <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 1 }}>
            <Table>
              <TableBody>
                {Object.keys(visibleFieldsMediciones).map((measurement) => (
                  <TableRow key={measurement}>
                    <TableCell sx={{ fontWeight: "bold", borderBottom: "none" }}>
                      {visibleFieldsMediciones[measurement]}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <input
                        type="text"
                        value={formData[measurement]}
                        onChange={(e) => handleInputChange(e, measurement)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: "12px", fontSize: "16px", borderRadius: "8px", boxShadow: 2 }}
        >
          Enviar
        </Button>
      </form>

      <SoftBox mt={4}>
        <SoftTypography variant="h6" color="secondary" mb={2}>
          Historial de Mediciones
        </SoftTypography>

        <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: 3, overflowX: "auto", padding: 2 }}>
          <Table sx={{ width: "100%", tableLayout: "auto" }}>
            <TableBody>
              {/* Encabezado con fechas */}
              <TableRow sx={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ddd" }}>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>📅 Fecha</TableCell>
                {progressRecords.map((record, index) => (
                  <TableCell key={index} sx={{ fontWeight: "bold", textAlign: "center" }}>
                    {new Date(record.created_at).toLocaleDateString()}
                  </TableCell>
                ))}
              </TableRow>

              {/* Datos en filas */}
              {Object.keys(visibleFieldsMediciones).map((measurement) => (
                <TableRow key={measurement} sx={{ borderBottom: "1px solid #eee" }}>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>{visibleFieldsMediciones[measurement]}</TableCell>
                  {progressRecords.map((record, index) => (
                    <TableCell key={index} sx={{ textAlign: "center" }}>{record[measurement] || "N/A"}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SoftBox>

      {/* Botones adicionales */}
      <Button variant="contained" onClick={toggleChart} sx={{ mt: 2, mr: 2 }}>{showChart ? "Dejar de mostrar" : "Mostrar gráfica"}</Button>
      {showChart && <img src={chartUrl} alt="Gráfica" style={{ width: "100%", marginTop: "10px" }} />}
      <Button variant="contained" onClick={downloadPdf} sx={{ mt: 2 }}>Descargar PDF</Button>
    </SoftBox>
  );
}

export default Antropometria;
