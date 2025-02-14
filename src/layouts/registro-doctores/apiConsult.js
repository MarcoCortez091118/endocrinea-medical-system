export const apiConsult = async (userId) => {
    try {
        const response = await fetch(`https://endocrinea-fastapi-dataprocessing.azurewebsites.net/users/${userId}`);

        if (!response.ok) {
            throw new Error("No se pudo obtener el médico. Verifique el ID.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error al consultar médico:", error);
        throw error;
    }
};
