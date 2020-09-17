# 备注
- pages/comm/component/msgSend/sendMsgCommercial 与 pages/comm/reducers/index 的链接
- 大项目整合 项目间传值
- 流程
```js
路由：src/routes/marketingPlan/index.js => src/routes/marketingPlan/Bundles.jsx(找到组件路径)  => src/routes/marketingPlan/edit/index.jsx => ./planFactoryConfig.js(配置组件模块)
```
- 全局提示 `获取常用人群标签失败` pages/comm/reducers/index
- immutable { fromJS } state.get .set .setIn
   - 统一管理state数据
   - Immutable.JS 旨在以一种高性能的方式提供不可变，以克服 JavaScript 不可变的局限性
- 嵌套路由，动态路由

## 模块
- immutable