// Importaciones necesarias
import React, { useState } from "react";
import Card from "@mui/material/Card";
import {
  TextField,
  Button,
} from "@mui/material";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function NotaClinico() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [notasGuardadas, setNotasGuardadas] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaNota = {
      contenido: formData.email,
      fecha: new Date().toLocaleString(),
    };

    setNotasGuardadas((prevNotas) => [nuevaNota, ...prevNotas]);

    // Limpiar el campo de texto
    setFormData({ email: "" });
  };

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card
            style={{
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <SoftBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              p={3}
            >
              <SoftTypography variant="h4">Nota Clínica Médica -</SoftTypography>
              <SoftTypography variant="h4">Endocrinea Care</SoftTypography>
              <SoftTypography
                variant="subtitle2"
                fontWeight="medium"
                mt={3}
              >
                Estimado paciente los siguientes datos de contacto y antecedentes
                médicos recabados en el presente documento serán utilizados para
                llenar su historial médico.
              </SoftTypography>
            </SoftBox>
          </Card>
        </SoftBox>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <SoftBox mt={4}>
            <Card
              style={{
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <SoftBox p={3}>
                <SoftBox mb={2}>
                  <label htmlFor="email">Información de la nota clínica</label>
                  <textarea
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    rows="4"
                    className="global-textarea"
                  />
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>

          <SoftBox mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ color: "white" }}
            >
              Enviar
            </Button>
          </SoftBox>
        </form>

        {/* Sección para mostrar las notas guardadas */}
        <SoftBox mt={4}>
          <Card
            style={{
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <SoftBox p={3}>
              <SoftTypography variant="h5" mb={2}>
                Notas Guardadas
              </SoftTypography>
              {notasGuardadas.length === 0 ? (
                <SoftTypography>No hay notas guardadas aún.</SoftTypography>
              ) : (
                notasGuardadas.map((nota, index) => (
                  <SoftBox key={index} mb={2}>
                    <SoftTypography variant="subtitle1" fontWeight="bold">
                      Fecha: {nota.fecha}
                    </SoftTypography>
                    <SoftTypography>
                      {nota.contenido.split("\n").slice(0, 5).join(" ")}...
                    </SoftTypography>
                  </SoftBox>
                ))
              )}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default NotaClinico;
