// 使用redux
// import { connect } from 'react-redux';
// import { a } from "../../actions/index";
import React from 'react';
// 引入各个独立的表单模块
// import InfoComponent from './../home/infoComponent/index';
// 根据参数 渲染不同子组件 子组件接受参数
// import marketingPlanComponents from '../home/factoryConfig';
// const marketingPlanType = this.props.marketingPlanInfo.get('planType');
// const marketingPlanChildComInfo = marketingPlanComponents[marketingPlanType];
export class Promo extends React.Component {
    render() {
        return (
            <h2>产品促销页面</h2>
            // [InfoComponent.BasicInfoBase]
        )
    }
}
export class A extends React.Component {
    render() {
        return (
            <h2>Reduce应用</h2>
        )
    }
}

// react-redux 提供了两个重要的对象，Provider和connect，
// 前者使React组件可被连接（connectable），
// 后者把 React 组件和 Redux 的 store 真正连接起来

// 被 connect 过的组件 就能访问state（redux） 中的数据
// export default connect(
//     (state, props) => {
//       return {
//         jumpToNewCoupon: state.commReducers.get('jumpToNewCoupon'),
//         crowdInfo: state.commReducers.get('crowdInfo'),
//         crowdLabelInfo: state.commReducers.get('crowdLabelInfo'),
//       };
//     },
//     {
//       getCrowdLabel: action.getCrowdLabel,
//       changeCrowdType: action.changeCrowdType,
//       changeComCrowdLabel: action.changeComCrowdLabel,
//       resetCrowdInfo: action.resetCrowdInfo,
//       getCrowdInfo: action.getCrowdInfo,
//     },
//   )(A);