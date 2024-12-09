const logoutUser = async (setMessage) => {
    try {
        const response = await fetch('https://bituin-fastapi-data.azurewebsites.net/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            setMessage(data.message);

            document.cookie = "token=; path=/; max-age=0";
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

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

export default logoutUser;
