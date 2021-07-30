import React from "react";

import { Tab, Tabs } from "react-bootstrap";
import Userinfo from "./userinfo";
import Cart from "./cart";
import Address from "./address";
export default function UserInfoTab(props) {
  return (
    <Tabs
      defaultActiveKey="Userinfo"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Userinfo" title="유저정보">
        <Userinfo />
      </Tab>
      <Tab eventKey="Address" title="주소지">
        <Address />
      </Tab>
      <Tab eventKey="Cart" title="장바구니">
        <Cart />
      </Tab>
    </Tabs>
  );
}
