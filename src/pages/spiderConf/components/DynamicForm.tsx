import React from 'react';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Space} from "antd";



const header = [
  "Accept",
  "Content-Type",
  "Referer",
  "User-Agent",
  "Cookie"
]

const userAgent = [
  {"label" : "USER_AGENT_CHROME", "value" : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"},
  {"label" : "USER_AGENT_FIREFOX_45", "value" : "Mozilla/5.0 (Windows NT 6.1; rv:45.0) Gecko/20100101 Firefox/45.0"},
  {"label" : "USER_AGENT_IE", "value" : "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko"},
  {"label" : "USER_AGENT_EDGE", "value" : "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586"}
]

const contentType = [
  {"label" : "USER_AGENT_CHROME", "value" : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"},
  {"label" : "USER_AGENT_FIREFOX_45", "value" : "Mozilla/5.0 (Windows NT 6.1; rv:45.0) Gecko/20100101 Firefox/45.0"},
  {"label" : "USER_AGENT_IE", "value" : "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko"},
  {"label" : "USER_AGENT_EDGE", "value" : "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586"}
]

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14},
};

export default () => {

  return (
    <Form.List name="headers">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'name']}
                fieldKey={[fieldKey, 'name']}
                rules={[{ required: true, message: 'Missing first name' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'value']}
                fieldKey={[fieldKey, 'value']}
                rules={[{ required: true, message: 'Missing last name' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
