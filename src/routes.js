import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ClinicalForm from "layouts/FormsHistoryPsychological";
import HistorialEvolucion from "layouts/historial-evolucion";
import HistorialClinico from "layouts/historial-clinico";
import NotaClinico from "layouts/nota-Clinica/nota-Clinica";
import HistorialNutricional from "layouts/historial-nutricional";
import NotaNutricional from "layouts/nota-Nutricion/nota-Nutricion";
import NuevoRegistro from "layouts/registro-Paciente/nuevo-Registro";
import Agenda from "layouts/agenda";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import HistoryIcon from "@mui/icons-material/History";
import PatientDetails from "layouts/patientFiles/patientFiles";
import DoctorRegistrationForm from "layouts/registro-doctores";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ProtectedRoute from "components/ProtectedRoutes/ProtectedRoute";
import { useAuth } from "context/AuthContext";

const routes = (isAuthenticated, userRole) => {
  const baseRoutes = [
    {/*
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: (
      <ProtectedRoute>
      <Dashboard />
      /*</ProtectedRoute>
    ),
    noCollapse: true,*/
    },
    {
      type: "collapse",
      name: "Pacientes",
      key: "tables",
      route: "/tables",
      icon: <Office size="12px" />,
      component: (
        <ProtectedRoute>
          <Tables />
        </ProtectedRoute>
      ),
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Nuevo registro",
      key: "NuevoRegistro",
      route: "/NuevoRegistro",
      icon: <HistoryIcon size="12px" />,
      component: (
        <ProtectedRoute>
          <NuevoRegistro />
        </ProtectedRoute>
      ),
      //noCollapse: true,
    },
    //{
    //type: "collapse",
    //name: "HCP",
    //key: "ClinicalForm",
    //route: "/ClinicalForm",
    //icon: <HistoryIcon size="12px" />,
    //component: (
    /*<ProtectedRoute>*/
    //<ClinicalForm />
    /*</ProtectedRoute>*/
    // ),
    //noCollapse: true,
    // },
    // {
    //  type: "collapse",
    //  name: "HCN",
    //  key: "HistorialNutricional",
    //  route: "/HistorialNutricional",
    //  icon: <HistoryIcon size="12px" />,
    //   component: (
    /*<ProtectedRoute>*/
    //   <HistorialNutricional />
    /*</ProtectedRoute>*/
    //  ),
    //  noCollapse: true,
    // },
    {
      //type: "collapse",
      //name: "Nota Nutricional",
      key: "NotaNutricional",
      route: "/NotaNutricional",
      //icon: <HistoryIcon size="12px" />,
      component: (
        /*<ProtectedRoute>*/
        <NotaNutricional />
        /*</ProtectedRoute>*/
      ),
      // noCollapse: true,
    },
    {
      //  type: "collapse",
      // name: "Historial pacientes",
      key: "PatientDetails",
      route: "/PatientDetails",
      //icon: <HistoryIcon size="12px" />,
      component: (
        /*<ProtectedRoute>*/
        <PatientDetails />
        /*</ProtectedRoute>*/
      ),
      //noCollapse: true,
    },
    // {
    //   type: "collapse",
    //   name: "HCM",
    //   key: "HistorialClinico",
    //   route: "/HistorialClinico",
    //   icon: <HistoryIcon size="12px" />,
    //   component: (
    /*<ProtectedRoute>*/
    //    <HistorialClinico />
    /*</ProtectedRoute>*/
    //   ),
    //   noCollapse: true,
    // },

    {
      // type: "collapse",
      //name: "Nota Clínica Médica",
      key: "NotaClinico",
      route: "/nota-Clinica",
      //icon: <HistoryIcon size="12px" />,
      component: (
        /*<ProtectedRoute>*/
        <NotaClinico />
        /*</ProtectedRoute>*/
      ),
      //noCollapse: true,
    },
    {
      type: "collapse",
      name: "Agenda",
      key: "Agenda",
      route: "/Agenda",
      icon: <HistoryIcon size="12px" />,
      component: (
        <ProtectedRoute>
          <Agenda />
        </ProtectedRoute>
      ),
      noCollapse: true,
    },
  ];
  if (userRole === "administrador") {
    baseRoutes.push({
      type: "collapse",
      name: "Médicos",
      key: "RegistroDoctores",
      route: "/registro-doctores",
      icon: <LocalHospitalIcon size="12px" />,
      component: (
        <ProtectedRoute>
          <DoctorRegistrationForm />
        </ProtectedRoute>
      ),
      noCollapse: true,
    });
  }
  return [
    ...baseRoutes,
    { type: "title", title: "Account Pages", key: "account-pages" },
    ...(isAuthenticated
      ? [
        {
          type: "collapse",
          name: "Perfil",
          key: "profile",
          route: "/profile",
          icon: <CustomerSupport size="12px" />,
          component: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
          noCollapse: true,
        },
      ]
      : [
        {
          type: "collapse",
          name: "Iniciar sesión",
          key: "sign-in",
          route: "/authentication/sign-in",
          icon: <Document size="12px" />,
          component: <SignIn />,
          noCollapse: true,
        },
        /*
        {
          type: "collapse",
          name: "Registrarme",
          key: "sign-up",
          route: "/authentication/sign-up",
          icon: <SpaceShip size="12px" />,
          component: <SignUp />,
          noCollapse: true,
        },
        */
      ]),
  ];
};

export default routes;