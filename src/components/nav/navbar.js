import React from "react";
import { Nav, NavDropdown, Navbar, Container, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { removeToken } from "../../controller/user";

function NavComponent(props) {
  const rendering1 = (props) => {
    if (props.login) {
      return (
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="/userinfo">유저정보</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>
      );
    } else {
      return (
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="/signin" hi="123">
            로그인
          </NavDropdown.Item>
          <NavDropdown.Item href="/signup">회원가입</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>
      );
    }
  };
  const rendering2 = (props) => {
    if (!props.login) {
      return;
    } else {
      return (
        <Button
          onClick={() => {
            removeToken();
            props.change();
            props.history.push("/");
          }}
        >
          logout
        </Button>
      );
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">DK Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/items">Item</Nav.Link>
            <Nav.Link href="/board">Board</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {rendering1(props)}
        {rendering2(props)}
      </Container>
    </Navbar>
  );
}
export default withRouter(NavComponent);
