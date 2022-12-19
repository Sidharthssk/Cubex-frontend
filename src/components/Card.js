import React from "react";
import {Link} from "react-router-dom";

function Card(props){

    const formatter = (description) =>{
        return description.substring(0, 100) + "...";
    }

    return (

            <>
                <Link className="card mx-2 my-3 shadow-sm bg-white" to={`/eventdetails/${props.id}`} style={{width: "18rem", textDecoration: 'none', color: "black"}}>
                    <div className="card-body">
                        <h3 className="card-title text-capitalize">{props.event.name}</h3>
                        <p className="card-text text-muted">{props.event.description && formatter(props.event.description)}</p>
                    </div>
                </Link>
        </>
    );
}

export default Card;