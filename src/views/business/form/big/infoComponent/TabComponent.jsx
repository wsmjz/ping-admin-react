import React from "react";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;
export default class TabComponent extends React.Component {

  constructor(props) {
    super(props);
    // super.bind("onChange", "add", "remove");
    this.newTabIndex = 0;
    this.state = { activeKey: '1' };
  }

  onChange(activeKey) {
    this.setState({ activeKey });
  }

  noError = (index) => {
    // if(!this.props.errorInfo || !this.props.checkFormNames){
    //   return true;
    // }
    // const res = this.props.checkFormNames.every(value=>{
    //   if(this.props.errorInfo.get('rules') && 
    //         this.props.errorInfo.getIn(['rules', index, value])){
    //     return false;
    //   }
    //   return true;
    // })
    // return res;
    return false
  }

  createTabTitle(targetKey, title) {
    const noError = this.noError(targetKey - 1);
    if (targetKey === 1) {
      return <span style={{ color: noError ? "rgba(0,0,0,0.65)" : "#f04134" }}>规则{targetKey}</span>
    }
    return (<span style={{ color: noError ? "rgba(0,0,0,0.65)" : "#f04134" }}>
      规则{targetKey}
    </span>
    );
  }

  render() {
    // const rules = this.props.rules || [];
    // 主页面传过来的值
    const rules = ['几个元素', '就有几个标签', '比如这儿有3个']
    console.log(this.props, '传递的参数值22')
    return (
      <div styleName="main-tabs" ref='mainTables'>
        <Tabs
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="line"
          size='small'
          styleName='tabs'
        >
          {
            rules.map((value, index) => {
              return (
                <TabPane forceRender={true}
                  tab={this.createTabTitle(index + 1)} key={index + 1}>
                  {
                    this.props.childComponents &&
                    this.props.childComponents.map((Component, childIndex) => {
                      let childProps = {};
                      if (this.props.childProps && this.props.childProps[childIndex]) {
                        childProps = this.props.childProps[childIndex]
                      }
                      if (this.props.childComponentsInitValuName &&
                        this.props.childComponentsInitValuName[childIndex]) {
                        this.props.childComponentsInitValuName[childIndex].map(initName => {
                          // childProps[initName] = value.get(initName);
                          childProps[initName] = "标志";
                          return '' // Expected to return a value in arrow function; map必须返回一个值 可用forEach 代替
                        })
                      }
                      childProps.rangeMoney = 0
                      // childProps 为label 与 childComponentsInitValuName 下的字段集合
                      // 组件的所有选项在此传入****
                      return <Component
                        {...childProps} readOnly={this.props.readOnlyAboutPuton}
                        readOnlyAboutPuton={this.props.readOnlyAboutPuton}
                        rules={this.props.rules}
                        form={this.props.form} index={index} key={`${index}_${childIndex}`} />
                    })
                  }
                </TabPane>
              )
            })
          }
        </Tabs>
      </div>
    );
  }
}
