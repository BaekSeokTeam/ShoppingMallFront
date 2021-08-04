import React, { useState, useEffect, useLayoutEffect } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Tab, Row, Col, Card, Pagination } from "react-bootstrap";
import PageItem from "react-bootstrap/PageItem";
import axios from "axios";

function EachCard(props) {
  const [item, setitem] = useState({
    _id: "",
    name: "",
    price: "",
    imgURL: "holder.js/100px180",
  });
  useEffect(() => {
    const getItem = async () => {
      const param = {
        item: props.item._id,
      };
      const gettedItem = await axios.get("api/item/get", { params: param });
      setitem(gettedItem.data.item);
    };
    getItem();
  }, [props]);

  return (
    <Card bg="primary" text="light" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.imgURL[0]} />
      <Card.Body>
        <Card.Link
          style={{ color: "#FFF" }}
          text="light"
          href={`/item?id=${item._id}`}
        >
          {item.name}
        </Card.Link>
        <Card.Text>{item.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}

function ItemList(props) {
  const [items, setitems] = useState([]);
  const [page, setPage] = useState(4);
  useEffect(() => {
    setitems(props.items);
  }, [props, page]);
  const changePage = (num) => {
    setPage(num);
    console.log(page);
  };
  const rendering = () => {
    const result = [];
    for (let i = 0; i < items.length; i++) {
      result.push(<EachCard key={i} item={items[i]} idx={i}></EachCard>);
    }
    return result;
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>{rendering()}</div>
    </div>
  );
}

function ItemListPage(props) {
  const [shirt, setshirt] = useState([]);
  const [pants, setpants] = useState([]);
  useEffect(() => {
    const getAllItems = async () => {
      const items = await axios.get("api/item/viewAll");
      var shirtTemp = [];
      var pantsTemp = [];

      for (var i = 0; i < items.data.length; i++) {
        if (items.data[i].Tag[0] === "shirt") {
          shirtTemp.push(items.data[i]);
        } else if (items.data[i].Tag[0] === "pants") {
          pantsTemp.push(items.data[i]);
        } else {
        }
      }
      setshirt(shirtTemp);
      setpants(pantsTemp);
    };
    getAllItems();
  }, []);
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="shirt">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="shirt">상의</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="pant">하의</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="shirt">
              <ItemList items={shirt} />
            </Tab.Pane>
            <Tab.Pane eventKey="pant">
              <ItemList items={pants} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default withRouter(ItemListPage);
