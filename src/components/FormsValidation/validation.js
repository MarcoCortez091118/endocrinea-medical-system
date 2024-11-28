export const validateForm = (name, email, password, agreement) => {
  const errors = {};
  
  if (!name) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!email) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  if (!agreement) {
    errors.agreement = "Debes aceptar los términos y condiciones.";
  }

  return errors;
};
