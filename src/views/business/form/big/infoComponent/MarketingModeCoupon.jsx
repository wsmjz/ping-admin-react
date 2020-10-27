import React from "react";
import { Form } from "antd";

export default class MarketingModeCoupon extends React.Component {
constructor(props) {
  super()
  console.log(props, '接受属性值')
}
  couponReg = new RegExp('^\\d+$');

  render() {
    return (
      <Form.Item
        label='请选择优惠券'
        >
          选择优惠券界面
      </Form.Item>
    );
  }
}
