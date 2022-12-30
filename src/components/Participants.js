import React, {useState, useRef, useEffect} from "react";
import {gql} from "graphql-request";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Endpoint = "http://localhost:8000/graphql/";
const Query = gql`
    query participants($keyword: String){
        participants(keyword: $keyword){
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
    const keyword = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        getParticipants();
    }, []);

    const getParticipants = async () => {
        const response = await axios.post(Endpoint, {query: Query, variables: {keyword: keyword.current}}).then(
            (response) => {
                setData(response.data.data.participants.participants);
            }
        );
    }

    const handleSearch = (e) => {
        e.preventDefault();
        keyword.current = document.getElementById("search")?.value;
        getParticipants();
    }

    const renderTable = () => {
        if(data){
            return data.map((participant, index) => {
                return (
                    <tr key={participant.id} className="text-center border-bottom border-secondary" onClick={()=>{
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
                <div className="card ">
                    <div className="card-body p-4 ">
                        <nav className="navbar bg-light">
                            <div className="container-fluid">
                                    <input className="form-control me-2 w-25" id="search" type="search" placeholder="Search"
                                           aria-label="Search" onInput={handleSearch} autoComplete="off"/>
                            </div>
                        </nav>
                        <div className="border border-secondary border-bottom-0 mt-4">
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
        </div>
    );
}

export default Participants;