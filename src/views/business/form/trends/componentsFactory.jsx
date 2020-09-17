import React from 'react';
import { Form, Row, Col } from "antd";
function CreateComponent(label, id) {
    return (
      <Row key="id">
          <Col span = {21}>
            <Form.Item label={label.name} required={true}
              labelCol={{span:4}} wrapperCol={{span:20}}>
            </Form.Item>
          </Col>
          {
            <Col span = {3} style={{ cursor: 'pointer', marginTop: '8px' }}>
              删除
            </Col>
          }
      </Row>
    );
  }
  
  export default {
    CreateComponent
  };