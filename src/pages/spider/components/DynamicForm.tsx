import React from 'react';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Space, AutoComplete} from "antd";

const headers = [
  {value: "Accept"},
  {value: "Content-Type"},
  {value: "Referer"},
  {value: "User-Agent"},
  {value: "Cookie"}
]

const contentTypes = [
  {value : "application/json"},
  {value : "application/x-www-form-urlencoded"},
  {value : "text/xml"},
  {value : "text/plain"},
  {value : "text/javascript"},
  {value : "text/html"},
  {value : "multipart/form-data"}
]

export default () => {
  return (
    <Form.List name="headers">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8, marginLeft: 10}} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'checked']}
                fieldKey={[fieldKey, 'checked']}
                valuePropName={'checked'}
                initialValue={true}
              >
                <Checkbox />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'name']}
                fieldKey={[fieldKey, 'name']}
                rules={[{ required: true, message: '请输入name' }]}
              >
                <AutoComplete
                  style={{ width: 120 }}
                  options={headers}
                  placeholder="name"
                  filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              :
              <Form.Item
                {...restField}
                name={[name, 'value']}
                fieldKey={[fieldKey, 'value']}
                rules={[{ required: true, message: '请输入value' }]}
              >
                <AutoComplete
                  style={{ width: 252 }}
                  options={contentTypes}
                  placeholder="value"
                  filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{width: 415, marginLeft: 10}}>
              添加请求头
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
