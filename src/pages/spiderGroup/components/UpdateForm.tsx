import React, {useState} from 'react';
import {Form, Button, Input, Modal, Select} from 'antd';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.SpiderProxy>) => void;
  onSubmit: (values: Partial<API.SpiderProxy>) => void;
  updateModalVisible: boolean;
  values: Partial<API.SpiderProxy>;
}
const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [proxyType, setProxyType] = useState(0);

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
    setProxyType(op);
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
      title="编辑代理"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: values.id,
          host: values.host,
          port: values.port,
          scheme: values.scheme,
          username: values.username,
          password: values.password,
        }}
      >
        <FormItem
          name="host"
          label="代理 IP"
          rules={[{ required: true, message: '请输入代理IP！' }]}
        >
          <Input placeholder="请输入代理IP" />
        </FormItem>

        <FormItem
          name="port"
          label="代理端口"
          rules={[{ required: true, message: '请输入代理端口！' }]}
        >
          <Input placeholder="请输入代理端口" />
        </FormItem>

        <FormItem
          name="scheme"
          label="代理类型"
          rules={[{ required: true, message: '请选择代理类型！' }]}
        >
          <Select defaultValue={values.scheme} style={{ width: 120 }} onChange={handleSelect}>
            <Option value={1}>http</Option>
            <Option value={2}>https</Option>
          </Select>
        </FormItem>

        <FormItem
          name="username"
          label="用户名"
        >
          <Input placeholder="请输入代理IP用户名" />
        </FormItem>

        <FormItem
          name="password"
          label="密码"
        >
          <Input placeholder="请输入代理IP密码" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
