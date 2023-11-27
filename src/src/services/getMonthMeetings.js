const CLASSES_ENDPOINT = process.env.REACT_APP_INTERNAL_ENDPOINT_DOMAIN + "/getMeetings/";

const getMonthMeetings = async (userID) => {
    let data = [];
    try {
        const response = await fetch(CLASSES_ENDPOINT + userID);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetching meetings failed:", error);
    }
    return data;
}

export default getMonthMeetings;

