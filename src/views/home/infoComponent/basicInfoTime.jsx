import React from 'react';
import { BaseComponent } from 'kryfe-lib';
import { Form } from 'antd';
import LoyaltyDataPicker from 'shared/components/Picker/LoyaltyDataPicker';
import moment from 'moment';
import { IntlHelper } from 'kryfe-lib';
import messages from '../../../../messages';
const intl = IntlHelper.getIntlContext();

import CONST_VARIABLE from '../../../../consts/constVariable';
import keyDictionary from '../../../../consts/keyDictionary';

import './index.less';

export default class BasicInfoTime extends BaseComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { planTime, readOnly, planType, readOnlyAboutPuton } = this.props;
    const filedName = Number.isInteger(this.props.index)
      ? `rules.${this.props.index}.planTime`
      : 'planTime';
    const disabledFirst =
      planType !== keyDictionary.MarketingPlanTypes.ENTER_MARKET &&
      planType !== keyDictionary.MarketingPlanTypes.COMMENT_MARKET &&
      planType !== keyDictionary.MarketingPlanTypes.PAY_MARKET &&
      planType !== keyDictionary.MarketingPlanTypes.CUSTOMER_MONEY_MARKET &&
      planType !== keyDictionary.MarketingPlanTypes.CUSTOMER_TIMES_MARKET;
    const labelName =
      this.props.labelName || intl.formatMessage(messages.MarketingCycle);
    return (
      <Form.Item label={labelName} required {...CONST_VARIABLE.commonRowStyle}>
        {getFieldDecorator(filedName, {
          rules: [
            {
              required: true,
              message: `${intl.formatMessage(
                messages.PleaseInput,
              )}${labelName}!`,
            },
            {
              validator: (rule, nextValue, callback) => {
                if (nextValue && nextValue[0] && nextValue[1]) {
                  callback();
                  return;
                }
                callback(
                  `${intl.formatMessage(messages.PleaseSelect)}${labelName}`,
                );
              },
              message: '',
            },
            {
              validator: (rule, nextValue, callback) => {
                if (
                  nextValue[1].valueOf() <
                  moment({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                ) {
                  callback(`${labelName} ${intl.formatMessage(messages.MustBeGreater)}`);
                  return;
                }
                callback();
              },
              message: '',
            },
          ],
          validateFirst: true,
          initialValue: planTime,
        })(
          <LoyaltyDataPicker
            showToday={false}
            disabledDate={currentDate => {
              return (
                currentDate &&
                currentDate.valueOf() <
                  moment({ hour: 0, minute: 0, second: 0, millisecond: 0 })
              );
            }}
            disableds={
              disabledFirst
                ? [readOnlyAboutPuton, readOnly]
                : [readOnly, readOnly]
            }
          />,
        )}
        {planType === keyDictionary.MarketingPlanTypes.BIRTHDAY_MARKET ? (
          <span styleName="tipsFont">
            将对在方案执行期间过生日的目标人群发券
          </span>
        ) : null}
      </Form.Item>
    );
  }
}
