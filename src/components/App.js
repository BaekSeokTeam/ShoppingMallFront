import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landingpage from "./LandingPage/LandingPage";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
import Userinfo from "./UserinfoPage/UserinfoPage";
import NavComponent from "./nav/navbar";
import OrderPage from "./Order/OrderPage";
import BoardPage from "./Board/BoardPage";
import ItemListPage from "./Item/ItemPage";
import Item from "./Item/Item";
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
          <Route path="/order" component={OrderPage} />
          <Route path="/itemlist" component={ItemListPage} />
          <Route path="/board" component={BoardPage} />
          <Route path="/item" component={Item} />
          <Route path="/order:id:cart" component={OrderPage} />
        </Switch>
      </div>
    </Router>
  );
}
