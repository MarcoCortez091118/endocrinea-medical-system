const apiService = {
  async getForms() {
    try {
      const response = await fetch("https://bituin-fastapi-data.azurewebsites.net/get_forms");
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
      return [];
    }
  },
};

export default apiService;
