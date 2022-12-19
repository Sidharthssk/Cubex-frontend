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
            id
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
      <section className="overflow-hidden">
            <div className="container px-5 py-2 mx-auto">
                <div className="d-flex flex-wrap">
                    {
                        data.events.map((event) => {
                            return <Card key={event.id} event={event} id={event.id}/>
                        })
                    }
                </div>
            </div>
      </section>
  );
}

export default Home;