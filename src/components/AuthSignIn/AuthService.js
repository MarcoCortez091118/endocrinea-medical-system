export const loginUser = async (credentials) => {
  const API_URL = "https://bituin-fastapi-data.azurewebsites.net/users/login";
  console.log("Preparando la solicitud al servidor...");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("Estado de la respuesta:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("Error desde la API:", error);

      if (error.detail === "Credenciales inválidas.") {
        throw new Error(
          "Correo o contraseña incorrectos. Por favor, verifica tus datos e inténtalo nuevamente."
        );
      }

      throw new Error(
        error.detail ||
          "Hubo un problema al intentar iniciar sesión. Por favor, intenta de nuevo más tarde."
      );
    }

    const data = await response.json();
    console.log("Respuesta exitosa de la API.");
    const accessToken = data.data.access_token;
    if (!accessToken) {
      throw new Error("No se recibió un token válido del servidor.");
    }
    const userResponse = await fetch(
      "https://bituin-fastapi-data.azurewebsites.net/users/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error("No se pudo obtener los datos del usuario.");
    }
    const userData = await userResponse.json();
    return {
      name: userData.name,
      email: userData.email,
      token: accessToken,
    };
  } catch (error) {
    console.error("Error durante la conexión al servidor:", error);
    throw new Error(error.message || "No se pudo conectar al servidor.");
  }
};
