import React, {useState} from "react";
import {gql} from "graphql-request";
import {useQuery} from "react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Endpoint = "http://localhost:8000/graphql/";
const Query = gql`
    query{
        participants {
            participants {
              name
              id
              contact
              email
            }
        }
  }`;

function Participants() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const {isLoading, error} = useQuery("participants", () => {
        return axios.post(Endpoint, {query: Query}).then((response) => {
            setData(response.data.data.participants.participants);
        })
    });

    const renderTable = () => {
        if(data){
            return data.map((participant, index) => {
                return (
                    <tr key={participant.id} className="text-center" onClick={()=>{
                        navigate(`/participantdetails/${participant.id}`)
                    }}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-capitalize">{participant.name}</td>
                            <td>{participant.email}</td>
                            <td>{participant.contact}</td>
                    </tr>
                )
            })
        }
    }

    return (
        <div className="container mx-auto my-5">
            <div className="">
                <div className="card bg-white">
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                            <tr className="text-center">
                                <th scope="col">#</th>
                                <th scope="col">Participant Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                            </tr>
                            </thead>
                            <tbody className="participant-table">
                            {renderTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Participants;