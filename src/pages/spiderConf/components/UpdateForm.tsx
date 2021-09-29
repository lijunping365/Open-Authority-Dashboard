import React, {useState} from 'react';
import {Form, Button, Input, Modal, Select, Col, Row} from 'antd';
import type {Spider} from "../data";

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<Spider>) => void;
  onSubmit: (values: Partial<Spider>) => void;
  updateModalVisible: boolean;
  values: Partial<Spider>;
}
const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const methods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
]

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [spiderType, setSpiderType] = useState(0);
  const [method, setMethod] = useState(0);
  const [charset, setCharset] = useState(0);

  const {
    onSubmit: handleSubmit,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleUpdate = async () => {
    const fieldsValue: any = await form.validateFields();
    handleSubmit({
      ...values,
      ...fieldsValue,
      spiderType,
      method,
      charset
    });
  };

  const handleSpiderTypeSelect = (op: number) => {
    setSpiderType(op);
  };

  const handleMethodSelect = (op: number) => {
    setMethod(op);
  };

  const handleCharsetSelect = (op: number) => {
    setCharset(op);
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
          headers: values.headers,
          charset: values.charset,
          retry: values.retry,
          timeout: values.timeout,
          acceptStatCode: values.acceptStatCode,
          spiderType: values.spiderType,
          spiderData: values.spiderData,
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
              rules={[{ required: true, message: '请选择请求方式！' }]}
            >
              <Select defaultValue={values.method} onChange={handleMethodSelect}>
                {methods.map(m => (
                  <Option value={m}>{m}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="charset"
              label="编码格式"
              rules={[{ required: true, message: '请选择编码格式！' }]}
            >
              <Select defaultValue={values.charset} onChange={handleCharsetSelect}>
                <Option value={0}>GBK</Option>
                <Option value={1}>UTF-8</Option>
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
              label="重试次数"
              rules={[{ required: true, message: '请输入重试次数！' }]}
            >
              <Input placeholder="请输入重试次数" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="acceptStatCode"
              label="接受代码"
              rules={[{ required: true, message: '请输入接受代码！' }]}
            >
              <Input placeholder="请输入接受代码" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="spiderType"
              label="爬取方式"
              rules={[{ required: true, message: '请选择爬取方式！' }]}
            >
              <Select onChange={handleSpiderTypeSelect}>
                <Option value={0}>Page</Option>
                <Option value={1}>Json</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="spiderData"
              label="抽取规则"
              rules={[{ required: true, message: '请输入抽取规则！' }]}
            >
              <Input placeholder="请输入抽取规则" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="headers"
              label="请求头"
              rules={[{ required: true, message: '请输入请求头！' }]}
            >
              <Input placeholder="请输入请求头" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
