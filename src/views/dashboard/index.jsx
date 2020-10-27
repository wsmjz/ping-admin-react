import React from "react";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
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
export class Dashboard extends React.Component {
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
    let options = {
      title: { text: '动态宽度' },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ["周一", "周二", "周三", "周四", "周五", "周六"]
      },
      yAxis: [ // 两个对象即两根y轴
        {
          type: 'value',
          inverse: false,
          name: '左边的',
          nameLocation: 'start',
          axisLine:{
            lineStyle:{color:'red',width:'3'}
          },
        },
        {
          type: 'value',
          // inverse: true
          name: '右边的',
          nameLocation: 'start',
          axisLabel: {
            formatter: '{value} W'
          },
          axisLine:{
            lineStyle:{color:'blue',width:'3'}
          },
          min: 0,
          max: 20*2, // 'dataMax'
          splitNumber: 4, // 注意：因为左边Y轴默认了分成几段，所以要把右边Y轴也分成几段
          interval: (20*2 - 0) / 6
        }
      ],
      series: [{ // 一系列
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }, {
        name: '业绩',
        type: 'line',
        data: [3, 20, 12, 9, 23, 27],
        smooth: true,
      }, {
        name: '爱好',
        type: 'line',
        data: [9, 3, 33, 12, 23, 37],
        smooth: true
      }]
    }
    // 绘制图表
    myChart.setOption(options);
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