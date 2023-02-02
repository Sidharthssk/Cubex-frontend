import React, {useEffect} from "react";
import {gql} from "graphql-request";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import "../styles/Modal.css";
import {Config} from "../config";
import {REMOVE_PARTICIPANT} from "../Graphql/mutation";


const removeParticipantQuery = REMOVE_PARTICIPANT;
const Endpoint = Config.graphqlUrl;

function Modal(props){

    const {id} = useParams();
    const participantID = props.id;


    const removeParticipant = async () => {
        await axios.post(Endpoint, {query: removeParticipantQuery, variables: {eventID: id, participantID: participantID}}).then(
            (response) => {
                props.func();
                props.scoreboard();
            });
    }

    return(
        <div className="position-relative confirmation_modal" >
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