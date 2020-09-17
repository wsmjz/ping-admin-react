import React from 'react';
import { Form, Input, Radio } from 'antd';
// import { fromJS, toJS } from 'immutable';
// import { color } from 'echarts/lib/export';


const RadioGroup = Radio.Group;
export default class MoneyRange extends React.Component {
  changeValue(name, value) {
    console.log(name, value, '输入框')
  }
  render() {
    // const value = this.props.value.toJS() || '回填文本';
    const value = '回填文本';
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const { rangeMoney } = this.props;
    const fieldName = Number.isInteger(this.props.index)
      ? `rules.${this.props.index}.rangeMoney`
      : 'rangeMoney';
    console.log(getFieldsValue(['rangeMoney']).rangeMoney, '选种植')
    return (
      <div styleName="form-item-money" style={{ display: 'flex' }}>
        <Form.Item label={this.props.label}>
          {getFieldDecorator(fieldName, {
            initialValue: rangeMoney,
          })(
            <RadioGroup>
              <Radio value={0}>参与门店中只能在一个门店领取</Radio>
              <Radio value={1}>参与门店中所有门店都能重复领取</Radio>
            </RadioGroup>,
          )}
        </Form.Item>
        <div styleName="input">
          <Form.Item>
            <Input
              value={value.startValue}
              onChange={e => {
                this.changeValue('startValue', e.target.value);
              }}
              disabled={this.props.disabled}
              placeholder="请输入金额"
              addonAfter="元"
            />
          </Form.Item>
        </div>
        到
        <div styleName="input">
          <Form.Item>
            <Input
              placeholder="请输入金额"
              addonAfter="元"
            />
          </Form.Item>
        </div>
        <div styleName="noticeText">
          <h1 style={{ color: 'red' }}>表单项备注说明：</h1>取值区间大于等于最小值，小于最大值（最小值可为零，但不赠送优惠券）
        </div>
      </div>
    );
  }
}
