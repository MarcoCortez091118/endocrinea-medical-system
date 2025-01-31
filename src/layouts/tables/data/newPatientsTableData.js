import React, { useEffect, useState } from "react";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import Button from "@mui/material/Button";
import team2 from "assets/images/team-2.jpg";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para manejar la navegación

export default function useNewPatientsTableData() {
  const [data, setData] = useState({ newColumns: [], newRows: [] });
  const navigate = useNavigate(); // Hook para manejar la navegación

  useEffect(() => {
    async function fetchNewPatients() {
      try {
        const response = await fetch("https://endocrinea-fastapi-datacolletion.azurewebsites.net/new_patients");
        const newPatients = await response.json();

        if (!Array.isArray(newPatients)) {
          console.error("Formato inválido de nuevos pacientes:", newPatients);
          return;
        }

        console.log("Nuevos pacientes obtenidos:", newPatients);

        const newRows = newPatients.map((patient) => ({
          foto: <SoftAvatar src={team2} size="sm" variant="rounded" />,
          id: patient.id ?? "No especificado",
          nombre: `${patient.first_name ?? "No first name"} ${patient.last_name ?? "No last name"}`,
          teléfono: patient.phone ?? "Teléfono no proporcionado",
          correo: patient.email ?? "Correo no proporcionado",
          género: patient.gender ?? "Género no especificado",
          estatus: patient.status ?? "Estatus no proporcionado",
          Acciones: (
            <Button
              onClick={() => navigate("/PatientDetails", { state: { patient } })}
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
