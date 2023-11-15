import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarView from './CalendarView';
import NewMeetingPopup from './NewMeetingPopup'; 
import '../../styles/calendar_page/calendar.css';
import uofaLogo from '../../assets/logos/uofa_logo_clear.png';


/**
 * TODO
 *  get events from API
 */
const events = [
    {
        start: new Date('2023-10-25T17:30:00'),
        end: new Date('2023-10-25T18:30:00'),
        title: 'Overlap Meeting Example',
    },
    {
      start: new Date('2023-10-25T17:00:00'),
      end: new Date('2023-10-25T18:00:00'),
      title: 'StudiousCat Meeting',
    },
    {
      start: new Date('2023-11-14T12:30:00'),
      end: new Date('2023-11-14T13:45:00'),
      title: 'CSC 436 Demo',
    },
];
  

function CalendarPage() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const navigate = useNavigate();

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const navigateToProfilePage = () => {
        navigate('/profile')
    };

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
                        <span className="account-name">cezarr</span>
                    </button>
                </div>

            </div>
            <CalendarView events={events} />
            {isPopupVisible && <NewMeetingPopup closePopup={togglePopup} />}
        </div>
    );
}

export default CalendarPage;
