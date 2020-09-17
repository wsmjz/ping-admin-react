import React from "react";
import { Tag, Button, Form, Row, Col, Input } from "antd";
// import ComponentFactory from "./componentsFactory";
export class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.props1 = {
      filterCrowdLabels: [{
        name: '基本信息',
        status: 1,
        id: 1,
        children: [{
          status: 2,
          id: 2,
          name: '加入门店'
        }, {
          status: 3,
          id: 3,
          name: '会员等级'
        }]
      }, {
        name: '自定义信息',
        status: 1,
        id: 1,
        children: [{
          status: 2,
          id: 2,
          name: '储值门店'
        }, {
          status: 3,
          id: 3,
          name: '消费'
        }, {
          status: 4,
          id: 4,
          name: '会员'
        }]
      }]
    };
  }
  render() {
    return (
      <Form hideRequiredMark={true} styleName='main'>
        <div styleName="header">
          <h1>标题.动态表单</h1>
          <div styleName="btn">
            <Button htmlType="submit" type="primary" disabled="true">
              保存
                </Button>
          </div>
        </div>
        <Row styleName="body">
          <Col span={16}>
            这里 从缓存中渲染数据
                {/* {this.props1.filterCrowdLabels.map((value, fatherIndex) => {
                  return (
                    value.children.map((childValue, childIndex)=>{
                        return ComponentFactory.CreateComponent(
                            childValue,
                            childValue.id
                          );
                   })
                  )
                })} */}
          </Col>
          <Col span={8} styleName="crowdLabel">
            <h3 styleName="addLabelTitle">添加信息(加入缓存中)</h3>
            {
              this.props1.filterCrowdLabels.map((value, fatherIndex) => {
                return (
                  <div styleName="fatherLabel">
                    <h4 styleName="fatherLabelTitle">{value.name}</h4>
                    {
                      value.children.map((childValue, childIndex) => {
                        return (
                          <Tag disabled="false"
                            size="small"
                            value={childValue.id}
                            styleName={childValue.status ? "comTagLabel chooseTag" : "comTagLabel nochooseTag"}
                          >
                            {childValue.name}
                          </Tag>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </Col>
        </Row>
        {/* 统计 ============= */}
        <div styleName='caclTagNum'>
          <Input disabled
            value={
              `总共有  1000人`
            } />
          <Button onClick={this.calFilterCrowdInfo}>计算</Button>
        </div>
      </Form>
    );
  }
}