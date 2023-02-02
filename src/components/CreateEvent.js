import React, {useState} from 'react';
import {gql, request} from "graphql-request";
import {useMutation} from "react-query";
import {DatePicker} from "antd";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import "../styles/CreateEvent.css";
import {Config} from "../config";
import {CREATE_EVENT} from "../Graphql/mutation";
const {RangePicker: DateRangePicker} = DatePicker;


const Endpoint =Config.graphqlUrl;

const mutation = CREATE_EVENT;

function CreateEvent() {

    const [date, setDate] = useState([]);
    const navigate = useNavigate();

    const handleValueChange = (value) => {
        const value1 = moment(value[0].$d).format("YYYY-MM-DD");
        const value2 = moment(value[1].$d).format("YYYY-MM-DD");
        setDate([value1, value2]);
    }

    const queryVariables = {
            name: document.getElementById("event_name")?.value,
            description: document.getElementById("event_description")?.value,
            startDate: date[0],
            endDate: date[1],
    }

    const handleForm = (e) => {
        e.preventDefault();
        mutationFunction.mutate()
    }

    const mutationFunction = useMutation(()=> request(
        Endpoint,
        mutation,
        queryVariables
    ), {
        onSuccess: (data) => {
            navigate("/events");
        }
    })

    return (
        <>
            <div className="container mx-auto p-5 create_event">
                <form onSubmit={handleForm}>
                    <div className="relative z-0 mb-5 w-100 input-group">
                        <label htmlFor="event_name" className="d-block " >Event Name</label>
                        <input type="text" name="event_name" id="event_name" className="d-block py-2 px-0 w-100 fs-5" placeholder=" " required
                               autoComplete="off"/>
                    </div>
                    <div className="relative z-0 mb-3 w-100 input-group">
                        <label htmlFor="event_name" className="d-block " >Event Description</label>
                        <textarea name="event_description" id="event_description" className="d-block p-3 w-100 fs-5 my-3" placeholder=" " required/>
                    </div>
                    <div className="relative z-0 mb-3 w-100 input-group">
                        <label htmlFor="event_name" className="d-block " >Start Date & End Date</label>
                        <div className="container my-3 px-0">
                            <DateRangePicker onChange={handleValueChange} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" >Create Event</button>
                </form>
            </div>
        </>
    );
}

export default CreateEvent;