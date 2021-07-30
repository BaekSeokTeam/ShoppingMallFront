import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { signin } from "../../controller/user";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";
function Signin(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitEvent = (event) => {
    event.preventDefault();
    signin(Email, Password)
      .then((res) => {
        if (res.success) {
          var cookies = new Cookies();

          cookies.set("auth", res.token);

          props.history.push("/");
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitEvent}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>
        <label>Password</label>
        <input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>
        <br />
        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
}
export default withRouter(Signin);
