
import { BrowserRouter, Route, Link } from "react-router-dom"

import Login from "./Login";
import React, { useState, useEffect } from "react";
import TreeIcon from '../Images/TreeIcon.png'
import e from "cors";









async function CheckDataBase(Username, Password){
   console.log('Ready To Check Database Accounts')
}

const CheckRequirements = (props) => {

    const ValidStatments = {
        Numbers : ['1234567890'].join().split(''),
        Letters :  ['abcdefghijklmnopqrstuvwxyz'].join().split(''),
    }
    const sucess = { // All these props must be true inorder for the script to not fail
        
        Username : false,
        Password : false
    }
    for(let table in props){
        let Validated = []
        let table_id = props[table]._id
        let element = document.getElementById(table_id)
        if(table_id == element.id){ //Checks if the element is found inside the document 
            let table_value = props[table]._value
            for(let i = 0; i <= table_value.split('').length; i++){
                let stringIndex = table_value[i]
                
                let stringValid
                if (stringIndex != undefined){
                    stringValid = ValidStatments.Numbers.includes(stringIndex) || ValidStatments.Letters.includes(stringIndex)
                    
                    if(stringValid === true){
                        Validated.push(stringIndex)
                    }else(
                        Validated = ''
                    )
                }
            }
            let IsValidated = Validated.join().replaceAll(',','')
            
            if (IsValidated === table_value){
                if(table_id == 'Username'){
                    sucess.Username = true
                }else if(table_id == 'Password'){
                    sucess.Password = true
                }             
            }
            
        }else{
            console.error('Could not find a matching element to table_id inside Document')
        }
    }
    let AllPropsValidated = Object.values(sucess).every(item => item === true)
    
    return AllPropsValidated
   
}
const Signup = () => {
    const [Page, setPage] = useState('Signup')
    const [Password, setPassword] = useState({_id: 'Password', _value: ''})
    const [Username, setUsername] = useState({_id: 'Username', _value: ''})
    function HandleForm(event) {
        event.preventDefault()
        let failure = CheckRequirements([Username, Password])
      
        if (failure !== false){
           
            CheckDataBase(Username, Password)
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
                    value={Username._value} onChange={(e) => {setUsername({
                        _value : e.target.value,
                        _id : e.target.id
                    
                    })}}
                    type="text"
                    placeholder="Username"
                    className="LoginInput"
                    id={Username._id}
                ></input>
                <input
                    autoComplete="current-password"
                    value={Password._value} onChange={(e) => {setPassword({
                        _value : e.target.value,
                        _id : e.target.id
                    })}}
                    type="password"
                    placeholder="Password"
                    className="LoginInput"
                    id={Password._id}
                ></input>
                <p id="SignupError"></p>
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