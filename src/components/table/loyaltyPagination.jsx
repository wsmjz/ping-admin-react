import React from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';

export default class LoyaltyPagination extends React.Component {

  constructor(){
    super();
  }

  calculatePage = (p) => {
    let pageSize = p;
    if (typeof pageSize === 'undefined') {
      pageSize = this.props.pageSize;
    }
    return Math.floor((this.props.total - 1) / pageSize) + 1;
  }

  hasPrev = () => {
    return this.props.current > 1;
  }

  hasNext = () => {
    return this.props.current < this.calculatePage();
  }
  
  prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.props.current - 1 );
    }
  }

  next = () => {
    if (this.hasNext()) {
      this.handleChange(this.props.current + 1 );
    }
  }

  handleChange = (p) => {
    this.props.onChange && this.props.onChange(p);
  }

  getFirstItem = ()=>{
    const allPages = this.calculatePage();
    const { current, pageBufferSize } = this.props;
    let left = Math.max(1, current - pageBufferSize);
    let right = Math.min(current + pageBufferSize, allPages);
    if (current - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }

    if (allPages - current <= pageBufferSize) {
      left = allPages - pageBufferSize * 2;
    }
    return {
      left,
      right
    }
  }

  render() {
    if (this.props.hideOnSinglePage === true && this.props.total <= this.props.pageSize) {
      return null;
    }
    const props = this.props;
    const prefixCls = props.prefixCls;
    const allPages = this.calculatePage();

    let totalText = null;
    const pagerList = [];

    if (props.showTotal) {
      totalText = (
        <li className={`${prefixCls}-total-text`}>
          {props.showTotal(
            props.total,
            props.pageSize
          )}
        </li>
      );
    }
    if (allPages <= 5 + props.pageBufferSize * 2) {
      for (let i = 1; i <= allPages; i++) {
        const active = props.current === i;
        pagerList.push(
          <Pager
            rootPrefixCls={prefixCls}
            onClick={this.handleChange}
            key={i}
            page={i}
            active={active}
          />
        );
      }
    }else{
      const { left, right } = this.getFirstItem();
      for (let i = left; i <= right; i++) {
        const active = props.current === i;
        pagerList.push(
          <Pager
            rootPrefixCls={prefixCls}
            onClick={this.handleChange}
            key={i}
            page={i}
            active={active}
          />
        );
      }
    }
    const prevDisabled = !this.hasPrev();
    const nextDisabled = !this.hasNext();

    return (
      <ul
        className={`${prefixCls} ant-table-pagination ${props.className}`}
        style={props.style}
        unselectable="unselectable"
      >
        {totalText}
        <li
          onClick={this.prev}
          tabIndex={prevDisabled ? null : 0}
          className={`${!prevDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-prev`}
          aria-disabled={prevDisabled}
        >
          <a className={`${prefixCls}-item-link`} />
        </li>
        {pagerList}
        <li
          onClick={this.next}
          tabIndex={nextDisabled ? null : 0}
          className={`${!nextDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-next`}
          aria-disabled={nextDisabled}
        >
         <a className={`${prefixCls}-item-link`} />
        </li>
      </ul>
    );
  }
}


LoyaltyPagination.defaultProps = {
  current: 1,
  pageSize: 10,
  prefixCls: 'ant-pagination',
  className: '',
  pageBufferSize: 2,
  hideOnSinglePage: true
}