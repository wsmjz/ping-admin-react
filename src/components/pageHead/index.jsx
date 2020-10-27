import React from "react";
import {Crumb} from '../crumb/index';
import './index.css'
export function PageHeader() {
  return (
    <div className="page-header">
      <div>
      <Crumb></Crumb>
      </div>
      <ul>
        <li>首页</li>
        <li>用户设置</li>
        <li>权限业</li>
      </ul>
    </div>
  )
}