// 统一配置  每个模块下的组件
import keyDictionary from '../.././../consts/keyDictionary';
import InfoComponent from './infoComponent';
import translate from './consts/translate';

export default {
  [keyDictionary.MarketingPlanTypes.NEW_MEMBER_MARKET]: {
    titleName: keyDictionary.MarketingPlanTypesMaps.get(
      keyDictionary.MarketingPlanTypes.NEW_MEMBER_MARKET,
    ).name,
    midTitle: ['基本信息', '营销方式', '消息通知'],
    childrens: [ // 统一配置  每个模块下的组件
      [
        InfoComponent.BasicInfoBase,
        InfoComponent.BasicInfoBrandMember,
      ],
      [InfoComponent.MarketingModeCoupon],
      [InfoComponent.MsgSend],
    ],
    msgNoticeInfo: true,
  },
  [keyDictionary.MarketingPlanTypes.LEVEL_UP_MARKET]: {
    titleName: keyDictionary.MarketingPlanTypesMaps.get(
      keyDictionary.MarketingPlanTypes.LEVEL_UP_MARKET,
    ).name,
    titleSrc: [
      null,
      '(触发发券，营销方案发布后，一旦有符合条件的目标人群出现，系统会立即发券)',
    ],
    midTitle: ['基本信息', '营销方式', '消息通知'],
    childrens: [
      [InfoComponent.BasicInfoBase, InfoComponent.BasicInfoTime],
      [InfoComponent.MarketingModeUpgrade],
      [
        {
          ...InfoComponent.BasicInfoPlanName,
          defaultProps: {
            formCol: {
              labelCol: { span: 4 },
              wrapperCol: { span: 20 },
            },
          },
        },
      ],
    ],
    describeEle: `<span>(${
      translate.SingleItem
    })</span><span style="color:red;margin-left:30px;">${
      translate.CertainSpendingAmount
    }</span>`,
    needCrowdId: true,
    msgNoticeInfo: true,
    beforeSave() {

    }
  }
};
