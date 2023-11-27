import React, { useRef, useState, useEffect } from 'react';
import NewMeetingPreviewPopup from './NewMeetingPreviewPopup';
import moment from 'moment';
import '../../styles/general/toggle.css';

import addMeeting from '../services/addMeeting';

const addOneHour = (startTime) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const newTime = new Date(0, 0, 0, hours, minutes);
    newTime.setHours(newTime.getHours() + 1);
    return newTime.toTimeString().substring(0, 5);
}

const roundUpCurrentTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
};

const calculateDuration = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    return (endHours - startHours) * 60 + (endMinutes - startMinutes);
};


function NewMeetingPopup({ closePopup }) {
    const ENABLED_BUTTON_CSS_CLASS = 'continue-button-enabled';
    const DISABLED_BUTTON_CSS_CLASS = 'continue-button-disabled';
    const CANCEL_BUTTON_CSS_CLASS = 'continue-button-disabled-clickable';
    const roundedTime = roundUpCurrentTime();
    const todayFormatted = moment().format('YYYY-MM-DD');

    const [buttonClass, setButtonClass] = useState(DISABLED_BUTTON_CSS_CLASS);
    const [isDateValid, setIsDateValid] = useState(true);
    const [isDurationValid, setIsDurationValid] = useState(true);
    const [meetingDetails, setMeetingDetails] = useState({
        meetingName: '',
        description: '',
        location: '',
        date: todayFormatted,
        startTime: roundedTime,
        endTime: addOneHour(roundedTime),
        purpose: 'Study Session',
        class: '',
        privacy: true,
        enableChatForum: true,
    });

    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    const popupRef = useRef();

    const previewMeeting = () => {
        setIsPreviewVisible(true);
    }

    const handleEdit = () => {
        setIsPreviewVisible(false);
    }

    const handleCreate = async () => {
        console.log('Creating meeting with details:', meetingDetails);

        try {
            const response = await addMeeting(meetingDetails);
            if (response) {
                console.log('Meeting created successfully', response);
                closePopup(); 
            } else {
                console.error('Failed to create meeting.');
            }
            console.log(response);
        } catch (error) {
            console.error('Error while creating the meeting:', error);
        }
    }

    useEffect(() => {
        setButtonClass(allFieldsValid() ? ENABLED_BUTTON_CSS_CLASS : DISABLED_BUTTON_CSS_CLASS);
    }, [meetingDetails]);

    useEffect(() => {
        const handleClickOutside = (event) => {
          console.log("click");
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            closePopup();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closePopup]);

    const allFieldsValid = () => {
        if (!meetingDetails.meetingName ||
          !meetingDetails.location ||
          !meetingDetails.date ||
          !meetingDetails.startTime ||
          !meetingDetails.endTime) {
            return false;
        }
    
        const today = new Date();
        const meetingDate = new Date(meetingDetails.date);
        if (meetingDate < today) {
          return false;
        }
    
        const duration = calculateDuration(meetingDetails.startTime, meetingDetails.endTime);
        if (duration > 240 || duration <= 0) {
          return false;
        }
        return true;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'date') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(value);
            setIsDateValid(selectedDate >= today);
        }
        setMeetingDetails({
            ...meetingDetails,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleStartTimeChange = (e) => {
        const startTime = e.target.value;
        setMeetingDetails((prevDetails) => {
          let endTime = prevDetails.endTime;
          if (!endTime || endTime <= startTime) {
            endTime = addOneHour(startTime);
          }
    
          const duration = calculateDuration(startTime, endTime);
          if (duration > 240 || duration <= 0) {
            endTime = addOneHour(startTime);
          }
    
          return {
            ...prevDetails,
            startTime,
            endTime,
          };
        });
    };
    
    const handleEndTimeChange = (e) => {
        const endTime = e.target.value;
        setMeetingDetails((prevDetails) => {
          const duration = calculateDuration(prevDetails.startTime, endTime);
          if (duration > 240 || duration <= 0) {
            setIsDurationValid(false);
          } else {
            setIsDurationValid(true);
          }
          return {
            ...prevDetails,
            endTime,
          };
        });
    };

    return (
        <div className="popup-overlay pop-up-overlay-shadow">
            {isPreviewVisible ? (
            <NewMeetingPreviewPopup
            meetingDetails={meetingDetails}
            onEdit={handleEdit}
            onCreate={handleCreate}
            /> ) : (
            <div className="pop-up-window" ref={popupRef}>
                <div className='content-container'>
                    <h1>Create a New Meeting</h1>

                    <label>
                        Meeting Name
                        <input
                            type="text"
                            name="meetingName"
                            value={meetingDetails.meetingName}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            name="description"
                            value={meetingDetails.description}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="row-container">
                        <label className="primary-label">
                            Location
                            <input
                                type="text"
                                name="location"
                                value={meetingDetails.location}
                                onChange={handleChange}
                                placeholder="Main Campus Library"
                            />
                        </label>
                        <label className="secondary-label-small">
                            Room (<i>optional</i>)
                            <input
                                type="text"
                                name="room"
                                value={meetingDetails.room}
                                onChange={handleChange}
                                placeholder="1417"
                            />
                        </label>
                    </div>

                    <div className="row-container">
                        <label className="primary-label">
                            Date
                            <input
                                type="date"
                                name="date"
                                value={meetingDetails.date}
                                onChange={handleChange}
                            />
                            {isDateValid ? <span style={{color: 'var(--button-secondary)', marginLeft: '10px', fontSize: '11px', fontWeight: '300'}}>Date cannot be before today</span> : 
                            <span style={{color: 'var(--button-primary)', marginLeft: '10px', fontSize: '11px', fontWeight: '300'}}>Date cannot be before today</span>}
                        </label>
                        <label className="secondary-label-large">
                            Start
                            <input
                                type="time"
                                name="startTime"
                                value={meetingDetails.startTime}
                                onChange={handleStartTimeChange}
                            />
                            {isDurationValid ? <span style={{color: 'var(--button-secondary)', marginLeft: '10px', fontSize: '11px', fontWeight: '300'}}>Maximum of 4 hours</span> : 
                            <span style={{color: 'var(--button-primary)', marginLeft: '10px', fontSize: '11px', fontWeight: '300'}}>Maximum of 4 hours</span>}
                        </label>
                        <label className="secondary-label-large">
                            End
                            <input
                                type="time"
                                name="endTime"
                                value={meetingDetails.endTime}
                                onChange={handleEndTimeChange}
                            />
                        </label>
                    </div>

                    <label>
                        Class
                        <input
                            type="text"
                            name="class"
                            value={meetingDetails.class}
                            onChange={handleChange}
                            placeholder="Select Class"
                        />
                    </label>

                    <label>
                        Purpose
                        <input
                            type="text"
                            name="purpose"
                            value={meetingDetails.purpose}
                            onChange={handleChange}
                            placeholder="Study Session"
                        />
                    </label>

                    <div className="toggle-container">
                        <label>
                            Public
                            <div className="toggle-button">
                                <input type="checkbox" checked={meetingDetails.privacy} onChange={handleChange} name="privacy"/>
                                <span className="toggle-slider"></span>
                            </div>
                        </label>

                        <label>
                            Chat Forum
                            <div className="toggle-button">
                                <input type="checkbox" checked={meetingDetails.enableChatForum} onChange={handleChange} name="enableChatForum"/>
                                <span className="toggle-slider"></span>
                            </div>
                        </label>
                    </div>
                </div>

                <div className='row-container'>
                    <button className={`continue-button ${CANCEL_BUTTON_CSS_CLASS}`} onClick={closePopup}>
                        Cancel
                    </button>
                    <button className={`continue-button ${buttonClass}`} onClick={previewMeeting}>
                        Preview
                    </button>
                </div>
            </div>)}
        </div>
    );
}

export default NewMeetingPopup;


/**
TODO
Add google maps api to location input?
dropdowns for class, major, and purpose
 */

/**
 * "meeting_name": "CSC 110 study group",
	"meeting_description": "To study for CSC 110 final exam",
	"address": "123 W. Test Ave",
	"start_date": "2023-11-25",
	"end_date": "2023-11-25",
	"start_time": "17:00:00",
	"end_time": "18:30:00",
	"major": "MATH",
	"class_number": "129",
	"term": "2234"

 */