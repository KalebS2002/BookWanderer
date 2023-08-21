import React, { useState, useEffect, useMemo } from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"
import BackgroundRoses from '../Images/BackgroundRoses.png'
import TreeIcon from '../Images/TreeIcon.png'
import react from "react";
import Signup from "./Signup";
import { login } from "../axios-services/users";

function Login() {
    const [Page, setPage] = useState('Login')
    const [Password, setPassword] = useState('')
    const [Username, setUsername] = useState('')
    
    async function HandleForm(event) {
        event.preventDefault()
        let response = await login(Username, Password)
        console.log(response)
    }

    if (Page == 'Signup') {
        return(
            <Signup />
        )

    } else if (Page == 'Login') {
        return (
            <form id="Login" method="GET" onSubmit={HandleForm}>
                <label className="LoginLabel">Login</label>
                <input
                    autoComplete="username"
                    value={Username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    type="text"
                    placeholder="Username"
                    className="LoginInput"
                    id='Username'
                ></input>
                <input
                    autoComplete="current-password"
                    value={Password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    type="password"
                    placeholder="Password"
                    className="LoginInput"
                    id='Password'
                ></input>
                <p id="LoginError"></p>
                <button id="LoginButton" type="submit">Sign in</button>
                <img id="LoginIcon" src={TreeIcon} alt="Icon"></img>
                <button name='Signup' className="TransferButton" onClick={(e => {
                    setPage('Signup')
                })}>Need An Account? Click Here!</button>
            </form>
        )
        
    }
}






export default Login