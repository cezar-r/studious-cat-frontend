const CLASSES_ENDPOINT = process.env.REACT_APP_INTERNAL_ENDPOINT_DOMAIN + "/joinUserClass/";

const addClassUser = async (userId, classObj) => {
    try {
        console.log(classObj);
        const responseClassObj = {
            "term": "2234",
            "major": classObj.label.split(' ')[0],
            "class_number": classObj.label.split(' ')[1],
            "class_description": "N/A"
        };
        console.log(responseClassObj);
        const response = await fetch(CLASSES_ENDPOINT + userId, {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
           },
           body: JSON.stringify(responseClassObj) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("Adding class failed: ", error);
    }
}

export default addClassUser;
