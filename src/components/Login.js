import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import TreeIcon from "../Images/TreeIcon.png";
import { login } from "../axios-services/users";
import "../style/Login_Signup.css";

//Component login which takes in 2 props (isLoggedIn => bool, setIsLoggedIn => function)
function Login({ isLoggedIn, setIsLoggedIn }) {
  //Sets the states which we use later in the component
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  //Used to route to other pages; In this we route to products after a successful log in
  let history = useHistory()

  //if isLoggedIn changes refresh page
  useEffect(() => {}, [isLoggedIn]);

  //Function used to handle form submission
  async function HandleForm(event) {
    event.preventDefault();
    //Function which takes in Username and Password. If successful will return a copy of the user | else return error with message
    let response = await login(Username, Password);
    let curUserid = sessionStorage.getItem("BWUSERID");
    console.log("Login > BWUSERID:", curUserid);
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
      {!isLoggedIn ? (
        <div className="startShopping">
          Need An Account?{"  "}
          <Link to="/signup">REGISTER!</Link>
        </div>
      ) : (
        <div className="startShopping">
          <Link to="/products">Start Shopping!</Link>
        </div>
      )}
    </form>
  );
}

export default Login;
