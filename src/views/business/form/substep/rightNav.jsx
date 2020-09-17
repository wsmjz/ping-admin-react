import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import './index.less';

const MemberRightLiet = [
  {
    path: 'right',
    name: '权益概览',
  },
  {
    path: 'upgrade',
    name: '升级设置',
  },
  {
    path: 'demotion',
    name: '降级设置',
  },
  {
    path: 'integral',
    name: '积分规则',
  },
  {
    path: 'price',
    name: '会员价',
  },
  {
    path: 'day',
    name: '会员日',
  },
  {
    path: 'stored',
    name: '储值规则',
  },
  {
    path: 'custom',
    name: '自定义',
  },
];
class rightNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editLimits: false, // 编辑权限,
      editSpecial: false, // 编辑权限,
      editMemberDay: false, // 会员日编辑权限
    };
  }

  componentWillMount() {
    if (this.props.permissionCode) {
      this.handlePermissionCode(this.props.permissionCode);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.permissionCode !== nextProps.permissionCode) {
      this.handlePermissionCode(nextProps.permissionCode);
    }
  }

  handlePermissionCode(permission) {
    const editLimitsString = 'loyalty:customerLevel:rightEdit';
    const editStoredString = 'loyalty:customerLevel:storedEdit';
    const editSpecialString = 'loyalty:customerLevel:priceTemplateshopEdit';
    const editMemberDayString = 'loyalty:customerLevel:memberDayEdit';
    // const permissionCode = permission.get('permissionCode').toJS(); Map 结构
    const permissionCode = permission.id
    this.setState({
      editLimits: permissionCode.indexOf(editLimitsString) > -1, // 编辑权限,
      editSpecial: permissionCode.indexOf(editSpecialString) > -1, // 编辑权限,
      editMemberDay: permissionCode.indexOf(editMemberDayString) > -1, // 会员日编辑权限,
      editStroed: permissionCode.indexOf(editStoredString) > -1, // 会员日编辑权限,
    });
  }

  switchSetting(url) {
    url = `#/member-${url}`;
    const { isEdit } = this.props;
    if (true) {
      Modal.confirm({
        title: '提示',
        content: '您作出的编辑未保存,确认离开?',
        onOk: () => {
          window.location.href = url;
        },
      });
    } else {
      window.location.href = url;
    }
  }

  render() {
    const { path } = this.props;
    const { editLimits, editSpecial, editMemberDay, editStroed } = this.state;
    console.log('editSpecial', editSpecial);
    return (
      <div styleName="anchor_layout">
        <div styleName="layout_content">
          {MemberRightLiet.map((item, index) => {
              let aa = 1;
              aa = 2
            let permission =
              item.path === 'price' ? editSpecial || editLimits : editLimits;
            permission =
              item.path === 'day' ? editMemberDay || editLimits : permission;
            permission = item.path === 'right' ? true : permission;
            permission =
              item.path === 'stored' ? editStroed || editLimits : permission;
            return (
              <div
                onClick={() => {
                    this.switchSetting(item.path)
                //   permission ? this.switchSetting(item.path) : '';
                }}
                /* eslint-disable no-nested-ternary */
                styleName={
                  path === item.path
                    ? permission
                      ? 'current'
                      : 'disabled'
                    : permission
                    ? ''
                    : 'disabled'
                }
                key={index.toString()}
              >
                <span styleName={path === item.path ? '_bcolor' : '_border'} />
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return ({
        //   permissionCode: state.baseApi.loginInfo.get('permissionCollection'),
            permissionCode: {
                id: 'sddw123sw'
            }
        });
}

export default connect(mapStateToProps, null)(rightNav);
