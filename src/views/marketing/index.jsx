import React from 'react';
class Customer {
    constructor() {
       console.log(this.aa, '数字')
       this.bb()
       this.kinds = {
          normal(amount) {
             return amount
          },
          member(amount) {
             return amount * .9
          },
          vip(amount) {
             return amount * .7
          }
       }
    }
    aa = 7
    bb() {
        console.log(this.aa, '数字2')
    }
   
    pay(kind, amount) {
       return this.kinds[kind](amount)
    }
 }

export class Marketing extends React.Component {
    constructor() {
        super()
        this.state = {
            flag: false
        }
    }
    handleCancel = () => {
        let c = new Customer()
        let money = c.pay('member', 100)
        console.log(money, '折扣')
    };
    createHistory = (opts) => { // 历史页面
        return (
            <div>
                <span>历史{opts > 1 ? '大于' : '小于'}</span>
            </div>
        )
    }
    createOther = () => { // 其他页面
        return (
            <div>
                <span>新建</span>
            </div>
        )
    }
    getList(num) {
        if(this.state.flag) {
            return this.createHistory(num)
        } else {
            return this.createOther() 
        }
    }
    render() {
        return (
            <div>
                <h2>产品营销</h2>
                <button onClick={this.handleCancel}>不同折扣</button>
                <button
                    onClick={() => {
                        this.setState({ flag: !this.state.flag });
                    }}
                    >
                    历史记录
                </button>
                <div style={{
                    border: '2px solid red'
                }}>{
                    this.getList(2)
                }</div>
            </div>
        )
    }
}