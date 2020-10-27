import React from "react";
import "./index.css";
function Tree(props) {
  return (
    <div>
      <h1>树组件</h1>
      {renderNode(props.data)}
    </div>
  )
}

// const methods = {
//     handleExpand(){
//    		data.expand = !data.expand;
//     }
// }

function renderNode(data) {
  if (data && data.length == 0) { // 无节点情况
      return <div>无任何节点</div>
  }
  function renderChild(item) {  // 渲染每一个节点
      return <div class="zf-tree-node">
          <div class="zf-tree-label">{item.name}</div>
          {item.children && item.children.map(child => renderChild(child))}
      </div>
  }
  return data.map(item => renderChild(item));
}
export {
  Tree
}