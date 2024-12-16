import { useEffect, useState } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import logoct from "assets/images/logo-ct.png";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

function DefaultNavbar({ action }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    window.addEventListener("resize", displayMobileNavbar);
    displayMobileNavbar();

    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container>
      <SoftBox
        py={1.5}
        px={{ xs: 5, sm: 5, lg: 5 }}
        my={5}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="section"
        shadow="md"
        color="dark"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({ palette: { white }, functions: { rgba } }) => ({
          backgroundColor: rgba(white.main, 0.8),
          backdropFilter: `saturate(200%) blur(30px)`,
        })}
      >
        <SoftBox to="/" py={0.75} lineHeight={1}>
          <SoftBox component="img" src={logoct} alt="Logo" width="9rem" />
        </SoftBox>
        <SoftBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <DefaultNavbarLink
            icon="account_circle"
            name="Registrarme"
            route="/authentication/sign-up"
          />
          <DefaultNavbarLink
            icon="key"
            name="Iniciar sesi&oacute;n"
            route="/authentication/sign-in"
          />
        </SoftBox>
        {action && (
          <SoftBox display={{ xs: "none", lg: "inline-block" }}>
            <SoftButton
              component={action.type === "internal" ? Link : "a"}
              to={action.type === "internal" ? action.route : undefined}
              href={action.type === "external" ? action.route : undefined}
              target={action.type === "external" ? "_blank" : undefined}
              rel={action.type === "external" ? "noreferrer" : undefined}
              variant="gradient"
              color={action.color || "info"}
              size="small"
              circular
            >
              {action.label}
            </SoftButton>
          </SoftBox>
        )}
        <SoftBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </SoftBox>
      </SoftBox>
      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
