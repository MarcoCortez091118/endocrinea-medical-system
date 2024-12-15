// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import WebIcon from "@mui/icons-material/Web";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link"; 
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Footer() {
  return (
    <SoftBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <SoftBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Company
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                About Us
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 0, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Team
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Product
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Blog
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Pricing
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={8}>
          <SoftBox display="flex" justifyContent="center" mt={1} mb={3}>
          <SoftBox color="secondary">
              <Link href="" target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
                <WebIcon fontSize="small" />
              </Link>
            </SoftBox>
            <SoftBox color="secondary">
              <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
                <LinkedInIcon fontSize="small" />
              </Link>
              </SoftBox>
            <SoftBox mr={3} color="secondary">
                <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
                 <FacebookIcon fontSize="small" />
                </Link>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={8}>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" mt={3}>
            <SoftBox display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
              <SoftTypography variant="body2" color="secondary" textAlign="center">
              &copy;  Copyright 2024 - Design: NeuroMarket
              </SoftTypography>
              <Icon color="inherit" fontSize="inherit">
                favorite
               </Icon>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Footer;
