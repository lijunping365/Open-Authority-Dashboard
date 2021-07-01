import { PlusOutlined } from '@ant-design/icons';
import {Button, message, Divider} from 'antd';
import React, {useState, useRef} from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import { fetchProxyIpPage, addProxyIp, updateProxyIp, removeProxyIp } from '@/services/ant-design-pro/proxyIp';
import {deleteConfirm} from "@/components/ConfirmModel";
import CreateForm from "@/pages/util/ip/components/CreateForm";
import {RouteChildrenProps} from "react-router";



const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ProxyIpListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ProxyIpListItem[]>([]);
  const { query }: any = location;
  const [groupId] = useState<number>(query? query.id : 0);


  /**
   * 添加节点
   *
   * @param fields
   */
  const handleAdd = async (fields: API.ProxyIpListItem) => {
    const hide = message.loading('正在添加');
    try {
      await addProxyIp({ ...fields, groupId });
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
  const handleUpdate = async (fields: Partial<API.ProxyIpListItem>) => {
    const hide = message.loading('正在配置');
    try {
      await updateProxyIp(fields);
      hide();

      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };

  /**
   * 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: any[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await removeProxyIp({ids: selectedRows});
      hide();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  const columns: ProColumns<API.ProxyIpListItem>[] = [
    {
      title: 'IP地址',
      dataIndex: 'ip',
      tip: '代理IP是唯一的 key',
      valueType: 'text',
    },
    {
      title: '端口',
      dataIndex: 'port',
      valueType: 'text',
      search: false,
    },
    {
      title: '代理类型',
      dataIndex: 'type',
      valueEnum: {
        0: { text: 'http' },
        1: { text: 'https' },
      },
    },
    {
      title: '是否有效',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '无效', status: 'Default' },
        1: { text: '有效', status: 'Success' },
      },
      hideInForm: true,
    },
    {
      title: '最后验证时间',
      dataIndex: 'verifyTime',
      valueType: 'dateTime',
      hideInForm: true,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              const confirm = await deleteConfirm();
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
      <ProTable<API.ProxyIpListItem, API.PageParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}

        request={async (params) => {
          const response = await fetchProxyIpPage({ ...params, groupId });
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

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<API.ProxyIpListItem, API.ProxyIpListItem>
          onSubmit={async (value) => {
            const success = await handleAdd({
              ...value,
              groupId
            });
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default TableList;
