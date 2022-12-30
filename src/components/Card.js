import React from "react";
import {Link} from "react-router-dom";
import "../styles/Card.css";

function Card(props){

    const formatter = (description) =>{
        return description.length > 100 ? description.substring(0, 100) + "..." : description;
    }

    return (

            <>
                <Link className="card mx-2 my-3 shadow-sm bg-white event_card" to={`/eventdetails/${props.id}`}>
                    <div className="card-body">
                        <h3 className="card-title text-capitalize">{props.event.name}</h3>
                        <p className="card-text text-muted">{props.event.description && formatter(props.event.description)}</p>
                    </div>
                </Link>
        </>
    );
}

export default Card;