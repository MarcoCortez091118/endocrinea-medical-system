import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import apiService from "components/ApiService/apiService";
import team2 from "assets/images/team-2.jpg";
import PropTypes from "prop-types";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

Author.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default function useAuthorsTableData() {
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const forms = await apiService.getForms();
        console.log("Respuesta de la API:", forms); // Verifica qué devuelve la API

        // Si la respuesta no es un array, ajusta esto según la estructura real
        const dataArray = Array.isArray(forms) ? forms : forms.data || []; // Cambia `forms.data` si es necesario

        const rows = dataArray.map((form) => ({
          author: <Author name={form.name} email={form.email} />,
          phone: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.phone}
            </SoftTypography>
          ),
          city: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.city}
            </SoftTypography>
          ),
          campaing: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.campaign || "N/A"}
            </SoftTypography>
          ),
        }));

        setData({
          columns: [
            { name: "author", align: "left" },
            { name: "phone", align: "left" },
            { name: "city", align: "center" },
            { name: "campaing", align: "center" },
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
