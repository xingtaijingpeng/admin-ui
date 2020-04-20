<template>
	<a-list
			size="large"
			rowKey="id"
			:loading="loading"
			itemLayout="vertical"
			:dataSource="data"
			:pagination="pagination"
	>
		<a-list-item :key="item.id" slot="renderItem" slot-scope="item">
			<template slot="actions">
                <span @click="jump('/account/center/article/update/'+item.id)">
                  <a-icon type="edit" style="margin-right: 8px" />
                  编辑
                </span>
				<a-popconfirm placement="top" okText="Yes" cancelText="No" @confirm="deleteart(item.id)">
					<template slot="title">
						<p>是否删除？</p>
					</template>
					<a-icon type="delete" style="margin-right: 8px" />删除
				</a-popconfirm>
				<span @click="jump('/account/center/comments/'+item.id)">
                  <a-icon type="notification" style="margin-right: 8px" />
                  评论管理
                </span>
			</template>
			<a-list-item-meta>
				<a slot="title">{{ item.title }}</a>
				<template slot="description">
                      <span>
                        <a-tag>{{ item.category }}</a-tag>
                      </span>
				</template>
			</a-list-item-meta>
			<div class="antd-pro-components-article-list-content-index-listContent">
				<div class="description">
					<slot>
						{{ item.description }}
					</slot>
				</div>
				<div class="extra">
					<a-avatar :src="item.user.avatar" size="small" />
					<a :href="item.href">{{ item.user.name }}</a> 发布于
					<em>{{ item.created_at}}</em>
				</div>
			</div>
		</a-list-item>
	</a-list>
</template>

<script>

    export default {
        name: 'Article',
        components: {

        },
        data () {
            return {
                pagination: {
                    onChange: page => {
                        window.console.log(page);
                    },
                    pageSize: 10,
                },
                loading: true,
                data: []
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            deleteart(id){
                axios.post('/article/delete/'+id).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    this.init();

                });
			},
			init(){
                //获取文章列表
                axios.post('/article/index',{
                    guard: 'article',
                    pageSize: 999
                }).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    this.loading = false;
                    this.data = response.data;

                });
			}
        }
    }
</script>
<style lang="less" scoped>
	@import '~@/assets/css/global.less';

	.antd-pro-components-article-list-content-index-listContent {
		.description {
			max-width: 720px;
			line-height: 22px;
		}
		.extra {
			margin-top: 16px;
			color: @text-color-secondary;
			line-height: 22px;

			& /deep/ .ant-avatar {
				position: relative;
				top: 1px;
				width: 20px;
				height: 20px;
				margin-right: 8px;
				vertical-align: top;
			}

			& > em {
				margin-left: 16px;
				color: @disabled-color;
				font-style: normal;
			}
		}
	}

	@media screen and (max-width: @screen-xs) {
		.antd-pro-components-article-list-content-index-listContent {
			.extra {
				& > em {
					display: block;
					margin-top: 8px;
					margin-left: 0;
				}
			}
		}
	}
</style>
