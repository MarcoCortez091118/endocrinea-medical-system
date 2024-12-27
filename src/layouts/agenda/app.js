import React, { Fragment, useRef, useState } from "react";
import { Button, Typography, } from "@mui/material";
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
                    },
                    event: {
                        title: "Título",
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
                    }
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
            />
        </Fragment>
    );
}

export default App;
