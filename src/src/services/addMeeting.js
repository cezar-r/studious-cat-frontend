const CLASSES_ENDPOINT = process.env.REACT_APP_INTERNAL_ENDPOINT_DOMAIN + "/addMeeting/";

const addMeeting = async (m, userID) => {
    try {
        const meetingEndpointObj = {
            "meeting_name": m.meetingName,
            "meeting_description": m.description,
            "address": m.location,
            "start_date": m.date,
            "end_date": m.date,
            "start_time": m.startTime,
            "end_time": m.endTime,
            "major": m.class.split(' ')[0].toUpperCase(),
            "class_number": m.class.split(' ')[1],
            "term": "2234"
        };
        console.log(meetingEndpointObj);
        const response = await fetch(CLASSES_ENDPOINT + userID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meetingEndpointObj),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Adding meeting failed:", error);
        return null; 
    }
};

export default addMeeting;
