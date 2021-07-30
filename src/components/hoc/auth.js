import React, { useEffect } from "react";
import axios from "axios";
import { header } from "../../utils/config";

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
    useEffect(() => {
      axios
        .get("api/users/auth", header)
        .then((res) => res.data.user)
        .then(async (res) => {
          if (!res) {
            if (option) {
              await props.history.push("/signin");
            }
          } else {
            if (!res.admin && adminRoute) {
              await props.history.push("/");
            } else {
              if (option === false) {
                await props.history.push("/");
              }
            }
          }
        });
    });

    return <SpecificComponent />;
  }
  return CheckAuth;
}
