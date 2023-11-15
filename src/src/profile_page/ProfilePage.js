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
                    <div className=''>
                        <div>
                            <h1>{PROFILE.name}</h1>
                            <h2 style={{padding: '12px'}}>{PROFILE.username}</h2>
                        </div>
                    </div>
                    {/* <button className='button-a' onClick={() => navigate('/edit-profile')}>Edit Profile</button> */}
                </div>
                <div className="profile-personal-info">
                    <p><strong>NetID:</strong> {PROFILE.netID}</p>
                </div>
                <div className='profile-school-info'>
                    <h2 className='h2-a'>School Information</h2>
                    <p><strong>Major:</strong> {PROFILE.major}</p>
                    <p><strong>Class List:</strong></p>
                    <ul className="ul-a">
                        {PROFILE.class_list.map((cls, index) => <li key={index}>{cls}</li>)}
                    </ul>
                </div>
                <div className='previous-meetings'>
                    <h2 className='h2-a'>Previous Meetings</h2>
                    {PROFILE.previous_meetings.map((meeting, index) => (
                        <div key={index} className='meeting'>
                            <p><strong>Name:</strong> {meeting.name}</p>
                            <p><strong>Location:</strong> {meeting.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
