const CLASSES_ENDPOINT = process.env.REACT_APP_INTERNAL_ENDPOINT_DOMAIN + "/joinMeeting/";

const joinMeeting = async (userID, meetingID) => {
    try {
        const response = await fetch(CLASSES_ENDPOINT + userID + "/" + meetingID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Adding meeting failed:", error);
        return null; 
    }
};

export default joinMeeting;
