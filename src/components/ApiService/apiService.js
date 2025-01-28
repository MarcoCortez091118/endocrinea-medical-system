const apiService = {
  getPatients: async () => {
    try {
      const response = await fetch(
        "https://endocrinea-fastapi-datacolletion.azurewebsites.net/patients"
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      return data; // Retorna los datos en formato JSON
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
      throw error; // Propaga el error para manejarlo más adelante
    }
  },
};

export default apiService;
