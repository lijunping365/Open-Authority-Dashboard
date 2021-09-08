import React from 'react';
import { Form, Button, Modal } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { RejectData } from '../../data';

export interface RejectFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<RejectData>) => void;
  onSubmit: (values: Partial<RejectData>) => void;
  modalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const RejectForm: React.FC<RejectFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit: handleReject,
    onCancel: handleModalVisible,
    modalVisible,
  } = props;

  const handleSubmit = async () => {
    const fieldsValue: any = await form.validateFields();
    handleReject(fieldsValue);
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleModalVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleSubmit()}>
          提交
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="审核驳回"
      visible={modalVisible}
      footer={renderFooter()}
      onCancel={() => handleModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
      >
        <FormItem
          name="auditMsg"
          label="驳回原因"
          rules={[{ required: true, message: '请输入驳回原因！' }]}
        >
          <TextArea placeholder="请输入驳回原因" rows={4} showCount maxLength={200}/>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default RejectForm;
