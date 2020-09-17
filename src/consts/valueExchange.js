// 数据转换 统一处理============

// 营销方案把优惠券进行转换
const ExCouponList = {
    feDataToJson(marketPlanInfo) {
      return marketPlanInfo.couponChoose.map(value => ({
        couponId: value.id,
        eachNum: value.eachNum,
      }));
    },
    jsonToFeData(couponSet) {
      return (
        couponSet &&
        couponSet.map(value => ({
          ...value,
          id: value.couponId,
          ruleId: value.id,
        }))
      );
    },
  };
const ExSettingPlan = {
    name: '我靠'
}
export default {
    ExCouponList,
    ExSettingPlan
}