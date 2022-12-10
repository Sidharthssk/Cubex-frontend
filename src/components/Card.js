import React from "react";
import {request, gql} from "graphql-request";
import {useQuery} from "react-query";

const Endpoint ="http://localhost:8000/graphql/";
const Query = gql`
    query{
        events{
            name
            description
            }
        }
    `;

function Card(){

    const {data, isLoading, error} = useQuery("events", () =>{
        return request(Endpoint, Query);
    });

    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>{error.message}</p>;

    return (
        <>
            {data.events.map((event, index) =>{
                return(
                    <div className="container my-3 mx-3" key={index}>
                        <a href="#"
                           className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{event.description}</p>
                        </a>

                    </div>
                )
            })}

        </>
    );
}

export default Card;