import { useEffect, useState, useRef } from "react";
import "/src/styles/form-section.css";
import "/src/styles/jobs.css";
// import {format} from "date-fns";

class Job {
    constructor(title, company, startDate, endDate, responsibilities) {
        this.title=title;
        this.company=company;
        this.startDate=startDate;
        this.endDate=endDate;
        this.responsibilities=responsibilities;
        this.id = crypto.randomUUID();
    }
}

function JobsSection() {
    const [jobsArray] = useState([]);
    const [showJobsModal, setJobsModal] = useState(false);

    return (
        <div className="formSection">
            <div className="sectionHeader">
                <h2>Jobs:</h2>
                <button
                    type="button"
                    onClick={() => {
                        setJobsModal((v) => !v);
                    }}
                >
                    Add
                </button>
            </div>
            <AddJob jobsArray={jobsArray} setJobsModal={setJobsModal} showJobsModal={showJobsModal}/>
        </div>
    )
}

function AddJob({showJobsModal, setJobsModal}) {
    const dialogRef = useRef(null);
    const formRef = useRef(null);

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [responsibilities, setResponsibilities] = useState("");


    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        
        if (showJobsModal) {
            if (!dialog.open) dialog.showModal();
        } else if (dialog.open) {
            dialog.close()
        }
    }, [showJobsModal]);

    const resetForm = () => {
        setTitle("");
        setCompany("");
        setStartDate("");
        setEndDate("");
        setResponsibilities("")
    };

    // add const function for creating new project

    return (
        <dialog
            className="addJob"
            ref={dialogRef}
            onClose={()=> setJobsModal(false)}
        >
            <div className="header">
                <h2>Add new job</h2>
                <button 
                    type="submit">
                    onClick={(e) => {
                        e.preventDefault();
                        resetForm
                        // add what to do to save the record
                    }}

                </button>
                <button type="button" onClick={() => setJobsModal(false)}>Close</button>
            </div>
            <form action="" ref={formRef}>
                <div className="jobFormRow">
                    <label htmlFor="jobtitle">Title:</label>
                    <input 
                        type="text" 
                        id="jobTitle" 
                        name="job_title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="jobFormRow">
                    <div className="jobFormCol">
                        <label htmlFor="company">Company:</label>
                        <input 
                            type="text" 
                            id="company" 
                            name="company_name" 
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </div>
                    <div className="jobFormCol">
                        <label htmlFor="start">Start date:</label>
                        <input 
                            type="date" 
                            id="start" 
                            name="start_date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required/>
                    </div>
                    <div className="jobFormCol">
                        <label htmlFor="date">End date:</label>
                        <input 
                            type="date" 
                            id="end" 
                            name="end_date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="jobFormCol">
                    <label htmlFor="responsibilities">Key responsibilities:</label>
                    <textarea 
                        name="responsibilities" 
                        id="responsibilities"
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                    ></textarea>
                </div>
            </form>
        </dialog>
    )
}

// function ShowJobs(jobsArray) {
//     return (
//         <ul>
//         {
//             jobsArray.map((item) => {
//                 <li key={item.id}>
//                     {item.title} - {item.company}
//                 </li>
//             })
//         }
//         </ul>
//     )
// }

export {JobsSection}