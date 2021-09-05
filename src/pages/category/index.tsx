import { PlusOutlined } from '@ant-design/icons';
import {Button, message, Divider} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import UpdateForm from './components/UpdateForm';
import { fetchTypePage, addType, updateType, removeType } from '@/services/ant-design-pro/type';
import {deleteConfirm} from "@/components/ConfirmModel";

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.TypeListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addType({ ...fields });
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
    await updateType(fields);
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
    await removeType({ids: selectedRows});
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.TypeListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.TypeListItem[]>([]);

  const columns: ProColumns<API.TypeListItem>[] = [
    {
      title: '分类ID',
      dataIndex: 'id',
      tip: '分类ID是唯一的 key',
      valueType: 'textarea',
      hideInForm: true,
      search: false,
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      valueType: 'textarea',
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
      <ProTable<API.TypeListItem, API.PageParams>
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
          const response = await fetchTypePage({ ...params });
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
      <ModalForm
        title="新建类型"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.TypeListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: "类型名称为必填项"
            },
          ]}
          placeholder="请输入类型名称"
          width="md"
          name="name"
        />
      </ModalForm>
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
