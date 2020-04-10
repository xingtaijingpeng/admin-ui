<template>
	<div>
        <div class="page-header no-margin">
            <div class="row">
                <div class="avatar">
                    <a-avatar :src="avatar" />
                </div>
                <div class="headerContent">
                    <div class="title">早安，Serati Ma<span class="welcome-text">，祝你开心每一天！</span></div>
                    <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
                </div>
                <div class="extra">
                    <a-row class="more-info">
                        <a-col :span="8">
                            <div class="head-info center">
                                <span>项目</span>
                                <p>56</p>
                                <em/>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="head-info center">
                                <span>团队排名</span>
                                <p>8/24</p>
                                <em/>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="head-info center">
                                <span>项目数</span>
                                <p>2,223</p>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>

        <div>
            <a-row :gutter="24">
                <a-col span="24">
                    <a-card
                            class="project-list"
                            :loading="loading"
                            style="margin-bottom: 24px;"
                            :bordered="false"
                            title="最新课程"
                            :body-style="{ padding: 0 }">
                        <a slot="extra">全部课程</a>
                        <div>
                            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                                <a-card :bordered="false" :body-style="{ padding: 0 }">
                                    <a-card-meta>
                                        <div slot="title" class="card-title">
                                            <a-avatar size="small" :src="item.cover"/>
                                            <a>{{ item.title }}</a>
                                        </div>
                                        <div slot="description" class="card-description">
                                            {{ item.description }}
                                        </div>
                                    </a-card-meta>
                                    <div class="project-item">
                                        <a href="/#/">科学搬砖组</a>
                                        <span class="datetime">9小时前</span>
                                    </div>
                                </a-card>
                            </a-card-grid>
                        </div>
                    </a-card>

                    <a-card :loading="loading" title="最新文章" :bordered="false">
                        <a slot="extra">全部文章</a>
                        <a-list itemLayout="horizontal" :dataSource="data">
                            <a-list-item slot="renderItem" slot-scope="item">
                                <a-list-item-meta
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                >
                                    <a slot="title">{{item.title}}</a>
                                    <a-avatar
                                            slot="avatar"
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    />
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </a-card>
                </a-col>
            </a-row>
        </div>

	</div>
</template>

<script>

    export default {
        name: "Welcome",
        components: {

        },
        data(){
            return {
                data: [
                    {
                        title: 'Ant Design Title 1',
                    },
                    {
                        title: 'Ant Design Title 2',
                    },
                    {
                        title: 'Ant Design Title 3',
                    },
                    {
                        title: 'Ant Design Title 4',
                    },
                ],
                title: '这里是标题',
                logo: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                projects: [
                    {
                        title:"Alipay",
                        cover:"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
                        description:"那是一种内在的东西，他们到达不了，也无法触及的",
                        member:"科学搬砖组",
                    },
                    {
                        title:"Alipay",
                        cover:"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
                        description:"那是一种内在的东西，他们到达不了，也无法触及的",
                        member:"科学搬砖组",
                    },
                    {
                        title:"Alipay",
                        cover:"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
                        description:"那是一种内在的东西，他们到达不了，也无法触及的",
                        member:"科学搬砖组",
                    },
                    {
                        title:"Alipay",
                        cover:"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
                        description:"那是一种内在的东西，他们到达不了，也无法触及的",
                        member:"科学搬砖组",
                    },
                    {
                        title:"Alipay",
                        cover:"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
                        description:"那是一种内在的东西，他们到达不了，也无法触及的",
                        member:"科学搬砖组",
                    },
                    {
                        title:"Alipay",
                        cover:"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
                        description:"那是一种内在的东西，他们到达不了，也无法触及的",
                        member:"科学搬砖组",
                    },
                ]
            }
        },
        methods:{

        }
    }
</script>
<style lang="less" scoped>
    .page-header {
        background: #fff;
        padding: 16px 32px 0;
        margin-bottom: 16px;
        border-bottom: 1px solid #e8e8e8;

        .avatar {
            flex: 0 1 72px;
            margin: 0 24px 8px 0;

            & > span {
                border-radius: 72px;
                display: block;
                width: 72px;
                height: 72px;
            }
        }

        .row {
            display: flex;
            width: 100%;

            .avatar {
                margin-bottom: 16px;
            }
        }

        .title {
            font-size: 20px;
            font-weight: 500;

            font-size: 20px;
            line-height: 28px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            margin-bottom: 16px;
            flex: auto;
        }
        .logo {
            width: 28px;
            height: 28px;
            border-radius: 4px;
            margin-right: 16px;
        }
        .content,
        .headerContent {
            flex: auto;
            color: rgba(0, 0, 0, 0.45);
            line-height: 22px;

            .link {
                margin-top: 16px;
                line-height: 24px;

                a {
                    font-size: 14px;
                    margin-right: 32px;
                }
            }
        }
        .extra {
            flex: 0 1 auto;
            margin-left: 88px;
            min-width: 242px;
            text-align: right;

            .more-info{
                margin-top: 8px;
            }
        }
        .action {
            margin-left: 56px;
            min-width: 266px;
            flex: 0 1 auto;
            text-align: right;
            &:empty {
                display: none;
            }
        }
    }

    .project-list {

        .card-title {
            font-size: 0;

            a {
                color: rgba(0, 0, 0, 0.85);
                margin-left: 12px;
                line-height: 24px;
                height: 24px;
                display: inline-block;
                vertical-align: top;
                font-size: 14px;

                &:hover {
                    color: #1890ff;
                }
            }
        }
        .card-description {
            color: rgba(0, 0, 0, 0.45);
            height: 44px;
            line-height: 22px;
            overflow: hidden;
        }
        .project-item {
            display: flex;
            margin-top: 8px;
            overflow: hidden;
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            a {
                color: rgba(0, 0, 0, 0.45);
                display: inline-block;
                flex: 1 1 0;

                &:hover {
                    color: #1890ff;
                }
            }
            .datetime {
                color: rgba(0, 0, 0, 0.25);
                flex: 0 0 auto;
                float: right;
            }
        }
    }

    .head-info {
        position: relative;
        text-align: left;
        padding: 0 32px 0 0;
        min-width: 125px;

        &.center {
            text-align: center;
            padding: 0 32px;
        }

        span {
            color: rgba(0, 0, 0, .45);
            display: inline-block;
            font-size: 14px;
            line-height: 22px;
            margin-bottom: 4px;
        }
        p {
            color: rgba(0, 0, 0, .85);
            font-size: 24px;
            line-height: 32px;
            margin: 0;
        }
        em {
            background-color: #e8e8e8;
            position: absolute;
            height: 56px;
            width: 1px;
            top: 0;
            right: 0;
        }
    }
</style>
