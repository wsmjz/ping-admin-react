// 创建createReducer

// const reducer = (state = {count: 0}, action) => {
//   switch (action.type){
//     case 'INCREASE': return {count: state.count + 1};
//     case 'DECREASE': return {count: state.count - 1};
//     default: return state;
//   }
// }

// const actions = {
//   increase: () => ({type: 'INCREASE'}),
//   decrease: () => ({type: 'DECREASE'})
// }

// const store = createStore(reducer);

// store.subscribe(() =>
//   console.log(store.getState())
// );

// store.dispatch(actions.increase()) // {count: 1}
// store.dispatch(actions.increase()) // {count: 2}
// store.dispatch(actions.increase()) // {count: 3}
import { fromJS } from 'immutable';
import { Utils } from 'kryfe-lib';
import { message } from 'antd';
import actionTypes from '../actionTypes';
import commVariable from '../variable';
import ComModel from '../model';
import { ExFilterCrowdData } from '../func';
import { chainChangeMap, checkNoticeForm } from '../msgNoticeCheck';
import { checkCommCrowd, checkFilterCrowd, checkAppointedCrowd, changeCrowdTypeAction } from './crowdCheck';

const { createReducer } = Utils;
const FailedGetPeopleTag = isENLanguage ? 'Failed to get common people tag' : '获取常用人群标签失败'
const PlsSelectStore = isENLanguage ? 'Pls select store' : '请选择门店'
const initCrowdInfo = {
  type: ComModel.CrowdTypes.COMM_CROWD,
  tagNumber: 0,
  crowdComInfo: {},
  crowdFilterInfo: {
    tagInfo: {}
  },
  crowdAppointedInfo: {
    tagInfo: []
  },
  errorMsg: isENLanguage ? 'Pls select a label' : '请选择常用人群标签'
};

const initMsgNoticeInfo = {
  autoSwitch: false,
  noticeWayType: ComModel.MsgNoticeWayTypes.ONLY_MSG,
  sendMsgCommericalInfo: null,
  msgSendSwitch: true,
  msgSendTemplate: {},
  msgCheckSwitch: true,
  msgCheckedTemplate: {},
  msgOutOfDataSwitch: true,
  msgOutOfDataTemplate: {},
  beforeDataNotice: 1,
  wxSendSwitch: true,
  wxOutOfDataSwitch: true,
  msgNotice: null,
  leftMsgNumVaild: PlsSelectStore,
  wxNotice: null
};

const initialState = fromJS({
  searchCondition: {
    pageSize: commVariable.COUPON_PAGE_SIZE
  },
  lastSearchCondition: {
    pageSize: commVariable.COUPON_PAGE_SIZE
  },
  crowdInfo: initCrowdInfo,
  filterCrowdLabels: [],
  msgNoticeInfo: initMsgNoticeInfo,
  memberPageInfos: {
  },
  defaultMsgCheckTemplate: {},
  defaultMsgOutOfDateTemplate: {},
  commercialSmsLeftCount: [],
  currentEditSmsTemplateInfo: {},
  maxCouponVaildDate: 10,
  memberSearchCondition: {},
  lastMemberSearchCondition: {},
  needResetId: false,
  couponPageInfo: {
    pageSize: commVariable.COUPON_PAGE_SIZE,
    currentPage: 1,
    totalRows: 0,
    items: []
  }
});

function errorHandler(error, msg, state) {
  message.destroy();
  message.error(msg);
  return state;
}

const handlers = {
  // coupon
  [actionTypes.COM_GET_COUPON_LIST](state, { payload, error, useCurrentCondition }) {
    if (!error) {
      let res = state.set('couponPageInfo', fromJS(payload.body));
      if (useCurrentCondition) {
        res = res.set('lastSearchCondition', res.get('searchCondition'));
      }
      return res;
    }
    message.error('获取优惠券列表信息失败');
    return state;
  },
  [actionTypes.COM_CHANGE_SEARCH_CONDITION_VALUE](state, { keyValues }) {
    let res = state;
    if (Array.isArray(keyValues)) {
      keyValues.forEach((value) => {
        res = res.setIn(['searchCondition', value.name], value.value);
      });
    }
    return res;
  },
  [actionTypes.COM_CLEAR_SEARCH_CONDITION_VALUE](state, { pageSize }) {
    return state.set('searchCondition', fromJS({ pageSize }));
  },
  // crowd  
  [actionTypes.GET_CROWD_LABEL](state, { payload, error }) {
    if (error) {
      message.error(FailedGetPeopleTag);
      return state;
    }
    return state.set('crowdLabelInfo', fromJS(payload.body.map(value => ({
      tagId: value.id,
      tagName: value.name
    }))));
  },
  [actionTypes.GET_MEMBER_INFO](state, { payload, error }) {
    if (error) {
      message.error('获取会员信息失败');
      return state;
    }
    return state.set('memberPageInfos', fromJS(payload.body));
  },
  [actionTypes.CHANGE_CROWD_CONDITION](state, { name, value }) {
    return state
      .setIn(['memberSearchCondition', name], value)
      .setIn(['lastMemberSearchCondition', name], value);
  },
  [actionTypes.CHANGE_MEMBER](state, { memberInfo, payload, error }) {
    if (error) {
      message.error('保存指定人群失败');
    }
    const res = state.setIn(['crowdInfo', 'tagNumber'], payload.body.customerNum)
              .setIn(['crowdInfo', 'crowdAppointedInfo', 'tagId'], payload.body.id)
              .setIn(['crowdInfo', 'crowdAppointedInfo', 'tagInfo'], fromJS(memberInfo))
              .setIn(['crowdInfo', 'crowdAppointedInfo', 'tagNumber'], payload.body.customerNum);
    return checkAppointedCrowd(res);
  },
  [actionTypes.GET_APPOINTED_TAG_INFO](state, { payload, error }) {
    if (error) {
      message.error('获取指定人群信息失败');
    }
    return state.setIn(['crowdInfo', 'crowdAppointedInfo', 'tagInfo'], fromJS(payload.body.tagCustomers));
  },
  [actionTypes.GET_FILTER_CROWD_LABELS](state, { payload, error }) {
    if (error) {
      message.error('获取筛选人群标签列表失败');
      return state;
    }
    const childIdIndex = {};
    const filterCrowdLabels = payload.body.map((value, index) => {
      const copyValue = value;
      childIdIndex[value.id] = [index];
      if (copyValue.dictItems && Array.isArray(copyValue.dictItems)) {
        copyValue.dictItems = copyValue.dictItems.map(dictItem => ({
          ...dictItem,
          label: dictItem.name,
          value: dictItem.id.toString()
        }));
      }
      return {
        ...copyValue,
        children: value.children && value.children.map((childValue, childIndex) => {
          childIdIndex[childValue.id] = [index, childIndex];
          return {
            ...childValue,
            id: childValue.id.toString(),
            dictItems: childValue.dictItems && childValue.dictItems.map(dictItem => ({
              ...dictItem,
              label: dictItem.name,
              value: dictItem.id.toString()
            })),
            canDelete: true
          };
        }) };
    });
    return state.set('filterCrowdLabels', fromJS(filterCrowdLabels))
                  .set('childIdIndex', childIdIndex);
  },
  [actionTypes.ADD_FILTER_CROWD_LABELS](state, { fatherIndex, childIndex }) {
    return state.setIn(['filterCrowdLabels', fatherIndex, 'children', childIndex, 'status'], true);
  },
  [actionTypes.DEL_FILTER_CROWD_LABELS](state, { fatherIndex, childIndex }) {
    const labelInfo = state.getIn(['filterCrowdLabels', fatherIndex, 'children', childIndex]);
    return state.setIn(['filterCrowdLabels', fatherIndex, 'children', childIndex, 'status'], false)
      .deleteIn(['crowdInfo', 'crowdFilterInfo', 'tagInfo', labelInfo.get('formComponent'), `__${labelInfo.get('id')}`]);
  },
  [actionTypes.CHANGE_FILTER_CROWD_INFO](state, { name, value }) {
    return state.setIn(['crowdInfo', 'crowdFilterInfo', 'tagInfo', ...name], value);
  },
  [actionTypes.CHANGE_FILTER_CROWD_INFO_ALL](state, { filterCrowdInfo }) {
    return state.setIn(['crowdInfo', 'crowdFilterInfo', 'tagInfo'], filterCrowdInfo);
  },
  [actionTypes.CHANGE_RESET_CROWDID](state, { resetCrowdId }) {
    return state.set('needResetId', resetCrowdId);
  },
  [actionTypes.SAVE_FILTER_CROWD_INFO](state, { payload, error }) {
    if (error) {
      message.error('保存筛选人群失败');
      return state;
    }
    const res = state.setIn(['crowdInfo', 'tagNumber'], payload.body.customerNum)
          .setIn(['crowdInfo', 'crowdFilterInfo', 'tagId'], payload.body.id)
          .setIn(['crowdInfo', 'crowdFilterInfo', 'tagNumber'], payload.body.customerNum);
    return checkFilterCrowd(res);
  },
  [actionTypes.CAL_FILTER_CROWD_INFO](state, { payload, error }) {
    if (error) {
      message.error('计算筛选人群失败');
      return state;
    }
    return state.setIn(['crowdInfo', 'crowdFilterInfo', 'tagTemNumber'], payload.body);
  },
  [actionTypes.CHANGE_CROWD_TYPE](state, { crowdType }) {
    const res = state.setIn(['crowdInfo', 'type'], crowdType);
    return changeCrowdTypeAction(res);
  },
  [actionTypes.CHANGE_COM_CROWD_LABEL](state, { payload, commCrowdInfo, curTagInfo, curIndex }) {
    if (curTagInfo) {
      const res = state.setIn(['crowdInfo', 'crowdComInfo'], commCrowdInfo)
                      .setIn(['crowdInfo', 'tagNumber'], commCrowdInfo.get('tagNumber'));
      return checkCommCrowd(res);
    }
    const res = state.setIn(['crowdInfo', 'tagNumber'], payload.body.countNum)
                  .setIn(['crowdInfo', 'crowdComInfo'], commCrowdInfo.set('tagNumber', payload.body.countNum))
                  .updateIn(['crowdLabelInfo', curIndex], value => value.set('tagNumber', payload.body.countNum));
    return checkCommCrowd(res);
  },
  [actionTypes.RESET_CROWD_INFO](state) {
    return state.set('crowdInfo', fromJS(initCrowdInfo))
    .set('filterCrowdLabels', fromJS([]))
    .update('crowdLabelInfo', crowdLabelInfo => crowdLabelInfo && crowdLabelInfo.map(value => value.set('tagNumber', null)));
  },
  [actionTypes.GET_CROWD_INFO](state, { payload, error, crowdId }) {
    if (error) {
      message.error('获取人群信息失败');
      return state.set('crowdInfo', fromJS(initCrowdInfo))
        .setIn(['crowdInfo', 'crowdComInfo', 'tagId'], crowdId);
    }
    const crowdName = ComModel.CrowdTypesName[payload.body.crowdType];
    return state.set('crowdInfo', fromJS(initCrowdInfo))
              .setIn(['crowdInfo', 'type'], payload.body.crowdType)
              .setIn(['crowdInfo', 'tagNumber'], payload.body.countNum)
              .setIn(['crowdInfo', crowdName, 'tagId'], payload.body.tagId)
              .setIn(['crowdInfo', crowdName, 'tagName'], payload.body.tagName)
              .setIn(['crowdInfo', crowdName, 'tagNumber'], payload.body.countNum)
              .setIn(['crowdInfo', 'errorMsg'], null);
  },
  [actionTypes.GET_FILTER_CROWD_CONDITIONS](state, { payload, error }) {
    if (error) {
      message.error('获取筛选人群信息失败');
      return state;
    }
    let filterCrowdLabels = state.get('filterCrowdLabels');
    const childIdIndex = state.get('childIdIndex');
    const conditions = payload.body.conditions.concat();
    if (filterCrowdLabels.size !== 0) {
      payload.body.conditions.forEach((value, index) => {
        const childloc = childIdIndex[value.id];
        if (childloc && childloc.length === 2) {
          filterCrowdLabels = 
            filterCrowdLabels.setIn([childloc[0], 'children', childloc[1], 'status'], true);
          conditions[index].formComponent = 
            filterCrowdLabels.getIn([childloc[0], 'children', childloc[1], 'formComponent']);
        }
      });
    }
    const exCrowdInfo = ExFilterCrowdData.jsonToFe(conditions);
    return state.set('hasLoadCur', true)
                .set('filterCrowdLabels', filterCrowdLabels)
                .setIn(['crowdInfo', 'crowdFilterInfo', 'tagInfo'], fromJS(exCrowdInfo));
  },
  // 短信通知
  [actionTypes.CHANGE_NOTICE_INFO](state, { name, value }) {
    let res = state.setIn(['msgNoticeInfo', name], fromJS(value));
    if (chainChangeMap[name]) {
      res = chainChangeMap[name](res);
    }
    return checkNoticeForm(res);
  },
  [actionTypes.LOAD_SMS_NOTICE](state, { noticeInfo }) {
    let res;
    const newNoticeInfo = noticeInfo;
    if (noticeInfo && noticeInfo.autoSwitch) {
      if (noticeInfo.noticeWayType === ComModel.MsgNoticeWayTypes.ONLY_MSG) {
        newNoticeInfo.wxSendSwitch = true;
        newNoticeInfo.wxOutOfDataSwitch = true;
      } else if (noticeInfo.noticeWayType === ComModel.MsgNoticeWayTypes.ONLY_WX) {
        newNoticeInfo.sendMsgCommericalInfo = null;
        newNoticeInfo.msgSendSwitch = true;
        newNoticeInfo.msgSendTemplate = state.get('defaultMsgSendTemplate');
        newNoticeInfo.msgCheckSwitch = true;
        newNoticeInfo.msgCheckedTemplate = state.get('defaultMsgCheckTemplate');
        newNoticeInfo.msgOutOfDataSwitch = true;
        newNoticeInfo.msgOutOfDataTemplate = state.get('defaultMsgOutOfDateTemplate');
        newNoticeInfo.beforeDataNotice = 1;
        newNoticeInfo.leftMsgNumVaild = PlsSelectStore;
      }
      res = state.set('msgNoticeInfo', fromJS(newNoticeInfo));
    } else {
      res = state.set(
        'msgNoticeInfo',
        fromJS({
          ...initMsgNoticeInfo,
          autoSwitch: newNoticeInfo ? newNoticeInfo.autoSwitch : false,
          msgSendTemplate: state.get('defaultMsgSendTemplate'),
          msgCheckedTemplate: state.get('defaultMsgCheckTemplate'),
          msgOutOfDataTemplate: state.get('defaultMsgOutOfDateTemplate')
        })
      );
    }
    res = chainChangeMap.msgSendSwitch(res);
    res = chainChangeMap.wxSendSwitch(res);
    return checkNoticeForm(res);
  },
  [actionTypes.GET_BRAND_NOTICE_CONF](state, { payload, error }) {
    if (error) {
      return errorHandler(error, '加载门店配置信息失败', state);
    }
    return state.set('brandNoticeConf', fromJS(payload.body));
  },
  [actionTypes.GET_BRAND_CARD_CONF](state, { payload, error }) {
    if (error) {
      return errorHandler(error, '查询移动门店优惠券模板配置信息失败', state);
    }
    return state.set('hasOpenPortal', fromJS(payload.body));
  },
  [actionTypes.GET_INIT_SMS_NOTICE_TEMPLATE](state, { payload, error, checkWx }) {
    if (error) {
      return errorHandler(error, '加载默认模板失败', state);
    }
    const defaultTep = payload.body;
    const sendTem = defaultTep.find(
      value => value.scenarioCode === ComModel.sendMsgType.SEND_TEMPLATE
    );
    const checkTem = defaultTep.find(
      value => value.scenarioCode === ComModel.sendMsgType.CHECK_TEMPLATE
    );
    const validTem = defaultTep.find(
      value => value.scenarioCode === ComModel.sendMsgType.EXPIRED_TEMPLATE
    );
    const adMsgTemp = defaultTep.find(
      value => value.scenarioCode === ComModel.sendMsgType.ADMSG_TEMPLATE
    );
    let res = state
      .setIn(['msgNoticeInfo', 'msgSendTemplate'], fromJS(sendTem))
      .setIn(['msgNoticeInfo', 'msgCheckedTemplate'], fromJS(checkTem))
      .setIn(['msgNoticeInfo', 'msgOutOfDataTemplate'], fromJS(validTem))
      .set('defaultMsgSendTemplate', fromJS(sendTem||{}))
      .set('defaultMsgCheckTemplate', fromJS(checkTem))
      .set('defaultMsgOutOfDateTemplate', fromJS(validTem))
      .set('defaultadMsgTemp', fromJS(adMsgTemp));
    res = chainChangeMap.msgSendSwitch(res);
    if (checkWx) {
      res = chainChangeMap.wxSendSwitch(res);
    }
    return checkNoticeForm(res);
  },
  [actionTypes.GET_COMMERCIAL_SMS_LEFT](state, { payload, error }) {
    if (error) {
      return errorHandler(error, '获取门店短信失败', state);
    }
    const sendMsgCommericalInfo = state.getIn(['msgNoticeInfo', 'sendMsgCommericalInfo']);
    const commercialId = sendMsgCommericalInfo && sendMsgCommericalInfo.get('commercialId') ? 
          sendMsgCommericalInfo.get('commercialId').toString() : '';
    if (sendMsgCommericalInfo) {
      const newSendMsgCommericalInfo = payload.body.find(value => 
        value.commercialId.toString() === commercialId);
      return state.set('commercialSmsLeftCount', fromJS(payload.body))
                  .setIn(['msgNoticeInfo', 'sendMsgCommericalInfo'], fromJS(newSendMsgCommericalInfo));
    }
    return state.set('commercialSmsLeftCount', fromJS(payload.body));
  },
  [actionTypes.CHANGE_COMM_STATE](state, { name, value }) {
    return state.set(name, fromJS(value));
  },
  [actionTypes.CHECK_SMS_FORM](state) {
    return checkNoticeForm(state);
  },
  [actionTypes.ADD_DEF_SMS_TEM](state, { payload, error }) {
    message.destroy();
    const res = state.set('checkSmsSend', false);
    if (error) {
      message.warn('测试短信模板失败！');
      return res;
    }
    message.success('测试短信成功，已帮您选中该短信！');
    return res.set('addDefSmsState', true)
      .set('currentEditSmsTemplateInfo', fromJS(payload.body));
  },
  [actionTypes.GET_KEY_WORDS](state, { payload, error }) {
    message.destroy();
    const res = state.set('checkSmsSend', false);
    if (error) {
      message.warn('校验短信模板错误');
    } else if (payload.body.length !== 0) {
      message.warn(`短信模板中有敏感字:${payload.body.toString()}`);
    }
    return res;
  },
  [actionTypes.CHANGE_CURRENT_ENIT_TEMPLATE](state, { name, value }) {
    return state.setIn(['currentEditSmsTemplateInfo', name], value);
  },
  [actionTypes.GET_TEM_BY_CODE](state, { payload, error }) {
    if (error) {
      return errorHandler(error, '获取短信模板列表失败', state);
    }
    return state.set('smsTemplatePageInfo', fromJS(payload.body));
  },
  [actionTypes.GET_MEMBER_LEVEL_INFO](state, { payload, error }) {
    if (error) {
      return errorHandler(error, '获取会员等级信息失败', state);
    }
    return state.set('memberLevelInfo', payload.body.businessData.memberLevel);
  }
};

export default createReducer(initialState, handlers);
