
import { BrowserRouter, Route, Link } from "react-router-dom"
import Login from "./Login";
import React, { useState, useEffect } from "react";
import TreeIcon from '../Images/TreeIcon.png'
import { signup } from "../axios-services/users";

async function CheckDataBase(Username, Password){
   console.log('Ready To Check Database Accounts')
}

const Signup = () => {
    const [Page, setPage] = useState('Signup')
    const [Password, setPassword] = useState("")
    const [Username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    async function HandleForm(event) {
        event.preventDefault()
        CheckDataBase(Username, Password)
        let response = await signup(Username, Password, email)
        if(response.error){
            if(response.error === "UserTakenError")
                setMessage(response.message)
        }
    }

    if (Page == 'Login') {
        return (<Login />)

    } else if (Page == 'Signup') {

        return (
            <form id="Signup" method="GET" onSubmit={HandleForm}>
                <label className="LoginLabel">Sign Up</label>
                <input
                    autoComplete="username"
                    value={Username} onChange={(e) => {setUsername(e.target.value)}}
                    type="text"
                    placeholder="Username"
                    className="LoginInput"
                ></input>
                <input
                    autoComplete="current-password"
                    value={Password} onChange={(e) => {setPassword(e.target.value)}}
                    type="password"
                    placeholder="Password"
                    className="LoginInput"
                ></input>
                <input
                    autoComplete="email"
                    value={email} onChange={(e) => {setEmail(e.target.value)}}
                    type="email"
                    placeholder="Email"
                    className="LoginInput"
                ></input>
                <p id="SignupError">{message}</p>
                <button id="SignupButton" type="submit">Register New Account</button>
                <img id="LoginIcon" src={TreeIcon} alt="Icon"></img>
                <button name='Login' className="TransferButton" onClick={(e => {
                    setPage('Login')
                })}>Have An Account? Click Here!</button>
            </form>
        )


    }


}


export default Signup