import * as allIcons from '@ant-design/icons/es';
import React from 'react';

const toHump = (name: string) =>
  name.replace(/-(\w)/g, (all: string, letter: any) => letter.toUpperCase());

/**
 * 解析图标
 * @param icon
 */
export const formatterIcon = (icon: any) => {
  if (!icon) {
    return '';
  }
  const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
  const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')];
  if (NewIcon) {
    try {
      // eslint-disable-next-line no-param-reassign
      icon = React.createElement(NewIcon);
    } catch (error) {
      console.log(error);
    }
  }
  return icon;
};
