import React, {useRef, useState} from "react";
import {request, gql} from "graphql-request";
import {useQuery} from "react-query";
import Card from "./Card";
import "../styles/Events.css";
import {Config} from "../config";
import {EVENTS} from "../Graphql/queries";

const Endpoint = Config.graphqlUrl;
const Query = EVENTS;

function Events() {

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
        <div className="container mt-3 events">
            <section className="overflow-hidden">
                <div className="container px-5 py-2 mx-auto">
                    <div className="d-flex flex-wrap flex-column past_events">
                        <div className="my-3 events_header">
                            <h3 className="fst-italic fs-1">Past Events</h3>
                            <hr />
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
                                pastEvents.current === 0 && <p className="fs-3">No Past Events</p>
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-wrap flex-column">
                        <div className="my-3 events_header">
                            <h3 className="fst-italic fs-1">Ongoing Events</h3>
                            <hr />
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
                                onGoingEvents.current === 0 && <p className="fs-3">No Ongoing Events....</p>
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-wrap flex-column">
                        <div className="my-3 events_header">
                            <h3 className="fst-italic fs-1">Upcoming Events</h3>
                            <hr />
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
                                upcomingEvents.current === 0 && <p className="fs-3">No Upcoming Events....</p>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Events;