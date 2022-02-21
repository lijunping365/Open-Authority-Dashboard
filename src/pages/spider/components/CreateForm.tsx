import React, {useState} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Space} from 'antd';
import type {Spider} from "../data";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import TextArea from 'antd/lib/input/TextArea';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (values: Partial<Spider>) => void;
  onCancel: (flag?: boolean, formVals?: Partial<Spider>) => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16},
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14},
};

const FormItem = Form.Item;
const { Option } = Select;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [parseType, setParseType] = useState('json');
  const [method, setMethod] = useState('get');
  const {
    modalVisible,
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
  } = props;

  const handleFinish = async () => {
    const fieldsValue: any = await form.validateFields();
    const formData = {
      ...fieldsValue,
      method
    }
    const content = [];
    const {params} = fieldsValue;
    const {headers} = fieldsValue;
    let {rules} = fieldsValue;
    if(params && params.length !== 0){
      formData.params = JSON.stringify(params);
    }
    if(headers && headers.length !== 0){
      formData.headers = JSON.stringify(headers);
    }
    content.push({'name': 'resultClass', 'value': rules})
    content.push({'name': 'parseType', 'value': parseType})
    formData.content = JSON.stringify(content);
    
    console.log(formData);
    handleCreate(formData);
  };

  const handleSelectMethod = (op: number) => {
    setMethod(op === 0 ? 'get': 'post');
  };

  const handleSelectSpider = (op: number) => {
    setParseType(op === 0 ? 'page' : 'json');
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleCreateModalVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleFinish()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="新建爬虫"
      visible={modalVisible}
      onCancel={() => handleCreateModalVisible()}
      footer={renderFooter()}
      width={900}
    >
      <Form
        {...formLayout}
        form={form}
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
              label="url"
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
            >
              <Select defaultValue={0} onChange={handleSelectMethod}>
                <Option value={0}>Get</Option>
                <Option value={1}>Post</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="parseType"
              label="爬取方式"
            >
              <Select defaultValue={1} onChange={handleSelectSpider}>
                <Option value={1}>Json</Option>
                <Option value={0}>Page</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="rules"
              label="爬虫规则"
              rules={[{ required: true, message: '请输入爬虫规则！' }]}
            >
              <TextArea placeholder="请输入爬虫规则"/>
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
                          <Input placeholder="name" style={{'width':200}}/>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'value']}
                        >
                          <Input placeholder="value" style={{'width':400}}/>
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
                          <Input placeholder="name" style={{'width':200}}/>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'value']}
                        >
                          <Input placeholder="value" style={{'width':400}}/>
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

export default CreateForm;
