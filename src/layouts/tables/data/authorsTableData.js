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
        console.log("Pacientes obtenidos:", patients);

        const rows = patients.map((patient) => ({
          foto: (
            <SoftAvatar src={team2} size="sm" variant="rounded" />
          ),
          id: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {patient.id}
            </SoftTypography>
          ),
          nombre: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {patient.first_name} {patient.last_name}
            </SoftTypography>
          ),
          teléfono: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {patient.phone}
            </SoftTypography>
          ),
          correo: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {patient.email}
            </SoftTypography>
          ),
          género: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {patient.gender === "male" ? "Masculino" : "Femenino"}
            </SoftTypography>
          ),
          estatus: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {patient.status}
            </SoftTypography>
          ),
        }));

        setData({
          columns: [
            { name: "foto", align: "center" },
            { name: "id", align: "left" },
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