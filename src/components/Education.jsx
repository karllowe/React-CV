import { useEffect, useState, useRef } from "react";
import "/src/styles/form-section.css";
import "/src/styles/education.css";

class Degree {
  constructor(subject, institution, startDate, endDate = null) {
    this.subject = subject;
    this.institution = institution;
    this.startDate = startDate;
    this.endDate = endDate;
    this.id = crypto.randomUUID();
  }
}

function EducationSection() {
  const [educationArray, setEducationArray] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);

  const addNewEducation = (subject, institution, startDate, endDate) => {
    const item = new Degree(subject, institution, startDate, endDate);
    setEducationArray((prev) => [...prev, item]);
  };

  return (
    <div className="formSection">
      <form action="">
        <div className="educationHeader">
            <h2>Education</h2>
            <button 
                type="button"
                onClick={() => setShowNewModal((v) => !v)}
            >Add</button>
        </div>
      </form>
      <AddEducation addNewEducation={addNewEducation} showNewModal={showNewModal} setShowNewModal={setShowNewModal} />
      <ShowEducation educationArray={educationArray} />
    </div>
  );
}

function AddEducation({ addNewEducation, showNewModal, setShowNewModal }) {
    const dialogRef = useRef(null);

    const [subject, setSubject] = useState("");
    const [institution, setInstitution] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (showNewModal) {
            if (!dialog.open) dialog.showModal();
            } else if (dialog.open) {
            dialog.close();
        }
    }, [showNewModal]);

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
          onClick={(e) => {
            e.preventDefault();
            addNewEducation(subject, institution, start, end);
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

function ShowEducation({ educationArray }) {
  return (
    <ul>
      {educationArray.map((item) => (
        <li key={item.id}>{item.subject} - {item.institution} ({item.startDate}-{item.endDate})</li>
      ))}
    </ul>
  );
}

export { EducationSection };
