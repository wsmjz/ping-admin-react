import React from "react";
import { Table, Divider, Tag, } from 'antd';
import { Details } from "./details";
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 12,
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 22,
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tags: ['cool', 'teacher'],
  },
];
export class ComplexTable extends React.Component {
  constructor(props) {
    super(props)
  }
  state = { // 与写到 constructor 中的区别
    page: 1,
    onlyId: 1,
    visible: false // 消息列表进入应为true 唯一ID 认证
  }
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={this.showModal.bind(this, record.age)}>查看 {record.age}</a>
          <Divider type="vertical" />
          <a onClick={this.showModal}>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </span>
      )
    },
  ];
  showModal = (id) => {
    this.setState({
      visible: true,
      onlyId: id
    });
  };

  getList1 = (val) => {
    console.log(val, '子组件的值11')
  }
  // function aa() {}
  // let aa = function() {}
  getList2(val) {
    console.log(val, '子组件的值22')
  }
  // aa: function() {}
  current(num) {
    // this.setState({ page: num })
  }
  render() {
    return (
      <div>
        <h1>搜索 / 详情页返回保持当前页面状态</h1>
        <h2>分页公共抽离</h2>
        <h2>消息列表页直接跳转进入详情页（详情页需要有一个id路由）</h2>
        <Table columns={this.columns} dataSource={data} />
        <div>
          <button onClick={() => this.current(1)}>1</button>
          <button onClick={() => this.current(2)}>2</button>
          <span>选择的页面: {this.state.page}</span>
          <Details onlyId={this.state.onlyId} id={1} all={this} visible={this.state.visible}></Details>
        </div>
      </div>
    )
  }
}