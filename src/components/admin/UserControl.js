import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
function UserControl(props) {
  const styleInfo = {
    paddingRight: "10px",
  };
  const elementStyle = {
    border: "solid",
    position: "relative",
    left: "10vh",
    height: "3vh",
    width: "20vh",
    marginTop: "5vh",
    marginBottom: "10vh",
  };
  return (
    <div>
      <input type="text" placeholder="유저이름을 입력해주세요" />
      <div style={elementStyle}></div>
    </div>
  );
}

export default withRouter(UserControl);
