import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function InputCells({email}) {
  const AUTH_CODE = '111111'; // TODO: don't harcode
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.length === 1 && verificationCode.join('').length < 6) {
        setVerificationCode((prevValues) => {
          const newValues = prevValues.slice();
          newValues[prevValues.join('').length] = event.key;
          return newValues;
        });
      } else if (event.key === 'Backspace') {
        setVerificationCode((prevValues) => {
                const newValues = prevValues.slice();
                newValues[newValues.join('').length - 1] = '';
                return newValues;
            });
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('text');
        const pastedChars = pastedText.split('').slice(0, 6);
        setVerificationCode([...pastedChars, ...Array(6 - pastedChars.length).fill('')]);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('paste', handlePaste);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('paste', handlePaste);
    };
  }, [verificationCode]);

  useEffect(() => {
    let code = verificationCode.join('');
    if (code === AUTH_CODE) {
        navigate('/create-profile', { state: { email: email } });  // TODO: verify code
    }
  }, [verificationCode, navigate]);

  return (
    <div className='numberCells'>
      {verificationCode.map((char, index) => (
        <div className="cell" key={index}>
          {char}
        </div>
      ))}
    </div>
  );
}

export default InputCells;
