export const validatePassword = (password) => {
    if (!password) return "La contraseña es obligatoria.";
    if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    return null;
  };
  
  export const validateEmail = (email) => {
    if (!email) return "El correo electrónicoobligatoria.";
    if (!email) errors.email = "El correo electrónico es obligatorio.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Por favor, ingresa un correo electrónico válido.";
  };
  