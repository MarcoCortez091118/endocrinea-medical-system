// src/api/userService.js
export const registerUser = async (userData) => {
    const url = "https://bituin-fastapi-data.azurewebsites.net/users/register";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result?.detail || "Ocurrió un error desconocido.";
            throw new Error(errorMessage);
        }
        return result;
    } catch (error) {
        throw new Error(error.message || "Error de conexión con el servidor.");
    }
};
