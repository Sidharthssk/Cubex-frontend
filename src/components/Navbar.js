import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import "../styles/Navbar.css";
import UserContext from "../context/UserContext";

function Navbar(){

    const context = useContext(UserContext);
    const {user, logout} = context;

    useEffect(() => {
        if(user){
            console.log(user);
        }
    }, [user]);

    return(
        <>
            <nav className="navbar main_navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <NavLink activeStyle={{ color:'#5754a8' }} className="navbar-brand" to="/">Cubex</NavLink>
                        {
                            user ? (
                                <div>
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
                                                <NavLink activeStyle={{ color:'#5754a8' }} className="nav-link" aria-current="page" exact to="/events">Events</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink activeStyle={{ color:'#5754a8' }} className="nav-link" to="/createEvent">Create Event</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/participants">Participants</NavLink>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                   role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Others
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                    <li><Link className="dropdown-item" to="/createUser">Create User</Link></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>) : null
                        }
                    </div>
                    <div>
                        {
                            localStorage.getItem('token') ? (
                                <button className="btn btn-outline-primary" onClick={() => {
                                    logout();
                                }}>Logout</button>
                            ) : (
                                <Link className="btn btn-outline-primary" to="/login">Login</Link>
                            )
                        }
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Navbar;