import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Modal, CloseButton, Form } from "react-bootstrap";
import DaumAddress from "./DaumAdress";
import { getUserInfo } from "../../controller/user";
import { changeAddress } from "../../controller/userinfo";
import { withRouter } from "react-router-dom";

const EachAddress = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [road, setroad] = useState(props.address.roadAddr);
  const [detailed, setdetailed] = useState(props.address.detailedAddr);
  useEffect(() => {
    const transfer = () => {
      props.onChange(road, detailed);
    };
    transfer();
  }, [road, detailed, props]);

  const detailedAddrHandler = (event) => {
    setdetailed(event.currentTarget.value);
    props.onChange(road, detailed);
  };

  const changeRoad = (data) => {
    setroad(data);
    props.onChange(road, detailed);
  };

  return (
    <>
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
    </>
  );
};

function Address(props) {
  const [address, setaddress] = useState([]);
  const [roadAddr, setroadAddr] = useState("");
  const [detailedAddr, setdetailedAddr] = useState("");

  useLayoutEffect(() => {
    getUserInfo().then((body) => {
      if (body) {
        if (body.address) {
          setaddress(body.address);
          setroadAddr(body.address[0].roadAddr);
          setdetailedAddr(body.address[0].detailedAddr);
        }
      } else {
        //props.history.push('/')
      }
    });
  }, []);
  const rendering = () => {
    const result = [];
    for (let i = 0; i < address.length; i++) {
      result.push(
        <EachAddress
          key={i}
          address={address[i]}
          onChange={setSubmitData}
        ></EachAddress>
      );
    }
    return result;
  };
  const setSubmitData = (road, detailed) => {
    setroadAddr(road);
    setdetailedAddr(detailed);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const address = {
      roadAddr: roadAddr,
      detailedAddr: detailedAddr,
    };
    changeAddress(address)
      .then((res) => {
        props.history.push("/");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Form onSubmit={submitHandler}>
      {rendering()}
      <br></br>
      <br></br>
      <Button variant="primary" type="submit">
        저장
      </Button>
    </Form>
  );
}
export default withRouter(Address);
