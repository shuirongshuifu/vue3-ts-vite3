// @ts-nocheck

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/one', // 添加这一行来实现重定向到'/one'路由
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/one',
        name: 'One',
        meta: {
          menu: 'First',
          title: '表单组件封装1'
        },
        component: () => import('../views/First/One.vue'),
      },
      {
        path: '/two',
        name: 'Two',
        meta: {
          menu: 'First',
          title: '表单组件封装2'
        },
        component: () => import('../views/First/Two.vue'),
      },
      {
        path: '/three',
        name: 'Three',
        meta: {
          menu: 'First',
          title: '表格组件封装1'
        },
        component: () => import('../views/First/Three.vue'),
      },
      {
        path: '/four',
        name: 'Four',
        meta: {
          menu: 'First',
          title: '表格组件封装2'
        },
        component: () => import('../views/First/Four.vue'),
      },
      {
        path: '/five',
        name: 'Five',
        meta: {
          menu: 'First',
          title: '表格组件封装3'
        },
        component: () => import('../views/First/Five.vue'),
      },
      {
        path: '/six',
        name: 'Six',
        meta: {
          menu: 'First',
          title: '表格组件封装4'
        },
        component: () => import('../views/First/Six.vue'),
      },
      {
        path: '/seven',
        name: 'Seven',
        meta: {
          menu: 'First',
          title: '表格组件封装5'
        },
        component: () => import('../views/First/Seven.vue'),
      },
      {
        path: '/eight',
        name: 'Eight',
        meta: {
          menu: 'First',
          title: '表格组件封装6'
        },
        component: () => import('../views/First/Eight.vue'),
      },
      {
        path: '/nine',
        name: 'Nine',
        meta: {
          menu: 'First',
          title: '表单表格'
        },
        component: () => import('../views/First/Nine.vue'),
      },
      {
        path: '/aaa',
        name: 'Aaa',
        meta: {
          menu: 'Second',
          title: 'Shift快速勾选'
        },
        component: () => import('../views/Second/Aaa.vue'),
      },
      {
        path: '/bbb',
        name: 'Bbb',
        meta: {
          menu: 'Second',
          title: '视频封装'
        },
        component: () => import('../views/Second/Bbb.vue'),
      },
      {
        path: '/ccc',
        name: 'Ccc',
        meta: {
          menu: 'Second',
          title: '数字输入框跳转'
        },
        component: () => import('../views/Second/Ccc.vue'),
      },
      {
        path: '/ddd',
        name: 'Ddd',
        meta: {
          menu: 'Second',
          title: '日历改造2'
        },
        component: () => import('../views/Second/Ddd.vue'),
      },
      {
        path: '/eee',
        name: 'Eee',
        meta: {
          menu: 'Second',
          title: '日历改造3'
        },
        component: () => import('../views/Second/Eee.vue'),
      },
      {
        path: '/fff',
        name: 'Fff',
        meta: {
          menu: 'Second',
          title: '组件继承'
        },
        component: () => import('../views/Second/Fff.vue'),
      },
      {
        path: '/ggg',
        name: 'Ggg',
        meta: {
          menu: 'Second',
          title: '树表格勾选'
        },
        component: () => import('../views/Second/Ggg.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router

function transformRoutesToMenu(routes) {
  const menuMap = {};
  routes.forEach(route => {
    if (route.children) {
      route.children.forEach(child => {
        if (!menuMap[child.meta.menu]) {
          menuMap[child.meta.menu] = { name: child.meta.menu, path: '', children: [] };
        }
        menuMap[child.meta.menu].children.push({
          name: child.meta.title,
          path: child.path,
        });
      });
    }
  });
  const meunArr = [];
  for (const key in menuMap) {
    if (menuMap.hasOwnProperty(key)) {
      meunArr.push(menuMap[key]);
    }
  }
  return meunArr;
}
// 使用定义好的函数转换数据
export const meunAr = transformRoutesToMenu(routes);