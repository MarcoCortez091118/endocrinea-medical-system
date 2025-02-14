const logoutUser = async (setMessage) => {
    try {
        const response = await fetch('https://endocrinea-fastapi-dataprocessing.azurewebsites.net/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("authData"))?.token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            setMessage({ text: data.message || "Sesión cerrada exitosamente", type: "success" });
            localStorage.removeItem("authData");

            setTimeout(() => {
                window.location.href = 'authentication/sign-in';
            }, 2000);
        } else {
            setMessage({ text: data.message || "Error al cerrar sesión", type: "error" });
        }
    } catch (error) {
        setMessage({ text: "Error al enviar la solicitud", type: "error" });
        console.error('Error al enviar la solicitud:', error);
    }
};

export default logoutUser;
