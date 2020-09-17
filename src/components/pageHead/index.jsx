import React from 'react';
import { BaseComponent } from 'kryfe-lib';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
import './index.less';

const MLink = props => {
  const reg = new RegExp(/^http:\/\//);
  if (reg.test(props.to)) {
    return (
      <a href={props.to} styleName={props.styleClass}>
        {props.children}
      </a>
    );
  }
  return (
    <Link to={props.to} styleName={props.styleClass}>
      {props.children}
    </Link>
  );
};

export default class PageHead extends BaseComponent {
  render() {
    const { titleNames, userDefine, backByHistory, describeEle } = this.props;
    return (
      <div styleName="head">
        <div styleName="left">
          {!backByHistory && titleNames.length > 1 && (
            <div styleName="left color">
              <MLink
                to={titleNames[titleNames.length - 2].url}
                styleClass="back"
              >
                <Icon type="left" />
              </MLink>
              <span styleName="division" />
            </div>
          )}
          {backByHistory && (
            <div styleName="left color">
              <a
                styleName="back"
                onClick={() => {
                  if (typeof this.props.backByHistory === 'function') {
                    this.props.backByHistory();
                  } else {
                    window.history.back();
                  }
                }}
              >
                <Icon type="left" />
              </a>
              <span styleName="division" />
            </div>
          )}
          <Breadcrumb styleName="left breadcrumb">
            {titleNames.map((item, index) => (
              <Breadcrumb.Item key={index.toString()}>
                {titleNames.length - 1 === index || item.absolute ? (
                  <a
                    styleName={
                      /* eslint-disable */
                      item.absolute
                        ? 'link'
                        : titleNames.length > 1
                        ? 'text'
                        : 'text_one'
                    }
                    href={item.absolute ? item.url : null}
                  >
                    {item.title}
                  </a>
                ) : (
                  <MLink to={item.url} styleClass="link">
                    {item.title}
                  </MLink>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {/* <span styleName="describe">
            {titleNames[titleNames.length - 1].describe}
          </span> */}
          <span
            styleName="describe"
            dangerouslySetInnerHTML={{
              __html: titleNames[titleNames.length - 1].describe,
            }}
          ></span>
          <span styleName="titleNotice">{describeEle}</span>
        </div>
        <div styleName="right">
          {userDefine &&
            (typeof userDefine === 'function' ? userDefine() : userDefine)}
        </div>
      </div>
    );
  }
}

PageHead.propTypes = {
  titleNames: PropTypes.array.isRequired,
  userDefine: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  describeEle: PropTypes.element,
};
