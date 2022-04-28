import React, {useCallback, useEffect, useState} from 'react';
import {Form, Button, Input, Modal} from 'antd';
import ITreeSelect from '@/components/ITreeSelect';
import { fetchGroupTree } from '@/services/open-crawler/spidergroup';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.SpiderGroup>) => void;
  onSubmit: (values: Partial<API.SpiderGroup>) => void;
  updateModalVisible: boolean;
  values: Partial<API.SpiderGroup>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [pid, setPid] = useState(props.values.pid);
  const [treeData, setTreeData] = useState<API.SpiderGroup[]>([]);

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const onFetchSpiderGroup = useCallback(async () => {
    const result = await fetchGroupTree();
    setTreeData(result);
  }, []);

  useEffect(()=>{
    onFetchSpiderGroup().then();
  },[]);


  const handleNext = async () => {
    const fieldsValue: any = await form.validateFields();
    handleUpdate({
      ...values,
      ...fieldsValue,
      pid,
    });
  };

  const handlerSelect = (pid: any) => {
    setPid(pid);
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
      title="编辑分类"
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
          name: values.name,
        
        }}
      >
        <FormItem
          name="pid"
          label="父级分类"
        >
          <ITreeSelect
            onSelect={handlerSelect}
            treeData={treeData}
            defaultValue={[values.pid]}
          />
        </FormItem>
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
