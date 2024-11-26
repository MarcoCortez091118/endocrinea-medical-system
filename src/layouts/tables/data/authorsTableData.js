import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import apiService from "components/ApiService/apiService";
import team2 from "assets/images/team-2.jpg";
import PropTypes from "prop-types";

function Usuario({ image, name }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

Usuario.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default function useUsuarioTableData() {
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const forms = await apiService.getForms();
        console.log("Respuesta de la API:", forms);
        const dataArray = Array.isArray(forms) ? forms : forms.data || [];

        const rows = dataArray.map((form) => ({
          nombre: <Usuario image={team2} name={form.name} />,
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
            { name: "nombre", align: "left" },
            { name: "teléfono", align: "left" },
            { name: "correo", align: "left" },
            { name: "ciudad", align: "center" },
            { name: "fecha", align: "center" },
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
