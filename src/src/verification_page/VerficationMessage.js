import React from 'react';


function VerificationMessage({email}) {
    return (
        <div className='text-container'>
            <div className='text large-text bold-text'>
                Enter the code sent to your email
            </div>
            <div className='text base-text disabled-text bold-text'>
                {email}
            </div>
        </div>
    );
}

export default VerificationMessage;
