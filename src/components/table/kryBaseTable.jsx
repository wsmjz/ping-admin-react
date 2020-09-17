import React from 'react';
import { Table, Pagination } from 'antd';
import { BaseComponent } from 'kryfe-lib';
import LoyaltyPagination from '../LoyaltyPagination/loyaltyPagination';
/* 国际化 start */
import { IntlHelper } from 'kryfe-lib';
import messages from '../../messages';
const intl = IntlHelper.getIntlContext();
/* end */

import './kryBaseTable.less';
/**
 * 使用方法同antd table，自动把pagination底部居中，加上了`共${totalPage}页 共${pagination.total}条`
 * @argument tableCenter 是否让表格中内容居中显示 默认值: false
 * @argument pagination.useAntdPagination 是否使用蚂蚁金服默认分页
 * @export
 * @class KryBaseTable
 * @extends {BaseComponent}
 */
export default class KryBaseTable extends BaseComponent {
  render() {
    const { pagination } = this.props;
    const { footerInside, tableCenter } = this.props;
    const styleName = tableCenter ? 'kryBaseTableCenter' : 'kryBaseTable';
    if (pagination) {
      if (
        typeof pagination === 'object' &&
        !('useAntdPagination' in pagination)
      ) {
        pagination.useAntdPagination = true;
      }
      const totalPage = Math.ceil(pagination.total / pagination.pageSize);
      pagination.showTotal = () => {
        if (pagination.total) {
          return (
            <span>{`${intl.formatMessage(
              messages.Total,
            )} ${totalPage} ${intl.formatMessage(
              messages.page,
            )}  ${intl.formatMessage(messages.Total)} ${
              pagination.total
            } ${intl.formatMessage(messages.line)}`}</span>
          );
        }
        return null;
      };
      if (!footerInside) {
        return (
          <div styleName={styleName}>
            <Table
              {...this.props}
              pagination={
                pagination.total && pagination.useAntdPagination
                  ? pagination
                  : false
              }
            />
            {!pagination.useAntdPagination ? (
              <LoyaltyPagination {...pagination} />
            ) : null}
          </div>
        );
      }
      return (
        <div styleName={styleName}>
          <Table {...this.props} pagination={false} />
          {footerInside}
          {pagination.total && pagination.useAntdPagination ? (
            <Pagination {...pagination} />
          ) : (
            <LoyaltyPagination {...pagination} />
          )}
        </div>
      );
    }
    return (
      <div styleName={styleName}>
        <Table {...this.props} />
      </div>
    );
  }
}

KryBaseTable.defaultProps = {
  tableCenter: false,
};
