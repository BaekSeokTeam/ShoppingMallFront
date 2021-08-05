import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
function ItemAdd(props) {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [count, setcount] = useState([0]);
  const [tag, settag] = useState([]);
  const [image, setimage] = useState([null]);
  const [size, setsize] = useState([""]);
  const nameHandler = (e) => {
    setname(e.currentTarget.value);
  };
  const descHandler = (e) => {
    setdescription(e.currentTarget.value);
  };
  const priceHandler = (e) => {
    setprice(e.currentTarget.value);
  };
  const tagHandler = (e) => {
    settag([e.currentTarget.value]);
  };
  const sizeHandler = (e) => {
    let idx = e.currentTarget.attributes.idx.value;
    let arr = [...size];
    arr[idx] = e.currentTarget.value;
    setsize(arr);
  };
  const countHandler = (e) => {
    let idx = e.currentTarget.attributes.idx.value;
    let arr = [...count];
    arr[idx] = e.currentTarget.value;
    setsize(arr);
  };
  const imageHandler = (e) => {
    console.log(e.currentTarget.files);
    let idx = e.currentTarget.attributes.idx.value;
    let arr = [...image];
    arr[idx] = e.currentTarget.files[0];
    setimage(arr);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>상품 이름</label>
        <input type="text" value={name} onChange={nameHandler}></input>
        <label>상품 설명</label>
        <input type="text" value={description} onChange={descHandler}></input>
        <label>가격</label>
        <input type="text" value={price} onChange={priceHandler}></input>
        <div>
          <label>상의</label>
          <input
            type="radio"
            name="tag"
            value="shirt"
            onChange={tagHandler}
          ></input>
          <label>하의</label>
          <input
            type="radio"
            name="tag"
            value="pants"
            onChange={tagHandler}
          ></input>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            {size.map((eachSize, index) => (
              <div key={index}>
                <label>사이즈</label>
                <input
                  type="text"
                  onChange={sizeHandler}
                  idx={index}
                  value={eachSize}
                ></input>
              </div>
            ))}
          </div>
          <div>
            {count.map((eachCount, index) => (
              <div key={index}>
                <label>수량</label>
                <input
                  type="text"
                  onChange={countHandler}
                  idx={index}
                  value={eachCount}
                ></input>
              </div>
            ))}
          </div>
          <div>
            <Button
              size="sm"
              onClick={() => {
                setsize([...size, ""]);
                setcount([...count, 0]);
              }}
            >
              추가
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setsize(size.slice(0, -1));
                setcount(count.slice(0, -1));
              }}
            >
              삭제
            </Button>
          </div>
        </div>
        <label>이미지</label>
        {image.map((eachimage, index) => (
          <input
            key={index}
            type="file"
            idx={index}
            onChange={imageHandler}
          ></input>
        ))}
        <Button
          size="sm"
          onClick={() => {
            setimage([...image, null]);
          }}
        >
          추가
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            setimage(image.slice(0, -1));
          }}
        >
          삭제
        </Button>
      </form>
    </div>
  );
}

export default withRouter(ItemAdd);
