import ComModel from './model';
const PlsFilterGroup = isENLanguage ? 'Pls select group to filter' : '请选择筛选人群'
const PlsSpecifiedGroup = isENLanguage ? 'Pls select group to Specified' : '请选择指定人群'

export function checkCommCrowd(state) {
  const crowdComInfo = state.getIn(['crowdInfo', 'crowdComInfo']);
  const canBeZero = state.getIn(['crowdInfo', 'canBeZero']);
  if (canBeZero && crowdComInfo.get('tagNumber') <= 0) {
    return state.setIn(['crowdInfo', 'errorMsg'], '人群数量必须大于0');
  }
  if (crowdComInfo.get('tagId') === null || crowdComInfo.get('tagId') === undefined) {
    return state.setIn(['crowdInfo', 'errorMsg'], '请选择常用人群标签');
  }
  return state.setIn(['crowdInfo', 'errorMsg'], null);
}

export function checkFilterCrowd(state) {
  const crowdFilterInfo = state.getIn(['crowdInfo', 'crowdFilterInfo']);
  const canBeZero = state.getIn(['crowdInfo', 'canBeZero']);
  if (canBeZero && crowdFilterInfo.get('tagNumber') <= 0) {
    return state.setIn(['crowdInfo', 'errorMsg'], '人群数量必须大于0');
  }
  if (crowdFilterInfo.get('tagId') === null || crowdFilterInfo.get('tagId') === undefined) {
    return state.setIn(['crowdInfo', 'errorMsg'], PlsFilterGroup);
  }
  return state.setIn(['crowdInfo', 'errorMsg'], null);
}

export function checkAppointedCrowd(state) {
  const crowdAppointedInfo = state.getIn(['crowdInfo', 'crowdAppointedInfo']);
  const canBeZero = state.getIn(['crowdInfo', 'canBeZero']);
  if (canBeZero && crowdAppointedInfo.get('tagNumber') <= 0) {
    return state.setIn(['crowdInfo', 'errorMsg'], '人群数量必须大于0');
  }
  if (crowdAppointedInfo.get('tagId') === null || crowdAppointedInfo.get('tagId') === undefined) {
    return state.setIn(['crowdInfo', 'errorMsg'], PlsSpecifiedGroup);
  }
  return state.setIn(['crowdInfo', 'errorMsg'], null);
}

const checkCrowdFuncMaps = {
  [ComModel.CrowdTypes.COMM_CROWD]: checkCommCrowd,
  [ComModel.CrowdTypes.FILTER_CROWD]: checkFilterCrowd,
  [ComModel.CrowdTypes.APPOINTED_CROWD]: checkAppointedCrowd  
};

export function changeCrowdTypeAction(state) {
  const crowdType = state.getIn(['crowdInfo', 'type']);
  const checkFunc = checkCrowdFuncMaps[crowdType];
  return checkFunc ? checkFunc(state) : state;
}
