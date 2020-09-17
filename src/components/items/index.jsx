import React from "react";
import './index.css'

export default class Item extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let styobj = {
      width: this.props.width,
      height: '100px',
      border: '2px solid red',
      borderRadius: '50%',
      animation: 'donghua 1s 1s forwards'
    }
    return (
      <div
        style={styobj}
      >donghua</div>
    )
  }
}