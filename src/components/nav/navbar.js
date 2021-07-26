import React,{useState,useLayoutEffect} from 'react'
import {Nav,NavDropdown,Navbar,Container,Button} from "react-bootstrap";
import { removeToken } from "../../controller/user";
export default function NavComponent(props) {
  

  return (<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">DK Shop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="/signin">로그인</NavDropdown.Item>
          <NavDropdown.Item href="/signup">회원가입</NavDropdown.Item>
          <NavDropdown.Item href="/userinfo">유저정보</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    <Button onClick={()=>{
      removeToken()
    }
  }>logout</Button>
  </Container>
  </Navbar>); 
  

  
  
 
}


