import { Tree } from  './tree';

export default [
    {
        path: 'index', meta: { title: '工作台', icon: 'pie-chart', hidden: false},
        component: () => import('../views/Welcome.vue'),
    },
    {
        path: 'order', meta: { title: '订单', icon: 'pie-chart', hidden: false},
        component: () => import('../views/Welcome.vue'),
    },
    {
        path: 'member', meta: { title: '用户', icon: 'pie-chart', hidden: false},
        component: () => import('../views/Welcome.vue'),
    },
    {
        path: 'account', meta: { title: '平台', icon: 'user'},
        component: Tree(),
        children: [
            {
                path: 'center', meta: { title: '媒体管理'},
                component: () => import('../views/account/center/Index.vue'),
            },
            {
                path: 'category', meta: { title: '分类管理'},
                component: () => import('../views/account/center/Index.vue'),
                children: [
                    {
                        path: 'article', meta: { title: '文章'},
                        component: () => import('../views/account/settings/BaseSetting.vue'),
                    },
                    {
                        path: 'video', meta: { title: '视频'},
                        component: () => import('../views/account/settings/Security.vue'),
                    },
                ]
            },
            {
                path: 'settings', meta: { title: '基本设置'},
                component: () => import('../views/account/settings/Index.vue'),
                redirect: '/account/settings/base',
                hideChildrenInMenu: true,
                children: [
                    {
                        path: 'base', meta: { title: '基本设置'},
                        component: () => import('../views/account/settings/BaseSetting.vue'),
                    },
                    {
                        path: 'security', meta: { title: '安全设置'},
                        component: () => import('../views/account/settings/Security.vue'),
                    },
                    {
                        path: 'custom', meta: { title: '个性化'},
                        component: () => import('../views/account/settings/Custom.vue'),
                    },
                ]
            },
        ]
    },
    {
        path: 'system', meta: { title: '系统', icon: 'setting'},
        component: Tree(),
        children: [
            {
                path: 'develop', meta: { title: '开发管理'},
                component: Tree(),
                children:[
                    {
                        path: 'permission', meta: { title: '权限列表', keepAlive: true}, //keepAlive 暂未开发此功能（当前暂无可行方案）
                        component: Tree(() => import('../views/system/develop/permission/Index.vue')),
                        hideChildrenInMenu: true,
                        children:[
                            {
                                path: 'create', meta: { title: '创建'},
                                component: () => import('../views/system/develop/permission/Create.vue')
                            },
                            {
                                path: 'update/:id', meta: { title: '更新'},
                                component: () => import('../views/system/develop/permission/Create.vue')
                            },
                        ]
                    },
                    {
                        path: 'role', meta: { title: '角色列表'},
                        component: Tree(() => import('../views/system/develop/role/Index.vue')),
                        hideChildrenInMenu: true,
                        children:[
                            {
                                path: 'create', meta: { title: '创建'},
                                component: () => import('../views/system/develop/role/Create.vue')
                            },
                            {
                                path: 'update/:id', meta: { title: '更新'},
                                component: () => import('../views/system/develop/role/Create.vue')
                            },
                        ]
                    },
                    {
                        path: 'admin', meta: { title: '管理员列表'},
                        component: Tree(() => import('../views/system/develop/admin/Index.vue')),
                        hideChildrenInMenu: true,
                        children:[
                            {
                                path: 'create', meta: { title: '创建'},
                                component: () => import('../views/system/develop/admin/Create.vue')
                            },
                            {
                                path: 'update/:id', meta: { title: '更新'},
                                component: () => import('../views/system/develop/admin/Create.vue')
                            },
                        ]
                    },
                ]
            },
        ],

    },
];
