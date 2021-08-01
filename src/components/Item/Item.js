import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Container, Carousel } from "react-bootstrap";
function Item(props) {
  const parsed = queryString.parse(props.location.search);

  const [item, setitem] = useState({
    name: "",
    description: "",
    price: 0,
    imgURL: [],
  });
  useEffect(() => {
    const param = {
      item: parsed.id,
    };
    const getItem = async () => {
      const gettedItem = await axios.get("/api/item/get", { params: param });
      console.log(gettedItem.data);
      setitem(gettedItem.data.item);
    };
    getItem();
  }, []);
  const rendering1 = () => {
    var result = [];
    for (var i = 0; i < item.imgURL.length; i++) {
      result.push(
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={item.imgURL[i]}
            alt="First slide"
          />
        </Carousel.Item>
      );
    }
    return result;
  };
  const style = {
    display: "inline-block",
    width: "600px",
    height: "750px",
    border: "2px solid black",
  };
  return (
    <Container>
      <div>
        <Carousel variant="dark" style={style}>
          {rendering1()}
        </Carousel>
        <div>{item.name}</div>
        <div>{item.description}</div>
        <div>{item.price}</div>
      </div>
    </Container>
  );
}

export default withRouter(Item);
