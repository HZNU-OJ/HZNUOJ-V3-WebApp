import { defineConfig } from 'umi';
import customConfig from '../customConfig';
import routes from './routes';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  // dynamicImport: {
  //   loading: '@/components/GlobalLoading',
  // },
  // chunks: ['basic', 'vendors.umi', 'umi'],
  chainWebpack: (config, { webpack }) => {
    //   config.merge({
    //     optimization: {
    //       splitChunks: {
    //         chunks: 'all',
    //         minSize: 30000,
    //         maxSize: 0,
    //         name: true,
    //         minChunks: 1,
    //         maxAsyncRequests: 10,
    //         maxInitialRequests: 5,
    //         automaticNameDelimiter: '.',
    //         cacheGroups: {
    //           basic: {
    //             name: 'basic',
    //             test({ resource }) {
    //               return /(@antd|antd|@ant-design|react)/.test(
    //                 resource,
    //               );
    //             },
    //             priority: 100,
    //           },
    //           monacoEditor: {
    //             name: true,
    //             test({ resource }) {
    //               return /monaco/.test(resource);
    //             },
    //             priority: 99,
    //           },
    //         },
    //       },
    //     },
    //   });
    //更多配置 https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    config.plugin('monaco-editor-webpack-plugin').use(MonacoWebpackPlugin, [
      // 按需配置
      {
        languages: customConfig.monacoEditorSupportedLanguages,
        publicPath: customConfig.publicPath,
      },
    ]);
    return config;
  },
  nodeModulesTransform: {
    type: 'none',
  },
  metas: customConfig.metas,
  title: false,
  analytics: customConfig.analytics,
  hash: true,
  favicon: customConfig.favicon,
  fastRefresh: {},
  routes: routes,
  publicPath: customConfig.publicPath,
});
