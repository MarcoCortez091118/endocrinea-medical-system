// utils/formHelper.js
export const sendFormData = (formData) => {
    fetch("https://tuservidor.com/api/formulario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Formulario enviado:", data);
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };
  