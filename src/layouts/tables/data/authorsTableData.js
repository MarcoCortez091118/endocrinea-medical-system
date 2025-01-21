import React, { useEffect, useState } from "react";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import team2 from "assets/images/team-2.jpg";

export default function useUsuarioTableData() {
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        // Datos de prueba en lugar de la API
        const mockUsers = [
          {
            name: "Juan Pérez",
            phone: "555-123-4567",
            email: "juan.perez@example.com",
            city: "Ciudad de México",
            timestamp: "2025-01-21",
          },
          {
            name: "María López",
            phone: "555-987-6543",
            email: "maria.lopez@example.com",
            city: "Guadalajara",
            timestamp: "2025-01-20",
          },
          {
            name: "Carlos Rodríguez",
            phone: "555-765-4321",
            email: "carlos.rod@example.com",
            city: "Monterrey",
            timestamp: "2025-01-19",
          },
        ];

        // Transformar los datos para la tabla
        const rows = mockUsers.map((user) => ({
          foto: <SoftAvatar src={team2} size="sm" variant="rounded" />,
          nombre: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {user.name}
            </SoftTypography>
          ),
          teléfono: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {user.phone}
            </SoftTypography>
          ),
          correo: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {user.email}
            </SoftTypography>
          ),
          ciudad: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {user.city}
            </SoftTypography>
          ),
          fecha: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {user.timestamp}
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
        console.error("Error al cargar los datos locales:", error);
      }
    }

    fetchData();
  }, []);

  return data;
}
