import { useEffect, useState, useRef } from "react";
import "/src/styles/form-section.css";
import "/src/styles/jobs.css";
import {format} from "date-fns";
import {sortDates} from "/src/components/Help_functions.jsx"

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
    const [jobsArray, setJobsArray] = useState([]);
    const [showJobsModal, setJobsModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
   
    const addNewJob = (title, company, startDate, endDate=null, responsibilities="") => {
        const newJob = new Job(title, company, startDate, endDate, responsibilities);
        setJobsArray((prev) => [...prev, newJob])
    }

    const updateJob = (newTitle, newCompany, newStartDate, newEndDate=null, newResponsibilities="", existingId) => {
        const index = jobsArray.findIndex((item) => item.id === existingId);
        const updatedJob = {title:newTitle, company:newCompany, startDate:newStartDate, endDate:newEndDate, responsibilities:newResponsibilities, id:existingId};
        jobsArray.splice(index, 1, updatedJob);
    };

    const deleteJob = (deleteId) => {
        const index = jobsArray.findIndex((item) => item.id === deleteId);
        jobsArray.splice(index, 1)
    };

    const setFormContents = (selectedJob) => {
        setSelectedJob(selectedJob)
    };

    const tempJobsArray = jobsArray;
    tempJobsArray.sort((a, b) => sortDates(a.endDate, b.endDate));

    return (
        <div className="formSection">
            <div className="sectionHeader">
                <h2>Jobs:</h2>
                <button
                    type="button"
                    onClick={() => {
                        setSelectedJob(null);
                        setJobsModal((v) => !v);
                    }}
                >
                    Add
                </button>
            </div>
            {showJobsModal && (<AddJob jobsArray={jobsArray} setJobsModal={setJobsModal} 
            showJobsModal={showJobsModal} addNewJobs={addNewJob} selectedJob={selectedJob} 
            updateJob={updateJob} deleteJob={deleteJob}/>)}
            <ShowJobs jobsArray={tempJobsArray} setJobsModal={setJobsModal} setFormContents={setFormContents}/>
        </div>
    )
}

function AddJob({showJobsModal, setJobsModal, addNewJobs, selectedJob, updateJob, deleteJob}) {
    const dialogRef = useRef(null);
    const formRef = useRef(null);

    const [title, setTitle] = useState(selectedJob ? selectedJob.title : "");
    const [company, setCompany] = useState(selectedJob ? selectedJob.company : "");
    const [startDate, setStartDate] = useState(selectedJob ? selectedJob.startDate : "");
    const [endDate, setEndDate] = useState(selectedJob ? selectedJob.endDate : "");
    const [responsibilities, setResponsibilities] = useState(selectedJob ? selectedJob.responsibilities : "");
    const [id] = useState(selectedJob ? selectedJob.id : "");

    const [isValid, setIsValid] = useState(false);

    let mode = "";
    if (selectedJob) {
        mode = "edit"
    } else {
        mode = "new"
    };


    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        
        if (showJobsModal) {
            if (!dialog.open) dialog.showModal();
        } else if (dialog.open) {
            dialog.close()
        }
    }, [showJobsModal]);

    useEffect((isValid)=> {
        if (!formRef.current) return;
        if(!isValid) {
            setIsValid(formRef.current.checkValidity())
        }
    }, [title, company, startDate]);


    const resetForm = () => {
        setTitle("");
        setCompany("");
        setStartDate("");
        setEndDate("");
        setResponsibilities("")
    };

    return (
        <dialog
            className="addJob"
            ref={dialogRef}
            onClose={()=> setJobsModal(false)}
        >
            <div className="header">
                <h2>Add new job</h2>
                <button
                    type="button"
                    className="deleteButton"
                    hidden={mode=="new"}
                    onClick={(e) => {
                        e.preventDefault();
                        deleteJob(id);
                        resetForm();
                        setJobsModal(false);
                    }}
                >
                    Delete
                </button>
                <button 
                    type="submit"
                    className="submitButton"
                    disabled={!isValid}
                    onClick={(e) => {
                        e.preventDefault();
                        if (mode=="edit") {
                            updateJob(title, company, startDate, endDate, responsibilities);
                        } else {
                            addNewJobs(title, company, startDate, endDate, responsibilities);
                        };
                        resetForm();
                        setJobsModal(false)
                    }}>
                    Save
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

function ShowJobs({jobsArray, setJobsModal, setFormContents}) {
    return (
        <>
        <p>{jobsArray.length <1 ? "No jobs added" : ""}</p>
        <ul>
        {
            jobsArray.map((item) => (
                <li key={item.id}>
                    <div className="jobListItem">
                        <div className="jobHeaderRow">
                            <div><strong>{item.title}</strong> - {item.company}</div>
                            <div className="jobDate">({format(item.startDate, 'MMM-yyyy')}-{item.endDate ? format(item.endDate, 'MMM-yyyy') : "current"}) </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setFormContents(item);
                                    setJobsModal(true)
                                }}
                            >
                                Edit
                            </button>
                        </div>
                        <p>Key responsibilities:</p>
                        <p>{item.responsibilities}</p>
                    </div>
                </li>
            ))
        }
        </ul>
        </>
    )
}

export {JobsSection}