import React, { useState, useEffect } from "react";

import MeetingPreviewPopup from "./calendar_components/MeetingPreviewPopup";
import CalendarToolbar from "./calendar_components/CalendarToolbar";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from "date-fns/isSameDay"

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US': enUS,
};
  
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function CalendarView({ events }) {
    const views = ['day', 'week', 'month', 'agenda'];
    const [view, setView] = useState('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const onView = (view) => setView(view);
    const onNavigate = (date) => setCurrentDate(date);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    const dayPropGetter = (date) => {
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isNextMonth = !isSameMonth(date, currentDate);
        const isToday = isSameDay(date, new Date());
      
        let className = '';
        if (isToday) className += 'today ';
        if (isWeekend && isNextMonth) className += 'next-month-weekend ';
        else if (isWeekend) className += 'weekend ';
        else if (isNextMonth) className += 'next-month-weekday ';
        else className += 'weekday ';
      
        return { className: className.trim() };
    };

    const handleEventSelect = (event, e) => {
        const { clientX, clientY } = e;
        setPopupPosition({ x: clientX, y: clientY });

        if (selectedEvent && Object.keys(event).every(key => selectedEvent[key] === event[key])) {
            setSelectedEvent(null);
        } else {
            setSelectedEvent(event);
        }
    };
    
    return (
        <div className="rbc-calendar" style={{ overflowY: 'auto' }}>
            {selectedEvent && (
                <MeetingPreviewPopup 
                    event={selectedEvent} 
                    style={{ 
                        position: 'absolute', 
                        left: `${popupPosition.x}px`, 
                        top: `${popupPosition.y - 200}px` 
                    }} 
                />
            )}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '100%' }}
                view={view}
                views={views}
                onView={onView}
                onNavigate={onNavigate}
                dayPropGetter={dayPropGetter}
                onSelectEvent={handleEventSelect}
                selectable
                components={{
                    toolbar: CalendarToolbar,
                }}
                scrollToTime={new Date(new Date().setHours(new Date().getHours(), 0, 0, 0))}
            />
        </div>
    );
}

export default CalendarView;

/**
 * TODO
 *   hover over meetings
 *   dont make the content go below the actual page. if user scrolls, only thing that should move is calendar
 */