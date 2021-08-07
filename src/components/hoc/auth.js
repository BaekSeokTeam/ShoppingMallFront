import React, { useLayoutEffect } from "react";
import { getUserInfo } from "../../controller/user";
import { useHistory } from "react-router-dom";

export default function Auth(
  SpecificComponent,
  option = null,
  adminRoute = null
) {
  // option null: 다 들어올 수 있음
  // option false : 로그인 안한 유저만 들어올 수 있음
  // option true : 로그인 한 유저만 들어올 수 있음
  // adminRoute =true admin만 들어올 수 있음

  function CheckAuth(props) {
    let history = useHistory();
    let valid = false;
    getUserInfo().then((res) => {
      valid = true;
      if (!res) {
        if (option) {
          valid = false;
          alert("로그인을 해주세요");
          history.push("/signin");
        }
      } else {
        if (!res.admin && adminRoute) {
          valid = false;
          alert("관리자권한이 없습니다");
          history.push("/");
        } else {
          if (option === false) {
            valid = false;
            history.push("/");
          }
        }
      }
    });
    if (!valid) {
      return null;
    } else {
      return <SpecificComponent />;
    }
  }
  return CheckAuth;
}
