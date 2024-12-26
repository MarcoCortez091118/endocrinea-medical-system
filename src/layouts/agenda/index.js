import React, { useCallback, useEffect, useRef, useState } from 'react';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import PropTypes from 'prop-types';
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import Card from "@mui/material/Card";
import App from './app';

function Agenda() {

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card>
                        <App />
                    </Card>
                </SoftBox>
            </SoftBox>
        </DashboardLayout >
    );
}

export default Agenda;
