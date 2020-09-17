import React from 'react';
import { PromotionInfos } from './consts/typesDefine';
import { Row, Col } from 'antd';
import { Sidebar } from './../../components/sidebar';
// import PageHead from './../../components/pageHead'
// import { Nav } from './../../components/nav'
const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];
// class celue {
//   // 策略类 策略对象可提出公用 设计模式 函数式编程
// }
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.marketingPlanTypesArry = [];
    this.modalArry = [];
    PromotionInfos.forEach(value => {
      this.marketingPlanTypesArry.push({
        label: value.name,
        value: value.value,
      });
    });
    this.state = {
      hasOpenModel: false,
      condition: this.props.originCondition || {
        planStateList: undefined,
        name: undefined,
        showMain: false,
      },
    };
  }
  // search = condition => {
  //     const newCondition = {
  //         ...this.state.condition,
  //         ...condition,
  //     };
  //     this.setState({ condition: newCondition });
  //     this.getPromotionPageInfo(newCondition);
  // };
  // componentWillUnmount() {
  //     this.modalArry.forEach(modal => {
  //         if (modal && modal.destroy) {
  //             modal.destroy();
  //         }
  //     });
  // }
  render() {
    return (
      <div>
        {/* <Nav /> */}
        <Row>
          <Col span={6}>
            <Sidebar />
          </Col>
          <Col span={18}>
            {/* <PageHeader
              className="site-page-header"
              title="Title"
              breadcrumb={{ routes }}
              subTitle="This is a subtitle"
            /> */}
            
            {/* 嵌套路由容器---------------- */}
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}