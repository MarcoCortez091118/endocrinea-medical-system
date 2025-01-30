export const sendFormData = async (formData) => {
  try {
    const response = await fetch(
      "https://endocrinea-fastapi-datacolletion.azurewebsites.net/psychology/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error sending form data:", error);
    return { success: false, error: error.message };
  }
};
