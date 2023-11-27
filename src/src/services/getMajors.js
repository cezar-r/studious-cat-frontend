const CLASSES_ENDPOINT = "https://studiouscat-backend1-ed3dfc7121f0.herokuapp.com/getMajors";

const getMajors = async () => {
    let data = [];
    try {
        const response = await fetch(CLASSES_ENDPOINT);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Fetching majors failed:", error);
    }
    return data;
};

export default getMajors;