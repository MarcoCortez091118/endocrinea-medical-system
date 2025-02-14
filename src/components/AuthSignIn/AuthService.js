import { jwtDecode } from "jwt-decode";

export const loginUser = async (credentials) => {
  const API_URL = "https://endocrinea-fastapi-dataprocessing.azurewebsites.net/login";

  const params = new URLSearchParams({
    email: credentials.email,
    password: credentials.password,
  });

  try {
    const response = await fetch(`${API_URL}?${params.toString()}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Error al iniciar sesión.");
    }

    const data = await response.json();
    const accessToken = data.access_token;

    if (!accessToken) {
      throw new Error("No se recibió un token válido del servidor.");
    }

    const userResponse = await fetch(
      `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/users/${jwtDecode(accessToken).sub}`,
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
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      token: accessToken,
      role: userData.role,
    };
    localStorage.setItem("authData", JSON.stringify(authData));

    return authData;
  } catch (error) {
    console.error("Error durante la conexión al servidor:", error);
    throw new Error(error.message || "No se pudo conectar al servidor.");
  }
};