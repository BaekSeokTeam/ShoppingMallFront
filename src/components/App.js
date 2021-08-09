import React, { useState, useLayoutEffect } from "react";
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
import ItemAdd from "./Item/AddItem";
import ItemEdit from "./Item/EditItem";
import UserControl from "./admin/UserControl";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserInfo } from "../controller/user";
import Auth from "./hoc/auth";
export default function App() {
  const [login, setlogin] = useState(false);
  const [admin, setadmin] = useState(false);
  const [change, setchange] = useState(false);

  const changeState = () => {
    var newState = !change;
    setchange(newState);
  };
  useLayoutEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setlogin(true);
        if (res.admin) {
          setadmin(true);
        }
      } else {
        setlogin(false);
        setadmin(false);
      }
    });
  }, [change]);
  return (
    <Router>
      <div>
        <NavComponent login={login} admin={admin} change={changeState} />
        <Switch>
          <Route exact path="/" component={Landingpage} />
          <Route
            path="/signin"
            render={() => <Signin login={login} change={changeState} />}
          />
          <Route path="/signup" component={Auth(Signup, false)} />
          <Route path="/userinfo" component={Userinfo} />
          <Route path="/order" component={Auth(OrderPage, true)} />
          <Route
            path="/itemlist"
            render={() => <ItemListPage admin={admin} />}
          />
          <Route path="/board" component={BoardPage} />
          <Route path="/item" render={() => <Item admin={admin} />} />
          <Route path="/itemadd" component={Auth(ItemAdd, true, true)} />
          <Route path="/itemedit" component={Auth(ItemEdit, true, true)} />
          <Route
            path="/usercontrol"
            component={Auth(UserControl, true, true)}
          />
        </Switch>
      </div>
    </Router>
  );
}
