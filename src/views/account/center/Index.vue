<template>
	<div class="page-header-wrapper-grid-content-main">
		<a-row :gutter="24">
			<a-col span="24">
				<a-card
						style="width:100%"
						:bordered="false"
						:tabList="tabListNoTitle"
						:activeTabKey="noTitleKey"
						@tabChange="key => handleTabChange(key, 'noTitleKey')"
				>
                    <article-page v-if="noTitleKey === 'article'"></article-page>
					<app-page v-else-if="noTitleKey === 'app'"></app-page>
					<project-page v-else-if="noTitleKey === 'project'"></project-page>
                    <a-button type="primary" v-if="btnview" slot="tabBarExtraContent" @click="addItem">{{btnview}}</a-button>
                </a-card>
			</a-col>
		</a-row>
	</div>
</template>

<script>
    import { AppPage, ArticlePage, ProjectPage } from './page'
    import { mapState } from 'vuex'

    export default {
        name: "Index",
        components: {
            AppPage,
            ArticlePage,
            ProjectPage,
        },
        data(){
            return {
                tagInputVisible: false,
                tagInputValue: '',
                teamSpinning: true,
                tabListNoTitle: [
                    {key: 'article', tab: '文章'},
                    {key: 'project', tab: '视频'},
                    {key: 'app', tab: '直播'},
                ],
                noTitleKey: 'article',
                btnview: '添加文章'
            }
        },
        computed: {
            ...mapState({
                name: state => state.user.name,
                avatar: state => state.user.avatar
            })
        },
        mounted(){
            setTimeout(() => this.teamSpinning = false,1000)
        },
        methods: {
            handleTabChange (key, type) {
                if(key == 'article'){
                    this.btnview = '添加文章';
                }else if(key == 'project'){
                    this.btnview = '添加视频';
                }else {
                    this.btnview = '';
                }
                this[type] = key
            },
            addItem(){
                if(this.noTitleKey == 'article'){
                    this.$router.push('/')
                }else{
                    this.$router.push('/')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
	.page-header-wrapper-grid-content-main {
		width: 100%;
		height: 100%;
		min-height: 100%;
		transition: 0.3s;

		.account-center-avatarHolder {
			text-align: center;
			margin-bottom: 24px;

			& > .avatar {
				margin: 0 auto;
				width: 104px;
				height: 104px;
				margin-bottom: 20px;
				border-radius: 50%;
				overflow: hidden;
				img {
					height: 100%;
					width: 100%;
				}
			}

			.username {
				color: rgba(0, 0, 0, 0.85);
				font-size: 20px;
				line-height: 28px;
				font-weight: 500;
				margin-bottom: 4px;
			}
		}

		.account-center-detail {
			p {
				margin-bottom: 8px;
				padding-left: 26px;
				position: relative;
			}

			i {
				position: absolute;
				height: 14px;
				width: 14px;
				left: 0;
				top: 4px;
				background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
			}

			.title {
				background-position: 0 0;
			}
			.group {
				background-position: 0 -22px;
			}
			.address {
				background-position: 0 -44px;
			}
		}

		.account-center-tags {
			.ant-tag {
				margin-bottom: 8px;
			}
		}

		.account-center-team {
			.members {
				a {
					display: block;
					margin: 12px 0;
					line-height: 24px;
					height: 24px;
					.member {
						font-size: 14px;
						color: rgba(0, 0, 0, 0.65);
						line-height: 24px;
						max-width: 100px;
						vertical-align: top;
						margin-left: 12px;
						transition: all 0.3s;
						display: inline-block;
					}
					&:hover {
						span {
							color: #1890ff;
						}
					}
				}
			}
		}

		.tagsTitle,
		.teamTitle {
			font-weight: 500;
			color: rgba(0, 0, 0, 0.85);
			margin-bottom: 12px;
		}
	}
</style>
