import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CalendarView from './CalendarView';
import NewMeetingPopup from './NewMeetingPopup'; 
import '../../styles/calendar_page/calendar.css';
import uofaLogo from '../../assets/logos/uofa_logo_clear.png';
import getMonthMeetings from '../services/getMonthMeetings';


/**
 * TODO
 *  get events from API
 */
  

function CalendarPage() {
    const location = useLocation();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();
    const userID = location.state.userID;
    const netID = location.state.netID;

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const navigateToProfilePage = () => {
        navigate('/profile')
    };

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const monthMeetings = await getMonthMeetings(userID);
                const formattedMeetings = monthMeetings.map(meeting => ({
                    ...meeting,
                    start: new Date(`${meeting.start_date}T${meeting.start_time}`),
                    end: new Date(`${meeting.end_date}T${meeting.end_time}`),
                    title: `${meeting.meeting_name}`,
                    class: `${meeting.major} ${meeting.class_number}` 
                }));
                console.log(formattedMeetings);
                setEvents(formattedMeetings);
            } catch (error) {
                console.error("Fetching meetings failed:", error);
            }
        };

        fetchMeetings();
        console.log(events);
    }, [userID]);

    return (
        <div className="calendar-container">
            <div className="calendar-top-panel">
                <div className="calendar-new-meeting-button">
                    <button className="plus-button" onClick={togglePopup}>
                        +
                    </button>
                </div>
                <div className="input-field-medium-small">
                    <input 
                        type="text" 
                        placeholder="Find Study Groups" 
                        className="search-input"
                    />
                </div>
                <div className="calendar-profile-button">
                    <button className="profile-button" onClick={navigateToProfilePage}>
                        <img src={uofaLogo} alt="School Logo" className="school-logo" />
                        <span className="account-name">{netID ? netID.split('@')[0] : 'cezarr'}</span>
                    </button>
                </div>

            </div>
            <CalendarView events={events} userID={userID}/>
            {isPopupVisible && <NewMeetingPopup closePopup={togglePopup} userID={userID} />}
        </div>
    );
}

export default CalendarPage;
