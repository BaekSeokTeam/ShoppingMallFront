import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landingpage from "./LandingPage/LandingPage";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
import Userinfo from "./UserinfoPage/UserinfoPage";
import NavComponent from "./nav/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserInfo } from "../controller/user";
export default function App() {
  const [login, setlogin] = useState(false);
  const [change, setchange] = useState(false);

  const changeState = () => {
    var newState = !change;
    setchange(newState);
  };
  useEffect(() => {
    console.log(1111);
    getUserInfo().then((res) => {
      if (res) {
        setlogin(true);
      } else {
        setlogin(false);
      }
    });
  }, [change]);
  return (
    <Router>
      <div>
        <NavComponent login={login} change={changeState} />
        <Switch>
          <Route exact path="/" component={Landingpage} />

          <Route
            path="/signin"
            render={() => <Signin login={login} change={changeState} />}
          />

          <Route path="/signup" component={Signup} />

          <Route path="/userinfo" component={Userinfo} />
        </Switch>
      </div>
    </Router>
  );
}
