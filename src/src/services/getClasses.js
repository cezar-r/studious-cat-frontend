const CLASSES_ENDPOINT = "https://studiouscat-backend1-ed3dfc7121f0.herokuapp.com/getClasses/";

const getClasses = async (major) => {
    let data = [];
    try {
        const response = await fetch(CLASSES_ENDPOINT + major);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetching classes failed:", error);
    }
    return data;
};

export default getClasses;