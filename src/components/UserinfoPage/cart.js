import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { getCart } from "../../controller/userinfo";
import { Button } from "react-bootstrap";
import { deleteCart } from "../../controller/userinfo";
import axios from "axios";

function EachCart(props) {
  const clickEvent = () => {
    props.onClick(props.idx);
  };
  const [item, setitem] = useState({
    name: "",
    size: ["", "", "", "", ""],
    price: "",
    imgURL: "holder.js/100px180",
  });

  useEffect(() => {
    const getItem = async () => {
      const param = {
        item: props.cart.item,
      };
      const gettedItem = await axios.get("api/item/get", { params: param });

      setitem(gettedItem.data.item);
      console.log(gettedItem.data.item);
    };
    getItem();
  }, [props]);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.imgURL[0]} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.size[props.cart.sizeIdx]}</Card.Text>
        <Card.Text>{item.price}</Card.Text>
        <Button variant="primary">결제하기</Button>
        <Button variant="secondary" onClick={clickEvent}>
          삭제하기
        </Button>
      </Card.Body>
    </Card>
  );
}
export default function Cart() {
  const [cart, setcart] = useState([]);
  const [change, setchange] = useState(false);

  useEffect(() => {
    getCart().then((data) => {
      setcart(data);
    });
  }, [change]);
  const removeCart = (idx) => {
    cart.splice(idx, 1);
    deleteCart(cart[idx]._id).then((res) => {
      setchange(!change);
    });
  };
  const rendering = () => {
    const result = [];
    for (let i = 0; i < cart.length; i++) {
      result.push(
        <EachCart
          key={i}
          cart={cart[i]}
          onClick={removeCart}
          idx={i}
        ></EachCart>
      );
    }
    return result;
  };
  return <div>{rendering()}</div>;
}
