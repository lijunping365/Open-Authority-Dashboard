import {Table, Transfer} from "antd";
import difference from "lodash/difference";
import React from "react";

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: any) => (
  <Transfer {...restProps} showSelectAll={false} rowKey={(record) => record.id}>
    {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item: any) => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected: any, selectedRows: any) {
          const treeSelectedKeys = selectedRows
            .filter((item: any) => !item.disabled)
            .map(({ id }: any) => id);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ id }: any, selected: any) {
          onItemSelect(id, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          rowKey="id"
          size="small"
          scroll={{ y: 240 }}
          style={{ pointerEvents: listDisabled ? 'none' : 'auto' }}
          onRow={({ id, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(id, !listSelectedKeys.includes(id));
            },
          })}
        />
      );
    }}
  </Transfer>
);
export default TableTransfer;
