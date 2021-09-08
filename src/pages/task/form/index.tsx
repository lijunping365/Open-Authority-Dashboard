import React from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {Card, Col, Row, Form, Input, message} from 'antd';
import styles from './index.less';
import {addTask, updateTask} from "@/services/ant-design-pro/task";

const FormItem = Form.Item;

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.TypeListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addTask({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: Partial<API.TypeListItem>) => {
  const hide = message.loading('正在配置');
  try {
    await updateTask(fields);
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const Index: React.FC<{}> = () => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: any }) => {
    console.log('ddddddddddddd', values);
    handleAdd(values);
    handleUpdate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    console.log(changedValues);
  };

  return (
    <PageContainer content="高级表单常见于一次性输入和提交大批量数据的场景。">
      <Form
        hideRequiredMark
        style={{
          marginTop: 8,
        }}
        form={form}
        name="basic"
        initialValues={{
          public: '1',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <Card title="仓库管理" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title="任务管理" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <FormItem
                label='任务名称'
                name="name"
                rules={[{ required: true, message: '请输入仓库名称' }]}
              >
                <Input placeholder="给目标起个名字" />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default Index;
