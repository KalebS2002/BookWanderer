import axios from "axios";


//takes in username, password, and email and creates new user in DB
export async function signup(username, password, email) {
  try {
    //Makes call to backend and awaits response from server. Expect data.user if successful | just message otherwise
    const { data } = await axios.post("api/users/register", {
      username: username,
      password: password,
      useremail: email,
    });
    console.log("signupx", data);
    //if sign up successful, set the BWUSERID to user's id
    if (data.user)
      sessionStorage.setItem("BWUSERID", parseInt(data.user.userid));
    //return the response
    return data;
  } catch (e) {
    console.log(e);
  }
}

//takes in username, password, and logs in users
export async function login(username, password) {
  try {
    //Makes call to backend and awaits response from server. Expect data.user if successful | just message otherwise
    const { data } = await axios.post("api/users/login", {
      username: username,
      password: password,
    });
    console.log("login", data);
    //if log in successful, set the BWUSERID to user's id
    if (data.user) sessionStorage.setItem("BWUSERID", parseInt(data.user.id));
    //return the response
    return data;
  } catch (e) {
    console.log(e);
  }
}
export async function fetchAllUsers() {
  try {
    const response = await fetch('http://localhost:4000/api/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
}

export async function fetchMyProfile() {
  try {
    const response = await fetch('http://localhost:4000/api/users/me');
    
    if (!response.ok) {
      const errorResponse = await response.text();
      console.error('Error response:', errorResponse);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching my profile:', error);
    throw error;
  }
}