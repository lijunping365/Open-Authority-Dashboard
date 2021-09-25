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

  const [secondRadioValue, setSecondRadioValue] = React.useState(1);
  const [minutesRadioValue, setMinutesRadioValue] = React.useState(1);
  const [hourRadioValue, setHourRadioValue] = React.useState(1);
  const [dayRadioValue, setDayRadioValue] = React.useState(1);
  const [monthRadioValue, setMonthRadioValue] = React.useState(1);
  const [weekRadioValue, setWeekRadioValue] = React.useState(1);
  const [yearRadioValue, setYearRadioValue] = React.useState(1);

  const [secondCheckboxValue, setSecondCheckboxValue] = React.useState<string[]>([]);
  const [minutesCheckboxValue, setMinutesCheckboxValue] = React.useState<string[]>([]);
  const [hourCheckboxValue, setHourCheckboxValue] = React.useState<string[]>([]);
  const [dayCheckboxValue, setDayCheckboxValue] = React.useState<string[]>([]);
  const [monthCheckboxValue, setMonthCheckboxValue] = React.useState<string[]>([]);
  const [weekCheckboxValue, setWeekCheckboxValue] = React.useState<string[]>([]);

  const [secondCheckboxDisabled, setSecondCheckboxDisabled] = React.useState(true);
  const [minutesCheckboxDisabled, setMinutesCheckboxDisabled] = React.useState(false);
  const [hourCheckboxDisabled, setHourCheckboxDisabled] = React.useState(false);
  const [dayCheckboxDisabled, setDayCheckboxDisabled] = React.useState(false);
  const [monthCheckboxDisabled, setMonthCheckboxDisabled] = React.useState(false);
  const [weekCheckboxDisabled, setWeekCheckboxDisabled] = React.useState(false);


  const [secondValue, setSecondValue] = React.useState('');
  const [minutesValue, setMinutesValue] = React.useState('');
  const [hourValue, setHourValue] = React.useState('');
  const [dayValue, setDayValue] = React.useState('');
  const [monthValue, setMonthValue] = React.useState('');
  const [weekValue, setWeekValue] = React.useState('');
  const [yearValue, setYearValue] = React.useState('');

  const cronParse = (cronExpress: string) =>{
    const regs = cronExpress.split(' ');
    setSecondValue(regs[0]);
    setMinutesValue(regs[1]);
    setHourValue(regs[2]);
    setDayValue(regs[3]);
    setMonthValue(regs[4]);
    setWeekValue(regs[5]);

  }

  const cronResult = () =>{
    let result;

    const second = secondValue === "" ? "*": secondValue;
    const minute = minutesValue === "" ? "*":minutesValue;
    const hour = hourValue === "" ? "*":hourValue;
    const day = dayValue === "" ? "*":dayValue;
    const month = monthValue === "" ? "*":monthValue;
    const week = weekValue === "" ? "?":weekValue;
    if(yearValue!=="")
    {
      result = `${second} ${minute} ${hour} ${day} ${month} ${week} ${yearValue}`;
    }else {
      result = `${second} ${minute} ${hour} ${day} ${month} ${week}`;
    }
    return result;
  }

  const setInputValue = (value: string) => {
    console.log('onInputChange', value);
    form.setFieldsValue({
      cronExpression: value,
    });
  }


  const onSecondChange = (e: any) => {
    console.log('onSecondChange', e.target.value);
    const v = e.target.value;
    setSecondRadioValue(v);
    let results = "";
    switch (v) {
      case 1:
        setSecondValue("*");
        setSecondCheckboxValue([]);
        setSecondCheckboxDisabled(true);
        results = cronResult();
        // $.fn.cronGen.tools.everyTime("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case 2:
        setSecondCheckboxValue([]);
        setSecondCheckboxDisabled(true);
        results = cronResult();
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case 3:
        setSecondCheckboxValue([]);
        setSecondCheckboxDisabled(true);
        results = cronResult();
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case 4:
        setSecondCheckboxDisabled(false);
        results = cronResult();
        // $.fn.cronGen.tools.initCheckBox("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      default:
        break;
    }
    setInputValue(results);
  }

  const onMinutesChange = (e: any) => {
    console.log('onSecondChange', e.target.value);
    const v = e.target.value;
    setMinutesRadioValue(v);
    switch (v) {
      case "1":
        // $.fn.cronGen.tools.everyTime("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "2":
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "3":
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "4":
        // $.fn.cronGen.tools.initCheckBox("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      default:
        break;
    }
  }

  const onHourChange = (e: any) => {
    console.log('onSecondChange', e.target.value);
    const v = e.target.value;
    setHourRadioValue(v);
    switch (v) {
      case "1":
        // $.fn.cronGen.tools.everyTime("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "2":
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "3":
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "4":
        // $.fn.cronGen.tools.initCheckBox("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      default: break;
    }
  };

  const onDayChange = (e: any) => {
    console.log('onSecondChange', e.target.value);
    const v = e.target.value;
    setDayRadioValue(v);
    switch (v) {
      case "1":
        // $.fn.cronGen.tools.everyTime("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "2":
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "3":
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "4":
        // $.fn.cronGen.tools.initCheckBox("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "5":
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "6":
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "7":
        // $.fn.cronGen.tools.initCheckBox("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      default: break;
    }
  };

  const onMonthChange = (e: any) => {
    console.log('onSecondChange', e.target.value);
    const v = e.target.value;
    setMonthRadioValue(v);
    switch (v) {
      case "1":
        // $.fn.cronGen.tools.everyTime("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "2":
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "3":
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "4":
        // $.fn.cronGen.tools.initCheckBox("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "5":
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      default: break;
    }
  };

  const onWeekChange = (e: any) => {
    console.log('onSecondChange', e.target.value);
    const v = e.target.value;
    setWeekRadioValue(v);
    switch (v) {
      case "1":
        // $.fn.cronGen.tools.everyTime("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "2":
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "3":
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "4":
        // $.fn.cronGen.tools.initCheckBox("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "5":
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "6":
        // $.fn.cronGen.tools.initCheckBox("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      default: break;
    }
  };

  const onYearChange = (e: any) => {
    console.log('onSecondChange', e.target.value);
    const v = e.target.value;
    setYearRadioValue(v);
    switch (v) {
      case "1":
        // $.fn.cronGen.tools.everyTime("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "2":
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case "3":
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      default: break;
    }
  };

  const onSecondCheckboxChange = (checkedValues: any[]) => {
    console.log('checked = ', checkedValues);
    setSecondCheckboxValue(checkedValues);
  };

  const onMinutesCheckboxChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
    setMinutesCheckboxValue(checkedValues);
  };

  const onHourCheckboxChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
    setHourCheckboxValue(checkedValues);
  };

  const onDayCheckboxChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
    setDayCheckboxValue(checkedValues);
  };

  const onMonthCheckboxChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
    setMonthCheckboxValue(checkedValues);
  };

  const onWeekCheckboxChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
    setWeekCheckboxValue(checkedValues);
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
            <Radio.Group onChange={onSecondChange} value={secondRadioValue} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每秒 允许的通配符[, - * /]</Radio>
                <Radio value={2}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒</Radio>
                <Radio value={3}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒执行一次</Radio>
                <Radio value={4}>
                  指定
                  <Checkbox.Group options={plainOptions} onChange={onSecondCheckboxChange} value={secondCheckboxValue} disabled={secondCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="分钟" key="2">
            <Radio.Group onChange={onMinutesChange} value={minutesRadioValue} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每分钟 允许的通配符[, - * /]</Radio>
                <Radio value={2}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟</Radio>
                <Radio value={3}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟执行一次</Radio>
                <Radio value={4}>
                  指定
                  <Checkbox.Group options={plainOptions} onChange={onMinutesCheckboxChange} value={minutesCheckboxValue} disabled={minutesCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="小时" key="3">
            <Radio.Group onChange={onHourChange} value={hourRadioValue} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每小时 允许的通配符[, - * /]</Radio>
                <Radio value={2}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时</Radio>
                <Radio value={3}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时执行一次</Radio>
                <Radio value={4}>
                  指定
                  <Checkbox.Group options={hourOptions} onChange={onHourCheckboxChange} value={hourCheckboxValue} disabled={hourCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="日" key="4">
            <Radio.Group onChange={onDayChange} value={dayRadioValue} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每天 允许的通配符[, - * / L W]</Radio>
                <Radio value={2}>不指定</Radio>
                <Radio value={3}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>天</Radio>
                <Radio value={4}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>日开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>天执行一次</Radio>
                <Radio value={5}>每月<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>号最近的那个工作日</Radio>
                <Radio value={6}>本月最后一天</Radio>
                <Radio value={7}>
                  指定
                  <Checkbox.Group options={dayOptions} onChange={onDayCheckboxChange} value={dayCheckboxValue} disabled={dayCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="月" key="5">
            <Radio.Group onChange={onMonthChange} value={monthRadioValue} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每月 允许的通配符[, - * /]</Radio>
                <Radio value={2}>不指定</Radio>
                <Radio value={3}>周期 从<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月</Radio>
                <Radio value={4}>从<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月开始,每<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月执行一次</Radio>
                <Radio value={5}>
                  指定
                  <Checkbox.Group options={monthOptions} onChange={onMonthCheckboxChange} value={monthCheckboxValue} disabled={monthCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="周" key="6">
            <Radio.Group onChange={onWeekChange} value={weekRadioValue} defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>每周 允许的通配符[, - * / L #]</Radio>
                <Radio value={2}>不指定</Radio>
                <Radio value={3}>周期 从星期<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input defaultValue="2" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
                <Radio value={4}>第<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>周的星期<Input defaultValue="1" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
                <Radio value={5}>本月最后一个星期<Input defaultValue="0" style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
                <Radio value={6}>
                  指定
                  <Checkbox.Group options={weekOptions} onChange={onWeekCheckboxChange} value={weekCheckboxValue} disabled={weekCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="年" key="7">
            <Radio.Group onChange={onYearChange} value={yearRadioValue} defaultValue={1}>
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
