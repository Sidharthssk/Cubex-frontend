import React from "react";
import {request, gql} from "graphql-request";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import moment from "moment";
import Table from "./Table";

const Endpoint ="http://localhost:8000/graphql/";
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
  }
}`;

function EventDetails() {
    const {id} = useParams();

    const {data, isLoading, error} = useQuery("event",
        () => {
            return request(Endpoint, Query, {id: id});
        });

    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>{error.message}</p>;


    return (
        <>
            <div className="container my-5 mx-auto border-solid border-2 rounded-md p-4">
                <div className="flex justify-start border-b-2 pb-4">
                    <button className="mx-3 p-1 rounded-md hover:bg-[#cccccc]">Event Description</button>
                    <button className="mx-3 p-1 rounded-md hover:bg-[#cccccc]">Scoreboard</button>
                </div>
                <div className="flex p-4">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold my-3 capitalize">{data.event.name}</h1>
                        <p className="text-xl my-1 mb-3 italic">{data.event.description}</p>
                        <div>
                            <strong>Age Groups : </strong>
                            <Table data={data.AgeGroups} />
                        </div>
                        <div className="mt-3">
                            <p className="text-xl my-2"><span className="text-gray-600">Start-Date :</span> {moment(data.event.startDate).format("DD-MM-YYYY")}</p>
                            <p className="text-xl my-2"><span className="text-gray-600">End-Date :</span> {moment(data.event.endDate).format("DD-MM-YYYY")}</p>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </>
    );
}

export default EventDetails;