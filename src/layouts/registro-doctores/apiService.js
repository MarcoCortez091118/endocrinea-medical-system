export const registerDoctor = async (doctorData) => {
    try {
        const response = await fetch("https://endocrinea-fastapi-dataprocessing.azurewebsites.net/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(doctorData)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json();  // Devuelve la respuesta en JSON
    } catch (error) {
        console.error("❌ Error al registrar médico:", error);
        throw error;
    }
};
