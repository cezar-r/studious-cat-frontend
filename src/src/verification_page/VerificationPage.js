import React from 'react';
import { useLocation } from 'react-router-dom';


import Logo from '../components/Logo';
import WarningMessage from '../components/WarningMessage';
import InputCells from './InputCells';
import VerificationMessage from './VerficationMessage';
import '../../styles/home_page/homepage.css';
import '../../styles/general/general.css';
import '../../styles/verification_page/verification_page.css';


function VerificationPage() {
    const location = useLocation();
    const email = location.state.email;

    return (
        <div className='container'>
            <Logo />
            <VerificationMessage email={email} />
            <InputCells email={email}/>
            <WarningMessage message="We do not share any information or data with the university." />
        </div>
    );
}

export default VerificationPage;
