const { override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@font-family':'PorscheNext , "Heiti SC", sans-serif',
      '@primary-color': '#d5001c', // 全局主色
      '@link-color': '#1890ff', // 链接色
      '@success-color': '#52c41a', // 成功色
      '@warning-color': '#faad14', // 警告色
      '@error-color': '#f5222d', // 错误色
      '@font-size-base': '16px', // 主字号
      '@text-color': '#000000', // 主文本色
      '@text-color-secondary': '#959899', // 次文本色
      '@disabled-color': 'rgba(0, 0, 0, .25)', // 失效色
      '@border-radius-base':0, // 组件/浮层圆角
      '@border-color-base': '#c8cacb', // 边框色
      '@table-header-bg': '#fff',//表头bg
      '@table-border-radius-base': '0px',//表格圆角
      '@table-row-hover-bg': '#EFF0F1',//表圆hover
      '@table-header-color': '#959899',//表头color
      '@pagination-item-bg-active': '#fff',//pagination
    },
  }),
);
