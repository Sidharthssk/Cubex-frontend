import React, {useEffect} from "react";
import {gql} from "graphql-request";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

const removeParticipantQuery = gql`
    mutation removeParticipantFromCategory($eventID: ID!, $participantID: ID!){
        removeParticipantFromCategory(eventID: $eventID, participantID: $participantID)
    }
`;
const Endpoint = "http://localhost:8000/graphql/";

function Modal(props){

    const {id} = useParams();
    const participantID = props.id;


    const removeParticipant = async () => {
        await axios.post(Endpoint, {query: removeParticipantQuery, variables: {eventID: id, participantID: participantID}}).then(
            (response) => {
                props.func();
            });
    }

    return(
        <div className="position-relative" style={{zIndex: "1"}}>
            <div className="position-absolute top-0 end-0" id="confirmationModal" tabIndex="-1" aria-labelledby="exampleModalLabel" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal Header</h1>
                            <button type="button" className="btn-close" onClick={
                                () =>{
                                    props.show(false);
                                }
                            }></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to remove <span className="text-capitalize fw-bold">{props.name}</span> from the event</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={
                                () => {
                                    props.show(false);
                                }
                            }>Close</button>
                            <button className="btn btn-primary" onClick={
                                () => {
                                    removeParticipant();
                                    props.show(false);

                                    // props.func();
                                }
                            }>Sure</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;