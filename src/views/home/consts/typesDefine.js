/*
 * @Author: zhoujuntao
 * @Date: 2020-02-11 11:13:31
 * @LastEditTime: 2020-03-13 13:56:15
 * @LastEditors: Please set LastEditors
 * @Description: 标签
 * @FilePath: /loyalty-ui/src/pages/promotion/consts/typesDefine.js
 */
import translate from './translate';

const PromotionTypes = {
  BroughtGivePromotion: 'MRULE_BOUGHT_GIFT',
  FreeFeedOnly: 'MRULE_LIMITED_REINFORCED',
  BindingSoldingPromotion: 'MRULE_BUNDLED_SALES',
};

const PromotionInfos = new Map([
  [
    PromotionTypes.BroughtGivePromotion,
    {
      name: translate.GiftPromotions,
      value: PromotionTypes.BroughtGivePromotion,
    },
  ],
  [
    PromotionTypes.FreeFeedOnly,
    {
      // name: '限免加料'
      name: translate.FreeFeedOnly,
      value: PromotionTypes.FreeFeedOnly,
    },
  ],
  [
    PromotionTypes.BindingSoldingPromotion,
    {
      // name: '捆绑促销',
      name: translate.BindingSoldingPromotion,
      value: PromotionTypes.BindingSoldingPromotion,
    },
  ]
]);

export { PromotionTypes, PromotionInfos };
