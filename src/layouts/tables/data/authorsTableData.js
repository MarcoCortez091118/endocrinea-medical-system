import React, { useEffect, useState } from "react";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import apiService from "components/ApiService/apiService";
import team2 from "assets/images/team-2.jpg";

export default function useUsuarioTableData() {
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const patients = await apiService.getPatients();

        if (!Array.isArray(patients)) {
          console.error("Formato de pacientes inválido:", patients);
          return;
        }

        console.log("Pacientes obtenidos:", patients);

        const rows = patients.map((patient) => ({
          foto: <SoftAvatar src={team2} size="sm" variant="rounded" />,
          numero: patient.number ?? "No especificado",
          nombre: `${patient.first_name ?? "No first name"} ${patient.last_name ?? "No last name"}`,
          teléfono: patient.phone ?? "Teléfono no proporcionado",
          correo: patient.email ?? "Correo no proporcionado",
          género: patient.gender ?? "Género no especificado",
          estatus: patient.status ?? "Estatus no proporcionado",
        }));

        setData({
          columns: [
            { name: "foto", align: "center" },
            { name: "numero", align: "left" },
            { name: "nombre", align: "left" },
            { name: "teléfono", align: "left" },
            { name: "correo", align: "left" },
            { name: "género", align: "left" },
            { name: "estatus", align: "left" },
          ],
          rows,
        });
      } catch (error) {
        console.error("Error al procesar los datos:", error);
      }
    }

    fetchData();
  }, []);


  return data;
}