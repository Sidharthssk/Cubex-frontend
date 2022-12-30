import React, {useEffect} from "react";
import axios from "axios";
import {Cookies} from "react-cookie";
import {gql} from "graphql-request";

const Endpoint = "http://localhost:8000/graphql/";
const loginQuery = gql`
    mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
                id
          }
}`;

function Login() {
    const cookies = new Cookies();
    const login = async () => {
        const email = "admin@gmail.com";
        const password = "admin1";
        const response = await axios.post(Endpoint, {query: loginQuery, variables: {email: email, password: password}}).then(
            (response) => {
                // cookies.set("token", response.data.data.login.id, {path: "/"});
                // window.location.href = "/";
                console.log(cookies.get("JWT_REFRESH_TOKEN"));
            }
        );
    }

    useEffect(() => {
        login();
    }, []);

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}

export default Login;