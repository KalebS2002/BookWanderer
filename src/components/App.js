import React, { useState, useEffect, Component } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import Login from './Login'

import '../style/App.css';
import '../style/Login_Signup.css';



const App = () => {

  // const [APIHealth, setAPIHealth] = useState('');

  // useEffect(() => {
  //   // follow this pattern inside your useEffect calls:
  //   // first, create an async function that will wrap your axios service adapter
  //   // invoke the adapter, await the response, and set the data
  //   const getAPIStatus = async () => {
  //     const { healthy } = await getAPIHealth();
  //     setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
  //   };

  //   // second, after you've defined your getter above
  //   // invoke it immediately after its declaration, inside the useEffect callback
  //   getAPIStatus();
  // }, []);


  return (
    <Login />

  
  )
};

export default App;
