// MarketingModeCustomfull 模式自定义容器
import React from "react";
import TabComponent from "./TabComponent";
import MoneyRange from './MoneyRange';
import MarketingModeStoreMain from "./MarketingModeStoreMain";
import MarketingModeCoupon from "./MarketingModeCoupon";

export default class MarketingModeStore extends React.Component {

  render() {
    const {readOnlyAboutPuton, form, rules } = this.props;
    console.log(this.props, '表单想22222')
    // const allRangeMoney = rules.map(value=> value.get('rangeMoney'));
    // const rulesError = errorInfo.get('rules');
    // const rangeMoneyErrorInfo = rulesError && rulesError.map(value=> value&&value.get('rangeMoney'));
    return (
      <TabComponent 
        childComponents = {[MoneyRange , MarketingModeStoreMain , MarketingModeCoupon]}
        childProps = {[{label: '储值区间' }, {label: '储值来源' }, {label: '选择优惠券' }]}
        childComponentsInitValuName = {[
          ['rangeMoney', 'flag'],['storeSource'],['couponChoose']
        ]}
        readOnlyAboutPuton={readOnlyAboutPuton}
        form={form}
        rules={rules}
        >
      </TabComponent>
    );
  }
}
