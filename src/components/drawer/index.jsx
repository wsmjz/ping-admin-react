import React from 'react';
import './index.css'
export class Drawer extends React.Component {
    constructor(props) {
        super(props)
    }
    styleObj = () => {
        return {
            display: this.props.show ? "block" : "none"
        }
    }
    render() {
        return (
            <div className="main" style={{
                display: this.props.show ? "block" : "none"
            }}>
                <div>
                    <h1>设置</h1>
                    <span>X</span>
                </div>
                <div>
                    <div>
                        <span>固定菜单栏</span>
                        <span>是否折叠</span>
                        <span>开启历史导航</span>
                        <span>开启面包屑</span>
                        <span>边框</span>
                    </div>
                </div>
            </div>
        )
    }
}