import React from 'react';
import { Input, Icon } from 'antd';

export default class NumInput extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      displayClear: false,
    };
  }
  informParentChange(value) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  }

  handleFixedChange(inputValue) {
    let { integerBitNum = 4 } = this.props;
    const {
      fixedBitNum = 2,
      regFunc,
      maxBitNum = Number.MAX_VALUE,
      minBitNum = 0,
    } = this.props;
    integerBitNum -= 1;
    let reg;
    if (regFunc) {
      reg = regFunc();
    } else if (fixedBitNum) {
      reg = new RegExp(
        `^([1-9][\\d]{0,${integerBitNum}}|0)(\\.[\\d]{0,${fixedBitNum}})?$`,
      );
    } else {
      reg = new RegExp(`^([1-9][\\d]{0,${integerBitNum}}|0)?$`);
    }
    if (inputValue) {
      inputValue = inputValue.replace(/\s/g, '');
      if (
        (Number.isNaN(Number(inputValue)) && reg.test(inputValue)) ||
        (reg.test(inputValue) &&
          maxBitNum >= inputValue &&
          minBitNum <= inputValue)
      ) {
        this.informParentChange(inputValue);
      } else {
        this.informParentChange(this.props.value);
      }
    } else {
      this.informParentChange(null);
    }
  }

  render() {
    const newProps = Object.assign({}, this.props);
    delete newProps.integerBitNum;
    delete newProps.fixedBitNum;
    delete newProps.maxBitNum;
    delete newProps.minBitNum;
    delete newProps.onChange;
    delete newProps.regFunc;
    delete newProps.hasClear;
    /* eslint-disable */

    if (this.props.hasClear) {
      return (
        <div
          styleName="numberMain"
          onMouseMove={() => {
            if (this.props.value) {
              this.setState({
                displayClear: true,
              });
            }
            return true;
          }}
          onMouseOut={() => {
            this.setState({
              displayClear: false,
            });
          }}
        >
          <Input
            onChange={e => this.handleFixedChange(e.target.value)}
            {...newProps}
            value={this.props.value}
          />
          <Icon
            type="close-circle"
            styleName={this.state.displayClear ? 'clearSpan' : 'hiddenClear'}
            onClick={() => {
              if (this.state.displayClear) {
                this.props.onChange(null);
              }
            }}
          />
        </div>
      );
    }
    return (
      <Input
        onChange={e => this.handleFixedChange(e.target.value)}
        {...newProps}
        value={this.props.value}
      />
    );
  }
}
