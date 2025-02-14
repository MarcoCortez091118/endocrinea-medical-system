import React, { useEffect, useState } from "react";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import { apiGetDoctors } from "./apiGetDoctors";
import team2 from "assets/images/team-2.jpg";

export default function doctorsTableData() {
    const [data, setData] = useState({ columns: [], rows: [] });

    useEffect(() => {
        async function fetchData() {
            try {
                const doctors = await apiGetDoctors();

                if (!Array.isArray(doctors)) {
                    console.error("Formato de datos inválido:", doctors);
                    return;
                }

                console.log("Doctores obtenidos:", doctors);

                const rows = doctors.map((doctor) => ({
                    foto: <SoftAvatar src={team2} size="sm" variant="rounded" />,
                    id: doctor.id ?? "No especificado",
                    nombre: `${doctor.firstName ?? "No first name"} ${doctor.lastName ?? "No last name"}`,
                    teléfono: doctor.phone ?? "Teléfono no proporcionado",
                    correo: doctor.email ?? "Correo no proporcionado",
                    rol: doctor.role ?? "Rol no especificado",
                }));

                setData({
                    columns: [
                        { name: "foto", align: "center" },
                        { name: "id", align: "left" },
                        { name: "nombre", align: "left" },
                        { name: "teléfono", align: "left" },
                        { name: "correo", align: "left" },
                        { name: "rol", align: "left" },
                    ],
                    rows,
                });
            } catch (error) {
                console.error("❌ Error al obtener los datos de los doctores:", error);
            }
        }

        fetchData();
    }, []);


    return data;
}