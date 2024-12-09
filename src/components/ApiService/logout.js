const logoutUser = async (setMessage) => {
    try {
        const response = await fetch('https://bituin-fastapi-data.azurewebsites.net/users/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authData"))?.token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setMessage(data.message);

            sessionStorage.removeItem("authData");

            setTimeout(() => {
                window.location.href = 'authentication/sign-in';
            }, 2000);
        } else {
            console.error('Error al cerrar sesión');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
    }
};

export default logoutUser;
