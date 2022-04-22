import React, {useState} from 'react';
import {Form, Button, Input, Modal, Select, Col, Row, Space, AutoComplete, Checkbox} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Headers, ContentTypes, Methods, ExpressType} from "../common"

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.Spider>) => void;
  onSubmit: (values: Partial<API.Spider>) => void;
  updateModalVisible: boolean;
  values: Partial<API.Spider>;
}
const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14},
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [method, setMethod] = useState(Methods[0]);

  const {
    onSubmit: handleSubmit,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleUpdate = async () => {
    const fieldsValue: any = await form.validateFields();
    const {headers} = fieldsValue;
    const {params} = fieldsValue;
    const {extractRule} = fieldsValue;
    handleSubmit({
      ...values,
      ...fieldsValue,
      method,
      headers: headers ? JSON.stringify(headers): "",
      params: params ? JSON.stringify(params): "",
      extractRule: extractRule ? JSON.stringify(extractRule): "",
    });
  };

  const handleMethodSelect = (op: string) => {
    setMethod(op);
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleUpdate()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={900}
      destroyOnClose
      title="编辑爬虫"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: values.id,
          name: values.name,
          url: values.url,
          method: values.method,
          params: values.params ? JSON.parse(values.params) : [],
          headers: values.headers ? JSON.parse(values.headers) : [],
          extractRule: values.extractRule ? JSON.parse(values.extractRule) : [],
          retryTimes: values.retryTimes,
          sleepTime: values.sleepTime
        }}
      >
        <Row>
          <Col span={12}>
            <FormItem
              name="name"
              label="爬虫名称"
              rules={[{ required: true, message: '请输入爬虫名称！' }]}
            >
              <Input placeholder="请输入爬虫名称" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="url"
              label="目标url"
              rules={[{ required: true, message: '请输入爬虫url！' }]}
            >
              <Input placeholder="请输入爬虫url" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="method"
              label="请求方式"
              rules={[{ required: true, message: '请选择请求方式！' }]}
            >
              <Select defaultValue={values.method} onChange={handleMethodSelect}>
                {Methods.map(m => (
                  <Option value={m}>{m}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="retryTimes"
              label="重试次数"
            >
              <Input placeholder="请输入重试次数" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="sleepTime"
              label="间隔时间"
            >
              <Input placeholder="请输入间隔时间" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="params"
              label="请求参数"
            >
              <Form.List name="params">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'name']}
                        >
                          <Input placeholder="name" style={{'width':130}}/>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'value']}
                        >
                          <Input placeholder="value" style={{'width':260}}/>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加一行
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="headers"
              label="设请求头"
            >
              <Form.List name="headers">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'name']}
                        >
                          <AutoComplete
                            style={{ width: 130 }}
                            options={Headers}
                            placeholder="name"
                            filterOption={(inputValue, option) =>
                              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'value']}
                        >
                          <AutoComplete
                            style={{ width: 260 }}
                            options={ContentTypes}
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
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加一行
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="extractRule"
              label="抽取规则"
            >
              <Form.List name="extractRule">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Space key={key} align="baseline">
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'unique']}
                          valuePropName="checked"
                        >
                          <Checkbox style={{ width: 60 }}>主键</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'expressionType']}
                          rules={[{ required: true, message: '请选择解析方式' }]}
                        >
                          <Select style={{ width: 120 }}>
                            {ExpressType.map(m => (
                              <Option value={m}>{m}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'expressionValue']}
                          rules={[{ required: true, message: '请输入解析规则' }]}
                        >
                          <Input placeholder='请输入规则' style={{ width: 240 }}/>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'fieldName']}
                          rules={[{ required: true, message: '请输入属性名称' }]}
                        >
                          <Input placeholder='请输入属性名称' style={{ width: 120 }}/>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'multi']}
                          valuePropName="checked"
                        >
                          <Checkbox style={{ width: 60 }}>循环</Checkbox>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加一行
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Modal>
  );
};

export default UpdateForm;
