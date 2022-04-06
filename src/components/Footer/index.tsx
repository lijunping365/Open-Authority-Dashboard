import React from 'react';
import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '酱子生鲜研发部出品',
  });

  return (
    <DefaultFooter
      copyright={`2020 ${defaultMessage}`}
      links={[
        {
          key: 'Open-Crawler-Admin',
          title: 'Open-Crawler-Admin',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Open-Crawler',
          title: 'Open-Crawler',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
