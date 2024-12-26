import React, { Fragment, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { RESOURCES, EVENTS } from "./data";

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
                day={{
                    startHour: 6.5,
                    endHour: 21.5,
                    step: 30
                }}
                week={{
                    weekStartOn: 1,
                }}
                month={{
                    weekStartOn: 1,
                }}
                events={EVENTS}
                resources={RESOURCES}
                resourceFields={{
                    idField: "admin_id",
                    textField: "title",
                    subTextField: "mobile",
                    avatarField: "title",
                    colorField: "color"
                }}
                fields={[
                    {
                        name: "admin_id",
                        type: "select",
                        default: RESOURCES[0].admin_id,
                        options: RESOURCES.map((res) => {
                            return {
                                id: res.admin_id,
                                text: `${res.title} (${res.mobile})`,
                                value: res.admin_id // Should match "name" property
                            };
                        }),
                        config: { label: "Especialista", required: true }
                    }
                ]}
                viewerExtraComponent={(fields, event) => {
                    return (
                        <div>
                            {fields.map((field, i) => {
                                if (field.name === "admin_id") {
                                    const admin = field.options.find(
                                        (fe) => fe.id === event.admin_id
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
            />
        </Fragment>
    );
}

export default App;
