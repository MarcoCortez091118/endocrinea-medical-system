import React, { useEffect } from "react";
const apiService = ({ setRows }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://bituin-fastapi-data.azurewebsites.net/get_forms");
        const data = await response.json();
        const filteredData = data.data.map((item) => ({
          name: item.name || "Unknown",
          email: item.email || "No email",
        }));
        setRows(filteredData);
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
      }
    };
    fetchData();
  }, [setRows]);
  return null;
};
export default apiService;
