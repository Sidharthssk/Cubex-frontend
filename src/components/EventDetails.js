import React, {useState, useRef, useEffect} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {gql} from "graphql-request";
import Table from "./Table";
import moment from "moment";

const Query = gql`
    query event($id: ID!) {
  event(id: $id) {
    name
    description
    startDate
    endDate
  }
  AgeGroups(eventId: $id) {
    minAge
    maxAge
    name
    id
  }
}`;

const Endpoint = "http://localhost:8000/graphql/";

const scoreBoardQuery = gql`
    query scoreboard($ageGroupID: ID!, $eventID: ID!){
    scoreboard(ageGroupID: $ageGroupID, eventID: $eventID){
        scores {
          duration
          participant {
            name
          }
          rank
        }
    }
}`;

function EventDetails(){
    const {id} = useParams();

    const [event, setEvent] = useState(null);
    const [ageGroups, setAgeGroups] = useState(null);
    const selectedAgeGroup = useRef(null);
    const [scoreBoard, setScoreBoard] = useState(null);

    useEffect(() => {
        getEvent();
    }, []);

    const getEvent = async () => {
        const response = await axios.post(Endpoint, {query: Query, variables: {id: id}}).then(
            (response) => {
                setEvent(response.data.data.event);
                setAgeGroups(response.data.data.AgeGroups);
                selectedAgeGroup.current = response.data.data.AgeGroups[0].id;
                getScoreBoard()
            }
        );
    }

    const getScoreBoard = async () => {
        const response = await axios.post(Endpoint, {query: scoreBoardQuery, variables: {ageGroupID: selectedAgeGroup.current, eventID: id}});
        setScoreBoard(response.data.data.scoreboard);
    }

    const handleAgeGroupChange = (ageGroup) => {
        selectedAgeGroup.current = (ageGroup);
        getScoreBoard();
        // console.log(selectedAgeGroup.current);
    }

    const renderScoreBoard = () => {
        if(scoreBoard){
            return scoreBoard?.scores.map((score, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{score.rank}</th>
                        <td>{score.participant.name}</td>
                        <td>{score.duration}</td>
                    </tr>
                )
            })
        }
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

    return (
        <>
            <div className="container mx-auto my-5 border p-3 rounded">
                <div className="navbar">
                    <ul className="nav nav-tabs flex">
                        <li className="nav-item">
                            <button className="nav-link active" aria-current="page" data-bs-toggle="tab"
                                    data-bs-target="#event">Event Description
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#scoreboard">Scoreboard</button>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">
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


                                <div className="card my-3">
                                    <div className="card-body ">
                                        <table className="table table-dark table-striped ">
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
                </div>
            </div>
        </>
    )
}

export default EventDetails