/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
function ItemAdd(props) {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [count, setcount] = useState([0]);
  const [tag, settag] = useState([]);
  const [image, setimage] = useState([""]);
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

    const res = await axios.post("/api/item/add", formData);
    if (res) {
      props.history.push("/itemlist");
    }
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
        <label>?????? ??????</label>
        <input type="text" value={name} onChange={nameHandler}></input>
        <label>?????? ??????</label>
        <input type="text" value={description} onChange={descHandler}></input>
        <label>??????</label>
        <input type="text" value={price} onChange={priceHandler}></input>
        <div>
          <label>??????</label>
          <input
            type="radio"
            name="tag"
            value="shirt"
            onChange={tagHandler}
          ></input>
          <label>??????</label>
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
                <label>?????????</label>
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
                <label>??????</label>
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
              ??????
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setsize(size.slice(0, -1));
                setcount(count.slice(0, -1));
              }}
            >
              ??????
            </Button>
          </div>
        </div>
        <label>?????????</label>
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
          ??????
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            setimage(image.slice(0, -1));
          }}
        >
          ??????
        </Button>
        <Button type="submit">??????</Button>
      </form>
    </div>
  );
}

export default withRouter(ItemAdd);
