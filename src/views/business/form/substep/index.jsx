import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Radio } from 'antd';
import RightNav from "./rightNav";
import * as actions from '../../../../actions/coupon';
import './index.css';

const RadioGroup = Radio.Group;
class MemberRightPrice extends React.Component {
  saveForm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // 调用actions 中的方法
		    this.props.saveStepInfo(values)
      }
    });
  }
  render() {
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div>
          <h1>权益概览</h1>
          <p>简单表单数据</p>
          <Button
            type="primary"
            onClick={this.saveForm}
          >
            保存信息
				</Button>
        </div>
        <div className="content">
          <div>
            <Form>
              <Form.Item label='金额'>
                {getFieldDecorator('username', {
                  initialValue: '默认值',
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    addonAfter="元"
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item label='领券限制'>
                {getFieldDecorator('ifReady', {
                  initialValue: 1,
                  rules: [{ required: true, message: '请选择一个条件' }],
                })(
                  <RadioGroup>
                    <Radio value={0}>是</Radio>
                    <Radio value={1}>否</Radio>
                  </RadioGroup>
                )}
              </Form.Item>
              {/* <Form.Item label='领券限制'>
                {getFieldDecorator('ruleForShop', {
                  initialValue: ruleForShop,
                })(
                  <RadioGroup>
                    <Radio value={0}>是</Radio>
                    <Radio value={1}>否</Radio>
                  </RadioGroup>
                )}
              </Form.Item> */}
            </Form>
          </div>
            <p>回显数据：{this.props.couponInfoObj.toJS().username}</p>
          {/* styleName="right-nav" */}
          <div className="right-nav">
            <RightNav />
          </div>
        </div>
      </div>
    )
  }
}
/**
 * connect 的参数与多种写法。。。
 * @param {*} state 
 */

// const mapStateToProps = {
//     param: {
//         id: 'sdfdfds'
//     }
// }

const mapStateToProps = state => {
  return ({
    permissionCode: {
      id: 'sddw123sw'
    }
  });
}

// export default connect(
//   mapStateToProps,
//   null
// )(MemberRightPrice);
export default connect(
  state => ({
		couponInfoObj: state.coupon.get('couponInfoObj'),
	}),
	{
		saveStepInfo: actions.saveStepInfo
	}
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      console.log(props, '数据11')
      console.log(changedFields, '数据22')
    }
  })(MemberRightPrice)
);