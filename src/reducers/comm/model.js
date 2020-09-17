const MarketingPlanStatus = {
  NEW: 'New',
  HAS_PUT_ON: 'HAS_PUT_ON',
  PUASE: 'PUASE',
  FINISHED: 'FINISHED',
  END: 'END'
};

const CrowdTypes = {
  COMM_CROWD: 'Commons',
  FILTER_CROWD: 'Condition',
  APPOINTED_CROWD: 'Customized'
};

const CrowdTypesName = {
  [CrowdTypes.COMM_CROWD]: 'crowdComInfo',
  [CrowdTypes.FILTER_CROWD]: 'crowdFilterInfo',
  [CrowdTypes.APPOINTED_CROWD]: 'crowdAppointedInfo'  
};

const MsgNoticeWayTypes = {
  ONLY_MSG: 'SHORT_MESSAGE',
  ONLY_WX: 'WECHAT',
  MSG_WX: 'SHORT_MESSAGE_WECHAT'
  // SMART_SEND: 'SMART_SEND'
};

const sendMsgWayArry = [
  { value: '只短信', index: MsgNoticeWayTypes.ONLY_MSG },
  { value: '只微信', index: MsgNoticeWayTypes.ONLY_WX },
  { value: '微信+短信', index: MsgNoticeWayTypes.MSG_WX }
]

const sendMsgWayMap = new Map([
  [MsgNoticeWayTypes.ONLY_MSG, sendMsgWayArry[0]],
  [MsgNoticeWayTypes.ONLY_WX, sendMsgWayArry[1]],
  [MsgNoticeWayTypes.MSG_WX, sendMsgWayArry[2]]
  // 暂时不使用，后续可能会加入智能发送
  // [MsgNoticeWayTypes.SMART_SEND, { value: '智能发送', index: MsgNoticeWayTypes.SMART_SEND }]  
]);

// 通知类型
const sendMsgType = {
  SEND_TEMPLATE: 'loyal_send',
  CHECK_TEMPLATE: 'loyal_validate',
  EXPIRED_TEMPLATE: 'loyal_expired',
  ADMSG_TEMPLATE: 'loyal_adMsg',
};

export default {
  MarketingPlanStatus,
  CrowdTypes,
  CrowdTypesName,
  MsgNoticeWayTypes,
  sendMsgType,
  sendMsgWayMap,
  sendMsgWayArry
};
