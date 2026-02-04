import { useEffect, useState, useRef } from "react";
import "/src/styles/form-section.css";
import "/src/styles/education.css";
import {format} from "date-fns";

// Defines the education section component
// uses a parent component for the whole section, then sub-components 
// for the list of education and a modal to create / edit the education entries.

class Degree {
  constructor(subject, institution, startDate, endDate = null) {
    this.subject = subject;
    this.institution = institution;
    this.startDate = startDate;
    this.endDate = endDate;
    this.id = crypto.randomUUID();
  }
}

// parent component
function EducationSection() {
  const [educationArray, setEducationArray] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const addNewEducation = (subject, institution, startDate, endDate) => {
    const item = new Degree(subject, institution, startDate, endDate);
    setEducationArray((prev) => [...prev, item]);
  };

  const updateEducation = (newSubject, newInstitution, newStartDate, newEndDate, existingId) => {
        const index = educationArray.findIndex((item) => item.id === existingId);
        const updatedEducation = {subject: newSubject, institution: newInstitution, startDate: newStartDate, endDate:newEndDate, id: existingId};
        educationArray.splice(index,1,updatedEducation)
  };

  const setFormContents = (selectedEducation) => {
    setSelectedEducation(selectedEducation)
  };

    const tempArray = educationArray;
    tempArray.sort((a,b) => {return new Date(b.endDate) - new Date(a.endDate)});

  return (
    <div className="formSection">
      <form action="">
        <div className="educationHeader">
            <h2>Education</h2>
            <button 
                type="button"
                onClick={() => {
                    setSelectedEducation(null);
                    setShowNewModal((v) => !v);
                }}
            >Add</button>
        </div>
      </form>
      {showNewModal && (<AddEducation addNewEducation={addNewEducation} showNewModal={showNewModal} setShowNewModal={setShowNewModal} selectedEducation={selectedEducation} updateEducation={updateEducation}/>)}
      <ShowEducation educationArray={educationArray} selectedEducation={selectedEducation} setFormContents={setFormContents} setShowNewModal={setShowNewModal} tempArray={tempArray} />
    </div>
  );
}

// dialog modal sub-component
function AddEducation({ addNewEducation, showNewModal, setShowNewModal, selectedEducation, updateEducation}) {
    const dialogRef = useRef(null);
    const formRef = useRef(null);

    const [subject, setSubject] = useState(selectedEducation ? selectedEducation.subject : "");
    const [institution, setInstitution] = useState(selectedEducation ? selectedEducation.institution : "");
    const [start, setStart] = useState(selectedEducation ? selectedEducation.startDate : "");
    const [end, setEnd] = useState(selectedEducation ? selectedEducation.endDate : "");
    const [id] = useState(selectedEducation ? selectedEducation.id : "");
    const [isValid, setIsValid] = useState(false);

    let mode = "";
    if (selectedEducation) {
        mode = "edit"
    } else {
        mode = "new"
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (showNewModal) {
            if (!dialog.open) dialog.showModal();
            } else if (dialog.open) {
            dialog.close();
        }
    }, [showNewModal]);

    useEffect((isValid) => {
        if (!formRef.current) return;

        if(!isValid) {
            setIsValid(formRef.current.checkValidity())
        }
    }, [subject, institution, start, end]);


    const resetForm = () => {
        setSubject("");
        setInstitution("");
        setStart("");
        setEnd("");
    };

    return (
        <dialog 
            className="addEducation" 
            ref={dialogRef}
            onClose={()=> setShowNewModal(false)}
        >
        <div className="header">
            <h2>Edit</h2>
            <button type="button" onClick={()=> setShowNewModal(false)}>Close</button>
        </div>
        <form action="" ref={formRef}>
            <div className="educationCol">
            <label htmlFor="subject">Subject:</label>
            <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
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
                required
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
                required
            />
            </div>
            <div className="educationCol">
            <label htmlFor="end">End:</label>
            <input
                type="date"
                id="end"
                name="end"
                max={new Date().toISOString().split("T")[0]}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required                
            />
            </div>
            <button
                type="submit"
                disabled={!isValid}
                onClick={(e) => {
                    e.preventDefault();
                    if (mode=="edit") {
                        updateEducation(subject, institution, start, end, id)
                    } else {
                        addNewEducation(subject, institution, start, end);
                    }
                    resetForm();
                    setShowNewModal(false)
                }}
            >
            Save
            </button>
        </form>
        </dialog>
    );
}



function ShowEducation({ tempArray, setFormContents, setShowNewModal }) {
  return (
    <ul>
      {    
      tempArray.map((item) => (
        <li key={item.id}>
            <div className="educationListItem">
                <div>{item.subject} - {item.institution}</div>
                <div className="educationDate">({format(item.startDate, 'MMM-yyyy')}-{format(item.endDate, 'MMM-yyyy')}) </div>
                <button
                    type="button"
                    onClick={() => {
                        setFormContents(item);
                        setShowNewModal(true);
                    }}
                >Edit</button>
            </div>
        </li>
      ))}
    </ul>
  );
}

export { EducationSection };
