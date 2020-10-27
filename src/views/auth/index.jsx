import React from "react";
import Item from "../../components/items";
import {Loading1} from "../../components/Loading/one/index";

export function Admin(props) {
  return (
    <div>
      <h1>交互效果</h1>
      <Item width={"100px"} />
      <Item width="200px" />
      <Loading1></Loading1>
    </div>
  )
}