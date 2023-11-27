import React from 'react';
import logoPath from '../../assets/logos/StudiousCatLogo.png';



function Logo() {
    return (
        <div className="logo">
            <img src={logoPath} alt="Logo" />
        </div>
    );
}

export default Logo;
