import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

// Material-UI icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

// Importation validation
import { validateForm } from "components/FormsValidation/validation";

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState(""); // Track which input is focused

  const handleSetAgreement = () => setAgreement(!agreement);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const validationErrors = validateForm(name, email, password, agreement);
    
    if (Object.keys(validationErrors).length === 0) {
      console.log("Formulario enviado exitosamente");
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const getInputStyle = (inputName) => ({
    border: `1px solid ${focusedInput === inputName ? "#E0040B" : "#ccc"}`,
    paddingRight: "40px", // Space for the icon to fit inside the input's contoured box
  });

  return (
    <BasicLayout title="Bienvenido" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium" sx={{ color: "#E0040B !important" }}>
            Regístrate
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                error={!!errors.name}
                fullWidth
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput("")}
                style={getInputStyle("name")}
              />
              {errors.name && (
                <SoftTypography variant="caption" color="error" sx={{ paddingTop: "5px", display: "block" }}>
                  {errors.name}
                </SoftTypography>
              )}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                error={!!errors.email}
                fullWidth
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput("")}
                style={getInputStyle("email")}
              />
              {errors.email && (
                <SoftTypography variant="caption" color="error" sx={{ paddingTop: "5px", display: "block" }}>
                  {errors.email}
                </SoftTypography>
              )}
            </SoftBox>
            <SoftBox mb={2} sx={{ position: "relative" }}>
              <SoftInput
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                error={!!errors.password}
                fullWidth
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput("")}
                style={getInputStyle("password")}
              />
              {/* Eye icon outside the input but inside the border */}
              <IconButton
                onClick={togglePasswordVisibility}
                edge="end"
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: focusedInput === "password" ? "#E0040B" : "#ccc",
                }}
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              {errors.password && (
                <SoftTypography variant="caption" color="error" sx={{ paddingTop: "5px", display: "block" }}>
                  {errors.password}
                </SoftTypography>
              )}
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Acepto los&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Términos y condiciones
              </SoftTypography>
            </SoftBox>
            {errors.agreement && (
              <SoftTypography variant="caption" color="error" sx={{ paddingTop: "5px", display: "block", textAlign: "center" }}>
                {errors.agreement}
              </SoftTypography>
            )}
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                Regístrate
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                ¿Ya tienes una cuenta?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Inicia sesión
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
