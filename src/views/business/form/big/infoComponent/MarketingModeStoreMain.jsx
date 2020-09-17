import React from "react";
import { Form } from "antd";

// const RadioGroup = Radio.Group;
// const CONST_VARIABLE = {
//   labelCol: {
//     span: 3
//   },
//   wrapperCol: {
//     span: 6
//   }
// }

export default class MarketingModeStoreMain extends React.Component {
  constructor(props) {
    super(props);
    // super.bind("storeSrcOnChange", "giveTimeOnChange");
    this.state = {
      storeSrcValue: 1,
      giveTimeValue: 1
    };
  }

  // storeSrcOnChange(e) {
  //   this.setState({ storeSrcValue: e.target.value });
  // }

  // giveTimeOnChange(e) {
  //   this.setState({ giveTimeValue: e.target.value });
  // }

  StoreSourceTypesOptions = [
    {
      label: '移动门店',
      value: '1'
    },
    {
      label: 'POS',
      value: '2'
    }
  ]

  render() {
    return (
        <Form.Item
            styleName="form-item"
            label="储值来源"
          >
          复选框+验证
        </Form.Item>
    );
  }
}
