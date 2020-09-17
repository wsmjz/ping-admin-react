import React from 'react';
import { cloneDeep } from 'lodash';
import { Checkbox } from 'antd';

const Group = Checkbox.Group;

const SelectAllValue = '___KYLIN__CHECKALL__OPTIONS__';
/**
 * 判断一个值是否是一个函数
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

export class CheckAll extends React.Component {
  constructor(props) {
    super(props);
    this.bind('onChange', 'getValue');
    const DATA = this.getValue(props);
    this.state = {
      value: DATA.value,
      options: DATA.options,
    };
    delete props.extendName;
  }

  componentWillReceiveProps(nextProps) {
    const DATA = this.getValue(nextProps);
    this.setState({ ...DATA });
  }

  getValue = props => {
    const { checkInfos, extendName, value } = cloneDeep(props);
    if (value.length === checkInfos.length) {
      value.push(SelectAllValue);
    }
    checkInfos.unshift({
      value: SelectAllValue,
      label: `全部${extendName || ''}`,
    });
    return { value, options: checkInfos };
  };

  onChange(selectValue) {
    const selectAll = selectValue.indexOf(SelectAllValue) !== -1;
    const wasSelectAll = this.state.value.indexOf(SelectAllValue) !== -1;
    const clickSelectAll = selectAll !== wasSelectAll;
    let value = selectValue;
    let realValue = value.filter(v => v !== SelectAllValue);

    /** 取消全选 */
    if (clickSelectAll && wasSelectAll) {
      value = this.state.options
        .filter(v => v.disabled && v.checked)
        .map(v => v.value);
      realValue = value;
      /** 全选 */
    } else if (
      realValue.length ===
        this.state.options.filter(v => !v.disabled).length - 1 ||
      clickSelectAll
    ) {
      value = this.state.options.filter(v => !v.disabled).map(v => v.value);
      realValue = value.filter(v => v !== SelectAllValue);
    } else {
      value = realValue;
    }

    this.setState({ value }, () => {
      if (isFunction(this.props.onChange)) {
        this.props.onChange(realValue);
      }
    });
  }

  render() {
    const { value, options } = this.state;

    return (
      <Group
        {...this.props}
        options={options}
        value={value}
        onChange={this.onChange}
      />
    );
  }
}

CheckAll.defaultProps = {};
