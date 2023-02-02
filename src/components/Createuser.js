import React from 'react';
import {gql} from "graphql-request";
import axios from "axios";
import {Config} from "../config";
import {CREATE_SCORE_ENTERER, CREATE_ADMIN_MUTATION} from "../Graphql/mutation";


const ENDPOINT = Config.graphqlUrl;
const SCORE_ENTERER = CREATE_SCORE_ENTERER;
const CREATE_ADMIN = CREATE_ADMIN_MUTATION;


export default function CreateUser() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password1.value;
        const username = e.target.name.value;
        const confirmPassword = e.target.password2.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const variables = {
            email: email,
            password: password,
            username: username
        }

        if(e.target.role1.checked) {
            axios.post(ENDPOINT, {
                query: CREATE_ADMIN,
                variables: variables
            }).then((res) => {
                alert("User created");
                e.target.email.value = "";
                e.target.password1.value = "";
                e.target.name.value = "";
                e.target.password2.value = "";
            });
        }else{
            axios.post(ENDPOINT, {
                query: SCORE_ENTERER,
                variables: variables
            }).then((res) => {
                alert("User created");
                e.target.email.value = "";
                e.target.password1.value = "";
                e.target.name.value = "";
                e.target.password2.value = "";
            });
        }
    }

    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-body ">
                    <form className="p-3" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="name" placeholder="Username" autoComplete="off"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Email" autoComplete="off"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password1" placeholder="Password" autoComplete="off"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="password">Confirm Password</label>
                                    <input type="password" className="form-control" id="password2" placeholder="Confirm Password" autoComplete="off"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="role">Role</label>
                                    <div className="mx-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="role" id="role1" value="1"/>
                                            <label className="form-check-label" htmlFor="role1">Admin</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="role" id="role2" value="2"/>
                                            <label className="form-check-label" htmlFor="role2">Score Enterer</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Create User</button>
                    </form>
                </div>
            </div>
        </div>
    )
}