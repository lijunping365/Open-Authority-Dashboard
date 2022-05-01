import React, { useState } from 'react';
import { Form, Button, Input, Modal, Switch, InputNumber } from 'antd';
import CustomizeTreeSelect from '@/components/ITreeSelect';
import { TableListItem } from '../data';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<TableListItem>) => void;
  onSubmit: (values: Partial<TableListItem>) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  treeData: TableListItem[];
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [parentId, setParentId] = useState(props.values.pid);
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
    treeData,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate({
      ...values,
      ...fieldsValue,
      pid: parentId,
      enableStatus: fieldsValue.enableStatus ? 1 : 0,
    });
  };

  const handlerSelect = (pid: any) => {
    setParentId(pid);
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
      title="修改菜单"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: values.id,
          pid: values.pid,
          icon: values.icon,
          name: values.name,
          memo: values.memo,
          path: values.path,
          sort: values.sort,
          enableStatus: values.enableStatus,
        }}
      >
        <FormItem
          name="pid"
          label="父级菜单"
          rules={[{ required: true, message: '请选择父级菜单！' }]}
        >
          <CustomizeTreeSelect
            onSelect={handlerSelect}
            treeData={treeData}
            defaultValue={[values.pid]}
          />
        </FormItem>

        <FormItem
          name="icon"
          label="菜单图标"
          rules={[{ required: true, message: '请输入菜单图标！' }]}
        >
          <Input placeholder="请输入菜单图标" />
        </FormItem>

        <FormItem
          name="name"
          label="菜单名称"
          rules={[{ required: true, message: '请输入菜单名称！' }]}
        >
          <Input placeholder="请输入菜单名称" />
        </FormItem>

        <FormItem name="memo" label="描述" rules={[{ required: true, message: '请输入描述！' }]}>
          <Input placeholder="请输入描述" />
        </FormItem>

        <FormItem name="path" label="路由" rules={[{ required: true, message: '请输入路由！' }]}>
          <Input placeholder="请输入路由" />
        </FormItem>

        <FormItem
          name="sort"
          label="类目排序"
          rules={[{ required: true, message: '请输入类目排序！' }]}
        >
          <InputNumber min={0} max={100} defaultValue={values.sort} />
        </FormItem>

        <FormItem name="enableStatus" label="启用状态">
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
