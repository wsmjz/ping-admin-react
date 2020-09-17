// import React from 'react';
// import { BaseComponent } from 'kryfe-lib';
// import { fromJS } from 'immutable';
// import { Form, Input } from 'antd';

// import CONST_VARIABLE from '../../../../consts/constVariable';
// import keyDictionary from '../../../../consts/keyDictionary';
// import { IntlHelper } from 'kryfe-lib';
// import messages from '../../../../messages/index';
// const intl = IntlHelper.getIntlContext();

// export default class BasicInfoBase extends BaseComponent {
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     const { name, planDesc, readOnlyAboutPuton, readOnly } = this.props;
//     return (
//       <div>
//         <Form.Item
//           label={intl.formatMessage(messages.ProgramName)}
//           required
//           {...CONST_VARIABLE.formColStyle}
//         >
//           {getFieldDecorator('name', {
//             rules: [
//               {
//                 required: true,
//                 message: intl.formatMessage(messages.PleasePlansName),
//               },
//               {
//                 pattern: new RegExp('^[^\\s]{1,10}$'),
//                 message: '方案名称：1-10位，不能包含空格!',
//               },
//             ],
//             validateFirst: true,
//             initialValue: name,
//           })(
//             <Input
//               placeholder={intl.formatMessage(messages.CharactersOnly)}
//               disabled={readOnlyAboutPuton}
//             />,
//           )}
//         </Form.Item>
//         <Form.Item label={intl.formatMessage(messages.Description)} required {...CONST_VARIABLE.formColStyle}>
//           {getFieldDecorator('planDesc', {
//             rules: [
//               {
//                 required: true,
//                 message: intl.formatMessage(messages.PleasePlansDesc),
//               },
//               {
//                 validator: (rule, value, callback) => {
//                   if (!value || value === '' || value.trim().length === 0) {
//                     callback(intl.formatMessage(messages.PleasePlansDesc));
//                     return;
//                   }
//                   callback();
//                 },
//               },
//               {
//                 validator: (rule, value, callback) => {
//                   if (value.trim().length > 100) {
//                     // callback('方案描述字数 1-100');
//                     callback(intl.formatMessage(messages.CharactersOnly100));
//                   } else {
//                     callback();
//                   }
//                 },
//               },
//             ],
//             validateFirst: true,
//             initialValue: planDesc,
//           })(
//             <Input.TextArea
//               disabled={readOnly}
//               placeholder={intl.formatMessage(messages.CharactersOnly100)}
//               rows={5}
//             />,
//           )}
//         </Form.Item>
//       </div>
//     );
//   }
// }
