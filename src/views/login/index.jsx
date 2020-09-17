import React from "react";
export class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>登陆</h1>
                <div>
                    <span>用户名：</span>
                    <input type="text"/>
                    <button>登陆</button>
                </div>
            </div>
        )
    }
}