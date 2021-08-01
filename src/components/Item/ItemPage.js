import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Tab, Row, Col, Card } from "react-bootstrap";
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
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.imgURL[0]} />
      <Card.Body>
        <Card.Link href={`/item?id=${item._id}`}>{item.name}</Card.Link>
        <Card.Text>{item.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
function ItemList(props) {
  const [items, setitems] = useState([]);
  useEffect(() => {
    setitems(props.items);
  }, [props]);
  const rendering = () => {
    const result = [];
    for (let i = 0; i < items.length; i++) {
      result.push(<EachCard key={i} item={items[i]} idx={i}></EachCard>);
    }
    return result;
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>{rendering()}</div>
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
      console.log(items.data);
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
