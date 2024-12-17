export const loginUser = async (credentials) => {
  const API_URL = "https://bituin-fastapi-data.azurewebsites.net/users/login";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Error al iniciar sesión.");
    }

    const data = await response.json();
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

    const authData = {
      name: userData.name,
      email: userData.email,
      token: accessToken,
    };
    localStorage.setItem("authData", JSON.stringify(authData));

    return authData;
  } catch (error) {
    console.error("Error durante la conexión al servidor:", error);
    throw new Error(error.message || "No se pudo conectar al servidor.");
  }
};
