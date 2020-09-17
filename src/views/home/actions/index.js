import actionsTypes from '../consts/actionTypes';
import createAPI from '../../../shared/utils/createAPI';
import URL from '../../../shared/consts/config';

export function getPromotionPageInfo(params, originCondition) {
  return (dispatch, getState) => {
    const reParam = params || getState().pages.promotion.get('searchCondition');
    const reOriginCondition =
      originCondition || getState().pages.promotion.get('originCondition');
    dispatch({
      type: actionsTypes.GET_PROMOTION,
      payload:
        !reParam.showEnd && !reParam.planStateList.length
          ? { body: [] }
          : createAPI.post(
              URL.request.promotionQueryPage,
              reParam,
              {},
              __LOYT_HOST__,
            ),
      params: reParam,
      //用于回显
      originCondition: reOriginCondition,
      // messageInfo: '获取促销方案'
    });
  };
}
