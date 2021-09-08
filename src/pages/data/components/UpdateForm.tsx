import React from 'react';
import { Form, Button, Input, Modal } from 'antd';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.ProxyGroupListItem>) => void;
  onSubmit: (values: Partial<API.ProxyGroupListItem>) => void;
  updateModalVisible: boolean;
  values: Partial<API.ProxyGroupListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

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
    });
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
      title="修改代理IP组"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: values.id,
          groupName: values.groupName
        }}
      >
        <FormItem
          name="groupName"
          label="代理IP组名称"
          rules={[{ required: true, message: '请输入代理IP组名称！' }]}
        >
          <Input placeholder="请输入代理IP组名称" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
