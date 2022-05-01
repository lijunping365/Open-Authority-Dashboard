import React from 'react';
import { Transfer, Tree } from 'antd';

const isChecked = (selectedKeys:any, eventKey:any) => selectedKeys.indexOf(eventKey) !== -1;

const generateTree = (treeNodes:any = [], checkedKeys = []) =>
  treeNodes.map(({ children, ...props }:any) => ({
    ...props,
    // @ts-ignore
    disabled: checkedKeys.includes(props.key),
    children: generateTree(children, checkedKeys),
  }));

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }:any) => {
  const transferDataSource:any = [];
  function flatten(list = []) {
    list.forEach((item:any) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }:any) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              treeData={generateTree(dataSource, targetKeys)}
              onCheck={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
              }}
              onSelect={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
              }}
            />
          );
        }
        return null;
      }}
    </Transfer>
  );
};

export default TreeTransfer;
