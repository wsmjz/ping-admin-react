import React from 'react';
import { Row } from 'antd';
/**
 * titleName 为一级标题，显示在最顶端
 * midTitle  为二级标题 默认值为["基本信息", "营销方式", "目标人群", "消息通知"] ，、
 * 如果二级标题顺序一致，则可以不用传递。
 * 一个子节点对应一个二级标题，调用示例
 *         示例中其实可以不传递midTitle
 * <MarketingPlanLayout titleName="精准营销" midTitle=["基本信息", "营销方式"]>
      <div>
          test1
      </div>
      <div>
         test2
      </div>
    </MarketingPlanLayout>
 * @export
 * @class MarketingPlanLayout
 * @extends {BaseComponent}
 */

export default class MarketingPlanLayout extends React.Component {
  constructor(props) {
    super(props);
    this.aa = ''
  }

  render() {
    return (
      <Row>
        {React.Children.map(this.props.children, (children, index) => {
          return (
            <Row>
              <h3
                style={{
                  height: '16px',
                  margin: '32px 0 1em 32px',
                  borderLeft: '3px solid #108ee9',
                  paddingLeft: '0.5em',
                  lineHeight: '16px',
                }}
              >
                {this.props.midTitle && this.props.midTitle[index]}
                {this.props.titleSrc && this.props.titleSrc[index] ? (
                  <span
                    style={{
                      color: '#bfbfbf',
                      fontSize: '10px',
                      marginLeft: '2em',
                      fontWeight: '400',
                    }}
                  >
                    {this.props.titleSrc[index]}
                  </span>
                ) : null}
              </h3>
              {children}
            </Row>
          );
        })}
      </Row>
    );
  }
}

MarketingPlanLayout.defaultProps = {
  midTitle: [
    '基本信息',
    '营销方式',
    '目标人群',
    '自动通知',
  ],
};
