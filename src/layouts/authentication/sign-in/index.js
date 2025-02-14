import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Switch from "@mui/material/Switch";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
// Services and validations
import { loginUser } from "components/AuthSignIn/AuthService";
import { validateEmail, validatePassword } from "components/AuthSignIn/validations";
// Images
import Icon from "@mui/material/Icon";
import curved9 from "assets/images/curved-images/curved-6.jpg";

import { useAuth } from "context/AuthContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      if (savedEmail) setEmail(savedEmail);
      if (savedPassword) setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      const response = await loginUser({ email, password });

      if (response && response.token) {
        document.cookie = `token=${response.token}; path=/; secure; samesite=strict; max-age=86400`;

        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }


        login(response);

        setSuccessMessage("¡Bienvenido! Has iniciado sesión correctamente.");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/tables");
        }, 1600);
      } else {
        setError("No se recibió un token válido del servidor.");
      }
    } catch (err) {
      console.error("Error durante el inicio de sesión:", err);
      setError(err.message || "Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <CoverLayout
      title="Bienvenido"
      description="Ingresa tu correo electrónico y contraseña para iniciar sesión"
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Correo electrónico
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Contraseña
            </SoftTypography>
          </SoftBox>
          <SoftBox display="flex" alignItems="center">
            <SoftInput
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Icon
              onClick={() => setShowPassword(!showPassword)}
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
        </SoftBox>

        {error && (
          <SoftTypography color="error" variant="caption">
            {error}
          </SoftTypography>
        )}
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Guardar mi información
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            Iniciar sesión
          </SoftButton>
        </SoftBox>
        {/* 
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            ¿No tienes una cuenta?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Regístrate
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        */}
      </SoftBox>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ padding: "100px" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </CoverLayout>
  );
}

export default SignIn;
