import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import CronModal from './CronModal';
import { querySpiderList } from '@/services/open-crawler/spider';
import { validateCronExpress } from '@/services/open-crawler/spidertask';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: Partial<API.SpiderTask>) => void;
}

const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  /** 新建窗口的弹窗 */
  const [cronModalVisible, handleCronModalVisible] = useState<boolean>(false);
  const [cronExpressValue, setCronExpressValue] = useState<string>();
  const [spiderList, setSpiderList] = useState<API.Spider[]>([]);
  const [spiderId, setSpiderId] = useState<number>();
  const [form] = Form.useForm();

  const {
    modalVisible,
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
  } = props;

  const handleFinish = async () => {
    const fieldsValue: any = await form.validateFields();
    if(!cronExpressValue || cronExpressValue.length === 0){
      message.error("cron 表达式不能为空");
      return;
    }
    const result = await validateCronExpress(cronExpressValue);
    if(!result || result !== 'success'){
      message.error("cron 校验失败，请重新输入");
      return;
    }
    
    handleCreate({
      ...fieldsValue,
      cronExpression: cronExpressValue
    });
  };

  const handleChange = (value: any) => {
    setSpiderId(value);
  };

  const onFetchSpiderData = useCallback(async () => {
    const result = await querySpiderList();
    setSpiderList(result);
  }, []);

  useEffect(()=>{
    onFetchSpiderData().then();
  },[]);

  return (
    <Modal
      destroyOnClose
      title="新建任务"
      width={900}
      visible={modalVisible}
      onCancel={() => handleCreateModalVisible(false)}
      onOk={() => handleFinish()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{spiderId}}
      >
        <Row>
          <Col span={12}>
            <FormItem
              name="taskName"
              label="任务名称"
              rules={[{ required: true, message: '请输入任务名称！' }]}
            >
              <Input placeholder="请输入任务名称" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="handlerName"
              label="handlerName"
              rules={[{ required: true, message: '请输入handlerName！' }]}
            >
              <Input placeholder="请输入handlerName" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              name="spiderId"
              label="选择爬虫"
            >
              <Select
                value={spiderId}
                placeholder="请选项爬虫模板"
                defaultActiveFirstOption={true}
                onChange={handleChange}
              >
                {spiderList.map(d => (
                  <Option key={d.id} value={d.id}>{d.name}</Option>
                ))}
            </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="cronExpression"
              label="Cron 表达式"
            >
              <Input.Group compact style={{display: 'flex'}}>
                <Input placeholder="请输入Cron 表达式"  value={cronExpressValue} onChange={(e)=>setCronExpressValue(e.target.value)}/>
                <Button
                  type="primary"
                  onClick={() => {
                    handleCronModalVisible(true);
                  }}
                >
                  Cron 工具
                </Button>
              </Input.Group>
            </FormItem>
          </Col>
        </Row>

        <CronModal
          modalVisible={cronModalVisible}
          onCancel={() => handleCronModalVisible(false)}
          onSubmit={(value)=>{
            setCronExpressValue(value);
            handleCronModalVisible(false);
          }}
        />
      </Form>
    </Modal>
  );
};

export default CreateForm;
