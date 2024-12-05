import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Material UI Icons
import Icon from "@mui/material/Icon"; // Para usar íconos como "visibility" y "visibility_off"

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

// Validation form registration
import { validateForm } from "components/FormsValidation/validation";
import { registerUser } from "components/ApiService/signupService";

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  const togglePasswordVisibility = () => setShowPassword(!showPassword); // Función para alternar el estado

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    const validationErrors = validateForm(name, email, password, agreement);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const payload = {
        username: name,
        mail: email,
        password: password,
        validate_password: password,
        timestamp: new Date().toISOString(),
      };

      try {
        const result = await registerUser(payload);
        setMessage(`¡Registro exitoso! Redirigiendo...`);
        setRedirecting(true);
        setTimeout(() => {
          navigate("/authentication/sign-in");
        }, 3000);
      } catch (error) {
        console.error("Error recibido:", error);
        const errorMessage = typeof error.message === "string" ? error.message : "Ocurrió un error desconocido.";
        setMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <BasicLayout title="Bienvenido" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography
            variant="h5"
            fontWeight="medium"
            sx={{ color: "#E0040B !important" }}
          >
            Regístrate
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            {/* Nombre */}
            <SoftBox mb={2}>
              <SoftInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                error={!!errors.name}
                fullWidth
              />
              {errors.name && (
                <SoftTypography
                  variant="caption"
                  color="error"
                  sx={{ paddingTop: "5px", display: "block" }}
                >
                  {errors.name}
                </SoftTypography>
              )}
            </SoftBox>

            {/* Correo electrónico */}
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                error={!!errors.email}
                fullWidth
              />
              {errors.email && (
                <SoftTypography
                  variant="caption"
                  color="error"
                  sx={{ paddingTop: "5px", display: "block" }}
                >
                  {errors.email}
                </SoftTypography>
              )}
            </SoftBox>

            {/* Contraseña con ojito */}
            <SoftBox mb={2} display="flex" alignItems="center">
              <SoftInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                error={!!errors.password}
                fullWidth
                style={{
                  "::-ms-reveal": {
                    display: "none", // Oculta el ojo de Edge
                  },
                }}
              />
              <Icon
                onClick={togglePasswordVisibility}
                sx={{
                  cursor: "pointer",
                  marginLeft: "-35px",
                  zIndex: "10",
                  color: "#aaa",
                }}
              >
                {showPassword ? "visibility" : "visibility_off"}
              </Icon>
            </SoftBox>
            {errors.password && (
              <SoftTypography
                variant="caption"
                color="error"
                sx={{ paddingTop: "5px", display: "block" }}
              >
                {errors.password}
              </SoftTypography>
            )}

            {/* Aceptación de términos */}
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
              <SoftTypography
                variant="caption"
                color="error"
                sx={{
                  paddingTop: "5px",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {errors.agreement}
              </SoftTypography>
            )}

            {/* Botón de registro */}
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Regístrate"}
              </SoftButton>
            </SoftBox>
            {message && (
              <SoftTypography
                variant="subtitle2"
                color="error"
                sx={{
                  paddingTop: "10px",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {message}
              </SoftTypography>
            )}
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                ¿Ya tienes una cuenta?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Inicia sesi&oacute;n
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
