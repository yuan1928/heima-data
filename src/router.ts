import { createRouter, RouteRecordRaw, createWebHistory, RouteLocationNormalized } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/list-page',
    },
    {
        path: '/list-page',
        name: 'ListPage',
        component: () => import('@/components/ListPage.vue'),
    },
    {
        path: '/config-page',
        name: 'ConfigPage',
        component: () => import('@/components/ConfigPage.vue'),
    },
    {
        path: '/summary-page',
        name: 'SummaryPage',
        component: () => import('@/components/SummaryPage.vue'),
    },
];

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHistory('/'),
    routes,
});
// 获取当前域名
// const domain = window.location.host;
// const isMaliang = domain.includes('maliang');

// router.beforeEach((to:RouteLocationNormalized, from, next) => {
//     to.meta.previousPath = to.path;

//     // 4.1 号再开启 
//     if (isMaliang) {
//         if (to.path !== '/stop-service') {
//             next({ name: 'stopService' });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// })
export default router;