export const apiGetDoctors = async () => {
    try {
        const response = await fetch("https://endocrinea-fastapi-dataprocessing.azurewebsites.net/users/", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const doctors = await response.json();

        return doctors.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (error) {
        console.error("❌ Error al obtener médicos:", error);
        throw error;
    }
};
