import commConst from 'shared/consts/commConst.js';
import { fromJS } from 'immutable';

// 该文件主要用于各种状态的定义和转换关系函数

// 优惠券实例的状态
const COU_INS_NO_USE = 'Unused';
const COU_INS_HAS_CHECKED = 'Checked';
const COU_INS_OUT_OF_DATA = 'Expired';
const COU_INS_INVALID = 'Obsolete';

const couponInsState = new Map([
  [COU_INS_NO_USE, { value: '未使用', index: COU_INS_NO_USE }],
  [COU_INS_HAS_CHECKED, { value: '已验证', index: COU_INS_HAS_CHECKED }],
  [COU_INS_INVALID, { value: '已作废', index: COU_INS_INVALID }],
  [COU_INS_OUT_OF_DATA, { value: '已过期', index: COU_INS_OUT_OF_DATA }],
]);

// 营销方案操作类型
const MarketingPlanOpTypes = {
  NEW: 'NEW',
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  PUT_ON: 'PUT_ON',
  COPY: 'COPY',
  ABORT: 'ABORT',
  DELETE: 'DELETE',
  EFFECT: 'EFFECT',
  PUASE: 'PUASE',
};

// 营销方案状态类型
const MarketingPlanStatus = {
  NEW: 'New',
  HAS_PUT_ON: 'Working',
  PUASE: 'Suspend',
  FINISHED: 'Completed',
  ABORT: 'HandEnd',
};

// 营销方案类型
const MarketingPlanTypes = {
  NEW_MEMBER_MARKET: 'NewMemberRecruit',
  LEVEL_UP_MARKET: 'MemberUpgradeCoupon',
  EXACT_MARKET: 'PrecisionMarketing',
  FULL_ON_MARKET: 'ConsumeMeetValueCoupon',
  STORE_MARKET: 'StoredMoneyCoupon',
  BIRTHDAY_MARKET: 'BirthdayMarketing',
  LOTTERY__MARKET: 'LotteryMarketing',
  BOOKING_MARKET: 'BookMarketing',
  QUEUE_MARKET: 'LineUpMarketing',
  SINGLE_COMMODITY_MARKET: 'SingleGoodsMarketing',
  LOT_OF_COMMODITY_MARKET: 'MoreGoodsMarketing',
  CARE_MARKET: 'CareInformationPush',
  SHARE_MARKET: 'ShareMarketing',
  ENTER_MARKET: 'EnterShopCoupon',
  COMMENT_MARKET: 'GradeCoupon',
  PAY_MARKET: 'PaymentCoupon',
  CUSTOMER_TIMES_MARKET: 'FrequencyMarketing',
  CUSTOMER_MONEY_MARKET: 'CONSUME_TOTAL_VALUE_COUPON',
};

// 优惠类型定义
const PreferentialTypes = {
  PRICE: 'CASH',
  DISCOUNT: 'DISCOUNT',
};

// 使用时段类型定义
const CanUseTimePicker = {
  NO_LIMIT: false,
  LIMIT: true,
};

// 预订频次类型定义
const BookRateTypes = {
  UnLimit: 'UnLimit',
  First: 'First',
  Second: 'Second',
  Third: 'Third',
  Fourth: 'Fourth',
};

// 预订来源类型定义
const BookSourceTypes = {
  UnLimit: 'UnLimit',
  Weixin: 'Weixin',
  Nuomi: 'Nuomi',
};

// 排队来源
const QueueSourceType = {
  UnLimit: 'UNLIMITED',
  Weixin: 'WECHAT',
};

// 分享营销入口展示类型
const ShareEntryTypes = {
  Portal: 'Portal',
  QrCode: 'QrCode',
};

// 抽奖营销抽奖形式
const LotteryModeTypes = {
  Guagua: 'GUAGUAKA',
  Zhuanpan: 'DAZHUANPAN',
};

// 消费类型
const OrderTypes = {
  All: 'All',
  InRestaurant: 'InRestaurant',
  TakeAway: 'TakeAway',
};

// 支付方式
const PayTypes = {
  All: 'All',
  StoreCustome: 'StoreCustome',
  NotStoreCustome: 'NotStoreCustome',
};

// 订单来源
const OrderSourcesTypes = {
  All: 'All',
  WECHAT: 'WECHAT',
  Pos: 'Pos',
};

// 储值来源
const StoreSourceTypes = {
  NO_LIMIT: '0',
  WECHAT: '1',
  Pos: '2',
};

// 赠送时间
const SendTimeTypes = {
  Now: 'Now',
  NextDay: 'NextDay',
};

// 试用人群类型
const UseCrowdTypes = {
  ALL: 'ALL',
  MEMBER: 'MEMBER',
  CUSTOMER: 'CUSTOMER',
};

// 成为会员方式
const BeCustomerWays = {
  NO_LIMIT: 'NO_LIMIT',
  BY_PHONE: 'BY_PHONE',
  BY_INFO: 'BY_INFO',
  BY_ATTENTION: 'BY_ATTENTION',
  BY_SCAN: 'BY_SCAN',
  BY_BOUGHT: 'BY_BOUGHT',
};

// 抽奖奖品设置的初始值
const LotteryInitValue = fromJS({
  name: {
    value: null,
    error: '请输入奖品名称',
  },
  prizeNum: {
    value: null,
    error: '请输入奖品数量',
  },
  couponId: {
    value: null,
    error: '请选择优惠券',
  },
  eachNum: {
    value: 1,
    error: null,
  },
  changce: {
    value: 0,
    error: null,
  },
});

// 规则科目
const RulesTypes = {
  OnceFullNum: '11',
  OnceFullMoney: '12',
  BindCombo: '13',
  SinglePrice: '21',
  TotalFullNum: '31',
  TotalFullMoney: '32',
  TotalFullTimes: '33',
};

// 策略科目
const FullNumPromotionTypes = {
  CashDiscount: '11',
  GivenDishs: '12',
  NextOff: '13',
  SinglePrice: '14',
  ComboDiscount: '15',
  SingleDiscount: '16',
  AddMoneyBought: '17',
  GivenCoupon: '21',
};

// 策略细则
const FullPreferentialTypes = {
  CashPreferentialMoney: '111',
  CashPreferentialSub: '112',
  CashPreferentialLess: '113',
  CashPreferentialDiscount: '114',
  CashPreferentialGiven: '115',
  FullMoneyGiveShop: '121',
  NextPreferentialMoney: '131',
  NextPreferentialSub: '132',
  NextPreferentialDiscount: '133',
  SinglePriceEqual: '141',
  SinglePriceSub: '142',
  SinglePriceDiscount: '143',
  SinglePriceAdd: '144',
  FullNumFixedPrice: '151',
  FullNumSub: '152',
  FullNumSubLess: '153',
  FullNumDiscount: '154',
  UnionPrice: '161',
  UnionSub: '162',
  UnionDiscount: '163',
  AddMoneyBought: '171',
  GivenCoupon: '211',
};

const MarketingPlanTypesMaps = new Map([
  [
    MarketingPlanTypes.NEW_MEMBER_MARKET,
    {
      name: false ? 'New Member' : '新会员招募',
      value: MarketingPlanTypes.NEW_MEMBER_MARKET,
    },
  ],
  [
    MarketingPlanTypes.LEVEL_UP_MARKET,
    {
      name: false ? 'Upg. Voucher' : '会员升级赠券',
      value: MarketingPlanTypes.LEVEL_UP_MARKET,
    },
  ],
  [
    MarketingPlanTypes.EXACT_MARKET,
    {
      name: false ? 'Marketing' : '精准营销',
      value: MarketingPlanTypes.EXACT_MARKET,
    },
  ],
  [
    MarketingPlanTypes.FULL_ON_MARKET,
    {
      name: false
        ? 'Coupon based on sum of consumption'
        : '消费满额赠券',
      value: MarketingPlanTypes.FULL_ON_MARKET,
    },
  ],
  [
    MarketingPlanTypes.STORE_MARKET,
    {
      name: false ? 'Coupon based on stored value' : '储值赠券',
      value: MarketingPlanTypes.STORE_MARKET,
    },
  ],
  [
    MarketingPlanTypes.BIRTHDAY_MARKET,
    {
      name: false ? 'Birthday Mktg' : '生日营销',
      value: MarketingPlanTypes.BIRTHDAY_MARKET,
    },
  ],
  [
    MarketingPlanTypes.LOTTERY__MARKET,
    {
      name: false ? 'Sweepstakes' : '抽奖活动',
      value: MarketingPlanTypes.LOTTERY__MARKET,
    },
  ],
  [
    MarketingPlanTypes.BOOKING_MARKET,
    {
      name: false ? 'Booking Mktg' : '预订营销',
      value: MarketingPlanTypes.BOOKING_MARKET,
    },
  ],
  [
    MarketingPlanTypes.QUEUE_MARKET,
    {
      name: false ? 'Queue Mktg' : '排队营销',
      value: MarketingPlanTypes.QUEUE_MARKET,
    },
  ],
  [
    MarketingPlanTypes.SINGLE_COMMODITY_MARKET,
    {
      name: false ? 'New Promo' : '新品推广',
      value: MarketingPlanTypes.SINGLE_COMMODITY_MARKET,
    },
  ],
  [
    MarketingPlanTypes.LOT_OF_COMMODITY_MARKET,
    {
      name: false ? 'Limited Time' : '限时特价',
      value: MarketingPlanTypes.LOT_OF_COMMODITY_MARKET,
    },
  ],
  [
    MarketingPlanTypes.CARE_MARKET,
    {
      name: false ? 'Info Push' : '关怀信息推送',
      value: MarketingPlanTypes.CARE_MARKET,
    },
  ],
  [
    MarketingPlanTypes.SHARE_MARKET,
    {
      name: false ? 'Share Mktg' : '分享营销',
      value: MarketingPlanTypes.SHARE_MARKET,
    },
  ],
  [
    MarketingPlanTypes.ENTER_MARKET,
    {
      name: false ? 'Get Voucher' : '进店领券',
      value: MarketingPlanTypes.ENTER_MARKET,
    },
  ],
  [
    MarketingPlanTypes.COMMENT_MARKET,
    {
      name: false ? 'Review Voucher' : '评分赠券',
      value: MarketingPlanTypes.COMMENT_MARKET,
    },
  ],
  [
    MarketingPlanTypes.PAY_MARKET,
    {
      name: false ? 'Payment Thanks' : '支付有礼',
      value: MarketingPlanTypes.PAY_MARKET,
    },
  ],
  [
    MarketingPlanTypes.CUSTOMER_TIMES_MARKET,
    {
      name: false ? 'Frequency spend benefits' : '消费频次激励',
      value: MarketingPlanTypes.CUSTOMER_TIMES_MARKET,
    },
  ],
  [
    MarketingPlanTypes.CUSTOMER_MONEY_MARKET,
    {
      name: false ? 'Total spend benefits' : '消费总金额激励',
      value: MarketingPlanTypes.CUSTOMER_MONEY_MARKET,
    },
  ],
]);
const MarketingPlanStatusMaps = new Map([
  [
    MarketingPlanStatus.NEW,
    {
      label: false ? 'Waiting' : '未投放',
      value: MarketingPlanStatus.NEW,
    },
  ],
  [
    MarketingPlanStatus.HAS_PUT_ON,
    {
      label: false ? 'Applying' : '执行中',
      value: MarketingPlanStatus.HAS_PUT_ON,
    },
  ],
  [
    MarketingPlanStatus.FINISHED,
    {
      label: false ? 'Done' : '已结束',
      value: MarketingPlanStatus.FINISHED,
    },
  ],
  [
    MarketingPlanStatus.PUASE,
    {
      label: false ? 'Paused' : '已暂停',
      value: MarketingPlanStatus.PUASE,
    },
  ],
  [
    MarketingPlanStatus.ABORT,
    {
      label: false ? 'Aborted' : '已中止',
      value: MarketingPlanStatus.ABORT,
    },
  ],
]);

export default {
  PRICE_CARD: commConst.PRICE_CARD,
  DISCOUNT_CARD: commConst.DISCOUNT_CARD,
  GIFT_CARD: commConst.GIFT_CARD,
  couponInsState,
  couponInsStateArr: [...couponInsState.values()],
  COU_INS_NO_USE,
  COU_INS_HAS_CHECKED,
  COU_INS_OUT_OF_DATA,
  COU_INS_INVALID,
  MarketingPlanOpTypes,
  MarketingPlanTypes,
  MarketingPlanStatus,
  MarketingPlanStatusMaps,
  PreferentialTypes,
  CanUseTimePicker,
  MarketingPlanTypesMaps,
  BookRateTypes,
  BookSourceTypes,
  QueueSourceType,
  ShareEntryTypes,
  LotteryModeTypes,
  OrderTypes,
  PayTypes,
  OrderSourcesTypes,
  StoreSourceTypes,
  SendTimeTypes,
  UseCrowdTypes,
  BeCustomerWays,
  LotteryInitValue,
  RulesTypes,
  FullNumPromotionTypes,
  FullPreferentialTypes,
};
