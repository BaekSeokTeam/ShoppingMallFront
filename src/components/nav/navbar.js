import React from 'react'
import {Nav,NavDropdown,Navbar,Container} from "react-bootstrap";
import { removeToken } from "../../controller/user";




export default function NavComponent(props) {
  return(
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">DK Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="/signin">Signin</NavDropdown.Item>
            <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
            <NavDropdown.Item href="/userinfo">User Information</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>);
}
