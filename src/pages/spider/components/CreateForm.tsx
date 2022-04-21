import React, {useState} from 'react';
import {AutoComplete, Button, Checkbox, Col, Form, Input, Modal, Row, Select, Space} from 'antd';
import {Headers, ContentTypes, Methods, ExpressType} from "../common"
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (values: Partial<API.Spider>) => void;
  onCancel: (flag?: boolean, formVals?: Partial<API.Spider>) => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16},
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14},
};

const FormItem = Form.Item;
const { Option } = Select;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [method, setMethod] = useState(Methods[0]);
  const {
    modalVisible,
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
  } = props;

  const handleFinish = async () => {
    const fieldsValue: any = await form.validateFields();
    const formData = {
      ...fieldsValue,
      method,
    }

    const {params} = fieldsValue;
    const {headers} = fieldsValue;
    const {extractRule} = fieldsValue;
    if(params && params.length !== 0){
      formData.params = JSON.stringify(params);
    }
    if(headers && headers.length !== 0){
      formData.headers = JSON.stringify(headers);
    }
    if(extractRule && extractRule.length !== 0){
      formData.extractRule = JSON.stringify(extractRule);
    }

    console.log(formData);
    //handleCreate(formData);
  };

  const handleSelectMethod = (op: string) => {
    setMethod(op);
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
      title="新建爬虫"
      visible={modalVisible}
      onCancel={() => handleCreateModalVisible()}
      footer={renderFooter()}
      width={900}
    >
      <Form
        {...formLayout}
        form={form}
      >
        <Row>
          <Col span={12}>
            <FormItem
              name="name"
              label="爬虫名称"
              rules={[{ required: true, message: '请输入爬虫名称！' }]}
            >
              <Input placeholder="请输入爬虫名称" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="url"
              label="目标url"
              rules={[{ required: true, message: '请输入爬虫url！' }]}
            >
              <Input placeholder="请输入爬虫url" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="method"
              label="请求方式"
            >
              <Select defaultValue={Methods[0]} onChange={handleSelectMethod}>
                {Methods.map(m => (
                  <Option value={m}>{m}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="retryTimes"
              label="重试次数"
            >
              <Input placeholder="请输入重试次数" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="sleepTime"
              label="间隔时间"
            >
              <Input placeholder="请输入间隔时间" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="params"
              label="请求参数"
            >
              <Form.List name="params">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'name']}
                        >
                          <Input placeholder="name" style={{'width':130}}/>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'value']}
                        >
                          <Input placeholder="value" style={{'width':260}}/>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加一行
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="headers"
              label="设请求头"
            >
              <Form.List name="headers">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'name']}
                        >
                          <AutoComplete
                            style={{ width: 130 }}
                            options={Headers}
                            placeholder="name"
                            filterOption={(inputValue, option) =>
                              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'value']}
                        >
                          <AutoComplete
                            style={{ width: 260 }}
                            options={ContentTypes}
                            placeholder="value"
                            filterOption={(inputValue, option) =>
                              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加一行
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
          <FormItem
              name="extractRule"
              label="抽取规则"
            >
              <Form.List name="extractRule">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Space key={key} align="baseline">
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'expressionType']}
                        >
                          <Select style={{ width: 120 }}>
                            {ExpressType.map(m => (
                              <Option value={m}>{m}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'expressionValue']}
                        >
                          <Input placeholder='请输入规则' style={{ width: 240 }}/>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'fieldName']}
                        >
                          <Input placeholder='请输入属性名称' style={{ width: 120 }}/>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'multi']}
                        >
                          <Checkbox style={{ width: 60 }}>循环</Checkbox>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加一行
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Modal>
  );
};

export default CreateForm;
