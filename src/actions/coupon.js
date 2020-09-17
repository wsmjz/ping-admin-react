// 页面触发该文件方法  触发reducer 更新数据

// import PlanInfo from "./../consts/formSubmitInfo";

export const saveStepInfo = (extendData) => {
  return(dispatch, getState) => {
    const state = getState();

    // *****
    // const marketingPlanInfo = state.coupon.get('marketingPlanInfo');
    // 从store 中获取，统一处理 合并表单传过来的数据extendData
    // 统一处理前后端数据格式
    // const putData = PlanInfo.ExMarketPlanInfo.feDataToJson(marketingPlanInfo);


    dispatch({ // 这个对象会传到reducers 的第一个参数action
      type: 'saveStepInfo', // 触发reducers 中的方法
      payload: extendData,
      // 把接口的返回数据 传入reducer中
      // payload: createAPI.put(
      //   UrlMarketPlanMapping.get(marketingPlanInfo.get('planType')).save,
      //   {
      //     ...extendData, // 传过来的
      //     ...putData,
      //   },
      //   {},
      //   __LOYT_HOST__,
      // ),
      id: 22,
      messageInfo: '保存'
    })
  };
  // return { // 同步
  //   type: 'saveStepInfo', 
  //   couponsInfo 
  // }
}