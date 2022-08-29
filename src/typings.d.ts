import { Settings } from '@ant-design/pro-layout';

declare interface InitialState {
    settings?: Partial<Settings>;
    currentUser?: API.CurrentUser;
    loading?: boolean;
    fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
    menuData?: never[];
    plantform?: API.Plantform;
}
