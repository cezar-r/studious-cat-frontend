import React from "react";

function MeetingPreviewPopup({ event, style }) {
    return (
        <div style={style} className="meeting-popup-container">
        {/* Render event details */}
        <div>Title: {event.title}</div>
        <div>Start: {event.start.toString()}</div>
        <div>End: {event.end.toString()}</div>
        {/* ... other details ... */}
    </div>
    );
}

export default MeetingPreviewPopup;
