import React, { useEffect, useState } from "react";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import Button from "@mui/material/Button";
import team2 from "assets/images/team-2.jpg";
import { useNavigate } from "react-router-dom";

export default function useNewPatientsTableData() {
  const [data, setData] = useState({ newColumns: [], newRows: [] });
  const navigate = useNavigate();
  const traducirGenero = (genero) => {
    const traducciones = {
      male: "Masculino",
      female: "Femenino",
      other: "Otro",
      "not specified": "No especificado",
    };
    return traducciones[genero] || "Género no especificado";
  };

  useEffect(() => {
    async function fetchNewPatients() {
      try {
        const response = await fetch("https://endocrinea-fastapi-dataprocessing.azurewebsites.net/patients/?q=");
        const newPatients = await response.json();

        if (!Array.isArray(newPatients)) {
          console.error("Formato inválido de nuevos pacientes:", newPatients);
          return;
        }

        console.log("Nuevos pacientes obtenidos:", newPatients);

        const newRows = newPatients.map((patient) => ({
          foto: <SoftAvatar src={team2} size="sm" variant="rounded" />,
          id: patient.id ?? "No especificado",
          nombre: `${patient.first_name ?? "Nombre no proporcionado"} ${patient.last_name ?? "Apellido no proporcionado"}`,
          teléfono: patient.phone ?? "Teléfono no proporcionado",
          correo: patient.email ?? "Correo no proporcionado",
          género: traducirGenero(patient.gender),
          estatus: patient.status ?? "Estatus no proporcionado",
          Acciones: (
            <Button
              onClick={() => {
                const patientData = {
                  name: `${patient.first_name ?? "Nombre no proporcionado"} ${patient.last_name ?? "Apellido no proporcionado"}`,
                  id: patient.id ?? "No especificado",
                  email: patient.email ?? "Correo no proporcionado",
                  phone: patient.phone ?? "Teléfono no proporcionado",
                  gender: traducirGenero(patient.gender),
                  status: patient.status ?? "Estatus no proporcionado",
                };

                localStorage.setItem("selectedPatient", JSON.stringify(patientData)); // Guardar en localStorage

                navigate("/PatientDetails", { state: { patient: patientData } });
              }}
              variant="text"
              color="primary"
            >
              Ver Detalles
            </Button>

          ),
        }));

        setData({
          newColumns: [
            { name: "foto", align: "center" },
            { name: "id", align: "left" },
            { name: "nombre", align: "left" },
            { name: "teléfono", align: "left" },
            { name: "correo", align: "left" },
            { name: "género", align: "left" },
            { name: "estatus", align: "left" },
            { name: "Acciones", align: "center" },
          ],
          newRows,
        });
      } catch (error) {
        console.error("Error al obtener los nuevos pacientes:", error);
      }
    }

    fetchNewPatients();
  }, []);

  return data;
}
