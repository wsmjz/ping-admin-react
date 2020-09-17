import React from 'react';
import {Drawer} from './../drawer/index';
import './index.css'
export class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setVisible: false
        }
    }
    state = {
        aa: 1
    }
    show() {
        console.log('111')
        this.setState({
            setVisible: true,
        });
    }
    render() {
        return (
            <div className="nav">
                <div className="logo">pi-admin</div>
                <div className="item">
                    <a href="#/" className="active">React</a>
                    <a href="#/vue-t">Vue</a>
                    <a>uni-app</a>
                    <a>H5</a>
                    <a>小程序</a>
                </div>
                <div className="user">
                    <span>消息通知</span>
                    <span>换肤</span>
                    <span>语言选择</span>
                    <button onClick={() => this.show}>设置</button>
                    <span>用户名</span>
                    <Drawer show={this.setVisible}></Drawer>
                </div>
            </div>
        )
    }
}