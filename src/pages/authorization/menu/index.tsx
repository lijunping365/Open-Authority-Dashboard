import { PlusOutlined } from '@ant-design/icons';
import {Button, Divider, message, Drawer} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { formatterIcon } from '@/utils/icon';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryMenuPage, updateMenu, addMenu, removeMenu } from '@/services/open-admin/menu';
import {confirmModal} from "@/components/ConfirmModel";
import ITreeSelect from "@/components/ITreeSelect";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.Menu) => {
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
const handleUpdate = async (fields: Partial<API.Menu>) => {
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
const handleRemove = async (selectedRows: any[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeMenu({ids: selectedRows});
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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.Menu>();
  const [selectedRowsState, setSelectedRows] = useState<API.Menu[]>([]);
  const [menuData, setMenuData] = useState<API.Menu[]>([]);
  const [parentId, setParentId] = useState(0);

  const handlerSelect = (pid: any) => {
    setParentId(pid)
  };

  const columns: ProColumns<API.Menu>[] = [
    {
      title: '父菜单',
      dataIndex: 'pid',
      valueType: 'select',
      search: false,
      hideInTable: true,
      renderFormItem: () => {
        return (
          <ITreeSelect
            onSelect={handlerSelect}
            treeData={menuData}
            defaultValue={[]}
          />
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
      <ProTable<API.Menu>
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
        request={async (params) => {
          const response = await queryMenuPage({ ...params});
          setMenuData(response.records);
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
              await handleRemove(selectedRowsState ? selectedRowsState.map((e) => e.id):[]);
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
        <ProTable<API.Menu, API.Menu>
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
          <ProDescriptions<API.Menu>
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
