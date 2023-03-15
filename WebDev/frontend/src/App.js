import React, {useState} from "react";
import './App.css';
import Lsu from "./C/Lsu.js";
import User from "./C/User.js";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from "./C/Header";
import logo from './C/logo512.png'; 
import Followers from "./C/Followers";
import Tofollower from "./C/Tofollow";
import Makesub from "./C/Makesub";
import Sub from "./C/Sub";
import Allsubs from "./C/Allsubs";
import Admin from "./C/Admin";
import Makepost from "./C/Makepost";
import Viewpost from "./C/Viewpost";
import Savedposts from "./C/Savedposts";

function App() {
  const tkn = localStorage.getItem('jwt');
  console.log(tkn);
  if(!tkn)
  {
    return(
      <>
        <div className="headerlog">
          <img style={{ width: "5%", height: "5%"}} src={logo} alt="Logo"/>
        </div>
        <div className="Lsu"><Lsu/></div>
      </>
      ) 
  }
  return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<><Header/><div className="Lsu"><User/></div></>}/> 
          <Route exact path="/login" element={<><Header/><div className="Lsu"><Lsu/></div></>}/> 
          <Route exact path="/signup" element={<><Header/><div className="Lsu"><Lsu/></div></>}/> 
          <Route exact path="/user" element={<><Header/><div className="Lsu"><User/></div></>}/> 
          <Route exact path="/followers" element={<><Header/><div className="Lsu"><Followers/></div></>}/> 
          <Route exact path="/tofollow" element={<><Header/><div className="Lsu"><Tofollower/></div></>}/> 
          <Route exact path="/sub/make" element={<><Header/><div className="Lsu"><Makesub/></div></>}/> 
          <Route exact path="/sub/:uid" element={<><Header/><div className="Lsu"><Sub/></div></>}/> 
          <Route exact path="/sub/all" element={<><Header/><div className="Lsu"><Allsubs/></div></>}/> 
          <Route exact path="/sub/admin/:uid" element={<><Header/><div className="Lsu"><Admin/></div></>}/>
          <Route exact path="/makepost/:uid" element={<><Header/><div className="Lsu"><Makepost/></div></>}/> 
          <Route exact path="/post/:uid" element={<><Header/><div className="Lsu"><Viewpost/></div></>}/> 
          <Route exact path="/savedposts" element={<><Header/><div className="Lsu"><Savedposts/></div></>}/> 
        </Routes>
      </div>
  );
} 

export default App;
