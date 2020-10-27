// 所有表单lable项管理
// 配置 labelName，
import MarketingModeStore from './MarketingModeStore'; // 储值区间
import MarketingModeCoupon from './MarketingModeCoupon'; // 请选择优惠券


export default {
  MarketingModeStore: {
    component: MarketingModeStore,
    props: ['changeMarketingPlanInfo'],
    initValueNames: ['errorInfo', 'opType', 'rules', 'defaultRule'],
    defaultProps: []
  },
  MarketingModeCoupon: {
    component: MarketingModeCoupon,
    initValueNames: ['couponChoose', 'opType'],
  },
  // BasicInfoBrandMember: {
  //   component: props => <BasicInfoBrand labelName="标题" {...props} />,
  //   initValueNames: ['joinedCommercials', 'opType'],
  // },
}