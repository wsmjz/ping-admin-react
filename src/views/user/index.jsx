import React from "react";
import { Tree } from "./../../../src/components/tree";

export function UserManerge(props) {
    const ref = React.createRef();
    console.log(ref)
    const treeJson = [{
        name: "企业",
        id: 1,
        children: [{
            name: "部门11",
            id: 11,
        }, {
            name: "部门12",
            id: 12,
        }]
    }, {
        name: "平台",
        id: 2,
        children: [{
            name: "部门21",
            id: 21,
        }, {
            name: "部门22",
            id: 22,
        }]
    }]
    return (
        <div>
            <h1>用户权限管理</h1>
            <Tree data={treeJson}></Tree>
            <User ref={ref}>Click me!</User>
        </div>
    );
    
}



// const User2 = React.forwardRef((props, ref) => (
//     <button ref={ref} className="FancyButton">
//       {props.children}
//     </button>
//   ));
function User(props) {
    return (
        <div>
            <button className="FancyButton">
                {props.children}
            </button>
        </div>
    );
}