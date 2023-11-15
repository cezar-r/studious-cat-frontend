import React, { useState, useEffect } from 'react';

function NewMeetingPreviewPopup({ meetingDetails, onEdit, onCreate }) {
  return (
    <div className="popup-overlay">
      <div className="pop-up-window">
        <div className='content-container'>
          <h1>Preview {meetingDetails.meetingName}</h1>
          <h2> {meetingDetails.location} #{meetingDetails.room}</h2>
          <h3> {meetingDetails.date} from {meetingDetails.startTime} to {meetingDetails.endTime} {meetingDetails.purpose == '' ? '' : '(' + meetingDetails.purpose + ')'}</h3>
          <h3 style={{color: 'var(--text-color-disabled'}}> {meetingDetails.description} </h3>
          <h3 style={{padding: '5px'}}>

          </h3>
          <h3> Major: {meetingDetails.major == '' ? 'Any' : meetingDetails.major} </h3>
          <h3> Class: {meetingDetails.class == '' ? 'Any' : meetingDetails.class} </h3>
        </div>

        <div className='row-container'>
          <button className="continue-button continue-button-disabled-clickable" onClick={onEdit}>
            Edit
          </button>
          <button className="continue-button continue-button-enabled" onClick={onCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewMeetingPreviewPopup;