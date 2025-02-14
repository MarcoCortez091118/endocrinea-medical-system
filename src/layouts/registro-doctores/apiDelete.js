import { jwtDecode } from 'jwt-decode';

export const deleteDoctor = async (userId) => {
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
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Error al eliminar el médico: ${errorResponse.detail}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error en la eliminación:", error);
        throw error;
    }
};
