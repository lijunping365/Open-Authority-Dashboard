import React, {useState} from 'react';
import {Form, Button, Input, Modal, Select} from 'antd';
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

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [proxyType, setSpiderType] = useState(0);

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue: any = await form.validateFields();
    handleUpdate({
      ...values,
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
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
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
          cookies: values.cookies,
          charset: values.charset,
          retry: values.retry,
          timeout: values.timeout,
          acceptStatCode: values.acceptStatCode,
          spiderType: values.spiderType,
          spiderData: values.spiderData,
        }}
      >
        <FormItem
          name="name"
          label="爬虫名称"
          rules={[{ required: true, message: '请输入爬虫名称！' }]}
        >
          <Input placeholder="请输入爬虫名称" />
        </FormItem>

        <FormItem
          name="url"
          label="url"
          rules={[{ required: true, message: '请输入爬虫url！' }]}
        >
          <Input placeholder="请输入爬虫url" />
        </FormItem>

        <FormItem
          name="method"
          label="请求方式"
          rules={[{ required: true, message: '请选择请求方式！' }]}
        >
          <Select defaultValue={values.method} style={{ width: 120 }} onChange={handleSelect}>
            <Option value={0}>Get</Option>
            <Option value={1}>Post</Option>
          </Select>
        </FormItem>

        <FormItem
          name="headers"
          label="请求头"
          rules={[{ required: true, message: '请输入请求头！' }]}
        >
          <Input placeholder="请输入请求头" />
        </FormItem>

        <FormItem
          name="cookies"
          label="Cookies"
          rules={[{ required: true, message: '请输入Cookies！' }]}
        >
          <Input placeholder="请输入Cookies" />
        </FormItem>

        <FormItem
          name="charset"
          label="编码格式"
          rules={[{ required: true, message: '请输入编码格式！' }]}
        >
          <Input placeholder="请输入编码格式" />
        </FormItem>

        <FormItem
          name="retry"
          label="重试次数"
          rules={[{ required: true, message: '请输入重试次数！' }]}
        >
          <Input placeholder="请输入重试次数" />
        </FormItem>

        <FormItem
          name="timeout"
          label="重试次数"
          rules={[{ required: true, message: '请输入重试次数！' }]}
        >
          <Input placeholder="请输入重试次数" />
        </FormItem>

        <FormItem
          name="acceptStatCode"
          label="接受代码"
          rules={[{ required: true, message: '请输入接受代码！' }]}
        >
          <Input placeholder="请输入接受代码" />
        </FormItem>

        <FormItem
          name="spiderType"
          label="爬取方式"
          rules={[{ required: true, message: '请选择爬取方式！' }]}
        >
          <Select defaultValue={values.method} style={{ width: 120 }} onChange={handleSelect}>
            <Option value={0}>Page</Option>
            <Option value={1}>Json</Option>
          </Select>
        </FormItem>

        <FormItem
          name="spiderData"
          label="抽取规则"
          rules={[{ required: true, message: '请输入抽取规则！' }]}
        >
          <Input placeholder="请输入抽取规则" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
