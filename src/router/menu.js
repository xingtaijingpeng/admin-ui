import { Tree } from  './tree';

export default [
    {
        path: 'index', meta: { title: '工作台', icon: 'pie-chart', hidden: false},
        component: () => import('../views/Welcome.vue'),
    },
    {
        path: 'orders', meta: { title: '订单', icon: 'file-done', hidden: false},
        component: Tree(() => import('../views/order/Index.vue')),
        hideChildrenInMenu: true,
        children: [
            {
                path: ':id?', meta: { title: '订单'},
                component: () => import('../views/order/Index.vue'),
            }
        ]
    },
    {
        path: 'member', meta: { title: '用户', icon: 'user', hidden: false},
        component: () => import('../views/member/Index'),
    },
    {
        path: 'teacher', meta: { title: '师资', icon: 'edit', hidden: false},
        component: Tree(() => import('../views/teacher/Index')),
        hideChildrenInMenu: true,
        children: [
            {
                path: 'create', meta: { title: '添加师资'},
                component: () => import('../views/teacher/Create.vue'),
            },
            {
                path: 'update/:id', meta: { title: '修改师资'},
                component: () => import('../views/teacher/Create.vue'),
            },
        ]
    },
    {
        path: 'account', meta: { title: '平台', icon: 'windows'},
        component: Tree(),
        children: [
            {
                path: 'center', meta: { title: '媒体管理'},
                component: Tree(() => import('../views/account/center/Index.vue')),
                hideChildrenInMenu: true,
                children: [
                    {
                        path: 'article/create', meta: { title: '新增文章'},
                        component: () => import('../views/account/center/page/AricleCreate.vue'),
                    },
                    {
                        path: 'article/update/:id', meta: { title: '修改文章'},
                        component: () => import('../views/account/center/page/AricleCreate.vue'),
                    },
                    {
                        path: 'video/create', meta: { title: '新增视频'},
                        component: () => import('../views/account/center/page/VideoCreate.vue'),
                    },
                    {
                        path: 'video/update/:id', meta: { title: '修改视频'},
                        component: () => import('../views/account/center/page/VideoCreate.vue'),
                    },
                    {
                        path: 'comments/:id', meta: { title: '评论列表'},
                        component: () => import('../views/account/center/page/Comments'),
                    },
                    {
                        path: 'comments/:id/create', meta: { title: '添加评论'},
                        component: () => import('../views/account/center/page/CommentCreate'),
                    },
                    {
                        path: 'comments/:id/update/:sid', meta: { title: '更新评论'},
                        component: () => import('../views/account/center/page/CommentCreate'),
                    },
                ]
            },
            {
                path: 'category', meta: { title: '分类管理'},
                component: Tree(),
                children: [
                    {
                        path: 'article', meta: { title: '文章'},
                        component: Tree(() => import('../views/account/category/Article.vue')),
                        hideChildrenInMenu: true,
                        children: [
                            {
                                path: 'create/:guard', meta: { title: '新增分类'},
                                component: () => import('../views/account/category/Create.vue'),
                            },
                            {
                                path: 'update/:guard/:id', meta: { title: '修改分类'},
                                component: () => import('../views/account/category/Create.vue'),
                            },
                        ]
                    },
                    {
                        path: 'video', meta: { title: '视频'},
                        component: Tree(() => import('../views/account/category/Video.vue')),
                        hideChildrenInMenu: true,
                        children: [
                            {
                                path: 'create/:guard', meta: { title: '新增分类'},
                                component: () => import('../views/account/category/Create.vue'),
                            },
                            {
                                path: 'update/:guard/:id', meta: { title: '修改分类'},
                                component: () => import('../views/account/category/Create.vue'),
                            },
                        ]
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
                        path: 'base', meta: { title: 'Banner/Logo'},
                        component: () => import('../views/account/settings/BaseSetting.vue'),
                    },
                    {
                        path: 'security', meta: { title: '安全设置'},
                        component: () => import('../views/account/settings/Security.vue'),
                    },
                    {
                        path: 'custom', meta: { title: '公司简介/版权'},
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
                path: 'develop', meta: { title: '开发管理', hidden: false},
                component: Tree(),
                children:[
                    {
                        path: 'permission', meta: { title: '权限列表', keepAlive: true, hidden: true}, //keepAlive 暂未开发此功能（当前暂无可行方案）
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
                        path: 'role', meta: { title: '角色列表', hidden: true},
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
