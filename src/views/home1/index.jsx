import React from "react";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/src/chart/pie';
import { Button } from 'antd';
const datas = [
	{
		title: '营销',
		content: '营销内容',
		link: '#/newMarketingPlan/MRULE_FULL_CAPACITY',
		icon: '',
	},
	{
		title: '促销',
		content: '促销内容',
		link: '#/newMarketingPlan/MRULE_FULL_CAPACITY',
		icon: '',
	},
]
export class Home1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasOpenModel: false,
			condition: this.props.originCondition || {
				showMain: false,
			},
		};
	}
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
		// 绘制图表
		myChart.setOption({
			title: { text: '动态宽度' },
			tooltip: {},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}]
		});
	}
	menu = (index) => {
		return (
			<div>不跳转路由新建页面</div>
		)
	}
	// function menu(index) {}
	// render: function() {}
	render() {
		const userDefine = () => (
			<div>
				<Button
					type="primary"
					onClick={() => {
						this.setState({ showMain: true });
					}}
				>
					新页面
              </Button>
			</div>
		);
		return (
			<div>
				{
					this.state.showMain && (
						<div styleName="funcCard">
							{datas.map(item => (
								<div
									onClick={() => {
										window.location.href = item.link;
									}}
									key={item.title}
								>
									<div>
										<h2>{item.title}</h2>
										<p>{item.content}</p>
									</div>
								</div>
							))}
							<button onClick={() => {
								this.setState({ showMain: false });
							}}>返回</button>
						</div>
					)
				}
				{
					!this.state.showMain && (
						<div>
							{userDefine()}
							{this.menu()}
							<h1>首页内容</h1>
							<div id="main" style={{ width: 400, height: 400 }}></div>
						</div>
					)
				}		
			</div>
		)
	}
}