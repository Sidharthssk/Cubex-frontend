import React from "react";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";

function Navbar(){
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink activeStyle={{ color:'#5754a8' }} className="navbar-brand" to="/">Cubex</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink activeStyle={{ color:'#5754a8' }} className="nav-link" aria-current="page" exact to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeStyle={{ color:'#5754a8' }} className="nav-link" to="/createEvent">Create Event</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/participants">Participants</NavLink>
                            </li>
                            {/*<li className="nav-item dropdown">*/}
                            {/*    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"*/}
                            {/*       role="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
                            {/*        Dropdown link*/}
                            {/*    </a>*/}
                            {/*    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">*/}
                            {/*        <li><a className="dropdown-item" href="#">Action</a></li>*/}
                            {/*        <li><a className="dropdown-item" href="#">Another action</a></li>*/}
                            {/*        <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Navbar;