/* eslint-disable react/prop-types */
import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function FormNotaClinica({ formData, onChange, onSubmit }) {
  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <SoftBox component="div" sx={{ p: 3, boxShadow: 3, mb: 3 }}>
        <SoftTypography
          htmlFor="medicNote"
          variant="body1"
          color="textPrimary"
          fontWeight="bold"
        >
          Información de la nota clínica
        </SoftTypography>
        <textarea
          id="medicNote"
          name="medicNote"
          placeholder="Escriba las especificaciones..."
          value={formData.medicNote || ""} // Asegura un valor predeterminado
          onChange={onChange}
          rows="4"
          className="global-textarea"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </SoftBox>
      <SoftBox textAlign="center">
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Enviar
        </button>
      </SoftBox>
    </form>
  );
}

export default FormNotaClinica;
/* eslint-enable react/prop-types */
