import { InitialState } from '@/typings';
import request from '@/util/request';
import { history } from 'umi';

const LOGIN_PATH_NAME = '/login';

/**
 * 获取系统平台信息
 * @returns
 */
export function plantformInfoApi() {
    return request<API.Plantform>('/method/platform/name', { method: 'POST' });
}

/**
 * 获取用户信息
 * @returns
 */
export function userInfoApi(): Promise<API.CurrentUser | undefined> {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        return Promise.resolve(JSON.parse(userInfo));
    }
    return Promise.resolve(undefined);
}

export function userMeunApi(data: { userNo: string }): Promise<never[]> {
    return Promise.resolve([data] as never);
}

/**
 * 初始化系统流程
 * @returns
 */
export async function initSystemProcessAction(): Promise<
    [InitialState, string] | [InitialState]
> {
    /**
     * 从session中获取用户信息
     * @returns 用户信息
     */
    const fetchUserInfo = (): Promise<API.CurrentUser | undefined> => {
        return userInfoApi();
    };

    const initialState: InitialState = {};
    const { data: plantform } = await plantformInfoApi();
    if (!plantform) {
        return [initialState, '获取平台信息失败'];
    }
    console.log('%c平台信息获取成功', 'color: green', '[1/3]');
    initialState.plantform = plantform;

    const currentUser = await fetchUserInfo();
    if (!currentUser) {
        history.push(LOGIN_PATH_NAME);
        return [initialState];
    }
    console.log('%c用户信息获取成功', 'color: green', '[2/3]');

    initialState.currentUser = currentUser;
    initialState.fetchUserInfo = fetchUserInfo;

    const menuData = await userMeunApi({ userNo: currentUser.userNo });
    if (!menuData) {
        return [initialState, '路由获取失败'];
    }
    console.log('%c路由信息获取成功', 'color: green', '[3/3]');

    initialState.menuData = menuData;
    return [initialState];
}
