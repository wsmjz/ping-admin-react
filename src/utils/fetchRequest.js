import FetchHelper from './../reducers/kryfe-lib/fetchHelper';
// import store from '../../store';

const { Consts, FetchRequest, FetchResponse } = FetchHelper;

// FetchRequest.connectToRedux(store);

// if the schema of response is not like
// { header: { code: xxx, message: xxx }, body: { ... } }
// you need to reset the response like below


// ========== 待处理
// FetchResponse.parseHeader = res => {
//   if (res.code === 1001) {
//     window.location.href = res.data;
//   } else if (res.code === 30200) {
//     window.location.href = res.result.redirectUrl;
//   } else if (res.code === 1) {
//     return {
//       message: res.errorMessage,
//       code: 0,
//     };
//   } else {
//     return {
//       code: res.code,
//       message: res.errorMessage,
//     };
//   }
// };

// FetchResponse.parseBody = res => res.result;

export { Consts, FetchRequest };
