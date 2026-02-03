import { useState } from 'react';
import '/src/styles/form-section.css';
import '/src/styles/education.css';

class Degree {
    constructor(subject, institution, startDate, endDate=null) {
        this.subject = subject;
        this.institution = institution;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

function EducationSection() {
    const [educationArray, setEducationArray] = useState([]);

    const addNewEducation = (subject, institution, startDate, endDate) => {
        const item = new Degree(subject, institution, startDate, endDate)
        setEducationArray(prev => [...prev, item]);
    };

    return (
        <div className="formSection">
            <form action="">
                <h2>Education</h2>
            </form>
            <AddEducation addNewEducation={addNewEducation}/>
            <ShowEducation educationArray={educationArray}/>
        </div>
    )
}

function AddEducation ({addNewEducation}) {
    const [subject, setSubject] = useState("");
    const [institution, setInstitution] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");



    const resetForm = () => {
        setSubject("");
        setInstitution("");
        setStart("");
        setEnd("")
    };
    return (
        <div className="addEducation">
            <h2>Edit</h2>
            <form action="">
                <div className="educationCol">
                    <label htmlFor="subject">Subject:</label>
                    <input 
                        type="text"
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="educationCol">
                    <label htmlFor="school">Institution:</label>
                    <input 
                        type="text"
                        id="school"
                        name="school"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                    />
                </div>
                <div className="educationCol">
                    <label htmlFor="start">Start:</label>
                    <input 
                        type="date"
                        id="start"
                        name="start"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                </div>
                <div className="educationCol">
                    <label htmlFor="end">End:</label>
                    <input
                        type="date"
                        id="end"
                        name="end"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </div>
                <button 
                    onClick={((e) => {
                        e.preventDefault();
                        addNewEducation(subject, institution, start, end);
                        resetForm();
                    })}
                >
                    Save
                </button>

            </form>
        </div>
    )
}

function ShowEducation ({educationArray}) {
    return (
        <ul>
            {educationArray.map((item, index) => (
                <li key={index}>
                    {item.subject}
                </li>
            ))}
        </ul>
    )
}

export {EducationSection, ShowEducation}