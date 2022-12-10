import React from "react";

function Card(props){

    return (
            <>
                    <div className="container my-3 mx-3" >
                        <a href="#"
                           className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{props.description}</p>
                        </a>
                    </div>
        </>
    );
}

export default Card;