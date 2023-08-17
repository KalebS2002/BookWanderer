import axios from 'axios';

export async function signup({username, password, email}){
    try{
      const {data} = await axios.post('http://localhost:4000/api/users/register',
        {
            username: username._value, 
            password: password._value, 
            useremail: email._value
        })
        sessionStorage.setItem("BWUSERID", data.user.username)
        return data
    }catch (e){
        console.log(e)
    }
    
}