// ./pages/comm/
// - actions
// - api
// - component
// - messages
// - reducers
// - consts 等等

// 多种营销方案card ========

// ./pages/marketing/components/ marketingPlan/newMarketPlanChoose/index.jsx(所有卡片) => ./marketingPlan/edit/index(读取配置，展示多少表单项)
// => ./planFactoryConfig(配置表单 子组件) => ./infoComponent(引入的所有子组件lable)
// ==> 每个子组件lable引入，结合🧍‍♂️antd 表单组件
// 处理 组件参数 传递到Tabcomponents


// 促销设置 选择人群 ========
// ./pages/comm/components/ crowdChoose/newCrowd/ componentFactory.jsx(配置信息)
import React from 'react';
import { connect } from 'react-redux';
// import { fromJS } from 'immutable';
import MarketingPlanLayout from './layout/marketing';
import marketingPlanComponents from './planConfig';
import {
  Tabs,
  Form
} from 'antd';

export class Asssa extends React.Component {
  createChildComponent = (childInfo, index) => {

    // const opType = this.props.marketingInfo.get('opType');
    const opType = 'opType'
    // const planState = this.props.marketingInfo.get('planState');
    const planState = 'planState'
    console.log(this.props.marketingInfo.toJS()) // 执行了3次
    return (
      <div key={index}>
        {childInfo.map((componentInfo, indexChild) =>
          this.createSingleEle({
            componentInfo,
            opType,
            planState,
            index,
            indexChild,
          }),
        )}
      </div>
    );
  };
  createTabChildComponent = (childInfo, index) => (
    <Tabs
      type="line"
      styleName="edit-tabs"
      key={index}
      onChange={e => this.setState({ activeKey: e })}
      activeKey={this.state.activeKey.toString()}
    >
      {childInfo &&
        childInfo.map((tabInfo, tabIndex) => {
          const TabComponentIns = tabInfo.tabComponent.component;
          const props = { form: this.props.form };
          if (tabInfo.tabComponent.initValueNames) {
            tabInfo.tabComponent.initValueNames.forEach(initValueName => {
              props[initValueName] = 'ssdw东方v'
            });
          }
          if (tabInfo.tabComponent.defaultProps) {
            // merge(props, tabInfo.tabComponent.defaultProps, props);
          }
          props.children = this.createChildComponent(
            tabInfo.children,
            `${index}_${tabIndex}`,
          );
          return TabComponentIns({
            ...props,
            key: tabIndex,
          });
        })}
    </Tabs>
  );
  createSingleEle = ({
    componentInfo,
    opType,
    planState,
    index,
    indexChild,
  }) => {

    const SingleComponent = componentInfo.component;
    const props = { form: this.props.form }; // 合并props
    if (componentInfo.props) {
      componentInfo.props.forEach(propsName => {
        props[propsName] = this.props[propsName];
      });
    }
    if (componentInfo.initValueNames) {
      // initValueNames = ['errorInfo', 'opType', 'rules', 'defaultRule']
      componentInfo.initValueNames.forEach(initValueName => {
        // 传递过来的选项规则
        // props[initValueName] = this.props.marketingInfo.get(initValueName);
        props[initValueName] = [];
      });
    }
    if (componentInfo.defaultProps) {
      // 合并的props 参数
      //   merge(props, componentInfo.defaultProps, props);
    }
    return (
      <SingleComponent
        planType={this.props.planType}
        readOnly={3 == 1}
        readOnlyAboutPuton={2 == 3}
        key={`${2}_${3}`}
        {...props}
        rules={[{ ruleForShop: 1 }]}
      />
    );
  };
  render() {
    const marketingPlanType = 'member'
    const marketingPlanComponent = marketingPlanComponents[marketingPlanType];
    return (
      <Form>
        <MarketingPlanLayout
          midTitle={marketingPlanComponent.midTitle}
        //   titleSrc={marketingPlanComponent.titleSrc}
        >
          {marketingPlanComponent.childrens.map((value, index) => {

            if (!value[0].tabComponent) {

              // 所有的props 在此方法中处理
              // const { errorInfo , readOnlyAboutPuton, rules, form, defaultRule, changeMarketingPlanInfo } = this.props;
              return this.createChildComponent(value, index);
            }
            // return this.createTabChildComponent(value, index);
            return (
              <div>
                组件二
              </div>
            )
          })}
        </MarketingPlanLayout>
      </Form>
    )
  }
}
// 导出 this.props 写了create 组件内才能拿到this.props
export default connect(
  state => ({
    // state.marketing 为./reducers 中的命名
    marketingInfo: state.marketing.get('marketingInfo'),
  }),
  {
    // recordFormError: actions.recordFormError,
  }
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      console.log(props, '数据11')
      console.log(changedFields, '数据22')
    }
  })(Asssa)
)
// export const Asss = Form.create({
//   onFieldsChange(props, changedFields) {
//     console.log(props, '数据11')
//     console.log(changedFields, '数据22')
//   }
// })(Asssa)