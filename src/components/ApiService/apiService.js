const apiService = {
  async getForms() {
    try {

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("Token no encontrado. Inicia sesión para continuar.");
      }

      const response = await fetch("https://bituin-fastapi-data.azurewebsites.net/forms/get?clients=uc", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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
