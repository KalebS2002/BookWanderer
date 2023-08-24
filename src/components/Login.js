import React, { useState } from "react";
import { Link } from "react-router-dom";
import TreeIcon from "../Images/TreeIcon.png";
import { login } from "../axios-services/users";

function Login({ isLoggedin, setIsLoggedIn }) {
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  async function HandleForm(event) {
    event.preventDefault();
    let response = await login(Username, Password);
    setMessage(response.message);
  }

  return (
    <form id="Login" onSubmit={HandleForm}>
      <label className="LoginLabel">Login</label>
      <input
        autoComplete="username"
        value={Username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        placeholder="Username"
        className="LoginInput"
        id="Username"
      ></input>
      <input
        autoComplete="current-password"
        value={Password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password"
        className="LoginInput"
        id="Password"
      ></input>
      <p id="LoginError">{message}</p>
      <button id="LoginButton" type="submit">
        Sign in
      </button>
      <img id="LoginIcon" src={TreeIcon} alt="Icon"></img>
      <Link to="/signup"> Need An Account? Click Here to Register!</Link>
    </form>
  );
}

export default Login;
