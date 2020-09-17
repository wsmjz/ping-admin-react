// 错误提示
// 跳转页面
// 更新数据state store


import PlanInfo from "./../consts/formSubmitInfo";
import { fromJS } from 'immutable';
import { Utils } from './kryfe-lib';
const { createReducer } = Utils;
const initialState = fromJS({
  marketingPlanInfo: PlanInfo.MarketingPlanInfoInitValue,
  searchCondition: {
    pageSize: 1,
  },
  lastSearchCondition: {
    pageSize: 30,
  },
  couponInfo: '信息',
  couponInfoObj: {
    username: '张三'
  },
  couponInsFilter: '过滤选项',
  lastCouponInsFilter: '过滤选项2',
  checkCouponInfo: {},
});
const handlers = {
  saveStepInfo(state, {id, payload, messageInfo}) {
    // 错误提示
    // 跳转页面
    // 更新数据state store
    console.log('进入---saveStepInfo方法', state, {payload, id})
    return state
            .setIn(['couponInfoObj', 'username'], payload.username)
  },
  aa(state) {
    console.log('进入666', state)
  }
}
export default createReducer(initialState, handlers);


// import {  } from "./../../src/actions/coupon";
// function todoApp(state = 'SHOW_ALL', action) {
//   debugger
//   switch (action.type) {
//     case 'SET_VISIBILITY_FILTER':
//       return action.filter
//     default:
//       return [
//         ...state,
//         {
//           name: '张三'
//         }
//       ]
//   }
// }
// export default todoApp