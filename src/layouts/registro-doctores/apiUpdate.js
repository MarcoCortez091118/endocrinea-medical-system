import { jwtDecode } from 'jwt-decode';

export const apiUpdate = async (userId, updatedData) => {
    try {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;

        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const tokenExpirationTime = jwtDecode(token).exp * 1000;
        if (Date.now() > tokenExpirationTime) {
            throw new Error("El token ha expirado. Por favor, inicie sesión nuevamente.");
        }

        const response = await fetch(
            `https://endocrinea-fastapi-dataprocessing.azurewebsites.net/users/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            }
        );

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Error al actualizar el médico: ${errorResponse.detail}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error en la actualización:", error);
        throw error;
    }
};
