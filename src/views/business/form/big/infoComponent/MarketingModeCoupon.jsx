import React from "react";
import { Form } from "antd";

export default class MarketingModeCoupon extends React.Component {

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
