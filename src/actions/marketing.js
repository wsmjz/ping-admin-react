// export function saveMarketingPlanSetting(extendData) {
//   console.log('点击事件保存', extendData)
// }

import createAPI from './../utils/createAPI';
// import actionTypes from '../consts/marketingActionsTypes';
import actionTypes from "./../consts/actionsTypes";
import URL from './../consts/config';
import API from '../api';
import keyDictionary from "./../consts/keyDictionary";
import PlanInfo from "../consts/formSubmitInfo";
const UrlMarketPlanMapping = new Map([
    [
        keyDictionary.MarketingPlanTypes.NEW_MEMBER_MARKET,
        {
          save: 'plan/webapi/newMemberPlan/save', //URL.request.newMemberPlan,
        //   get: URL.request.newMemberPlanGet,
        },
    ],
    [
      keyDictionary.MarketingPlanTypes.ENTER_MARKET,
      {
        save: URL.request.marketSetting,
        // get: URL.request.marketSettingGetById,
        // getByType: URL.request.marketSettingGetByType,
      },
    ],
])
export function saveMarketingPlanSetting(extendData) {
  // extendData 扩展数据


  return (dispatch, getState) => {
    const state = getState();
    const marketingInfo = state.marketing.get('marketingInfo');
    // feDataToJson 处理表单数据 marketingInfo
    const putData = PlanInfo.ExMarketPlanInfo.feDataToJson(marketingInfo);
    dispatch({
      type: actionTypes.SAVE_MARKETING_PLAN_INFO,
      // payload: createAPI.put( // 相当于axios, 自己创建可做一些业务 比如 cookies
      //   UrlMarketPlanMapping.get(marketingInfo.get('planType')).save,
      //   {
      //     ...extendData,
      //     ...putData, // 获取info里面的表单数据 上传 *******
      //   },
      //   {},
      //   '__LOYT_HOST__',
      // ),
      payload: '接口回调对象',
      // planType: putData.planType,
      planType: 'ENTER',
      messageInfo: '保存',
    });
  }
}
export function getMarketingPlanPageInfo( // 页面组件会执行这个方法
    currentPage = 1,
    useCurrentCondition = false,
  ) {
    return (dispatch, getState) => {
      const state = getState();
      let searchCondition = state.marketing.get('lastSearchCondition').toJS();
      if (useCurrentCondition) {
        searchCondition = state.marketing.get('searchCondition').toJS();
      }
      if (searchCondition.periodDate && searchCondition.periodDate.length === 2) {
        searchCondition.cycleBeginTime = searchCondition.periodDate[0].format(
          'YYYY-MM-DD HH:MM:SS',
        );
        searchCondition.cycleEndTime = searchCondition.periodDate[1].format(
          'YYYY-MM-DD HH:MM:SS',
        );
      }
      if (searchCondition.planStateList) {
        searchCondition.planStateList = searchCondition.planStateList.map(
          value => value.value,
        );
      }
      if (searchCondition.planTypeList) {
        searchCondition.planTypeList = searchCondition.planTypeList.map(
          value => value.value,
        );
      }
      dispatch({ // 触发reducers 中的方法
        type: actionTypes.GET_MARKETING_PLAN_PAGE_INFO, // GET_MARKETING_PLAN_PAGE_INFO: 'GET_MARKETING_PLAN_PAGE_INFO',
        payload: createAPI.post(
          URL.request.getMarketingPlanPageInfo,
          { ...searchCondition, currentPage },
          {},
          '__LOYT_HOST__',
        ),
        useCurrentCondition,
      });
    //   dispatch(getPromotionPageInfo());
    };
  }
  
  export function changeMarketingPlanInfo(name, value) {
    return {
      type: actionTypes.CHANGE_MARKETING_PLAN_INFO,
      name,
      value,
    };
  }
// 没有dispatch 为同步
  export function getSpecialMarket(planType) {
    if (UrlMarketPlanMapping.get(planType).getByType) {
      return {
        type: actionTypes.GET_SPECIAL_MARKET,
        payload: createAPI.get(
          UrlMarketPlanMapping.get(planType).getByType,
          { planType },
          {},
          '__LOYT_HOST__',
        ),
        planType,
        messageInfo: '提示信息',
      };
    }
    return {
      type: actionTypes.DO_NOTHING,
    };
  }
  export const getGameMarketingLink = () => dispatch => {
    const promise = API.getGameMarketingLink();
    const newWindow = window.open();
    dispatch({
      type: actionTypes.GET_GAME_MARKETING_LINK,
      payload: promise,
      meta: {
        handlers: {
          success: () => {
            promise.then(res => {
              if (res.code === 0) {
                newWindow.location.href = res.body;
              } else {
                newWindow.close();
                alert('获取链接失败');
              }
            });
          },
        },
      },
    });
  };