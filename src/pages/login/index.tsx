import IForm from '@/components/IForm';
import React from 'react';
import { Input, Button } from 'antd';
import { useModel } from 'umi';
import { login } from '@/service/qkbwe/login';
import type { LoginAPI } from '@/service/qkbwe/login';
import type { LoginFormFields } from './typings';

import './style.less';

const Login: React.FC<Record<string, never>> = () => {
    const { initialState, setInitialState } = useModel('@@initialState');
    const [form] = IForm.useForm();

    const plantform = initialState?.plantform;
    const accountFieldName: LoginFormFields = 'userName';
    const passwordFieldName: LoginFormFields = 'userPassword';

    const submit = async (formData: LoginAPI.LoginData) => {
        const loginResponse = await login(formData);
        const { code, data } = loginResponse;
        if (code === 200) {
            await setInitialState({
                ...initialState,
                currentUser: data
            });
            localStorage.setItem('access-token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            // history.push('/');
            window.location.reload();
        }
        return Promise.resolve(false);
    };

    return (
        <div className="page-login">
            <div className="login-container">
                <div className="form-content">
                    <div className="login-header">
                        <img
                            className="logo-img"
                            src={plantform?.platformLogo}
                            alt=""
                        />
                        <span className="plantform-name">{plantform?.platformName}</span>
                    </div>
                    <IForm<LoginAPI.LoginData>
                        form={form}
                        onFinish={submit}
                        submitter={false}
                    >
                        <IForm.Item
                            name={accountFieldName}
                            required
                        >
                            <Input
                                size="large"
                                placeholder="账号"
                            />
                        </IForm.Item>
                        <IForm.Item
                            name={passwordFieldName}
                            required
                        >
                            <Input.Password size="large" />
                        </IForm.Item>
                        <IForm.Item>
                            <Button
                                htmlType="submit"
                                size="large"
                                type="primary"
                                style={{ width: '100%' }}
                            >
                                登录
                            </Button>
                        </IForm.Item>
                    </IForm>
                </div>
            </div>
        </div>
    );
};

export default Login;
