import React from "react";
import {
  Pagination,
  Button
} from 'antd';
import NumInput from "./../components/num-input";
import Item from "./../components/items";
const ThemeContext = React.createContext('light');

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div>
        {this.contextType}
      </div>
    )
  }
}

export class Boot extends React.Component {
  render() {
    return (
      <div>
        <Item width={"100px"} />
        <Item width="200px" />
        <NumInput
          minBitNum={1}
          maxBitNum={10000}
          placeholder="0"
          fixedBitNum={2}
          integerBitNum={5}
          addonAfter="元"
          style={{
            width: '300px'
          }} />
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
        <ThemeContext.Provider value="dark">
          <Toolbar />
        </ThemeContext.Provider>
        <h1>引导页操作标题</h1>
        <p>引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容引导页内容</p>
        <p>状态提升状态提升</p>
        <Calculator></Calculator>
      </div>
    )
  }
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { // 提升的公共状态 每个子组件自身的state改为通过props取值，通过回调函数来改变 这儿的状态（公共父组件）
      temperature: '',
      scale: 'c'
    };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    // onTemperatureChange 子组件改变数据时 调用此回调方法
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
//   ====================================== 子组件
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: '' };
  }

  handleChange(e) {
    //   this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    //   const temperature = this.state.temperature;
    const temperature = this.props.temperature; // 只读， 不可修改，setState无效
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}