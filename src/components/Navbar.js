import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import "../styles/Navbar.css";
import UserContext from "../context/UserContext";
import {useNavigate} from "react-router-dom";

function Navbar(){

    const context = useContext(UserContext);
    const {user, setUser, getUserData} = context;
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            getUserData();
        }
    }, [])

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login");
    }

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
                                            {
                                                user.user_role === 1 ? (
                                                    <li className="nav-item">
                                                        <NavLink activeStyle={{ color:'#5754a8' }} className="nav-link" to="/createEvent">Create Event</NavLink>
                                                    </li>) : null
                                            }
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/participants">Participants</NavLink>
                                            </li>
                                            {
                                                user.user_role === 1 ? (
                                                    <li className="nav-item dropdown">
                                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                           role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Others
                                                        </a>
                                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                            <li><Link className="dropdown-item" to="/createUser">Create User</Link></li>
                                                            <li><Link className="dropdown-item" to="/fileuploader">File Upload</Link></li>
                                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                        </ul>
                                                    </li>) : null
                                            }
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