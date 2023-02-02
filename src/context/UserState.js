import {useState} from "react";
import {gql} from "graphql-request";
import axios from "axios";
import jwt_decode from "jwt-decode";
import userContext from "./UserContext";
import {useNavigate} from "react-router-dom";
import {Config} from "../config";
import {LOGIN_QUERY} from "../Graphql/mutation";

const UserState = (props) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const Endpoint = Config.graphqlUrl;

    const loginQuery = LOGIN_QUERY;

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

    const getUserData = () => {
        let token = localStorage.getItem("token");
        const decoded = jwt_decode(token)
        setUser({
            user_id: decoded.user_id,
            user_role: decoded.user_role,
            token: token
        })

    }

    return (
        <userContext.Provider value={{login, user, setUser, getUserData}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;