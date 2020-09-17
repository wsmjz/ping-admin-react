import React, { Component } from "react";
import { Table } from "antd";
import UploadExcelComponent from "./../../components/UploadExcel/index";
import { array } from "prop-types";
class UploadExcel extends Component {
  state = {
    tableData: [],
    tableHeader: [],
  };
  handleSuccess = ({ results, header }) => {
      
      let array = results.slice(1, 3)
      let arr = array.map((item, index) => {
        return {
            id: index,
            msg: item
        }
      })
      console.log(arr)
      
    this.setState({
      tableData: results,
      tableHeader: header,
    });
  };
  render() {
    return (
      <div className="app-container">
        <UploadExcelComponent uploadSuccess={this.handleSuccess} />
        <br />
        <Table
          bordered
          columns={this.state.tableHeader.map((item) => ({
            title: item,
            dataIndex: item,
            key: item,
            width: 195,
            align: "center",
          }))}
          dataSource={this.state.tableData}
        />
      </div>
    );
  }
}

export default UploadExcel;