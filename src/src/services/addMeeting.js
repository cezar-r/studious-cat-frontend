const CLASSES_ENDPOINT = process.env.REACT_APP_INTERNAL_ENDPOINT_DOMAIN + "/addMeeting";

const addMeeting = async (meetingObj) => {
    try {
        const response = await fetch(CLASSES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meetingObj),
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
