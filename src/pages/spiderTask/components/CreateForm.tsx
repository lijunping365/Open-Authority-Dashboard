import React from 'react';
import {Form, Input, Modal, Tabs, Radio, Space, Checkbox, Divider, List, Typography} from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const FormItem = Form.Item;
const { TabPane } = Tabs;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const plainOptions = [
  '00', '01', '02', '03','04','05','06','07','08','09',
  '10', '11', '12', '13','14','15','16','17','18','19',
  '20', '21', '22', '23','24','25','26','27','28','29',
  '30', '31', '32', '33','34','35','36','37','38','39',
  '40', '41', '42', '43','44','45','46','47','48','49',
  '50', '51', '52', '53','54','55','56','57','58','59',
];

const hourOptions = [
  '00', '01', '02', '03','04','05','06','07','08','09',
  '10', '11', '12', '13','14','15','16','17','18','19',
  '20', '21', '22', '23',
];

const dayOptions = [
  '01', '02', '03','04','05','06','07','08','09', '10',
  '11', '12', '13','14','15','16','17','18','19', '20',
  '21', '22', '23','24','25','26','27','28','29', '30',
  '31',
];

const monthOptions = [
  '01', '02', '03','04','05','06','07','08','09', '10',
  '11', '12',
];

const weekOptions = [
  '1', '2', '3','4','5','6','7'
];


const data = [
  '2021-09-21 07:20:00',
  '2021-09-21 07:20:00',
  '2021-09-21 07:20:00',
  '2021-09-21 07:20:00',
  '2021-09-21 07:20:00',
];

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, onCancel } = props;
  const [value, setValue] = React.useState(1);

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Modal
      destroyOnClose
      title="新建任务"
      width={640}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          // id: values.id,
        }}
      >
        <FormItem
          name="cronExpression"
          label="Cron 表达式"
          rules={[{ required: true, message: '请输入Cron 表达式！' }]}
        >
          <Input placeholder="请输入Cron 表达式" />
        </FormItem>

        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="秒" key="1">
            <Radio.Group onChange={onChange} value={value} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每秒 允许的通配符[, - * /]</Radio>
                <Radio value={2}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒</Radio>
                <Radio value={3}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒执行一次</Radio>
                <Radio value={4}>
                  指定
                  <Checkbox.Group options={plainOptions} onChange={onChange} />
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="分钟" key="2">
            <Radio.Group onChange={onChange} value={value} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每分钟 允许的通配符[, - * /]</Radio>
                <Radio value={2}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟</Radio>
                <Radio value={3}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟执行一次</Radio>
                <Radio value={4}>
                  指定
                  <Checkbox.Group options={plainOptions} onChange={onChange} />
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="小时" key="3">
            <Radio.Group onChange={onChange} value={value} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每小时 允许的通配符[, - * /]</Radio>
                <Radio value={2}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时</Radio>
                <Radio value={3}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时执行一次</Radio>
                <Radio value={4}>
                  指定
                  <Checkbox.Group options={hourOptions} onChange={onChange} />
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="日" key="4">
            <Radio.Group onChange={onChange} value={value} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每天 允许的通配符[, - * / L W]</Radio>
                <Radio value={2}>不指定</Radio>
                <Radio value={3}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>天</Radio>
                <Radio value={4}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>日开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>天执行一次</Radio>
                <Radio value={5}>每月<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>号最近的那个工作日</Radio>
                <Radio value={6}>本月最后一天</Radio>
                <Radio value={7}>
                  指定
                  <Checkbox.Group options={dayOptions} onChange={onChange} />
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="月" key="5">
            <Radio.Group onChange={onChange} value={value} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每月 允许的通配符[, - * /]</Radio>
                <Radio value={2}>不指定</Radio>
                <Radio value={3}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月</Radio>
                <Radio value={4}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月执行一次</Radio>
                <Radio value={5}>
                  指定
                  <Checkbox.Group options={monthOptions} onChange={onChange} />
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="周" key="6">
            <Radio.Group onChange={onChange} value={value} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每周 允许的通配符[, - * / L #]</Radio>
                <Radio value={2}>不指定</Radio>
                <Radio value={3}>周期 从星期<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
                <Radio value={4}>第<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>周的星期<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
                <Radio value={4}>本月最后一个星期<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
                <Radio value={5}>
                  指定
                  <Checkbox.Group options={weekOptions} onChange={onChange} />
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="年" key="7">
            <Radio.Group onChange={onChange} value={value} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>不指定 允许的通配符[, - * /] 非必填</Radio>
                <Radio value={2}>每年</Radio>
                <Radio value={3}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>年</Radio>
              </Space>
            </Radio.Group>
          </TabPane>
        </Tabs>

        <Divider orientation="left">最近运行时间</Divider>
        <List
          dataSource={data}
          size="small"
          renderItem={item => (
            <List.Item>
              <Typography.Text>{item}</Typography.Text>
            </List.Item>
          )}
        />
      </Form>
    </Modal>
  );
};

export default CreateForm;
