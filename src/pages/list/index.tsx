import IForm from '@/components/IForm';
import { Input } from 'antd';

export default function List() {
    const [form] = IForm.useForm();
    return (
        <div>
            <IForm form={form}>
                <IForm.Item>
                    <Input />
                </IForm.Item>
            </IForm>
        </div>
    );
}
