import { fromJS } from 'immutable';
import { Utils } from './kryfe-lib';
import actionTypes from './../consts/actionsTypes';
const { createReducer } = Utils;
const MARKETING_PAGE_SIZE = 10;
const initialState = fromJS({
    marketingInfo: {
      // 营销初始值 对象
      hasLoad: false,
      opType: "NEW1",
      planType: null,
      planState: "PLAN1",
      joinedCommercials: {
          checkAll: true,
          checkedList: [],
      },
      errorInfo: {
        rules: [{}],
      },
      rangeMoney: 1
    },
    searchCondition: {
      pageSize: MARKETING_PAGE_SIZE,
    },
    lastSearchCondition: {
      pageSize: MARKETING_PAGE_SIZE,
    },
    marketingPlanPageInfo: {},
    activityInfoPushInfo: {
      mainLoading: null,
      uploadingLoading: null,
      saveUploadInfoLoading: null,
      filledUploadInfoLoading: null,
      saveSuccess: null,
      fileList: null,
      fileInfo: null,
      imageId: null,
      filledUploadInfo: {},
    },
    gameLink: null,
  });
const RouterUrlMap = {
  // [keyDictionary.MarketingPlanOpTypes.NEW]: '#/newMarketingPlan/',
  'aa': '#/newMarketingPlan/'
};
const handlers = {
    [actionTypes.SAVE_MARKETING_PLAN_INFO](
        state,
        { payload, planType },
    ) {
        console.log('进入marketing')
        return state
        .setIn(['marketingInfo', 'opType'], payload + 'New2')
        .setIn(['marketingInfo', 'hasLoad'], 'dffe');
    },
}
export default createReducer(initialState, handlers);