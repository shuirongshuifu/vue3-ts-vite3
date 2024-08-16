// 注册外部组件
import BaiduCalendar from 'vue-baidu-calendar';

// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// import zhCn from 'element-plus/es/locale/lang/zh-cn';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export function register(app: Record<string, any>) {
    // // 注册 Element Plus
    // app.use(ElementPlus, {
    //     locale: zhCn,
    // });
    // // 注册 Element Plus 图标
    // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    //     app.component(key, component);
    // }
    // 注册 BaiduCalendar
    app.use(BaiduCalendar);
}