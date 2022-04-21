import React, { useCallback, useEffect, useState } from 'react';
import { Form, Button, Input, Modal, Row, Col, Select, message } from 'antd';
import CronModal from '@/components/CronModel';
import { validateCronExpress } from '@/services/open-crawler/spidertask';
import { querySpiderList } from '@/services/open-crawler/spider';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.SpiderTask>) => void;
  onSubmit: (values: Partial<API.SpiderTask>) => void;
  updateModalVisible: boolean;
  values: Partial<API.SpiderTask>;
}
const FormItem = Form.Item;
const { Option } = Select;

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

  const [cronModalVisible, handleCronModalVisible] = useState<boolean>(false);
  const [cronExpressValue, setCronExpressValue] = useState<any>(values.cronExpression);
  const [spiderList, setSpiderList] = useState<API.Spider[]>([]);
  const [spiderId, setSpiderId] = useState<any>(values.spiderId);

  const handleChange = (value: any) => {
    setSpiderId(value);
  };

  const onFetchSpiderData = useCallback(async () => {
    const result = await querySpiderList(values.spiderId);
    setSpiderList(result);
  }, []);

  useEffect(() => {
    onFetchSpiderData().then();
  }, []);

  const handleSave = async () => {
    const fieldsValue: any = await form.validateFields();
    if (!cronExpressValue || cronExpressValue.length === 0) {
      message.error('cron 表达式不能为空');
      return;
    }
    const result = await validateCronExpress(cronExpressValue);
    if (!result || result !== 'success') {
      message.error('cron 校验失败，请重新输入');
      return;
    }
    handleUpdate({
      ...values,
      ...fieldsValue,
      cronExpression: cronExpressValue,
    });
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleSave()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={900}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="编辑调度任务"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: values.id,
          taskName: values.taskName,
          handlerName: values.handlerName,
          cronExpression: values.cronExpression,
        }}
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
              rules={[{ required: true, message: '请选择爬虫模板！' }]}
            >
              <Select
                value={spiderId}
                defaultValue={spiderId}
                placeholder="请选项爬虫模板"
                defaultActiveFirstOption={true}
                onChange={handleChange}
              >
                {spiderList.map((d) => (
                  <Option key={d.id} value={d.id}>
                    {d.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem 
              name="cronExpression" 
              label="Cron 表达式"
            >
              <Input.Group compact style={{ display: 'flex' }}>
                <Input
                  placeholder="请输入Cron 表达式"
                  value={cronExpressValue}
                  onChange={(e) => setCronExpressValue(e.target.value)}
                />
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
          onSubmit={(value) => {
            setCronExpressValue(value);
            handleCronModalVisible(false);
          }}
        />
      </Form>
    </Modal>
  );
};

export default UpdateForm;
