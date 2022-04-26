import { PlusOutlined } from '@ant-design/icons';
import {Button, message, Divider} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import { fetchProxyPage, addProxy, updateProxy, removeProxy } from '@/services/open-crawler/spiderproxy';
import {confirmModal} from "@/components/ConfirmModel";
import CreateForm from "./components/CreateForm";
import ITreeSelect from '@/components/ITreeSelect';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.SpiderProxy) => {
  const hide = message.loading('正在添加');
  try {
    await addProxy({ ...fields });
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
const handleUpdate = async (fields: Partial<API.SpiderProxy>) => {
  const hide = message.loading('正在配置');
  try {
    await updateProxy(fields);
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
    await removeProxy({ids: selectedRows});
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
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  // const [currentRow, setCurrentRow] = useState<Proxy>();
  const [selectedRowsState, setSelectedRows] = useState<API.SpiderProxy[]>([]);
  const [menuData, setMenuData] = useState<API.SpiderGroup[]>([]);
  const [parentId, setParentId] = useState(0);


  const handlerSelect = (pid: any) => {
    setParentId(pid)
  };

  const columns: ProColumns<API.SpiderProxy>[] = [
    {
      title: '父菜单',
      dataIndex: 'pid',
      valueType: 'select',
      search: false,
      hideInTable: true,
      renderFormItem: () => {
        return (
          <ITreeSelect onSelect={handlerSelect} treeData={menuData} defaultValue={[]} defaultExpandedKeys={[]}/>
        );
      },
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      tip: '菜单名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '菜单名称为必填项',
          },
        ],
      },
      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>;
      // },
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
      valueType: 'textarea',
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
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
              //setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.SpiderProxy>
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
              handleCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}

        request={async (params) => {
          const response = await fetchProxyPage({ ...params });
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

      <CreateForm onCancel={() => handleCreateModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<API.SpiderProxy, API.SpiderProxy>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleCreateModalVisible(false);
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
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setUpdateFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={updateFormValues}
        />
      ) : null}

    </PageContainer>
  );
};

export default TableList;
