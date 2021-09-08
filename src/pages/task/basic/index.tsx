import {Button, Card, Descriptions, Divider, Image, message} from 'antd';
import React, {useEffect, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {RouteChildrenProps} from "react-router";
import {history} from "@@/core/history";
import {BasicShop, RejectData} from "@/pages/task/basic/data";
import {addAuditRecord, queryBasicShop} from "@/pages/task/basic/service";
import RejectForm from "@/pages/task/basic/components/RejectForm";


const ProfileBasic: React.FC<RouteChildrenProps> = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [basicShop, setBasicShop] = useState<Partial<BasicShop>>({});
  const { query }: any = location;
  const [shopId] = useState<number>(query? query.id : 0);

  useEffect(() => {
    if (shopId){
      setLoading(true);
      queryBasicShop(shopId)
        .then((result: any) => {
          if (result) setBasicShop(result);
        })
        .catch((e) => message.error(e));
      setLoading(false);
    }
  }, []);

  const handlePass = async () => {
    const hide = message.loading('正在提交');
    try {
      await addAuditRecord({shopId, auditMsg: "审核通过", auditStatus: 1, content: JSON.stringify(basicShop)});
      hide();
      message.success('提交成功');
      history.push('/shop/list');
      return true;
    } catch (error) {
      hide();
      message.error('提交失败请重试！');
      return false;
    }
  };

  const handleReject = async (fields: Partial<RejectData>) => {
    const hide = message.loading('正在提交');
    try {
      await addAuditRecord({...fields, shopId, auditStatus: 2, content: JSON.stringify(basicShop)});
      hide();
      message.success('提交成功');
      history.push('/shop/list');
      return true;
    } catch (error) {
      hide();
      message.error('提交失败请重试！');
      return false;
    }
  };

  const onBack = () => {
    history.goBack();
  };

  const onReject = () => {
    setModalVisible(true);
  };

  return (
    <PageContainer loading={loading}>
      <Card bordered={false}>
        <Descriptions title="基本信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="联系人姓名">{basicShop.contactName}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{basicShop.contactMobile}</Descriptions.Item>
          <Descriptions.Item label="店铺名称">{basicShop.shopName}</Descriptions.Item>
          <Descriptions.Item label="详细地址">{basicShop.address}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="门店信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="经营类目">{basicShop.category}</Descriptions.Item>
          <Descriptions.Item label="logo图片">
            <Image
              width={100}
              height={100}
              src={basicShop.logoImg}
            />
          </Descriptions.Item>
          <Descriptions.Item label="店铺图片">
            <Image
              width={100}
              height={100}
              src={basicShop.logoImg}
            />
          </Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="证件信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="身份证正">
            <Image
              width={100}
              height={100}
              src={basicShop.frontIdCard}
            />
          </Descriptions.Item>
          <Descriptions.Item label="身份证反">
            <Image
              width={100}
              height={100}
              src={basicShop.backIdCard}
            />
          </Descriptions.Item>
          <Descriptions.Item label="手持正面">
            <Image
              width={100}
              height={100}
              src={basicShop.faceIdCard}
            />
          </Descriptions.Item>
          <Descriptions.Item label="营业执照">
            <Image
              width={100}
              height={100}
              src={basicShop.businessImg}
            />
          </Descriptions.Item>
          <Descriptions.Item label="许可证图">
            <Image
              width={100}
              height={100}
              src={basicShop.licenseImg}
            />
          </Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <div style={{textAlign: 'right'}}>
          <Button type="default" htmlType="button" onClick={onBack}>
            返回
          </Button>
          <Button type="primary" htmlType="button" style={{marginLeft:"24px"}} onClick={onReject}>
            驳回
          </Button>
          <Button type="primary" htmlType="submit" style={{marginLeft:"24px"}} onClick={handlePass}>
            审核通过
          </Button>
        </div>
      </Card>

      {modalVisible ? (
        <RejectForm
          onSubmit={async (value) => {
            const success = await handleReject(value);
            if (success) {
              setModalVisible(false);
            }
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
          modalVisible={modalVisible}
        />
      ) : null}
    </PageContainer>
  );
};

export default ProfileBasic;
