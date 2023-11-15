import React from "react";


function WarningMessage({message}) {
    return (
        <div className='warning-text small-text'>
            {message}
        </div>
    );
}

export default WarningMessage;
