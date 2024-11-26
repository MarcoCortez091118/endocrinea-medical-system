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
        const forms = await apiService.getForms();
        console.log("Respuesta de la API:", forms);
        const dataArray = Array.isArray(forms) ? forms : forms.data || [];

        const rows = dataArray.map((form) => ({
          foto: (
            <SoftAvatar src={team2} size="sm" variant="rounded" />
          ),
          nombre: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.name}
            </SoftTypography>
          ),
          teléfono: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.phone}
            </SoftTypography>
          ),
          correo: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.email}
            </SoftTypography>
          ),
          ciudad: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.city}
            </SoftTypography>
          ),
          fecha: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.timestamp}
            </SoftTypography>
          ),
        }));

        setData({
          columns: [
            { name: "foto", align: "center" },
            { name: "nombre", align: "left" },
            { name: "teléfono", align: "left" },
            { name: "correo", align: "left" },
            { name: "ciudad", align: "left" },
            { name: "fecha", align: "left" },
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
