import React, {useState} from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import {gql, request} from "graphql-request";
import {useMutation} from "react-query";
import axios from "axios";

const Endpoint ="http://localhost:8000/graphql/";
const mutation = gql`
mutation CreateEvent($name: String!, $description: String!, $startDate: String!, $endDate: String!) {
  createEvent(
    name: $name
    description: $description
    startDate: $startDate
    endDate: $endDate
  ) {
    name
    description
    startDate
    endDate
  }
}`;
function CreateEvent() {

    const [date, setDate] = useState({
        startDate: null,
        endDate:null,
    });

    const handleValueChange = (value) => {
        setDate(value);
    }

    const queryVariables = {

            name: document.getElementById("event_name")?.value,
            description: document.getElementById("event_description")?.value,
            startDate: date.startDate,
            endDate: date.endDate,

    }

    const handleForm = (e) => {
        e.preventDefault();
        mutationFunction.mutate()
    }

    const mutationFunction = useMutation(async () => request(
        Endpoint,
        mutation,
        queryVariables,
    ), {
        onSuccess: ({data}) => {
            console.log(data.data, data.error)
        }
    });

    //
    // const mutationFunction = useMutation(async () => {
    //     return await axios.post(Endpoint, {
    //         query: mutation,
    //         variables: queryVariables
    //     }).then((res) => console.log(res));
    // });


    return (

        <div className="container mx-auto my-12 w-3/5 border-4 p-8 rounded-lg">
            <form onSubmit={handleForm}>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="event_name" id="event_name"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required/>
                    <label htmlFor="event_name"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event name</label>
                </div>

                <div>
                    <label htmlFor="event_description" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Event Description</label>
                    <textarea id="event_description" rows="4" name="event_description"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Enter the event description here"></textarea>
                </div>
                <hr className="my-6 border-b-2 border-gray-300 dark:border-gray-300"/>

                <div id="datepickerId">
                    <label htmlFor="datePicker" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Start Date and End Date</label>
                    <Datepicker id="datePicker" value={date} onChange={handleValueChange} primaryColor={"indigo"} separator={"to"} showShortcuts={true}/>
                </div>
                <hr className="my-6 border-b-2 border-gray-300 dark:border-gray-300"/>

                <div className="inline-flex w-full justify-end">
                    <button type="button"
                            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cancel
                    </button>

                    <button type="submit"
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Create Event
                    </button>


                </div>

            </form>
        </div>
    );
}

export default CreateEvent;