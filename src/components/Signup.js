import { Link } from "react-router-dom";
import React, { useState } from "react";
import TreeIcon from "../Images/TreeIcon.png";
import { signup } from "../axios-services/users";

const Signup = ({ isLoggedIn, setIsLoggedIn }) => {
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  async function HandleForm(event) {
    event.preventDefault();
    let response = await signup(Username, Password, email);
    setMessage(response.message);
  }

  return (
    <form id="Signup" onSubmit={HandleForm}>
      <label className="LoginLabel">Sign Up</label>
      <input
        autoComplete="username"
        value={Username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        placeholder="Username"
        className="LoginInput"
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
      ></input>
      <input
        autoComplete="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        placeholder="Email"
        className="LoginInput"
      ></input>
      <p id="SignupError">{message}</p>
      <button id="SignupButton" type="submit">
        Register New Account
      </button>
      <img id="LoginIcon" src={TreeIcon} alt="Icon"></img>
      <Link to="/login"> Have An Account? Click Here to Login!</Link>
    </form>
  );
};

export default Signup;
