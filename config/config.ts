import { defineConfig } from 'umi';
import routes from './routes';
import defaultSettings from './theme';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
    publicPath: './',
    devtool: REACT_APP_ENV === 'dev' ? 'eval' : undefined,
    nodeModulesTransform: {
        type: 'none'
    },
    routes: routes,
    fastRefresh: {},
    layout: {
        layout: 'side',
        siderWidth: 208,
        ...defaultSettings
    },
    dynamicImport: {
        loading: '@ant-design/pro-layout/es/PageLoading'
    },
    theme: {
        // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
        // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
        // https://ant.design/docs/react/customize-theme-variable-cn
        'root-entry-name': 'variable'
    },
    proxy: proxy[REACT_APP_ENV || 'dev']
    // chainWebpack: (config) => {
    //     console.log('file lod')
    //     config.module
    //     .rule('svg')
    //     .test(/\.(svg)$/)
    //     .use()
    //     .loader('url-loader')
    //     .options('$')
    //     .end()
    // }
});
