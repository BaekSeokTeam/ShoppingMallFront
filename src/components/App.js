import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landingpage from './LandingPage/LandingPage'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'
import Userinfo from './UserinfoPage/UserinfoPage'
import NavComponent from "./nav/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {header} from './Config'



export default function App() {

  function isLogin(){

  }

   

  return (
    <Router>
      <div>
    <NavComponent/>
    
    
        <Switch>
          <Route exact path="/" component={Landingpage}/>

          <Route path="/signin" component={Signin}  />

          <Route path="/signup" component={Signup} />

          <Route path="/userinfo" component={Userinfo} />

        </Switch>
        
      </div>
    </Router>
  );
}

