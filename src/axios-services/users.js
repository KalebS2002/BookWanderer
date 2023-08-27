import axios from "axios";

export async function signup(username, password, email) {
  try {
    const { data } = await axios.post("api/users/register", {
      username: username,
      password: password,
      useremail: email,
    });
    console.log("signupx", data);
    if (data.user)
      sessionStorage.setItem("BWUSERID", parseInt(data.user.userid));
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function login(username, password) {
  try {
    const { data } = await axios.post("api/users/login", {
      username: username,
      password: password,
    });
    console.log("login", data);
    if (data.user) sessionStorage.setItem("BWUSERID", parseInt(data.user.id));
    return data;
  } catch (e) {
    console.log(e);
  }
}
