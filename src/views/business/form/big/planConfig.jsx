// 管理配置：
// 1）引入所有 表单Item文件 ./infoComponent
// 2)面包屑导航，及备注信息；
// 3)每一栏需求信息配置
import InfoComponent from './infoComponent';
export default {
  member: {  // 会员页面配置
    titleName: '主标题1',
    describeEle: `<span>(多商品营销)</span><span style="color:red;margin-left:30px;">${
      '面包屑备注信息'
    }</span>`,
    midTitle: ['基本信息', '拓展信息', '自动通知'],
    childrens: [
      [
        InfoComponent.MarketingModeStore,
        InfoComponent.MarketingModeCoupon,
      ],
      [InfoComponent.MarketingModeStore],
      [InfoComponent.MarketingModeCoupon],
    ],
    msgNoticeInfo: true,
  },
  mark: { // 营销页面配置
    
  }
}