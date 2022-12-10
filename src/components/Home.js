import React from "react";
import {request, gql} from "graphql-request";
import {useQuery} from "react-query";
import Card from "./Card";

const Endpoint ="http://localhost:8000/graphql/";
const Query = gql`
    query{
        events{
            name
            description
            }
        }
    `;


function Home() {
    const {data, isLoading, error} = useQuery("events", () =>{
        return request(Endpoint, Query);
    });

    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>{error.message}</p>;


  return (
    <div className="container flex items-center my-3 mx-auto">
        {data.events.map((event) => {
            return (
                <Card name={event.name} description={event.description} />
            );
            })}
    </div>
  );
}

export default Home;