const CLASSES_ENDPOINT = process.env.REACT_APP_INTERNAL_ENDPOINT_DOMAIN + "/getMajors";

const getMajors = async () => {
    let data = [];
    try {
        const response = await fetch(CLASSES_ENDPOINT);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetching majors failed:", error);
    }
    return data;
};

export default getMajors;