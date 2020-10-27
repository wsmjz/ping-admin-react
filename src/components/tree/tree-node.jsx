import React from "react";

function renderNode(data) {
    if (data && data.length == 0) { // 无节点情况
        return <div>无任何节点</div>
    }
    // 渲染子节点
    return data.map(item => <zf-tree-node data={item}></zf-tree-node>);
}