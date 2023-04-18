import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import ResourceTransferTable from '@/pages/authorization/role/components/ResourceTransferTable';
import MenuTransferTable from '@/pages/authorization/role/components/MenuTransferTable';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRole, updateRole, addRole, removeRule, allocResource, allocMenu } from '@/services/open-admin/role';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRole({ ...fields });
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
const handleUpdate = async (fields: Partial<API.TableListItem>) => {
  const hide = message.loading('正在配置');
  try {
    await updateRole(fields);
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
const handleRemove = async (selectedRows: API.TableListItem[]) => {
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

/**
 *  分配资源
 * @param roleResource
 */
const handleAllocResource = async (roleResource: Partial<API.RoleResourceData>) => {
  const hide = message.loading('正在修改状态');
  if (!roleResource) return true;
  try {
    await allocResource(roleResource);
    hide();
    message.success('修改状态成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('修改状态失败，请重试');
    return false;
  }
};

/**
 *  分配菜单
 * @param roleMenu
 */
const handleAllocMenu = async (roleMenu: Partial<API.RoleMenuData>) => {
  const hide = message.loading('正在修改状态');
  if (!roleMenu) return true;
  try {
    await allocMenu(roleMenu);
    hide();
    message.success('修改状态成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('修改状态失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [resourceModalVisible, handleResourceModalVisible] = useState<boolean>(false);
  const [menuModalVisible, handleMenuModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [defaultResourceIds, setDefaultResourceIds] = useState<any[]>([]);
  const [defaultMenuIds, setDefaultMenuIds] = useState<any[]>([]);
  const [roleId, setRoleId] = useState(0);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.TableListItem[]>([]);
  const columns: ProColumns<API.TableListItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      tip: '角色名称是唯一的',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '角色名称为必填项',
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
            message: '角色描述为必填项',
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
      valueEnum: {
        0: { text: '禁用', status: 'Default' },
        1: { text: '启用', status: 'Processing' },
      },
      hideInForm: true
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
      valueType: 'text',
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
            onClick={() => {
              handleMenuModalVisible(true);
              setDefaultMenuIds(record.menus ? record.menus.split(",") : []);
              setRoleId(record.id);
            }}
          >
            分配菜单
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleResourceModalVisible(true);
              setDefaultResourceIds(record.access ? record.access.split(",") : []);
              setRoleId(record.id);
            }}
          >
            分配资源
          </a>
          <Divider type="vertical" />
          <a href="">禁用</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="id" type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const response = await queryRole({ ...params, sorter, filter });
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
      {resourceModalVisible ? (
        <ResourceTransferTable
          modalVisible={resourceModalVisible}
          targetKeys={defaultResourceIds}
          onCancel={() => {
            handleResourceModalVisible(false);
            setDefaultResourceIds([]);
            setRoleId(0);
          }}
          onSubmit={async (value) => {
            const success = await handleAllocResource({ roleId, resourceId: value });
            if (success) {
              handleResourceModalVisible(false);
              setDefaultResourceIds([]);
              setRoleId(0);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      ) : null}
      {menuModalVisible ? (
        <MenuTransferTable
          modalVisible={menuModalVisible}
          targetKeys={defaultMenuIds}
          onCancel={() => {
            handleMenuModalVisible(false);
            setDefaultMenuIds([]);
            setRoleId(0);
          }}
          onSubmit={async (value) => {
            const success = await handleAllocMenu({ roleId, menuId: value });
            if (success) {
              handleMenuModalVisible(false);
              setDefaultMenuIds([]);
              setRoleId(0);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      ) : null}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<API.TableListItem, API.TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
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
          <ProDescriptions<API.TableListItem>
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
