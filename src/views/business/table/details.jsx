import React from "react";
import './details.css'

export class Details extends React.Component {
    constructor(props) {
        super(props) // 获取父组件传的值
        this.state = {...props} // 复制props 到内部state 用与取消按钮改变状态 -- 不可行
        this.lists = {...props}
        console.log(this.state, 'state状态')
        console.log(props, 'props状态')
        // this.props = {
        //     id: 2
        // }
    }
    componentDidUpdate(prevProps){
        if(prevProps.visible!==this.state.visible){
            this.setState({
                visible:prevProps.visible
            })
        }
    }
    handle() {
        this.setState({ id: 2 })
        this.state.all.getList1(111111)
        this.state.all.getList2(222222)
    }
    goBack = () => {
        console.log('点击了')
        this.setState({ 
            visible: false 
        })
    }
    render() {
        return (
            <div className="de-main" style={{
                // display: this.props.visible ? 'block' : 'none'
                display: this.state.visible ? 'block' : 'none'
            }}>
                <div>
                    <h1>详情页{this.props.onlyId}</h1>
                    <span onClick={this.goBack}>返回</span>
                </div>
                <span>{this.state.id}</span>
                <span>{this.state.id}</span>
                <span>{this.lists.id}</span>
                <button onClick={() => this.handle()}>改变数据</button>
            </div>
        )
    }
}