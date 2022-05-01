import React from 'react';
import { Form, Button, Input, Modal, Switch, InputNumber } from 'antd';
import { TableListItem } from '../data';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<TableListItem>) => void;
  onSubmit: (values: Partial<TableListItem>) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
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
    handleUpdate({ ...values, ...fieldsValue, enableStatus: fieldsValue.enableStatus ? 1 : 0 });
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
      title="配置属性"
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
          memo: values.memo,
          sort: values.sort,
          enableStatus: values.enableStatus,
        }}
      >
        <FormItem
          name="name"
          label="角色名称"
          rules={[{ required: true, message: '请输入角色名称！' }]}
        >
          <Input placeholder="请输入角色名称" />
        </FormItem>

        <FormItem
          name="memo"
          label="角色描述"
          rules={[{ required: true, message: '请输入角色描述！' }]}
        >
          <Input placeholder="请输入角色描述" />
        </FormItem>

        <FormItem name="sort" label="排序" rules={[{ required: true, message: '请输入排序！' }]}>
          <InputNumber min={0} max={100} defaultValue={values.sort} />
        </FormItem>

        <FormItem name="status" label="启用状态">
          <Switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            defaultChecked={values.enableStatus === 1}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
