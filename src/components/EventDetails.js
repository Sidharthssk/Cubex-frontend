import React, {useState, useRef, useEffect, useContext} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {gql} from "graphql-request";
import Table from "./Table";
import moment from "moment";
import Modal from "./Modal";
import "../styles/EventDetails.css";
import UserContext from "../context/UserContext";
import {Config} from "../config";
import {EVENT_DETAILS, SCORE_BOARD, PARTICIPANTS, ALL_PARTICIPANTS} from "../Graphql/queries";
import {CREATE_PARTICIPANT, REGISTER_PARTICIPANT, RECORD_SCORE} from "../Graphql/mutation";

const Query = EVENT_DETAILS;
const Endpoint = Config.graphqlUrl;
const scoreBoardQuery = SCORE_BOARD;
const participantsQuery = PARTICIPANTS;
const AllParticipantsQuery = ALL_PARTICIPANTS;
const createParticipant = CREATE_PARTICIPANT;
const registerParticipant = REGISTER_PARTICIPANT;
const recordScore = RECORD_SCORE;

function EventDetails(){
    const {id} = useParams();

    const [event, setEvent] = useState(null);
    const [ageGroups, setAgeGroups] = useState(null);
    const selectedAgeGroup = useRef(null);
    const [scoreBoard, setScoreBoard] = useState(null);
    const [participants, setParticipants] = useState(null);
    const [allParticipants, setAllParticipants] = useState(null);
    const keyword = useRef(null);
    const [show, setShow] = useState(false);
    const selectedParticipant = useRef(null);

    const context = useContext(UserContext);
    const {user} = context;

    useEffect(() => {
        getEvent();
        getParticipants();
        getAllParticipants();
    }, []);

    const getEvent = async () => {
        const response = await axios.post(Endpoint, {query: Query, variables: {id: id, eventID: id}}).then(
            (response) => {
                setEvent(response.data.data.event);
                setAgeGroups(response.data.data.AgeGroups);
                selectedAgeGroup.current = response.data.data.AgeGroups[0]?.id;
                getScoreBoard()
            }
        );
    }

    const getParticipants = async () =>{
        const response = await axios.post(Endpoint, {query: participantsQuery, variables: {eventID: id}}).then(
            (response) => {
                setParticipants(response.data.data.participants.participants);
            }
        )
    }

    const getAllParticipants = async () =>{
        const response = await axios.post(Endpoint, {query: AllParticipantsQuery}).then(
            (response) => {
                setAllParticipants(response.data.data.participants.participants);
            }
        )
    }

    const getScoreBoard = async () => {
        const response = await axios.post(Endpoint, {query: scoreBoardQuery, variables: {ageGroupID: selectedAgeGroup.current, eventID: id, keyword: keyword.current}});
        setScoreBoard(response.data.data.scoreboard);
    }

    const handleAgeGroupChange = (ageGroup) => {
        selectedAgeGroup.current = (ageGroup);
        getScoreBoard();
    }

    const handleKeywordChange = () => {
        let keywordValue = document.getElementById("keyword").value;
        keyword.current = (keywordValue);
        getScoreBoard();
    }

    const renderScoreBoard = () => {
        if(scoreBoard){
            return scoreBoard?.scores.map((score, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{score.rank}</th>
                        <td className="text-capitalize">{score.participant.name}</td>
                        <td>{score.duration}</td>
                    </tr>
                )
            })
        }
    }

    const renderAllParticipants = () => {
        if(allParticipants){
            let i = 1;
            return allParticipants.map((participant, index) => {
                if(participants){
                    if(participants.find(p => p.id === participant.id)==null){
                        return (
                            <tr key={index}>
                                <th scope="row">{i++}</th>
                                <td className="text-capitalize">{participant.name}</td>
                                <td>{participant.email}</td>
                                <td><button className="btn btn-primary" onClick={()=>{
                                    handleRegister(participant);
                                }}>Register</button></td>
                            </tr>
                        )
                    }
                }
            })
        }

    }

    const handleRegister = async (participant) => {
        await axios.post(Endpoint, {query: registerParticipant, variables: {participantID: participant.id, eventID: id}}).then(
            (response) => {
                alert("Participant Registered");
                getParticipants();
            }
        );
    }

    const renderAgeGroups = () => {
        if(ageGroups){
            return ageGroups.map((ageGroup, index) => {
                return (
                    <li className="border-bottom h-100"><button key={index} className="btn w-100" onClick={() => handleAgeGroupChange(ageGroup.id)}>{ageGroup.name}</button></li>
                )
            })
        }
    }

    const handleSubmission = async (e) => {
        e.preventDefault();
        const name = document.getElementById("name")?.value;
        const phone = document.getElementById("contact")?.value;
        const email = document.getElementById("email")?.value;
        const dob = document.getElementById("dob")?.value;
        const gender = document.getElementById("gender")?.options[document.getElementById("gender")?.selectedIndex].text;
        const city = document.getElementById("city")?.value;
        const state = document.getElementById("state")?.value;
        const country = document.getElementById("country")?.value;
        const selectedAgeGroup = document.getElementById("ageGroup")?.value;

        const ageGroupDetails = ageGroups.find((ageGroup) => ageGroup.id === selectedAgeGroup);
        const age = moment().diff(dob, 'years');

        if(age >= ageGroupDetails.minAge && age <= ageGroupDetails.maxAge){
            await axios.post(Endpoint, {query: createParticipant, variables: {name: name, phone: phone, email: email, gender: gender, dob: dob, city: city, state: state, country: country, ageGroupID: selectedAgeGroup}}).then(
                (response) => {
                    if(response.data.data.createParticipant){
                        const participantID = response.data.data.createParticipant.id;
                        axios.post(Endpoint, {query: registerParticipant, variables: {participantID: participantID, eventID: id}}).then(
                            (response) => {
                                if(response.data.data.registerParticipantForCategory){
                                    getParticipants();
                                    alert("Participant Registered Successfully");
                                }
                            })
                    }
                    else{
                        alert("Contestant already exists. Click on add an existing Contestant to add them to the event");
                    }
                });
        }else{
            alert("Participant Age is not in the age group");
        }
    }
    
    const handleScoreSubmission = async (e) => {
        let duration = document.getElementById("score")?.value;
        const participantID = document.getElementById("participant")?.value;
        await axios.post(Endpoint, {query: recordScore, variables: {participantID: participantID, eventID: id, duration: duration}}).then(
            (response) => {
                if(response.data.data.recordScore){
                    getScoreBoard();
                    alert("Score Recorded Successfully");
                }
            });
    }

    return (
        <div className="p-3 mt-5">
            {
                show && <Modal name={selectedParticipant.current.name} id={selectedParticipant.current.id} func={getParticipants}  scoreboard={getScoreBoard} show={setShow}/>
            }
            <div className="container mx-auto my-5 border p-3 rounded">
                <div className="navbar">
                    <ul className="nav nav-tabs flex event_details_navbar">
                        <li className="nav-item">
                            <button className="nav-link active" aria-current="page" data-bs-toggle="tab"
                                    data-bs-target="#event">Event Description
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#scoreboard" >Scoreboard</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#participants">Participants</button>
                        </li>
                        {
                            user.user_role === 1 ? (
                                <li className="nav-item">
                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#add-participants">Add Participants</button>
                                </li>
                            ) : null
                        }
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#add-score">Enter Score</button>
                        </li>
                    </ul>
                </div>
                <div className="tab-content my-2">
                    <div className="tab-pane fade show active" id="event">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-capitalize">{event?.name}</h3>
                                <p className="card-text fst-italic">{event?.description}</p>
                                <div className="my-3">
                                    <p className="my-1"><strong >Age Groups :</strong></p>
                                    <Table data={ageGroups}/>
                                </div>
                                <p className="card-text "><span className="fw-light">Start Date:</span> {moment(event?.startDate).format("DD/MM/YYYY")}</p>
                                <p className="card-text"><span className="fw-light">End Date:</span> {moment(event?.endDate).format("DD/MM/YYYY")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade show" id="scoreboard">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-capitalize">Scoreboard</h3>
                                <div className="d-flex justify-content-between">
                                    <div className="d-inline-flex align-items-center">
                                        <p className="card-text fst-italic mx-2 p-0">Select Age Category</p>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                {ageGroups?.find(ageGroup => ageGroup.id === selectedAgeGroup.current)?.name}
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                {renderAgeGroups()}
                                            </ul>
                                        </div>
                                    </div>
                                    <input className="form-control me-2 w-25" id="keyword" type="search" placeholder="Search"
                                           aria-label="Search" onInput={handleKeywordChange} autoComplete="off"/>
                                </div>



                                <div className="card my-3">
                                    <div className="card-body ">
                                        <table className="table table-striped border border-secondary">
                                            <thead>
                                            <tr>
                                                <th scope="col">Position</th>
                                                <th scope="col">Participant</th>
                                                <th scope="col">Duration</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {renderScoreBoard()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade show" id="participants">
                        <div className="card">
                            <div className="card-body">
                                <div className="container ">
                                    <table className="table table-striped border border-secondary">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Participant Name</th>
                                                {
                                                    user.user_role === 1 ? (
                                                        <th></th>
                                                    ) : null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                participants?.map((participant, index) => {
                                                    return (
                                                        <tr key={participant.id}>
                                                            <th scope="row">{index+1}</th>
                                                            <td className="text-capitalize w-50">{participant.name}</td>
                                                            {
                                                                user.user_role === 1 ? (
                                                                    <td><button type="button" className="btn-close"  onClick={() => {
                                                                        setShow(true);
                                                                        selectedParticipant.current = {
                                                                            "name" : participant.name,
                                                                            "id" : participant.id
                                                                        };
                                                                    }}></button></td>
                                                                ) : null
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        user.user_role === 1 ? (<div className="tab-pane fade show" id="add-participants">
                            <div className="card">
                                <div className="card-body">
                                    <form className="p-3 border-bottom border-secondary" id="create-participant-form" >
                                        <h3 className="mb-3">Create a new participant and register</h3>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="name" placeholder="Name" autoComplete="off"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="email" className="form-control" id="email" placeholder="Email" autoComplete="off"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="contact" className="form-label">Contact</label>
                                                    <input type="text" className="form-control" id="contact" placeholder="Contact" autoComplete="off"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                                                    <input type="date" className="form-control" id="dob" placeholder="Date of Birth"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="gender" className="form-label">Gender</label>
                                                    <select name="gender" id="gender" className="selectVal mx-2">
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="ageGroup" className="form-label">Age Group</label>
                                                    <select name="ageGroup" id="ageGroup" className="selectVal mx-2">
                                                        {
                                                            ageGroups?.map(ageGroup => {
                                                                return (
                                                                    <option key={ageGroup.id} value={ageGroup.id}>{ageGroup.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="City" className="form-label">City</label>
                                                    <input type="text" className="form-control" id="city" placeholder="City" autoComplete="off"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="state" className="form-label">State</label>
                                                    <input type="text" className="form-control" id="state" placeholder="State" autoComplete="off"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="country" className="form-label">Country</label>
                                                    <input type="text" className="form-control" id="country" placeholder="Country" autoComplete="off"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-primary" onClick={handleSubmission}>Submit</button>
                                            <button className="btn btn-primary mx-2" onClick={(e)=>{
                                                e.preventDefault();
                                                document.getElementById("registered_participants").style.display = "block";
                                                document.getElementById("create-participant-form").style.display = "none";
                                            }}>Add an existing contestant</button>
                                        </div>
                                    </form>
                                    <div id="registered_participants">
                                        <div className="d-flex mb-3 align-items-center justify-content-between px-3">
                                            <h3 className="m-0">Registered Participants</h3>
                                            <button className="btn btn-primary" onClick={() =>{
                                                document.getElementById("registered_participants").style.display = "none";
                                                document.getElementById("create-participant-form").style.display = "block";
                                            }}>Back</button>
                                        </div>
                                        <div className="container ">
                                            <table className="table table-striped border border-secondary">
                                                <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Participant Name</th>
                                                    <th scope="col">Participant Email</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {renderAllParticipants()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>) : null
                    }
                    <div className="tab-pane fade show" id="add-score">
                        <div className="card">
                            <div className="card-body">
                                <form className="p-3" id="create-score-form" onSubmit={handleScoreSubmission}>
                                    <div className="row">
                                        <div className="col-6 d-flex align-items-center">
                                            <div className="mb-3 fs-4">
                                                <label htmlFor="participant" className="form-label">Select participant : </label>
                                                <select name="participant" id="participant" className="selectVal mx-2">
                                                    {
                                                        participants?.map(participant => {
                                                            return (
                                                                <option key={participant.id} value={participant.id}>{participant.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-3 fs-4">
                                                <label htmlFor="score" className="form-label">Score : </label>
                                                <input type="text" className="form-control" id="score" placeholder="00:00:00 (min:sec:msec)" autoComplete="off"/>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit Score</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetails