import axios from "axios";
import { header } from "../components/Config";
export const changeUserInfo = (nickname) => {
  return new Promise((resolve, reject) => {
    const data = {
      nickname: nickname,
    };

    axios
      .post("/api/userinfo/revise", data, header)

      .then((res) => {
        resolve(res.data.body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getCart = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/cart/showall", header)

      .then((res) => {
        resolve(res.data.cart);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const deleteCart = (cart) => {
  const data = {
    cart: cart,
  };

  return new Promise((resolve, reject) => {
    axios
      .post("/api/cart/delete", data, header)
      .then((res) => {
        console.log(res);
        resolve(res.data.success);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const changeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const data = {
      address: address,
    };

    axios
      .post("/api/userinfo/address", data, header)

      .then((res) => {
        console.log(res);

        resolve(res.data.body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const checkNickname = (nickname) => {
  return new Promise((resolve, reject) => {
    const param = {
      nickname: nickname,
    };

    axios
      .get("/api/users/nicknamecheck", { params: param, headers: header })

      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
