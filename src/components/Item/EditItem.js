/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import queryString from "query-string";
import axios from "axios";
function ItemEdit(props) {
  const { search } = props.location; // 문자열 형식으로 결과값이 반환된다.
  const queryObj = queryString.parse(search);
  const itemId = queryObj.itemid;
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [count, setcount] = useState([0]);
  const [tag, settag] = useState([]);
  const [image, setimage] = useState([""]);
  const [size, setsize] = useState([""]);

  useEffect(() => {
    const fetchdata = async () => {
      const param = {
        item: itemId,
      };
      const res = await axios.get("/api/item/get", { params: param });
      const iteminfo = res.data.item;
      setname(iteminfo.name);
      setdescription(iteminfo.description);
      setprice(iteminfo.price);
      setcount(iteminfo.count);
      settag(iteminfo.Tag);
      setsize(iteminfo.size);
    };
    fetchdata();
  }, []);
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
    setcount(arr);
  };
  const imageHandler = (e) => {
    let idx = e.currentTarget.attributes.idx.value;
    let arr = [...image];
    arr[idx] = e.currentTarget.files[0];
    setimage(arr);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    tag.map((eachTag) => {
      formData.append("tag", eachTag);
    });
    size.map((eachSize) => {
      formData.append("size", eachSize);
    });
    count.map((eachCount) => {
      formData.append("count", eachCount);
    });
    image.map((eachImage) => {
      formData.append("image", eachImage);
    });
    const res = await axios.post("/api/item/edit", formData);

    props.history.push("/itemlist");
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={submitHandler}
      >
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
            checked={tag[0] === "shirt"}
            onChange={tagHandler}
          ></input>
          <label>하의</label>
          <input
            type="radio"
            name="tag"
            value="pants"
            checked={tag[0] === "pants"}
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
        <Button type="submit">확인</Button>
      </form>
    </div>
  );
}

export default withRouter(ItemEdit);
