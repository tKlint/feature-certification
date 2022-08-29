import request from '@/util/request';

export declare namespace LoginAPI {
    type LoginData = {
        userName: string;
        userPassword: string;
    };
}

export function login(data: LoginAPI.LoginData) {
    return request<API.CurrentUser>('/signin', {
        method: 'POST',
        data
    });
}
