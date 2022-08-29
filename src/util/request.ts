import { Modal, notification } from 'antd';
import type { RequestOptionsInit } from 'umi-request';
import { extend } from 'umi-request';

export interface ResponseType<T = object> {
    code: number;
    message: string;
    data: T;
}

interface CodeHandle {
    [key: number]: () => void;
    ['*']: (code: number) => void;
}
const codeMessage: {
    [key: number]: string;
} = {
    200: '请求成功',
    204: '删除成功',
    500: '服务器发生错误，请检查服务器',
    401: '用户没有权限（令牌、用户名、密码错误）',
    406: '请求的格式不可得'
};
const accessTokenExprie = () => {
    Modal.error({
        title: '授权过期',
        content: '授权超过7天, 请重新登录!',
        mask: true,
        afterClose() {
            localStorage.removeItem('access-token');
            window.location.href = '/login';
        }
    });
};
const codeHandle: CodeHandle = {
    401: accessTokenExprie,
    '*': function (code: number) {
        console.warn('未知的error code:', code);
    }
};
const request = extend({
    prefix: '/gateway/admin',
    credentials: 'include' // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => {
    const tokenStr = localStorage.getItem('userInfo');
    let tokenType = '';
    let token = '';
    if (tokenStr) {
        token = JSON.parse(tokenStr).token;
        tokenType = JSON.parse(tokenStr).tokenType;
    }
    const headers = {
        Accept: options.isForm ? 'application/json' : '*',
        Authorization: `${tokenType} ${token}`
    };
    return {
        url: url,
        options: { ...options, headers }
    };
});

const interceptJSONData = async (response: Response) => {
    const { code, message } = (await response.clone().json()) as ResponseType;
    if (code !== 200) {
        notification.error({
            message: `${codeMessage[code]}${code}`,
            description: message
        });
        if (Object.keys(codeHandle).includes(`${code}`)) {
            codeHandle[code]();
        } else {
            codeHandle['*'](code);
        }
    }
};

request.interceptors.response.use((response) => {
    const contentType = response.headers.get('content-type');
    switch (contentType) {
        case 'application/json; charset=utf-8':
            interceptJSONData(response);
            break;
        default:
            break;
    }
    return response;
});

const requestInstance = <T extends object>(
    url: string,
    options: RequestOptionsInit
): Promise<ResponseType<T>> => {
    const method = options.method || 'GET';
    switch (method) {
        case 'GET':
            return request.get(url, options);
        case 'POST':
            return request.post(url, options);
        case 'PUT':
            return request.put(url, options);
        case 'DELETE':
            return request.delete(url, options);
        default:
            throw new Error('RESULTFUL ERROR: INVALID METHOD');
    }
};

export default requestInstance;
