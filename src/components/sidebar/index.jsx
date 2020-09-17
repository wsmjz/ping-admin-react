import React from 'react';
import { Button, Menu, Icon } from 'antd';
// import {
//     AppstoreOutlined,
//     MenuUnfoldOutlined,
//     MenuFoldOutlined,
//     PieChartOutlined,
//     DesktopOutlined,
//     ContainerOutlined,
//     MailOutlined,
// } from '@ant-design/icons';
const { SubMenu } = Menu;
export class Sidebar extends React.Component {
    state = {
        collapsed: false,
    };
    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div style={{ width: 256, marginRight: 30 }}>
              <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)} */}
              </Button>
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="1">
                  <a href="#/">引导页</a>
                </Menu.Item>
                <Menu.Item key="2">
                  <a href="#/home">首页</a>
                </Menu.Item>
                <Menu.Item key="3">
                  <a href="#/marketing">用户设置</a>
                </Menu.Item>
                <Menu.Item key="4">
                  权限页
                </Menu.Item>
                <SubMenu key="sub1" title="业务模块">
                  <Menu.Item key="sub11">登陆</Menu.Item>
                  <SubMenu key="sub12" title="列表.表格">
                    <Menu.Item key="sub121">
                        <a href="#/business/table-complex">复杂.搜索</a>
                    </Menu.Item>
                    <Menu.Item key="sub122">卡片列表</Menu.Item>
                    <Menu.Item key="sub123">树结构</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub13" title="表单">
                    <Menu.Item key="sub131">
                      <a href="#/business/form/substep">分步表单</a>
                    </Menu.Item>
                    <Menu.Item key="sub132">
                      <a href="#/business/form/big">复杂大表单</a>
                    </Menu.Item>
                    <Menu.Item key="sub133">
                      <a href="#/business/form/trends">动态表单</a>
                    </Menu.Item>
                    <Menu.Item key="sub134">
                      <a href="">可视化表单</a>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="sub14">表单打印</Menu.Item>
                  <Menu.Item key="sub16">富文本编辑</Menu.Item>
                  <Menu.Item key="sub17">组织架构</Menu.Item>
                  <Menu.Item key="sub18">消息通知</Menu.Item>
                  <Menu.Item key="sub19">进度解析</Menu.Item>
                  <Menu.Item key="sub110">摄像头</Menu.Item>
                  <Menu.Item key="sub111">Excel</Menu.Item>
                  <Menu.Item key="sub112">Pdf</Menu.Item>
                  <Menu.Item key="sub113">流程图</Menu.Item>
                  <Menu.Item key="sub114">剪贴版</Menu.Item>
                  <Menu.Item key="sub115">视频流</Menu.Item>
                  <Menu.Item key="sub116">路由懒加载</Menu.Item>
                  <Menu.Item key="sub117">骨架屏</Menu.Item>
                  <Menu.Item key="sub118">无限列表</Menu.Item>
                  <Menu.Item key="sub119">统一请求错误处理</Menu.Item>
                  <Menu.Item key="sub120">
                    <a href="#/excel/upload">excel转化json</a>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title="图表可视化">
                  <Menu.Item key="sub21">SVG</Menu.Item>
                  <Menu.Item key="sub22">canvans</Menu.Item>
                  <SubMenu key="sub23" title="Echarts">
                    <Menu.Item key="sub231">动态宽度</Menu.Item>
                    <Menu.Item key="sub232">组合类型</Menu.Item>
                  </SubMenu>
                </SubMenu>
                <Menu.Item key="5">
                  换肤
                </Menu.Item>
                <Menu.Item key="6">
                  国际化
                </Menu.Item>
                <Menu.Item key="7">
                  错误页面
                </Menu.Item>
                <Menu.Item key="8">
                  错误日志上报
                </Menu.Item>
                <Menu.Item key="9">
                  历史记录
                </Menu.Item>
                <Menu.Item key="10">
                  统一状态管理
                </Menu.Item>
                <Menu.Item key="11">
                  关于
                </Menu.Item>
                <Menu.Item key="12">
                  交流
                </Menu.Item>
              </Menu>
            </div>
        )
    }
}