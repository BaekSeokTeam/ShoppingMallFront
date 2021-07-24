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
import axios from "axios";
import {header} from '../utils/config'





export default function App() {


  const [IsLogin, setIsLogin] = useState(true);
  const changeLoginState=()=>{
    const next=!IsLogin
    setIsLogin(next)
  }
  useEffect(()=>{
    axios.get('api/users/auth',header)
    .then(res=>res.data.user)
    .then(async(res)=>{
        if (!res){
          setIsLogin(false)
        }
        else{
          setIsLogin(true)
        }
    })
        
   
})
  console.log(IsLogin)
  return (
    <Router>
      <div>
    <NavComponent isLogin={IsLogin} onChange={changeLoginState}/>
        <Switch>
          <Route exact path="/" component={Landingpage}/>

          <Route path="/signin" component={Signin} />

          <Route path="/signup" component={Signup} />

          <Route path="/userinfo" component={Userinfo} />

        </Switch>
      </div>
    </Router>
  );
}

