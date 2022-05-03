import * as allIcons from "@ant-design/icons/es";
import React from "react";

const toHump = (name: string) =>
  name.replace(/-(\w)/g, (all: string, letter: any) => letter.toUpperCase());

/**
 * 解决菜单图标不展示问题
 * @param routes
 */
const formatter = (data: any[]) => {
  if (!Array.isArray(data)) {
    return data;
  }
  (data || []).forEach((item) => {
    if (item.icon) {
      const { icon } = item;
      const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
      const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')];
      if (NewIcon) {
        try {
          // eslint-disable-next-line no-param-reassign
          item.icon = React.createElement(NewIcon);
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (item.routes || item.children) {
      // eslint-disable-next-line no-param-reassign
      item.children = formatter(item.routes || item.children); // Reduce memory usage
    }
  });
  return data;
};

export const patchRoutes = (routes: any[]): any => formatter(routes);
