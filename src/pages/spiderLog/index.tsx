import {Button, message, Divider, Modal} from 'antd';
import React, { useState, useRef } from 'react';
import {RouteChildrenProps} from "react-router";
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { fetchSpiderLogPage, removeSpiderLog} from '@/services/open-crawler/spiderlog';
import {confirmModal} from "@/components/ConfirmModel";
import ReactJson from 'react-json-view';



/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: any[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeSpiderLog({ids: selectedRows});
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {

  const actionRef = useRef<ActionType>();
  const { query }: any = location;
  const [spiderId] = useState<number>(query.id);
  const [selectedRowsState, setSelectedRows] = useState<API.SpiderLog[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const columns: ProColumns<API.SpiderLog>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
    },
    {
      title: '执行结果',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '失败', status: 'Error' },
        1: { text: '成功', status: 'Success' },
      },
    },
    {
      title: '失败原因',
      dataIndex: 'cause',
      ellipsis: true,
      valueType: 'text',
    },
    {
      title: '调度时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={()=>{
              setModalVisible(true);
              setData(record);
            }}
          >
            查看详情
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              const confirm = await confirmModal();
              if (confirm){
                await handleRemove([record.id]);
                actionRef.current?.reloadAndRest?.();
              }
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.SpiderLog>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={async (params) => {
          const response = await fetchSpiderLogPage({ ...params, spiderId });
          return {
            data: response.records,
            total: response.total,
            success: true,
            pageSize: response.pages,
            current: response.current,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState ? selectedRowsState.map((e) => e.id):[]);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <Modal
        title="数据详情"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <ReactJson 
          src={data} 
          theme="google" 
          iconStyle="square" 
          enableClipboard={false} 
          displayDataTypes={false}  
          displayObjectSize={true}
        />
      </Modal>
    </PageContainer>
  );
};

export default TableList;
