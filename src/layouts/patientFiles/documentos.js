import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  Button,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { Upload, FilePresent, PictureAsPdf, Image, CloudDownload, ErrorOutline } from "@mui/icons-material";

function Documentos() {

  const location = useLocation();
  const patient = location.state?.patient;
  const patientId = patient?.id;

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  useEffect(() => {
    if (patientId) {
      fetchDocuments();
    }
  }, [patientId]);

  const fetchDocuments = async () => {
    setLoadingDocs(true);
    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patientId}/documents/`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los documentos.");
      }
      const data = await response.json();
      // Ordenar por fecha de creación (más recientes primero)
      const sortedData = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setDocuments(sortedData);
    } catch (error) {
      setErrorMessage("❌ No se pudieron cargar los documentos.");
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("⚠️ Formato no permitido. Solo PDF, JPG y PNG.");
        return;
      }

      setSelectedFile(file);
      setErrorMessage("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("⚠️ Selecciona un archivo antes de subir.");
      return;
    }

    if (!patientId) {
      setErrorMessage("⚠️ Error: No se encontró el ID del paciente.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/${patientId}/documents/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al subir el archivo.");
      }

      setUploadSuccess(true);
      setSelectedFile(null);
      fetchDocuments(); // Refrescar lista tras subida
    } catch (error) {
      setUploadSuccess(false);
      setErrorMessage("❌ Hubo un problema al subir el archivo.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card
      style={{
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="medium"
        style={{
          marginBottom: "16px",
          color: "#183A64",
          textAlign: "center",
        }}
      >
        📁 Subida y Gestión de Documentos
      </Typography>
      <Box display="flex" gap={2} mt={2} mb={2}>
        {/* Botón "Subir archivo" */}
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
        {/* Botón "Crear documento" */}
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

      {/* 
        UX: Mensaje de que este apartado está deshabilitado temporalmente.
      */}
      {files.length === 0 ? (
        <Box
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#757575",
          }}
        >
          <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "16px" }}>
            ⚠️ Este apartado está temporalmente deshabilitado.
          </Typography>
          <Typography variant="body2" style={{ marginTop: "8px", fontSize: "14px" }}>
            📌 Por el momento, los documentos del paciente no están disponibles.
      {!patientId ? (
        <Box textAlign="center" color="red" p={2}>
          <Typography variant="subtitle2" fontWeight="medium">
            ⚠️ Error: No se ha seleccionado un paciente.
          </Typography>
        </Box>
      ) : (
        <>
          {/* Indicador de formatos permitidos */}
          <Box
            style={{
              backgroundColor: "#f0f8ff",
              padding: "10px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <FilePresent style={{ color: "#0077B6" }} />
            <Typography variant="subtitle2" fontWeight="medium" style={{ color: "#0077B6" }}>
              Solo se permiten archivos PDF, JPG y PNG.
            </Typography>
          </Box>

          {/* Selector de archivos */}
          <Box display="flex" alignItems="center" gap={2} justifyContent="center">
            <input
              type="file"
              accept=".jpg,.png,.pdf"
              style={{ display: "none" }}
              id="file-upload"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<Upload />}
                sx={{
                  backgroundColor: "#0077B6",
                  color: "#ffffff",
                  fontWeight: "medium",
                  "&:hover": { backgroundColor: "#005f8c" },
                }}
              >
                Seleccionar Archivo
              </Button>
            </label>

            {selectedFile && (
              <Typography variant="subtitle2" fontWeight="medium" sx={{ color: "#333" }}>
                {selectedFile.name}
              </Typography>
            )}
          </Box>

          {/* Botón de subida */}
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              color="success"
              onClick={handleUpload}
              disabled={isUploading}
              sx={{
                fontWeight: "medium",
                fontSize: "16px",
                textTransform: "capitalize",
                padding: "10px 20px",
              }}
            >
              {isUploading ? <CircularProgress size={24} color="inherit" /> : "Subir Archivo"}
            </Button>
          </Box>

          {/* Lista de Documentos */}
          <Box mt={3}>
            <Typography variant="h6" fontWeight="medium">
              📂 Archivos Subidos:
            </Typography>

            {loadingDocs ? (
              <CircularProgress />
            ) : documents.length === 0 ? (
              <Typography variant="subtitle2" fontWeight="medium" sx={{ color: "#757575" }}>
                No hay documentos disponibles.
              </Typography>
            ) : (
              <List>
                {documents.map((doc) => (
                  <ListItem key={doc.id} divider>
                    <ListItemIcon>
                      {doc.content_type === "application/pdf" ? <PictureAsPdf color="error" /> : <Image color="primary" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.filename}
                      secondary={`📅 ${new Date(doc.created_at).toISOString().split('T')[0]}`}
                    />
                    <IconButton href={doc.file_url} target="_blank">
                      <CloudDownload />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </>
      )}
    </Card>
  );
}

export default Documentos;
