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
  } else if (password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "La contraseña debe contener al menos una letra mayúscula.";
  } else if (!/[a-z]/.test(password)) {
    errors.password = "La contraseña debe contener al menos una letra minúscula.";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "La contraseña debe contener al menos un número.";
  } else if (!/[@$!%*?&]/.test(password)) {
    errors.password = "La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &).";
  }

  if (!agreement) {
    errors.agreement = "Debes aceptar los términos y condiciones.";
  }

  return errors;
};
