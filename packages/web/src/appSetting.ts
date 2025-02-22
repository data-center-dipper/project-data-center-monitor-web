// src/appSetting.ts
export interface AppSetting {
    title: string;
    logo: string;
}

const appConfig: AppSetting = {
    title: '硅谷甄选运营平台', // 项目的标题
    logo: '/public/logo.jpg', // 项目logo设置
};

export default appConfig; // 导出配置对象而不是接口