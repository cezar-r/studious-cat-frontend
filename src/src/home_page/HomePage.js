import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import FooterLinks from '../footer_pages/FooterLinks';
import Logo from '../components/Logo';
import authUser from '../services/auth';
import '../../styles/home_page/homepage.css';
import '../../styles/general/general.css';


function HomePage() {
  

  const ENABLED_BUTTON_CSS_CLASS = 'continue-button-enabled';
  const DISABLED_BUTTON_CSS_CLASS = 'continue-button-disabled';
  const UNI_EMAIL_DOMAIN = '@arizona.edu'
  const PLACEHOLDER_TEXT = 'Sign in with university email';

  const [userEmail, setUserEmail] = useState('');
  const [buttonClass, setButtonClass] = useState(DISABLED_BUTTON_CSS_CLASS);

  const navigate = useNavigate();

  useEffect(() => {
    setButtonClass(userEmail ? ENABLED_BUTTON_CSS_CLASS : DISABLED_BUTTON_CSS_CLASS);
  }, [userEmail]);

  const handleEmailLogin = () => {
    /**
     * TODO: send emai to verifyEmail API
     *          wait for it to return true
     *          navigate to verification
     */
    if (userEmail.endsWith(UNI_EMAIL_DOMAIN)) {
        /** 
         * Email verifier API should send email w/ verification code at this point
         */
        navigate('/verification', { state: { email: userEmail } });
    }
  };

  const handleGoogleSignIn = async (response) => {
    // TODO
    console.log(response);
    const authResponse = await  authUser(response);
    const responseCode = authResponse.ResponseCode;
    console.log(responseCode);
    if (responseCode === "100") {
      navigate('/create-profile', { state: { email: authResponse.userEmail, opToken: authResponse.OpToken } });
    } else if (responseCode === "200") {
      navigate('/calendar');
    }
  };

  return (
    <div className="container">
      <Logo />
      <div className="input-field-standard">
        <input type="text" placeholder={PLACEHOLDER_TEXT} value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
      </div>
      <button className={`continue-button ${buttonClass}`} onClick={handleEmailLogin}>
        Continue
        {/* TODO: Possibly add the continue button inside the text field? might bave issue w/ long email on mobile */}
      </button>
      <div className='large-margin small-text'>
        or
      </div>
      <div>
        <GoogleLogin 
          onSuccess={credentialResponse => {handleGoogleSignIn(credentialResponse);}}
          onError={() => {console.log("Error");}}
        />
      </div>
      <FooterLinks />
      <div className='large-spacing'></div>
      <div className='large-spacing'></div>
      <div className='large-spacing'></div>
      <div className='large-spacing'></div>
    </div>
  );
}

export default HomePage;
