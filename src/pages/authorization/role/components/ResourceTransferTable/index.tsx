import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import TableTransfer from "@/components/TableTransfer";
import {queryResource} from "@/pages/authorization/role/service";

const leftTableColumns = [
  {
    dataIndex: 'name',
    title: '资源名称',
  },
  {
    dataIndex: 'memo',
    title: '资源描述',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'name',
    title: '资源名称',
  },
];

export interface ResourceData {
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
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [resourceIds, setResourceIds] = useState<number[]>([]);
  const {modalVisible, onCancel, onSubmit} = props;

  useEffect(()=>{
    queryResource()
      .then((res:any)=>{setResourceData(res)})
      .catch(()=>message.error("获取数据失败"))
  },[]);

  const onChange = (nextTargetKeys: any) => {
    setResourceIds(nextTargetKeys);
    setTargetKeys(nextTargetKeys);
  };
  const showSearch = false;

  return (
    <Modal
      width={840}
      destroyOnClose
      title="为角色分配资源"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={[
        <Button key="cancel" onClick={() => onCancel()}>
          取消
        </Button>,
        <Button key="submit" style={{ marginLeft: '15px' }} type="primary" onClick={() => onSubmit(resourceIds)}>
          确定
        </Button>
      ]}
    >
      <TableTransfer
        dataSource={resourceData}
        targetKeys={targetKeys}
        showSearch={showSearch}
        onChange={onChange}
        filterOption={(inputValue: any, item: ResourceData) =>
          item.name.indexOf(inputValue) !== -1 || item.memo.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </Modal>
  );
};

export default TransferTable;
