import React from 'react';
import { ProForm, ProFormProps } from '@ant-design/pro-components';

type IFormProps<T = Record<string, unknown>> = ProFormProps<T>;

interface IFormType {
    <T extends Record<string, unknown>>(props: IFormProps<T>): JSX.Element;
    ErrorList: typeof ProForm.ErrorList;
    Group: typeof ProForm.Group;
    Item: typeof ProForm.Item;
    Provider: typeof ProForm.Provider;
    useForm: typeof ProForm.useForm;
    useWatch: typeof ProForm.useWatch;
}

const IForm: IFormType = <T extends Record<string, unknown>>(props: IFormProps<T>) => {
    return (
        <div className="i-form-container">
            <ProForm<T> {...props} />
        </div>
    );
};

IForm.ErrorList = ProForm.ErrorList;
IForm.Group = ProForm.Group;
IForm.Item = ProForm.Item;
IForm.Provider = ProForm.Provider;
IForm.useForm = ProForm.useForm;
IForm.useWatch = ProForm.useWatch;

export default IForm;
