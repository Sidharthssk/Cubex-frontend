import {useState} from "react";
import {gql} from "graphql-request";
import axios from "axios";
import jwt_decode from "jwt-decode";
import userContext from "./UserContext";
import {useNavigate} from "react-router-dom";

const UserState = (props) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const Endpoint = "http://localhost:8000/graphql/";
    const loginQuery = gql`
    mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
                id
                email
                token{
                    access
                }
          }
    }`;

    const login = async (email, password) => {
        await axios.post(Endpoint, {query: loginQuery, variables: {email: email, password: password}}).then(
            (response) => {
                if(response.data.errors){
                    console.log(response.data.errors);
                }
                else{
                    const access_token = response.data.data.login.token.access;
                    const decoded = jwt_decode(access_token);
                    setUser({
                        user_id: decoded.user_id,
                        user_role: decoded.user_role,
                        token: access_token
                    });
                    localStorage.setItem("token", access_token);
                    navigate("/");
                }
            }
        );

    }

    return (
        <userContext.Provider value={{login, user, setUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;