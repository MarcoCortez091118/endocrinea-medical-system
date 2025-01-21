import React from "react";
import {
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Download, Edit, Delete, Upload, Add } from "@mui/icons-material";

function Documentos() {
  const files = [
    { id: 1, name: "Juan Lopez ", author: "DR Bryan Pichon", date: "29/10/2024" },
    { id: 2, name: "Juan Lopez AH", author: "Dr Oscar Lopez", date: "02/08/2024" },
    { id: 3, name: "Juan Lopez RC", author: "Dr Oscar Lopez", date: "01/08/2024" },
  ];

  return (
    <Card
      style={{
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
          marginBottom: "16px",
          color: "#183A64",
        }}
      >
        Documentos
      </Typography>
      <Box display="flex" gap={2} mt={2} mb={2}>
        {/* Botón "Subir archivo" con gradiente */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Upload />}
          style={{
            fontWeight: "bold",
            textTransform: "capitalize",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
             color: "#FFFFFF",
          }}
        >
          Subir archivo
        </Button>
        {/* Botón "Crear documento" con color suave */}
        <Button
          variant="contained"
          startIcon={<Add />}
          style={{
            backgroundColor: "#66bb6a", // Verde suave
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: "14px",
            padding: "10px 20px",
            textTransform: "capitalize",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
          }}
        >
          Crear documento
        </Button>
      </Box>
      <Divider />
      <Table
        style={{
          marginTop: "16px",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
        }}
      >
        <TableBody>
          {files.map((file, index) => (
            <TableRow
              key={file.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <TableCell style={{ textAlign: "center", padding: "12px", width: "15%" }}>
                <Button
                  variant="outlined"
                  size="small"
                  style={{ borderColor: "#183A64", color: "#183A64" }}
                >
                  PDF
                </Button>
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center", width: "30%" }}>
                {file.name}
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center", width: "25%" }}>
                {file.author}
              </TableCell>
              <TableCell style={{ textAlign: "center", padding: "12px", width: "15%" }}>
                {file.date}
              </TableCell>
              <TableCell style={{ textAlign: "center", padding: "12px", width: "15%" }}>
                <IconButton style={{ color: "#183A64" }}>
                  <Download />
                </IconButton>
                <IconButton style={{ color: "#183A64" }}>
                  <Edit />
                </IconButton>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default Documentos;
