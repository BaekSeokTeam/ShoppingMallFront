import React from "react";
import { Nav, NavDropdown, Navbar, Container, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { removeToken } from "../../controller/user";

function NavComponent(props) {
  const rendering2 = (props) => {
    if (!props.login) {
      return;
    } else {
      return (
        <Button
          variant="outline-light"
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
    <Navbar bg="ligth" variant="primary" expand="lg">
      <Container>
        <Navbar.Brand href="/">DK Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/itemlist">Item</Nav.Link>
            <Nav.Link href="/board">Board</Nav.Link>
            {props.login ? (
              <NavDropdown title="Dropdown">
                <NavDropdown.Item href="/userinfo">유저정보</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            ) : (
              <NavDropdown title="Dropdown">
                <NavDropdown.Item href="/signin" hi="123">
                  로그인
                </NavDropdown.Item>
                <NavDropdown.Item href="/signup">회원가입</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
        {props.admin ? (
          <Button
            variant="outline-primary"
            onClick={() => {
              props.history.push("/usercontrol");
            }}
          >
            회원관리
          </Button>
        ) : null}
        {props.login ? (
          <Button
            variant="outline-primary"
            onClick={() => {
              removeToken();
              props.change();
              props.history.push("/");
            }}
          >
            logout
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
}
export default withRouter(NavComponent);
