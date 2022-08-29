import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
} = {
    navTheme: 'light',
    primaryColor: '#1890ff',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    title: 'fuck umi',
    pwa: false,
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    iconfontUrl: '//at.alicdn.com/t/font_2880658_kc24wnozc2.js'
};

export default Settings;
