<template>
	<div>
        <div class="page-header no-margin">
            <div class="row">
                <div class="avatar">
                    <a-avatar :src="avatar" />
                </div>
                <div class="headerContent">
                    <div class="title">您好，{{$store.state.user.name}}<span class="welcome-text">，</span></div>
                    <div>祝你开心每一天！</div>
                </div>
                <div class="extra">
                    <a-row class="more-info">
                        <a-col :span="8">
                            <div class="head-info center">
                                <span>文章</span>
                                <p>{{articleCount}}</p>
                                <em/>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="head-info center">
                                <span>视频</span>
                                <p>{{videoCount}}</p>
                                <em/>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="head-info center">
                                <span>直播</span>
                                <p>{{zhiboCount}}</p>
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
                        <div>
                            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                                <a-card :bordered="false" :body-style="{ padding: 0 }">
                                    <a-card-meta>
                                        <div slot="title" class="card-title">
                                            <a-avatar size="small" :src="item.cover"/>
                                            <a>{{ item.title }}</a>
                                        </div>
                                        <div slot="description" class="card-description">
                                            {{ item.category }}
                                        </div>
                                    </a-card-meta>
                                    <div class="project-item">
                                        <a>{{item.user.name}}</a>
                                        <span class="datetime">{{item.created_at | fromNow}}</span>
                                    </div>
                                </a-card>
                            </a-card-grid>
                        </div>
                    </a-card>

                    <a-card :loading="loading" title="最新文章" :bordered="false">
                        <a-list itemLayout="horizontal" :dataSource="data">
                            <a-list-item slot="renderItem" slot-scope="item">
                                <a-list-item-meta
                                        :description="item.description"
                                >
                                    <a slot="title">{{item.title}}</a>
                                    <a-avatar
                                            slot="avatar"
                                            :src="item.cover"
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
    import moment from 'moment'

    export default {
        name: "Welcome",
        data(){
            return {
                loading: false,
                articleCount: 0,
                videoCount: 0,
                zhiboCount: 0,
                data: [],
                title: '这里是标题',
                projects: []
            }
        },
        filters: {
            fromNow (date) {
                return moment(date).fromNow()
            }
        },
		computed: {
            avatar(){
                return this.$store.state.user.avatar
			}
		},
		mounted(){
            axios.post('article/index',{
                guard: 'article',
                pageSize: 6
            }).then((response) => {

                if(!response.status){
                    return this.$message.error(response.message);
                }

                this.articleCount = response.meta.total;
                this.data = response.data

            });
            axios.post('article/index',{
                guard: 'video',
                pageSize: 6
            }).then((response) => {

                if(!response.status){
                    return this.$message.error(response.message);
                }

                this.videoCount = response.meta.total;
                this.projects = response.data

            });
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
