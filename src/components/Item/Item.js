import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import queryString from "query-string";
import { Container, Carousel, Dropdown, Button } from "react-bootstrap";
import { header } from "../Config";
function Item(props) {
  const parsed = queryString.parse(props.location.search);

  const [item, setitem] = useState({
    _id: "",
    name: "",
    description: "",
    price: 0,
    imgURL: [],
    size: [],
    count: [],
    uploadedDate: "",
  });
  const [selectedSize, setselectedSize] = useState(0);
  useEffect(() => {
    const param = {
      item: parsed.id,
    };
    const getItem = async () => {
      const gettedItem = await axios.get("/api/item/get", { params: param });
      setitem(gettedItem.data.item);
    };
    getItem();
  }, []);

  const addCart = () => {
    const data = {
      item: item._id,
      sizeIdx: selectedSize,
    };
    axios.post("/api/cart/cartadd", data, header).then((res) => {
      if (res.data.message) {
        alert("로그인을 해주세요");
      } else {
        alert("장바구니에 추가되었습니다");
      }
    });
  };
  const rendering1 = () => {
    var result = [];
    for (var i = 0; i < item.imgURL.length; i++) {
      result.push(
        <Carousel.Item key={i}>
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

  const rendering2 = () => {
    var result = [];
    for (var i = 0; i < item.size.length; i++) {
      result.push(
        <Dropdown.Item
          key={i}
          eventKey={i}
          disabled={item.count[i] === 0}
          onSelect={(evt) => {
            setselectedSize(evt);
          }}
        >
          {item.size[i]}
          {item.count[i] === 0 ? "(품절)" : null}
        </Dropdown.Item>
      );
    }
    return result;
  };

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Carousel
        style={{
          display: "inline-block",
          width: "600px",
          height: "750px",
          border: "2px solid black",
        }}
      >
        {rendering1()}
      </Carousel>
      <div
        style={{
          display: "inline-block",
          width: "600px",
          height: "750px",
          border: "2px solid black",
        }}
      >
        <div>{item.name}</div>
        <div>{item.description}</div>
        <div>{item.price}원</div>
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={{ backgroundColor: "black" }}
          >
            {item.size[selectedSize]}
          </Dropdown.Toggle>
          <Dropdown.Menu>{rendering2()}</Dropdown.Menu>
        </Dropdown>
        <Button onClick={addCart}>장바구니 담기</Button>
        <Link
          to={`/order/?cartid=${null}&itemid=${
            item._id
          }&sizeidx=${selectedSize}&cart=${false}`}
        >
          <Button>바로 구매</Button>
        </Link>
        {props.admin ? (
          <div>
            <Button
              variant="secondary"
              onClick={async () => {
                const data = {
                  name: item.name,
                };
                const res = await axios.post("api/item/delete", data);
                if (res) {
                  props.history.push("/");
                }
              }}
            >
              삭제
            </Button>
            <Link to={`/itemedit/?itemid=${item._id}`}>
              <Button variant="secondary">편집</Button>
            </Link>
          </div>
        ) : null}
      </div>
    </Container>
  );
}

export default withRouter(Item);
