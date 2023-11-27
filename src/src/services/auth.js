const CLASSES_ENDPOINT = process.env.REACT_APP_INTERNAL_ENDPOINT_DOMAIN + "/api/auth/google";

const authUser = async (googlePayload) => {
    let data = [];
    console.log(googlePayload);
    try {
        const response = await fetch(CLASSES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(googlePayload),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Auhtorizing user failed:", error);
    }
    return data;
};

export default authUser;