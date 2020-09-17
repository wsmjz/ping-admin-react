// 表单：
// 选择品牌（门店）
import React from 'react';
import { BaseComponent } from 'kryfe-lib';
import { Form, Checkbox } from 'antd';
import { judgeEqualObj } from 'shared/utils/tools';
import './index.less';

import BrandCheckBox from 'pages/comm/component/brandCheckBox';
import { IntlHelper } from 'kryfe-lib';
import messages from '../../../../messages/index';
const intl = IntlHelper.getIntlContext();

const checkboxColStyle = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};
export default class BasicInfoBrand extends BaseComponent {
  constructor() {
    super();
    this.state = {
      error: null,
    };
    this.bind('memAddShopChange');
  }

  componentDidMount() {
    if (this.props.labelName === '会员加入门店') {
      if (!window.memAddShop) {
        window.memAddShop = '发券';
      }
    }
  }

  memAddShopChange(e) {
    if (e.target.checked) {
      window.memAddShop = '发券';
    } else {
      window.memAddShop = '不发券';
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !judgeEqualObj(
        nextProps.allCommercialInfo,
        this.props.allCommercialInfo,
      ) &&
      Number.isInteger(this.props.index)
    ) {
      this.setState({}, () =>
        this.props.form.validateFields(
          [`rules.${this.props.index}.joinedCommercials`],
          { force: true },
        ),
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !judgeEqualObj(
        nextProps.allCommercialInfo,
        this.props.allCommercialInfo,
      ) ||
      !judgeEqualObj(
        nextProps.joinedCommercials,
        this.props.joinedCommercials,
      ) ||
      nextProps.readOnly !== this.props.readOnly ||
      nextState.error !== this.state.error
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { joinedCommercials, readOnly, allCommercialInfo } = this.props;
    const filedName = Number.isInteger(this.props.index)
      ? `rules.${this.props.index}.joinedCommercials`
      : 'joinedCommercials';
    return (
      <div>
        <Form.Item label={this.props.labelName} required {...checkboxColStyle}>
          {getFieldDecorator(filedName, {
            rules: [
              {
                validator: (rule, value, callback) => {
                  if (
                    this.props.labelName !== '会员加入门店' &&
                    value &&
                    !value.get('checkAll') &&
                    value.get('checkedList').isEmpty()
                  ) {
                    callback(intl.formatMessage(messages.PleaseSelectStores));
                  }
                  callback();
                },
                message: '',
              },
              {
                validator: (rules, value, callback) => {
                  if (!allCommercialInfo) {
                    callback();
                    return;
                  }
                  const valueString = value.get('checkedList').toString();
                  const res = allCommercialInfo.every((otherValue, index) => {
                    if (index === this.props.index) {
                      return true;
                    }
                    if (value.get('checkAll') || otherValue.get('checkAll')) {
                      return (
                        value.get('checkedList').size === 0 &&
                        otherValue.get('checkedList').size === 0 &&
                        value.get('checkAll') !== otherValue.get('checkAll')
                      );
                    }
                    return otherValue.get('checkedList').every(commercialId => {
                      return (
                        valueString.indexOf(
                          commercialId.get('commercialId'),
                        ) === -1
                      );
                    });
                  });
                  if (res) {
                    callback();
                    this.setState({ error: null });
                  } else {
                    callback('选择了重复的门店');
                    this.setState({ error: '选择了重复的门店' });
                  }
                },
                message: '',
              },
            ],
            initialValue: joinedCommercials,
          })(<BrandCheckBox disabled={readOnly} />)}
        </Form.Item>
        {this.props.labelName === '会员加入门店' && (
          <Form.Item style={{ marginLeft: '12.5%' }}>
            <Checkbox
              disabled={readOnly}
              defaultChecked={window.memAddShop === '发券' ? true : false}
              onChange={this.memAddShopChange}
            >
              {intl.formatMessage(messages.NoStoreMembership)}
            </Checkbox>
          </Form.Item>
        )}
      </div>
    );
  }
}
