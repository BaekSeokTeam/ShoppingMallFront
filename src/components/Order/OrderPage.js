import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { token } from "../../controller/user";

function Order(props) {
  const [item, setitem] = useState({});
  console.log(props);
  useEffect(() => {
    const param = {
      item: props.item._id,
    };
    axios({
      method: "get",
      url: "/api/item/get",
      params: param,
    }).then((res) => {
      setitem(res.data.item);
    });
  }, []);
  return (
    <div>
      <div>{item.name}</div>
    </div>
  );
}

function OrderPage(props) {
  const { search } = props.location; // 문자열 형식으로 결과값이 반환된다.
  const queryObj = queryString.parse(search); // 문자열의 쿼리스트링을 Object로 변환
  const [cart, setcart] = useState(queryObj.cartid);
  const [item, setitem] = useState({});
  console.log(queryObj);
  useEffect(() => {
    const param = {
      item: queryObj.itemid,
    };
    axios({
      method: "get",
      url: "/api/item/get",
      params: param,
    }).then((res) => {
      setitem(res.data.item);
    });
  }, []);

  return <div>{item._id}</div>;
}

export default withRouter(OrderPage);
