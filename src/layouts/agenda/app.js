import React, { Fragment, useRef, useState } from "react";
import {
    Button,
    Typography,
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Tooltip,
    IconButton,
} from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Scheduler } from "@aldabil/react-scheduler";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { DOCTOR, EVENTS, PATIENTS } from "./data";
import { es } from "date-fns/locale";

function App() {
    const [mode, setMode] = useState("default");
    const calendarRef = useRef(null);

    return (
        <Fragment>
            <div style={{ textAlign: "center" }}>
                <span>Modo de Vista: </span>
                <Button
                    color={mode === "default" ? "primary" : "inherit"}
                    variant={mode === "default" ? "contained" : "text"}
                    size="small"
                    onClick={() => {
                        setMode("default");
                        calendarRef.current?.scheduler?.handleState(
                            "default",
                            "resourceViewMode"
                        );
                    }}
                >
                    Predeterminado
                </Button>
                <Button
                    color={mode === "tabs" ? "primary" : "inherit"}
                    variant={mode === "tabs" ? "contained" : "text"}
                    size="small"
                    onClick={() => {
                        setMode("tabs");
                        calendarRef.current?.scheduler?.handleState(
                            "tabs",
                            "resourceViewMode"
                        );
                    }}
                >
                    Pestañas
                </Button>
            </div>
            <Scheduler
                ref={calendarRef}
                view="day"
                locale={es}
                translations={{
                    navigation: {
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                        agenda: "Agenda",
                    },
                    form: {
                        addTitle: "Agregar Cita",
                        editTitle: "Editar Cita",
                        confirm: "Confirmar",
                        delete: "Eliminar",
                        cancel: "Cancelar",
                        title: "Paciente",
                    },
                    event: {
                        title: "Paciente",
                        start: "Inicio",
                        end: "Fin",
                        allDay: "Todo el día",
                    },
                    moreEvents: "Más eventos",
                }}
                day={{
                    startHour: 6,
                    endHour: 22,
                    //step: 30
                }}
                week={{
                    weekStartOn: 1,
                }}
                month={{
                    weekStartOn: 1,
                }}
                events={EVENTS}
                resources={DOCTOR}
                resourceFields={{
                    idField: "doctor_id",
                    textField: "title",
                    subTextField: "adress",
                    avatarField: "title",
                    colorField: "color"
                }}
                fields={[
                    {
                        // 1) Reemplazamos el "title" por un menú desplegable
                        name: "title",
                        type: "select",
                        // Valor por defecto (opcional). Ej: primer paciente de la lista
                        default: PATIENTS.length ? `${PATIENTS[0].firstName} ${PATIENTS[0].lastName}` : "",
                        // 2) Mapeamos los pacientes para mostrarlos en el select
                        options: PATIENTS.map((pat) => ({
                            id: pat.id,
                            // Este texto se ve en el desplegable
                            text: `${pat.firstName} ${pat.lastName}`,
                            // Este valor se guarda en event.title
                            value: `${pat.firstName} ${pat.lastName}`
                        })),
                        config: {
                            label: "Paciente",
                            required: true,
                        }
                    },
                    {
                        name: "subtitle",
                        type: "select",
                        default: "programada",
                        options: [
                            { id: "programada", text: "Programada", value: "programada" },
                            { id: "sala_espera", text: "En la sala de espera", value: "sala_espera" },
                            { id: "visita_curso", text: "Visita en curso", value: "visita_curso" },
                            { id: "visita_realizada", text: "Visita realizada", value: "visita_realizada" },
                            { id: "no_visita", text: "No ha venido", value: "no_visita" }
                        ],
                        config: {
                            label: "Estatus",
                            required: true,
                            icon: (value) => (
                                <div className={`status-icon ${value}`} />
                            )
                        },
                    },
                    {
                        name: "doctor_id",
                        type: "select",
                        default: DOCTOR[0].doctor_id,
                        options: DOCTOR.map((res) => {
                            return {
                                id: res.doctor_id,
                                text: `${res.title} (${res.adress})`,
                                value: res.doctor_id // Should match "name" property
                            };
                        }),
                        config: { label: "Especialista", required: true }
                    },
                    {

                        // NUEVO MENÚ DESPLEGABLE
                        name: "visit_type",
                        type: "select",
                        default: "normal", // Valor por defecto
                        options: [
                            { id: "normal", text: "Visita Normal", value: "normal" },
                            { id: "diabetologia", text: "Visita Diabetología", value: "diabetologia" }
                        ],
                        config: {
                            label: "Tipo de Visita",
                            required: true
                        }
                    },
                    {
                        // NUEVO Campo de Precio
                        name: "PAGO",
                        name: "precio",
                        type: "input",  // O 'number' si prefieres
                        default: 600,

                        config: {
                            sectionLabel: "Sección de pago",
                            label: "Precio",
                            required: true,
                            type: "number" // para que muestre un campo numérico
                        }
                    },
                    {
                        name: "forma_pago",
                        type: "select",
                        default: "no_pagado",
                        options: [
                            { id: "no_pagado", text: "No se ha pagado", value: "no_pagado" },
                            { id: "efectivo", text: "Pagado en efectivo", value: "efectivo" },
                            { id: "tarjeta", text: "Pagado con tarjeta", value: "tarjeta" },
                            { id: "transferencia", text: "Pagado por transferencia", value: "transferencia" }
                        ],
                        config: {
                            label: "Forma de Pago",
                            required: true
                        }
                    },
                    {
                        // Campo de texto para Notas (multilínea)
                        name: "notas",
                        type: "input",
                        default: "",
                        config: {
                            label: "Notas",
                            multiline: true,
                            rows: 4,
                            fullWidth: true
                        }
                    },
                ]}
                viewerExtraComponent={(fields, event) => {
                    return (
                        <div>
                            {fields.map((field, i) => {
                                if (field.name === "doctor_id") {
                                    const admin = field.options.find(
                                        (fe) => fe.id === event.doctor_id
                                    );
                                    return (
                                        <Typography
                                            key={i}
                                            style={{ display: "flex", alignItems: "center" }}
                                            color="textSecondary"
                                            variant="caption"
                                            noWrap
                                        >
                                            <PersonRoundedIcon /> {admin.text}
                                        </Typography>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    );
                }}
            /*
            onConfirm={async (event, action) => {
                // "action" puede ser "edit" o "create"
                console.log("Acción:", action);
                if (action === "create") {
                    console.log("EVENTO NUEVO:", JSON.stringify(event, null, 2));
                    // Retornar el evento nuevo (con ID si lo generas tú mismo)
                    return {
                        ...event,
                        event_id: Date.now(), // Ejemplo de ID
                    };
                } else if (action === "edit") {
                    console.log("EVENTO EDITADO:", JSON.stringify(event, null, 2));
                    // Retorna el evento editado
                    return event;
                }
            }} 
                */
            />
        </Fragment >
    );
}

export default App;
