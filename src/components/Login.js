import React, {useContext} from "react";
import "../styles/Login.css";
import UserContext from "../context/UserContext";


function Login() {

    const context = useContext(UserContext);
    const {login} = context;

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password);
    }

  return (
    <form className="container px-5 py-3 login d-flex flex-column position-absolute top-50 start-50 translate-middle"
        onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" className="my-4" id="email" autoComplete="off"/>
        <input type="password" placeholder="Password" className="my-3" id="password" />
        <button className="btn btn-primary my-3" type="submit">Login</button>
    </form>
  );
}

export default Login;