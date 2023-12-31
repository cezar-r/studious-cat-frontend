import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FaTrash } from 'react-icons/fa';

import '../../styles/general/general.css';
import '../../styles/onboarding/onboarding.css';
import getClasses from '../services/getClasses';
import getMajors from '../services/getMajors';
import addClassUser from "../services/addClassUser";
import addUser from "../services/addUser";

const customStyles = {
    container: (provided) => ({
        ...provided,
        width: '92%',
        border: "none",
        color: 'var(--text-color)',
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'black',
        boxShadow: 'none',
        fontSize: 22,
        fontWeight: 500,
        color: 'var(--text-color)',
        border: state.isFocused ? 0 : 0,
        '&:hover': {
            border: state.isFocused ? 0 : 0,
        },
        boxShadow: state.isFocused ? 0 : 0,
        outline: state.isFocused ? 0 : 0,
        alignItems: 'center',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--text-color-disabled)',
        lineHeight: 'normal',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--text-color)',
        lineHeight: 'normal',
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted #919191',
        color: state.isSelected ? 'var(--button-primary)' : 'var(--text-color)',
        backgroundColor: 'var(--button-secondary)',
        padding: 20,
        fontSize: 20,
        cursor: 'pointer',
    }),
    menu: (provided) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'var(--button-secondary)',
        '&:hover': {
            cursor: "pointer",
        },
        
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
};

const classOptions = [];
// const majorOptions = [];

// const majorOptions = [
//     { value: 'csc', label: 'Computer Science (CSC)' },
//     { value: 'ee', label: 'Electrical Engineering (EE)' },
//     { value: 'comm', label: 'Communications (COMM)' }
// ];

const validateInput = (fullName, bio, major, classList) => {
    return fullName !== '' && 
            bio !== '' && 
            major !== null;
};

function CreateProfilePage() {
    const ENABLED_BUTTON_CSS_CLASS = 'continue-button-enabled';
    const DISABLED_BUTTON_CSS_CLASS = 'continue-button-disabled';
    const location = useLocation();
    const email = location.state.email;
    const opToken = location.state.opToken;
    
    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [major, setMajor] = useState('');
    const [classList, setClassList] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState({});
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [classSelectFields, setClassSelectFields] = useState([{
        id: Date.now(),
        options: classOptions,
        styles: customStyles,
        isSearchable: true,
    }]);
    const [majorOptions, setMajorOptions] = useState([]);
    const [buttonClass, setButtonClass] = useState(DISABLED_BUTTON_CSS_CLASS);

    const [classListOptions, setClassListOptions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setButtonClass(validateInput(fullName, bio, major, classList) ? ENABLED_BUTTON_CSS_CLASS : DISABLED_BUTTON_CSS_CLASS)
    }, [fullName, bio, major, classList]);

    useEffect(() => {
        if (!major) return; 
    
        const fetchClasses = async () => {
          try {
            const data = await getClasses(major.value);
            const options = data.map(cls => ({
                value: (cls.major + cls.class_number).toLowerCase().replace(/\s/g, ''),
                label: (cls.major + ' ' + cls.class_number).toUpperCase()
            }));
            setClassListOptions(options);
          } catch (error) {
            console.error("Fetching classes failed:", error);
          }
        };
        fetchClasses();
    }, [major]);
    

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const majorsData = await getMajors();
                const majorsOptions = majorsData.map(major => ({
                    value: major.major,
                    label: major.major_description
                }));
                setMajorOptions(majorsOptions); 
            } catch (error) {
                console.error("Fetching majors failed:", error);
            }
        };

        fetchMajors();
    }, []);
      
    const addClassSelectField = () => {
        const newField = {
            id: Date.now(),
            options: classListOptions,
            styles: customStyles,
            isSearchable: true,
        };
        setClassSelectFields([...classSelectFields, newField]);
    };

    const removeClassSelectField = (id) => {
        if (classSelectFields.length > 1) {
            setClassSelectFields(classSelectFields.filter(field => field.id !== id));
            if (id in selectedClasses) {
                delete selectedClasses[id];
            }
        }
    };

    const addClass = (className, id) => {
        setSelectedClasses((prevSelectedClasses) => ({
            ...prevSelectedClasses,
            [id]: className
        }));
    }

    const signUpUser = () => {
        const currentClassList = Object.values(selectedClasses);
        setClassList(currentClassList);
        setIsSigningUp(true);
    }; 

    useEffect(() => {
        if (isSigningUp && classList.length > 0) {
            const userObj = {
                'netID': email,
                'fullName': fullName,
                'bio': bio,
                'major': major,
                'classList': classList
            };
            const signUp = async () => {
                try {
                    const addUserResponse = await addUser(opToken);

                    const userID = addUserResponse.userId;
                    for (let classObj of classList) {
                        let addClassResponse = await addClassUser(userID, classObj);
                    }

                    navigate('/calendar', { state: { userID: userID, netID: email } })
                } catch (error) {
                    console.error('There was an error!', error);
                }
            };

            signUp();
            setIsSigningUp(false);
        }
    }, [isSigningUp, classList, email, fullName, bio, major, navigate]);

    return (
        <div className='input-container'>
            <div className='left-align-container'>
                <div className="large-text bold-text spacing">
                    Display Information
                </div>
                <div className='input-field-standard small-spacing left-align'>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name"/>
                </div>
                <div className="input-field-standard left-align">
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write a short bio about yourself" />
                </div>
            </div>
            <div className='left-align-container'>
                <div className="large-text bold-text spacing">
                    Class Information
                </div>
                <div className="small-text medium-font small-spacing left-margin-small">
                    Major
                </div>
                <div className='input-field-standard left-align spacing'>
                    <Select 
                         options={majorOptions} 
                         styles={customStyles}
                         onChange={(option) => {setMajor(option)}}
                         isSearchable />
                </div>
                <div className="small-text medium-font small-spacing left-margin-small">
                    Classes
                </div>
                {classSelectFields.map(field => (
                    <div key={field.id} className='input-field-standard left-align small-spacing left-margin-small'>
                        <Select 
                            options={classListOptions}
                            styles={field.styles}
                            isSearchable={field.isSearchable}
                            onChange={(option) => {addClass(option, field.id)}} />
                        <button className = "pointer fade-on-hover"
                            onClick={() => removeClassSelectField(field.id)}
                            style={{ marginLeft: '5px', backgroundColor: 'var(--background-color', color: 'var(--text-color)', border: 'none'}}>
                            <FaTrash /> {/* This is the trash icon */}
                        </button>
                    </div>
                ))}
            </div>
            <div className='left-align-container'>
                <button className="plus-button left-margin-medium" onClick={addClassSelectField}>
                    +
                </button>
            </div>
            <div className = 'right-align-container'>
                <button className={`continue-button ${buttonClass}`} onClick={signUpUser}>
                    Create Account
                    {/* TODO: Possibly add the continue button inside the text field? might bave issue w/ long email on mobile */}
                </button>
            </div>
        </div>
    );
}

export default CreateProfilePage;

/**
 * TODO
 * edit styles in select box
 */