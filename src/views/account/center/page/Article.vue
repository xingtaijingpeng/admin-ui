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
                <span>
                  <a-icon type="star-o" style="margin-right: 8px" />
                  编辑
                </span>
				<span>
                  <a-icon type="like-o" style="margin-right: 8px" />
                  删除
                </span>
			</template>
			<a-list-item-meta>
				<a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
				<template slot="description">
                      <span>
                        <a-tag>Ant Design</a-tag>
                        <a-tag>设计语言</a-tag>
                        <a-tag>蚂蚁金服</a-tag>
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
					<a-avatar :src="item.avatar" size="small" />
					<a :href="item.href">{{ item.owner }}</a> 发布于
					<em>{{ item.updatedAt}}</em>
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
                data: [
                    {
                        "id":1,
                        "avatar":"https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
                        "owner":"周星星",
                        "description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
                        "title":"Alipay",
                        "updatedAt":"1981-01-21 22:47:23",
                        "cover":"https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png"
                    },
                    {
                        "id":2,
                        "avatar":"https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
                        "owner":"林东东",
                        "description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
                        "title":"Angular",
                        "updatedAt":"1998-07-03 15:08:45",
                        "cover":"https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png"
                    },
                ]
            }
        },
        mounted () {
            //获取文章列表
            axios.post('/article/index',{
                guard: 'article'
            }).then((response) => {

                if(!response.status){
                    return this.$message.error(response.message);
                }
                this.loading = false

            });
        },
        methods: {

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
