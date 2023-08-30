import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import TreeIcon from "../Images/TreeIcon.png";
import { signup } from "../axios-services/users";
import "../style/Login_Signup.css";

//Component Signup which takes in 2 props (isLoggedIn => bool, setIsLoggedIn => function)
const Signup = ({ isLoggedIn, setIsLoggedIn }) => {
  //Sets the states which we use later in the component
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //Used to route to other pages; In this we route to products after a successful sign up
  const history = useHistory()

  //if isLoggedIn changes refresh page
  useEffect(() => {}, [isLoggedIn]);

  //Function used to handle form submission
  async function HandleForm(event) {
    event.preventDefault();
    //Pass in Username, Password, and email. If successful will return a copy of the user | else return error with message
    let response = await signup(Username, Password, email);
    let curUserid = sessionStorage.getItem("BWUSERID");
    console.log("Signup > BWUSERID:", curUserid);
    //checks if user is logged in by seeing if parsed integer is greater than 1
    if (parseInt(curUserid) > 1) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    //Sets the message from the response after the sign in
    setMessage(response.message);
    //If sign up is successful then reroute to products page
    if(response.user)
      history.push("/products")
  }

  //return user ui with textboxes which set our above states
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
        autoComplete="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        placeholder="Email"
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
      <p id="SignupError">{message}</p>
      <button id="SignupButton" type="submit">
        Register New Account
      </button>
      <img id="LoginIcon" src={TreeIcon} alt="Icon"></img>
      {!isLoggedIn ? (
        <div className="startShopping">
          Need An Account?{"  "}
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <div className="startShopping">
          <Link to="/products">Start Shopping!</Link>
        </div>
      )}
    </form>
  );
};

export default Signup;
