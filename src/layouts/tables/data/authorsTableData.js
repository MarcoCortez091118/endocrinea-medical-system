import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
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
        console.log("Respuesta de la API:", forms); 
        const dataArray = Array.isArray(forms) ? forms : forms.data || []; 

        const rows = dataArray.map((form) => ({
          autor: <Author image={team2} name={form.name} email={form.email} />,
          teléfono: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.phone}
            </SoftTypography>
          ),
          ciudad: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.city}
            </SoftTypography>
          ),
          campaña: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {form.campaign || "N/A"}
            </SoftTypography>
          ),
        }));

        setData({
          columns: [
            { name: "autor", align: "left" },
            { name: "teléfono", align: "left" },
            { name: "ciudad", align: "center" },
            { name: "campaña", align: "center" },
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
