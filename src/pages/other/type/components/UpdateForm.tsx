import React from 'react';
import { Form, Button, Input, Modal } from 'antd';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.TypeListItem>) => void;
  onSubmit: (values: Partial<API.TypeListItem>) => void;
  updateModalVisible: boolean;
  values: Partial<API.TypeListItem>;
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
      enableStatus: fieldsValue.enableStatus ? 1 : 0,
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
      title="修改分类"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: values.name
        }}
      >
        <FormItem
          name="name"
          label="分类名称"
          rules={[{ required: true, message: '请输入分类名称！' }]}
        >
          <Input placeholder="请输入分类名称" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
