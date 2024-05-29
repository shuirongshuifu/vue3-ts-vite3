import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/one',
          name: 'One',
          component: () => import('../views/First/One.vue'),
        },
        {
          path: '/two',
          name: 'Two',
          component: () => import('../views/First/Two.vue'),
        },
        {
          path: '/three',
          name: 'Three',
          component: () => import('../views/First/Three.vue'),
        },
        {
          path: '/aaa',
          name: 'Aaa',
          component: () => import('../views/Second/Aaa.vue'),
        },
        {
          path: '/bbb',
          name: 'Bbb',
          component: () => import('../views/Second/Bbb.vue'),
        },
      ]
    },
  ]
})

export default router
