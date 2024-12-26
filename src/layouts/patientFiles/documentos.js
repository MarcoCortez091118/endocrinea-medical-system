import React from "react";
import { Card, Divider, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, Box, Typography } from "@mui/material";
import { Download, Edit, Delete, Upload, Add } from "@mui/icons-material";

function Documentos() {
  const files = [
    { id: 1, name: "NOMBRE", author: "AUTHOR", date: "29/10/2024" },
    { id: 2, name: "jUAN LOPEZ AH", author: "Dr Oscar Lopez", date: "02/08/2024" },
    { id: 3, name: "JUAN LOPEZ rc", author: "Dr Oscar Lopez", date: "01/08/2024" },
  ];

  const renderNoDocuments = () => (
    <Box textAlign="center" py={5} style={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <Typography variant="body1" color="textSecondary">
        Todavía no hay documentos añadidos a la ficha de este paciente.
      </Typography>
      <Typography variant="body2" color="textSecondary" mt={2}>
        Haga clic en &quot;Crear documento&quot; o arrastre aquí los documentos que desea subir.
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Upload />} style={{ marginTop: "16px" }}>
        Subir archivo
      </Button>
    </Box>
  );

  const renderDocumentsTable = () => (
    <Table style={{ marginTop: "16px" }}>

      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell style={{ textAlign: "center" }}>
              <Button variant="outlined" size="small" style={{ borderColor: "#1976d2", color: "#1976d2" }}>PDF</Button>
            </TableCell>
            <TableCell style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{file.name}</TableCell>
            <TableCell style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{file.author}</TableCell>
            <TableCell style={{ textAlign: "center" }}>{file.date}</TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <IconButton color="primary"><Download /></IconButton>
              <IconButton color="warning"><Edit /></IconButton>
              <IconButton color="error"><Delete /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card style={{ padding: "16px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "16px" }}>Documentos</Typography>
      <Box display="flex" gap={2} mt={2} mb={2}>
        <Button variant="outlined" startIcon={<Upload />}>Subir archivo</Button>
        <Button variant="contained" color="success" startIcon={<Add />}>Crear documento</Button>
        <Button variant="text" style={{ color: "#1976d2", fontWeight: "bold" }}>Solicitar resultados de una prueba</Button>
      </Box>
      <Divider />
      {files.length > 0 ? renderDocumentsTable() : renderNoDocuments()}
    </Card>
  );
}

export default Documentos;
