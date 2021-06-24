import { Button, Col, Input, Row, Form, message, Image } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import omit from 'omit.js';
import { FormItemProps } from 'antd/es/form/FormItem';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';

import styles from './index.less';
import { arrayBufferToBase64 } from '@/utils/utils';

export type WrappedLoginItemProps = LoginItemProps;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemType {
  Username: React.FC<WrappedLoginItemProps>;
  Password: React.FC<WrappedLoginItemProps>;
  ImageCaptcha: React.FC<WrappedLoginItemProps>;
  Mobile: React.FC<WrappedLoginItemProps>;
  Captcha: React.FC<WrappedLoginItemProps>;
}

export interface ImageCaptcha extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  buttonText?: React.ReactNode;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  updateActive?: LoginContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: LoginContextProps['tabUtil'];
}

const FormItem = Form.Item;

const getFormItemOptions = ({
                              onChange,
                              defaultValue,
                              customProps = {},
                              rules,
                            }: LoginItemProps) => {
  const options: {
    rules?: LoginItemProps['rules'];
    onChange?: LoginItemProps['onChange'];
    initialValue?: LoginItemProps['defaultValue'];
  } = {
    rules: rules || (customProps.rules as LoginItemProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const ImageCaptcha: React.FC<LoginItemProps> = (props) => {
  const [count, setCount] = useState<number>(props.countDown || 0);
  const [imageUrl, setImageUrl] = useState("");
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    getCaptchaButtonText,
    getCaptchaSecondText,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;


  const onGetImageCaptcha = useCallback(async () => {
    const result = await getImageCaptcha();
    if (result) setImageUrl(`data:image/jpeg;base64,${arrayBufferToBase64(result)}`)
  }, []);


  useEffect(()=> {
    onGetImageCaptcha().then();
  },[]);

  if (!name) {
    return null;
  }
  // get getFieldDecorator props
  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  const inputProps = omit(otherProps, ['onGetImageCaptcha']);
  return (
    <FormItem shouldUpdate noStyle>
      {() => (
        <Row gutter={8}>
          <Col span={16}>
            <FormItem name={name} {...options}>
              <Input {...customProps} {...inputProps} />
            </FormItem>
          </Col>
          <Col span={8}>
            <div className={styles.getImageCaptchaWrapper}>
              <Image
                preview={false}
                src={imageUrl}
                onClick={onGetImageCaptcha}
              />
            </div>
          </Col>
        </Row>
      )}
    </FormItem>
  );
};


export default ImageCaptcha;
