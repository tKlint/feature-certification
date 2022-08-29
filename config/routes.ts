import type { MenuDataItem } from '@ant-design/pro-layout';

// export interface Routes {
//     path: string;
//     component?: string;
//     layout?: boolean;
//     routes?: Routes[];
//     icon?: string;
//     name?: string;
// }

const routes: MenuDataItem[] = [
    {
        path: '/',
        name: '首页',
        component: '@/pages/index'
    },
    {
        path: '/login',
        name: '登录',
        component: '@/pages/login',
        layout: false
    },
    {
        path: '/list',
        name: '列表',
        component: '@/pages/list'
    },
    {
        component: './404'
    }
];

export default routes;
