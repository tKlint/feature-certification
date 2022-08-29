import { history } from 'umi';
import { Button, message } from 'antd';
import { initSystemProcessAction } from '@/service/qkbwe/system';

import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';
import type { InitialState } from '@/typings';

const LOGIN_PATH_NAME = '/login';

/**
 * umi请求配置函数
 */
export const request: RequestConfig = {
    timeout: 1000,
    errorConfig: {},
    middlewares: [],
    requestInterceptors: [],
    responseInterceptors: [],
    request: {
        dataField: 'data'
    }
};

/**
 * umi渲染时配置函数
 * @param oldRender
 */
export function render(oldRender: () => void) {
    const isLogin = localStorage.getItem('access-token');
    if (isLogin) {
        const { pathname } = history.location;
        if (pathname.startsWith(LOGIN_PATH_NAME)) {
            history.push('/');
        }
    } else {
        history.push(LOGIN_PATH_NAME);
    }
    oldRender();
}

/**
 * umi获取初始化状态
 * @returns
 */
export async function getInitialState(): Promise<InitialState> {
    const [initialState, errMessage] = await initSystemProcessAction();
    if (errMessage) {
        message.error(errMessage);
    }
    return initialState;
}

/**
 * 菜单数据渲染
 * @description 过滤掉登录页
 * @param menuData 菜单数据
 * @returns
 */
const menuDataRender = (menuData: MenuDataItem[]) => {
    return menuData.filter((item) => !item.path?.startsWith(LOGIN_PATH_NAME));
};

/**
 * umi运行时配置函数
 * @param initialData 初始化状态
 * @returns
 */
export const layout: RunTimeLayoutConfig = (initialData) => {
    return {
        rightContentRender: () => [
            <Button
                type="primary"
                key={'handle'}
            >
                操作
            </Button>,
            <Button
                type="primary"
                key={'ll'}
            >
                管理控制台
            </Button>
        ],
        onPageChange: () => {
            const currentUser = initialData.initialState?.currentUser;
            const { location } = history;
            if (!currentUser && location.pathname !== LOGIN_PATH_NAME) {
                history.push(LOGIN_PATH_NAME);
            }
        },
        menuDataRender: menuDataRender,
        menuRender: (props, defaultDom) => (
            <div className="menu-container">{defaultDom}</div>
        ),
        childrenRender: (children, props) => {
            const isLoginPath = props.location?.pathname?.startsWith(LOGIN_PATH_NAME);
            return isLoginPath ? children : <div className="page">{children}</div>;
        },
        logo: initialData.initialState?.plantform?.platformLogo
    };
};
