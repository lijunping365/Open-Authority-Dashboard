import { PlusOutlined } from '@ant-design/icons';
import {Button, Divider, message, Drawer} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { formatterIcon } from '@/utils/icon';
import CustomizeTreeSelect from '@/components/ITreeSelect';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem } from './data';
import { queryMenu, updateMenu, addMenu, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addMenu({ ...fields });
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
 * @param fields
 */
const handleUpdate = async (fields: Partial<TableListItem>) => {
  const hide = message.loading('正在配置');
  try {
    await updateMenu(fields);
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
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [menuData, setMenuData] = useState<TableListItem[]>([]);
  const [parentId, setParentId] = useState(0);

  const handlerSelect = (pid: any) => {
    setParentId(pid)
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '父菜单',
      dataIndex: 'pid',
      valueType: 'select',
      search: false,
      hideInTable: true,
      renderFormItem: () => {
        return (
          <CustomizeTreeSelect onSelect={handlerSelect} treeData={menuData} defaultValue={[]} defaultExpandedKeys={[]}/>
        );
      },
    },
    {
      title: '图标',
      dataIndex: 'icon',
      search: false,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '菜单图标为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        if (entity.level !== 1) return <></>;
        return formatterIcon(entity.icon);
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
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '描述',
      dataIndex: 'memo',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '菜单描述为必填项',
          },
        ],
      },
    },
    {
      title: '路由',
      dataIndex: 'path',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '菜单路由为必填项',
          },
        ],
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'digit',
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'enableStatus',
      hideInForm: true,
      valueEnum: {
        0: { text: '未启用', status: 'Default' },
        1: { text: '启用中', status: 'Processing' },
      },
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
              setStepFormValues(record);
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
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const response = await queryMenu({ ...params, sorter, filter });
          setMenuData(response);
          return {
            data: response,
            total: 1,
            success: true,
            pageSize: 1,
            current: 1,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
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
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd({
              ...value,
              pid:parentId
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
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
          treeData={menuData}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
