import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function EachUser(props) {
  const elementStyle = {
    border: "solid",
  };
  const [user, setuser] = useState(props.user);
  const [givePoint, setgivePoint] = useState(0);
  return (
    <div style={elementStyle} key={user._id}>
      <div>이메일:{user.email}</div>
      <div>닉네임:{user.nickname}</div>
      <div>
        <div>포인트:{user.point}</div>
        <input
          type="text"
          placeholder="포인트 추가"
          value={givePoint}
          onChange={(e) => {
            setgivePoint(e.currentTarget.value);
          }}
        ></input>
        <Button
          onClick={async () => {
            const data = {
              email: user.email,
              point: givePoint,
            };
            const res = await axios.post("/api/admin/givePoint", data);
            if (res) {
              window.location.reload();
            }
          }}
        >
          포인트 추가
        </Button>
      </div>
      {user.status ? (
        <Button
          variant="danger"
          onClick={async () => {
            const data = {
              userid: user._id,
              userStatus: user.status,
            };
            const res = axios.post("/api/admin/statuschange", data);
            if (res) {
              window.location.reload();
            }
          }}
        >
          차단하기
        </Button>
      ) : (
        <Button
          variant="success"
          onClick={async () => {
            const data = {
              userid: user._id,
              userStatus: user.status,
            };
            const res = axios.post("/api/admin/statuschange", data);
            if (res) {
              window.location.reload();
            }
          }}
        >
          차단해제
        </Button>
      )}
    </div>
  );
}

function UserControl(props) {
  const [user, setuser] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/api/admin/userlist");
      setuser(res.data.userList);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <div>
        {user.map((eachUser) => (
          <EachUser user={eachUser} />
        ))}
      </div>
    </div>
  );
}

export default withRouter(UserControl);
