// 在 store中注入 createStore()
import { message } from 'antd';
import { Actions } from 'kryfe-lib';

export default function errorMiddleware({ dispatch }) {
  return next => action => {
    let opDecribe = isENLanguage ? 'operation' : '操作';
    if (typeof action.messageInfo === 'string') {
      opDecribe = action.messageInfo;
    }
    if (
      action.error &&
      action.payload.data &&
      action.payload.data.code !== 30200
    ) {
      message.destroy();
      if (
        action.payload.data &&
        (action.payload.data.code === 3 || action.payload.data.code === 2)
      ) {
        isENLanguage
          ? message.error(action.payload.message || `${opDecribe} failed`)
          : message.error(action.payload.message || `${opDecribe}失败`);
        dispatch(Actions.systemCleanError());
      } else {
        isENLanguage
          ? message.error(action.payload.message || `${opDecribe}failed`)
          : message.error(action.payload.message || `${opDecribe}失败`);
      }
      return null;
    }
    if (!action.ignoreSuccess && action.messageInfo) {
      message.destroy();
      isENLanguage
        ? message.success(`${opDecribe} success`)
        : message.success(`${opDecribe}成功`);
    }
    return next(action);
  };
}
