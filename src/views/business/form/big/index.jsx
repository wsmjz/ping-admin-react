import React from "react";
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import Asss from "./main";
// import * as actions from '../../../../actions/coupon';
import { saveStepInfo } from '../../../../actions/coupon';
import { saveMarketingPlanSetting } from '../../../../actions/marketing';
// console.log(store.getState(), 'state初始状态')
// import {Test} from "./test";
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};
// const Demo = () => {
// 	const onFinish = values => {
// 		console.log('Success:', values);
// 	};

// 	const onFinishFailed = errorInfo => {
// 		console.log('Failed:', errorInfo);
// 	};

// 	return (
// 		<Form
// 			{...layout}
// 			name="basic"
// 			initialValues={{
// 				remember: true,
// 			}}
// 			onFinish={onFinish}
// 			onFinishFailed={onFinishFailed}
// 		>
// 			<Form.Item
// 				label="Username"
// 				name="username"
// 				rules={[
// 					{
// 						required: true,
// 						message: 'Please input your username!',
// 					},
// 				]}
// 			>
// 				<Input />
// 			</Form.Item>

// 			<Form.Item
// 				label="Password"
// 				name="password"
// 				rules={[
// 					{
// 						required: true,
// 						message: 'Please input your password!',
// 					},
// 				]}
// 			>
// 				<Input.Password />
// 			</Form.Item>

// 			<Form.Item {...tailLayout} name="remember" valuePropName="checked">
// 				<Checkbox>Remember me</Checkbox>
// 			</Form.Item>

// 			<Form.Item {...tailLayout}>
// 				<Button type="primary" htmlType="submit">
// 					Submit
//           </Button>
// 			</Form.Item>
// 		</Form>
// 	);
// };
class BigForm extends React.Component {
	constructor(props) {
		super(props)
	}
	saveMarketPlan = () => {
		// 调用actions 中的方法
		this.props.saveMarketingPlanSetting(22)
		// this.props.getMarketingPlanPageInfo(1, true); // redux中的方法
	}
	render() {
		return (
			<div>
				<h1>大表单提交</h1>
				<p>断点续传，分片上传，表单回显，与编辑，自定义表单添加，formData 不同格式，配置表单</p>
				<h2>优惠券-redux中的数据: {this.props.couponInfo}</h2>
				<h2>营销-redux中的数据: {this.props.marketingInfo.toJS().opType}</h2>
				<Button
					type="primary"
					onClick={this.saveMarketPlan}
				>
					保存
				</Button>
				<div className="form">
					{/* <Demo></Demo> */}
					<Asss></Asss>
					{/* <Test></Test> */}
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({
		couponInfo: state.coupon.get('couponInfo'),
		marketingInfo: state.marketing.get('marketingInfo'),
	}),
	{
		saveStepInfo: saveStepInfo,
		saveMarketingPlanSetting: saveMarketingPlanSetting,
	}
)(BigForm)