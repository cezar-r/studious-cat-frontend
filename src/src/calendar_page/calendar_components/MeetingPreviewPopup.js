import React from "react";

import joinMeeting from "../../services/joinMeeting";

function MeetingPreviewPopup({ event, style, userID }) {

    function formatDate(dateString) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        const getOrdinalNum = (n) => {
          return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
        };
      
        const date = new Date(dateString);
        const day = dateString.toString().split('-')[2];
        const monthIndex = date.getMonth();
        const monthName = months[monthIndex];
        
        return `${monthName} ${day}`;
    }

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12;
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const fetchJoinMeeting = async () => {
        console.log('Joining meeting with details');

        try {
            const response = await joinMeeting(userID, event.meeting_id);
            if (response) {
                window.location.reload();
            } else {
                console.error('Failed to join meeting.');
            }
        } catch (error) {
            console.error('Error while joining the meeting:', error);
        }
    }

    return (
        <div style={style} className="meeting-popup-container">
        {/* Render event details */}
        <h3>{event.title}</h3>
        <h4>{event.class}</h4>
        <h4>{formatDate(event.start_date)} {formatTime(event.start)} - {formatTime(event.end)}</h4>
        <div>{event.location}</div>
        <div>{event.meeting_description}</div>
        <div className='large-spacing'></div>
        <button className="continue-button continue-button-enabled" onClick={fetchJoinMeeting}>
            Join
        </button>
    </div>
    );
}

export default MeetingPreviewPopup;
