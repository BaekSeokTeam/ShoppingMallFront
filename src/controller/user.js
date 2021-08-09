import Cookies from "universal-cookie";
import axios from "axios";

export const token = () => {
  var cookies = new Cookies();
  return cookies.get("auth");
};

export const removeToken = () => {
  var cookies = new Cookies();
  return cookies.remove("auth");
};

export const signin = (email, password) => {
  var body = {
    email: email,
    password: password,
  };

  return new Promise((resolve, reject) => {
    console.log(body);
    axios
      .post("api/users/signin", body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getUserInfo = () => {
  console.log(`Bearer ${token()}`);
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "/api/userinfo",
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    })
      .then((res) => {
        resolve(res.data.body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const signup = (body) => {
  return new Promise((resolve, reject) => {
    axios
      .post("api/users/signup", body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const auth = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "/api/users/auth",
    })
      .then((res) => {
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
