import React, {useState, useEffect} from "react";
import {gql} from "graphql-request";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import moment from "moment";

const Endpoint = "http://localhost:8000/graphql/";
const participantQuery = gql`
    query participant($id: ID!){
    participant(id: $id){
        name
        dob
        contact
        email
        gender
        ageGroup {
          name
        }
        events {
          name
          id
        }
    }
}`;


function ParticipantDetails() {
    const [participant, setParticipant] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        getParticipant();
    }, []);

    const getParticipant = async () => {
        const response = await axios.post(Endpoint, {query: participantQuery, variables: {id: id}}).then(
            (response) => {
                setParticipant(response.data.data.participant);
            }
        );
    }


    const renderParticipant = () => {
        if (participant) {
            return (
                <div>
                    <p className="fs-4"><span className="fst-italic fw-light">Participant Name :</span> <span className="text-capitalize">{participant.name}</span></p>
                    <p className="fs-4"><span className="fst-italic fw-light">Date of Birth : </span>{moment(participant.dob).format("DD-MM-YYYY")}</p>
                    <p className="fs-4"><span className="fst-italic fw-light">Gender : </span>{participant.gender}</p>
                    <p className="fs-4"><span className="fst-italic fw-light">Email : </span>{participant.email}</p>
                    <p className="fs-4"><span className="fst-italic fw-light">Contact :</span> {participant.contact}</p>
                    <p className="fs-4 text-capitalize"><span className="fst-italic fw-light">Age Group :</span> {participant.ageGroup.name}</p>
                    <p className="fs-4"><span className="fst-italic fw-light">Event :</span></p>
                    <ul className="d-inline-flex flex-column">
                        {
                            participant.events.map((event) => {
                                return <Link key={event.id} style={{textDecoration: "none", color: "black"}} to={`/eventDetails/${event.id}`}><li className="fs-4 mx-5 text-capitalize">{event.name}</li></Link>
                            })
                        }
                    </ul>
                </div>
            )
        }
    }

    return (
        <>
            <div className="container my-5">
                <div className="card shadow-sm">
                    <div className="card-body ">
                        {renderParticipant()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ParticipantDetails;