import React from "react";
import { Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";

function Citas() {
  return (
    <Card style={{ padding: "16px" }}>
      <SoftTypography variant="h6">Citas</SoftTypography>
      <SoftTypography variant="body2" mt={2}>
               Aquí se gestionará las citas del paciente. (Contenido en desarrollo)
      </SoftTypography>
    </Card>
  );
}

export default Citas;
