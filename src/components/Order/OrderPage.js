import React, { useState, useLayoutEffect } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { Container, Button, Form, Modal, CloseButton } from "react-bootstrap";
import DaumAddress from "../UserinfoPage/DaumAdress";
import { getUserInfo } from "../../controller/user";

const EachAddress = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [road, setroad] = useState("");
  const [detailed, setdetailed] = useState("");

  useLayoutEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setroad(res.address[0].roadAddr);
        setdetailed(res.address[0].detailedAddr);
      }
    });
  }, []);

  const detailedAddrHandler = (event) => {
    setdetailed(event.currentTarget.value);
  };

  const changeRoad = (data) => {
    setroad(data);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>주소</Form.Label>
        <Form.Control type="text" placeholder={road} readOnly />
        <Form.Control
          type="text"
          value={detailed}
          placeholder={detailed}
          onChange={detailedAddrHandler}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleShow}>
        주소지 변경
      </Button>
      <Modal show={show} onHide={handleClose}>
        <CloseButton onClick={handleClose}></CloseButton>
        <Modal.Body>
          <DaumAddress onRevise={changeRoad} onShow={handleClose}></DaumAddress>
        </Modal.Body>
      </Modal>
    </Form>
  );
};

function OrderPage(props) {
  const { search } = props.location; // 문자열 형식으로 결과값이 반환된다.
  const queryObj = queryString.parse(search); // 문자열의 쿼리스트링을 Object로 변환
  //const [cart, setcart] = useState(queryObj.cartid);
  const [point, setpoint] = useState(0);
  const [item, setitem] = useState({
    name: "",
    imgURL: [""],
    size: [],
  });
  useLayoutEffect(() => {
    const param = {
      item: queryObj.itemid,
    };
    axios({
      method: "get",
      url: "/api/item/get",
      params: param,
    }).then((res) => {
      setitem(res.data.item);
    });
    getUserInfo().then((res) => {
      if (res) {
        setpoint(res.point);
      }
    });
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        border: "solid",
        borderWidth: "1px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          border: "solid",
          borderWidth: "1px",
        }}
      >
        <Container
          style={{
            borderStyle: "none",
            margin: "10px",
            width: "200px",
            height: "230px",
          }}
        >
          <img
            className="d-block w-100"
            src={item.imgURL[0]}
            alt="First slide"
          />
        </Container>
        <div>
          <div
            style={{
              borderStyle: "None",
              padding: "10px",
            }}
          >
            {item.name}
          </div>
          <div
            style={{
              borderStyle: "None",
              padding: "10px",
            }}
          >
            Price : {item.price}원
          </div>
          <div
            style={{
              borderStyle: "None",
              padding: "10px",
            }}
          >
            Size : {item.size[queryObj.sizeidx]}
          </div>
        </div>
      </div>
      <EachAddress info={queryObj}></EachAddress>
      <div>현재 잔여 포인트:{point}</div>
      <div>구입 이후 포인트:{point - item.price}</div>
      <Button>구매</Button>
    </Container>
  );
}

export default withRouter(OrderPage);
