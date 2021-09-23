import React, {useState} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Space} from 'antd';
import type {Spider} from "../data";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

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
  const [proxyType, setSpiderType] = useState(0);
  const {
    modalVisible,
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
  } = props;

  const handleNext = async () => {
    const fieldsValue: any = await form.validateFields();
    handleCreate({
      ...fieldsValue,
      type: proxyType
    });
  };

  const handleSelect = (op: number) => {
    setSpiderType(op);
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleCreateModalVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="新建代理"
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
              name="headers"
              label="请求头"
              rules={[{ required: true, message: '请输入请求头！' }]}
            >
              <Input placeholder="请输入请求头" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="cookies"
              label="Cookies"
              rules={[{ required: true, message: '请输入Cookies！' }]}
            >
              <Input placeholder="请输入Cookies" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="charset"
              label="编码格式"
              rules={[{ required: true, message: '请选择编码格式！' }]}
            >
              <Select defaultValue={0} onChange={handleSelect}>
                <Option value={0}>GBK</Option>
                <Option value={1}>UTF-8</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="method"
              label="请求方式"
              rules={[{ required: true, message: '请选择请求方式！' }]}
            >
              <Select defaultValue={0} onChange={handleSelect}>
                <Option value={0}>Get</Option>
                <Option value={1}>Post</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="retry"
              label="重试次数"
              rules={[{ required: true, message: '请输入重试次数！' }]}
            >
              <Input placeholder="请输入重试次数" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="timeout"
              label="超时时间"
              rules={[{ required: true, message: '请输入超时时间！' }]}
            >
              <Input placeholder="请输入超时时间" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="acceptStatCode"
              label="接受代码"
              rules={[{ required: true, message: '请选择或输入接受代码！' }]}
            >
              <Select mode="tags" defaultValue={200} onChange={handleSelect}>
                <Option value={200}>200</Option>
                <Option value={400}>400</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="spiderType"
              label="爬取方式"
              rules={[{ required: true, message: '请选择爬取方式！' }]}
            >
              <Select defaultValue={0} onChange={handleSelect}>
                <Option value={0}>Page</Option>
                <Option value={1}>Json</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>


        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...formItemLayout}
                    label="抽取规则"
                    name={[name, 'extractRule']}
                    fieldKey={[fieldKey, 'extractRule']}
                    rules={[{ required: true, message: '请输入抽取规则' }]}
                  >
                    <Input placeholder="抽取规则" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="字段名称"
                    name={[name, 'field']}
                    fieldKey={[fieldKey, 'field']}
                    rules={[{ required: true, message: '请输入字段名称' }]}
                  >
                    <Input placeholder="字段名称" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="字段描述"
                    name={[name, 'description']}
                    fieldKey={[fieldKey, 'description']}
                    rules={[{ required: true, message: '请输入字段描述' }]}
                  >
                    <Input placeholder="字段描述" />
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
      </Form>
    </Modal>
  );
};

export default CreateForm;
