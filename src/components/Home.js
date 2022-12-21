import React, {useRef, useState} from "react";
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
            startDate
            endDate
            }
        }
    `;


function Home() {

    const [events, setEvents] = useState(null);
    const onGoingEvents = useRef(0);
    const upcomingEvents = useRef(0);
    const pastEvents = useRef(0);

    const {data, isLoading, error} = useQuery("events", () =>{
        return request(Endpoint, Query).then((data) => {
            // console.log(data.events);
            setEvents(data.events);
        })
    });

    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>{error.message}</p>;


  return (
      <section className="overflow-hidden">
            <div className="container px-5 py-2 mx-auto">
                {/*<div className="d-flex flex-wrap">*/}
                {/*    {*/}
                {/*        events?.map((event) => {*/}
                {/*            return <Card key={event.id} event={event} id={event.id}/>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</div>*/}
                <div className="d-flex flex-wrap flex-column">
                    <div className="my-3">
                        <h3 style={{color: "white"}} className="fst-italic">Past Events</h3>
                        <hr style={{color: "white", margin: "0"}}/>
                    </div>
                    <div className="d-flex flex-wrap">
                        {
                            events?.map((event) => {
                                if(event.endDate < new Date().toISOString()){
                                    pastEvents.current += 1;
                                    return <Card key={event.id} event={event} id={event.id}/>
                                }
                            })
                        }
                        {
                            pastEvents.current === 0 && <p style={{color: "white"}}>No Past Events</p>
                        }
                    </div>
                </div>
                <div className="d-flex flex-wrap flex-column">
                    <div className="my-3">
                        <h3 style={{color: "white"}} className="fst-italic">Ongoing Events</h3>
                        <hr style={{color: "white", margin: "0"}}/>
                    </div>
                    <div className="d-flex flex-wrap">
                        {
                            events?.map((event) => {
                                if(event.endDate >= new Date().toISOString() && event.startDate < new Date().toISOString()){
                                    onGoingEvents.current = onGoingEvents.current + 1;
                                    return <Card key={event.id} event={event} id={event.id}/>
                                }
                            })
                        }
                        {
                            onGoingEvents.current === 0 && <p style={{color: "white"}}>No Ongoing Events....</p>
                        }
                    </div>
                </div>
                <div className="d-flex flex-wrap flex-column">
                    <div className="my-3">
                        <h3 style={{color: "white"}} className="fst-italic">Upcoming Events</h3>
                        <hr style={{color: "white", margin: "0"}}/>
                    </div>
                    <div className="d-flex flex-wrap">
                        {
                            events?.map((event) => {
                                if(event.startDate > new Date().toISOString()){
                                    upcomingEvents.current = upcomingEvents.current + 1;
                                    return <Card key={event.id} event={event} id={event.id}/>
                                }
                            })
                        }
                        {
                            upcomingEvents.current === 0 && <p style={{color: "white"}}>No Upcoming Events....</p>
                        }
                    </div>
                </div>
            </div>
      </section>
  );
}

export default Home;