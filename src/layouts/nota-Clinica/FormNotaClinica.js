/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useLocation } from "react-router-dom";

function FormNotaClinica({ formData, onChange, onSubmit }) {

  const location = useLocation();
  const [patient, setPatient] = useState(location.state?.patient || null);

  useEffect(() => {
    if (!patient) {
      const storedPatient = localStorage.getItem("selectedPatient");
      if (storedPatient) {
        setPatient(JSON.parse(storedPatient));
      }
    }
  }, [patient]);

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
          value={formData.medicNote || ""} 
          onChange={onChange}
          rows="7"
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
