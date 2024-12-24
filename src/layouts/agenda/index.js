import React, { useCallback, useEffect, useRef, useState } from 'react';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import PropTypes from 'prop-types';
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import Card from "@mui/material/Card";


const today = new Date();
const viewModeOptions = [
    { title: 'Monthly', value: 'month' },
    { title: 'Weekly', value: 'week' },
    { title: 'Daily', value: 'day' },
];

const addDate = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const addHours = (date, hours) => {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
};

const subtractDate = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
};

export default function Agenda({ view }) {
    const calendarRef = useRef(null);
    const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
    const [selectedView, setSelectedView] = useState(view);

    const initialCalendars = [
        {
            id: '0',
            name: 'Private',
            backgroundColor: '#9e5fff',
            borderColor: '#9e5fff',
            dragBackgroundColor: '#9e5fff',
        },
        {
            id: '1',
            name: 'Company',
            backgroundColor: '#00a9ff',
            borderColor: '#00a9ff',
            dragBackgroundColor: '#00a9ff',
        },
    ];

    const initialEvents = [
        {
            id: '1',
            calendarId: '0',
            title: 'TOAST UI Calendar Study',
            category: 'time',
            start: today,
            end: addHours(today, 3),
        },
        {
            id: '2',
            calendarId: '0',
            title: 'Practice',
            category: 'milestone',
            start: addDate(today, 1),
            end: addDate(today, 1),
            isReadOnly: true,
        },
        {
            id: '3',
            calendarId: '0',
            title: 'FE Workshop',
            category: 'allday',
            start: subtractDate(today, 2),
            end: subtractDate(today, 1),
            isReadOnly: true,
        },
        {
            id: '4',
            calendarId: '0',
            title: 'Report',
            category: 'time',
            start: today,
            end: addHours(today, 1),
        },
    ];

    const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);

    const updateRenderRangeText = useCallback(() => {
        const calInstance = getCalInstance();
        if (!calInstance) {
            setSelectedDateRangeText('');
            return;
        }

        const viewName = calInstance.getViewName();
        const calDate = calInstance.getDate();
        const rangeStart = calInstance.getDateRangeStart();
        const rangeEnd = calInstance.getDateRangeEnd();

        let dateRangeText;
        switch (viewName) {
            case 'month':
                dateRangeText = `${calDate.getFullYear()}-${calDate.getMonth() + 1}`;
                break;
            case 'week':
                const start = `${rangeStart.getFullYear()}-${rangeStart.getMonth() + 1}-${rangeStart.getDate()}`;
                const end = `${rangeEnd.getFullYear()}-${rangeEnd.getMonth() + 1}-${rangeEnd.getDate()}`;
                dateRangeText = `${start} ~ ${end}`;
                break;
            default:
                dateRangeText = `${calDate.getFullYear()}-${calDate.getMonth() + 1}-${calDate.getDate()}`;
        }
        setSelectedDateRangeText(dateRangeText);
    }, [getCalInstance]);

    useEffect(() => {
        setSelectedView(view);
    }, [view]);

    useEffect(() => {
        updateRenderRangeText();
    }, [selectedView, updateRenderRangeText]);

    const onClickNavi = (ev) => {
        const button = ev.target;
        const actionName = (button.getAttribute('data-action') || 'month').replace('move-', '');
        const calInstance = getCalInstance();
        calInstance[actionName]();
        updateRenderRangeText();
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card>
                        <div>
                            <div>
                                <select onChange={(ev) => setSelectedView(ev.target.value)} value={selectedView}>
                                    {viewModeOptions.map((option, index) => (
                                        <option value={option.value} key={index}>
                                            {option.title}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-default btn-sm move-today"
                                    data-action="move-today"
                                    onClick={onClickNavi}
                                >
                                    Today
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-default btn-sm move-day"
                                    data-action="move-prev"
                                    onClick={onClickNavi}
                                >
                                    Prev
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-default btn-sm move-day"
                                    data-action="move-next"
                                    onClick={onClickNavi}
                                >
                                    Next
                                </button>
                                <span className="render-range">{selectedDateRangeText}</span>
                            </div>
                            <Calendar
                                height="900px"
                                calendars={initialCalendars}
                                month={{ startDayOfWeek: 1 }}
                                events={initialEvents}
                                useDetailPopup={true}
                                useFormPopup={true}
                                view={selectedView}
                                ref={calendarRef}
                            />
                        </div>
                    </Card>
                </SoftBox>
            </SoftBox>
        </DashboardLayout >
    );
}

Agenda.propTypes = {
    view: PropTypes.string.isRequired, // Cambia según el tipo que esperes (string, number, etc.)
};