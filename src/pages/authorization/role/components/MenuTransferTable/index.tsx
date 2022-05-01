import React, {useEffect, useState} from 'react';
import {Button, Modal, message} from 'antd';
import {queryMenu} from "@/pages/authorization/role/service";
import TreeTransfer from "@/components/TreeTransfer";

export interface MenuData {
  id: number;
  name: string;
  memo: string;
  disabled: boolean;
}

export interface TransferTableProps {
  targetKeys: number[];
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (value: number[]) => void;
}
const TransferTable: React.FC<TransferTableProps> = (props) => {
  const [targetKeys, setTargetKeys] = useState<number[]>(props.targetKeys);
  const [menuList, setMenuList] = useState<MenuData[]>([]);
  const [menuIds, setMenuIds] = useState<number[]>([]);
  const {modalVisible, onCancel, onSubmit} = props;

  useEffect(()=>{
    queryMenu()
      .then((res:any)=>{setMenuList(res)})
      .catch(()=>message.error("获取数据失败"))
  },[]);

  const onChange = (nextTargetKeys: any) => {
    setMenuIds(nextTargetKeys);
    setTargetKeys(nextTargetKeys);
  };

  const loop = (data: any) =>{
    return data.map((item: any) => {
      if (item.children) {
        return { title: item.name, key: item.id, children: loop(item.children) };
      }
      return {
        title: item.name,
        key: item.id,
      };
    });
  };

  return (
    <Modal
      width={840}
      destroyOnClose
      title="为角色分配菜单"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={[
        <Button key="cancel" onClick={() => onCancel()}>
          取消
        </Button>,
        <Button key="submit" style={{ marginLeft: '15px' }} type="primary" onClick={() => onSubmit(menuIds)}>
          确定
        </Button>
      ]}
    >
      <TreeTransfer
        dataSource={loop(menuList)}
        targetKeys={targetKeys}
        onChange={onChange}
      />
    </Modal>
  );
};

export default TransferTable;
