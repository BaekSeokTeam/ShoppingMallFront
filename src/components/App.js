import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landingpage from './LandingPage/LandingPage'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'
import Userinfo from './UserinfoPage/UserinfoPage'
import { removeToken, signin } from "../controller/user";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,NavDropdown,Navbar,Container} from "react-bootstrap";
import Auth from './hoc/auth';



export default function App() {
  return (
    <Router>
      <div>
       <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">DK Shop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="/signup">Sign-up</NavDropdown.Item>
          <NavDropdown.Item href="/signin">Sign-in</NavDropdown.Item>
          <NavDropdown.Item href="/userinfo">User Information</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={removeToken} >Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        <Switch>
          <Route exact path="/" component={Auth(Landingpage)}/>

          <Route path="/signin" component={Signin} />

          <Route path="/signup" component={Signup} />

          <Route path="/userinfo" component={Userinfo} />

        </Switch>
      </div>
    </Router>
  );
}

