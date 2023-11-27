import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile_page/profile_page.css";

function ProfilePage() {
    const PROFILE = {
        'name': 'Cezar Rata',
        'username': 'cezar123',
        'bio': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'netID': 'cezarr',
        'major': 'CSC',
        'class_list': [
            'CSC 436',
            'CSC 466',
            'CSC 473',
            'CSC 477'
        ],
        'previous_meetings': [
            {
                'name': 'Meeting1',
                'location': 'Library'
            },
            {
                'name': 'Meeting2',
                'location': 'Library'
            }
        ]
    }

    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="content-wrapper">
                <div className="profile-header">
                        <div>
                            <h1>{PROFILE.netID}</h1>
                            <h2>{PROFILE.name}</h2>
                        </div>
                        <h4>
                            {PROFILE.bio}
                        </h4>
                    {/* <button className='button-a' onClick={() => navigate('/edit-profile')}>Edit Profile</button> */}
                </div>
                <div className='profile-school-info'>
                    <h1> School Information</h1>
                    <h3>{PROFILE.major} Major</h3>
                    <div className="small-spacing"></div>
                    <h2>Class List</h2>
                    <div className="class-list">
                    {PROFILE.class_list.map((cls, index) => (
                        <div key={index} className="class-item">
                        {cls}
                        </div>
                    ))}
                    </div>

                </div>
                <div className='previous-meetings'>
                    <h2 className='h2-a'>Previous Meetings</h2>
                    {PROFILE.previous_meetings.map((meeting, index) => (
                        <div key={index} className='meeting-item'>
                        <p> {meeting.name}</p>
                        <p> {meeting.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
