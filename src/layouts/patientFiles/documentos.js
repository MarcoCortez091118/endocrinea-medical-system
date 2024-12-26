import React from "react";
import { Card, Divider, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button } from "@mui/material";
import { Download, Edit, Delete } from "@mui/icons-material";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";

function Documentos() {
  const files = [
    { id: 1, name: "Aaron Martinez Morales pqte platino vig septiembre", author: "Erika Guadalupe Munguía", date: "29/10/2024" },
    { id: 2, name: "A.C. Aaron Martinez Morales Dra Laura", author: "Erika Guadalupe Munguía", date: "02/08/2024" },
    { id: 3, name: "A.C. Aaron Martinez Morales Dra Caro", author: "Erika Guadalupe Munguía", date: "01/08/2024" },
  ];

  return (
    <Card style={{ padding: "16px" }}>
      <SoftTypography variant="h6">Documentos</SoftTypography>
      <SoftBox display="flex" gap={2} mt={2} mb={2}>
        <Button variant="outlined" startIcon={<i className="fas fa-upload" />}>Subir archivo</Button>
        <Button variant="contained" color="success">Crear documento</Button>
        <Button variant="text" startIcon={<i className="fas fa-file-medical" />}>Solicitar resultados de una prueba</Button>
      </SoftBox>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>
                <Button variant="outlined" size="small">PDF</Button>
              </TableCell>
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.author}</TableCell>
              <TableCell>{file.date}</TableCell>
              <TableCell>
                <IconButton color="primary"><Download /></IconButton>
                <IconButton color="warning"><Edit /></IconButton>
                <IconButton color="error"><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default Documentos;
