import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Landingpage from './LandingPage/LandingPage'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'
import Userinfo from './UserinfoPage/UserinfoPage'
import { removeToken } from "../controller/user";


export default function App() {
  return (
    <Router>
      <div>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
            <li>
              <Link to="/userinfo">UserInfo</Link>
            </li>
          </ul>
        </nav>
        <button onClick={removeToken}>
          logout
        </button>
        <Switch>
          <Route exact path="/">
            <Landingpage />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/userinfo">
            <Userinfo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

