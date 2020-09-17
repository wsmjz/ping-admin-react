// // 前后端数据上传，回显处理

// import KeyDictionary from "./keyDictionary";
// // import { fromJS } from 'immutable';
// // toJS() => immutable 中的方法
// const { MarketingPlanTypes } = KeyDictionary;
// const MarketingPlanExMaps = new Map([
//     [
//         MarketingPlanTypes.ENTER_MARKET, // 'EnterShopCoupon'
//         {
//           jsonToFeData: marketPlanInfo => ({
//             msgNoticeInfo: ExMsgNoticeInfo.jsonToFeData(marketPlanInfo.notifyDto),
//             couponChoose: ExCouponList.jsonToFeData(
//               marketPlanInfo.coupSetInfoDtoList,
//             ),
//             ...ExCryleTime.jsonToFeData(marketPlanInfo),
//             ...ExCommercialInfo.jsonToFeData(marketPlanInfo),
//           }),
//           feDataToJson: marketPlanInfo => ({
//             coupSetInfoDtoList: ExCouponList.feDataToJson(marketPlanInfo),
//             ...ExCommercialInfo.feDataToJson(marketPlanInfo),
//             ...ExCryleTime.feDataToJson(marketPlanInfo),
//           }),
//         },
//     ],
// ])
// // 营销方案前后端数据转换
// const ExMarketPlanInfo = {
//     feDataToJson(params) {
//         // params === Map
//         // marketPlanInfo = {
//         //     notifyDto: {},
//         //     onlyUseToday: false,
//         //     opType: "NEW"
//         // }

//         const marketPlanInfo = params.toJS();
//         // arketPlanInfo.planType = 'EnterShopCoupon'
//         const exchangeData = MarketingPlanExMaps.get(
//             marketPlanInfo.planType,
//           ).feDataToJson(marketPlanInfo);
//         const description = marketPlanInfo.planDesc
//             ? marketPlanInfo.planDesc.trim()
//             : null;
//             const res = {
//                 // 实际值
//       id: marketPlanInfo.id,
//       name: marketPlanInfo.name,
//       planState: marketPlanInfo.planState,
//       // 转换后的值
//       ...exchangeData,
//             }
//     }
// }
import ValueEx from './valueExchange'; // 数据转换
import { fromJS } from 'immutable';
const {
  ExCouponList,
  ExSettingPlan
} = ValueEx;

// 初始值
const MarketingPlanInfoInitValue = {
  hasLoad: false,
  id: 1
}
const ExMarketPlanInfo = {
  feDataToJson(params) {
    console.log(params)
    // 调用 MarketingPlanExMaps 中进行数据转换 返回约定的数据
    // const exchangeData = MarketingPlanExMaps.get(
    //   marketPlanInfo.planType,
    // ).feDataToJson(marketPlanInfo);
    // const res = {
    //   id: 1, 
    //   ...exchangeData
    // }
    // return res
  },
  jsonToFeData() {
    console.log(22)
  }
}
const MarketingPlanExMaps = new Map([
  // [
  //   MarketingPlanTypes.ENTER_MARKET,
  //   {
  //     jsonToFeData: marketPlanInfo => {
  //       const rulesInfo = ExSettingPlan.jsonToFeData(
  //         marketPlanInfo.marketPlanSettingRuleDtoList,
  //       );
  //       let rules = fromJS(rulesInfo.rules);
  //       rules = rules.map(value =>
  //         value
  //           .set('couponChoose', value.get('couponChoose').toJS())
  //           .set('planTime', value.get('planTime').toJS()),
  //       );
  //       return { rules, errorInfo: fromJS({ rules: rulesInfo.rulesError }) };
  //     },
  //     feDataToJson: marketPlanInfo => { // 3333
  //       console.log('marketPlanInfo',marketPlanInfo)
  //       return ({
  //         marketPlanSettingRuleDtoList: ExSettingPlan.feDataToJson(
  //           marketPlanInfo,
  //         ),
  //       })
  //     },
  //   },
  // ],
])
export default {
  MarketingPlanInfoInitValue,
  MarketingPlanExMaps,
  ExMarketPlanInfo
}