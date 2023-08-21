import axios from 'axios';

export async function signup(username, password, email){
    try{
      const {data} = await axios.post('http://localhost:4000/api/users/register',
        {
            username: username, 
            password: password, 
            useremail: email
        })
        sessionStorage.setItem("BWUSERID", data.user.username)
        return data
    }catch (e){
        console.log(e)
    }
    
}

export async function login(username, password){
    try{
      const {data} = await axios.post('http://localhost:4000/api/users/login',
        {
            username: username, 
            password: password, 
        })
        if(data.user)
            sessionStorage.setItem("BWUSERID", data.user.username)
        return data
    }catch (e){
        console.log(e)
    }
    
}