import React, {useCallback, useEffect, useState} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import ITreeSelect from '@/components/ITreeSelect';
import { fetchGroupTree } from '@/services/open-crawler/spidergroup';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (values: Partial<API.Spider>) => void;
  onCancel: (flag?: boolean, formVals?: Partial<API.Spider>) => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16},
};

const FormItem = Form.Item;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [pid, setPid] = useState();
  const [treeData, setTreeData] = useState<API.SpiderGroup[]>([]);
  const {
    modalVisible,
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
  } = props;


  const onFetchSpiderGroup = useCallback(async () => {
    const result = await fetchGroupTree();
    setTreeData(result);
  }, []);

  useEffect(()=>{
    onFetchSpiderGroup().then();
  },[]);

  const handleFinish = async () => {
    const fieldsValue: any = await form.validateFields();
    const formData = {
      ...fieldsValue,
      pid,
    }
    handleCreate(formData);
  };

  const handlerSelect = (pid: any) => {
    setPid(pid);
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleCreateModalVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleFinish()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="新建分类"
      visible={modalVisible}
      onCancel={() => handleCreateModalVisible()}
      footer={renderFooter()}
      width={600}
    >
      <Form
        {...formLayout}
        form={form}
      >
        <FormItem
          name="pid"
          label="父级分类"
        >
          <ITreeSelect
            onSelect={handlerSelect}
            treeData={treeData}
            defaultValue={[]}
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

export default CreateForm;
