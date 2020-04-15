<template>
	<div class="ant-pro-pages-account-projects-cardList">
		<a-list
				:loading="loading"
				:data-source="data"
				:grid="{ gutter: 24, xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
				:pagination="pagination"
		>
			<a-list-item slot="renderItem" slot-scope="item">
				<a-card class="ant-pro-pages-account-projects-card" hoverable>
					<img slot="cover" :src="item.cover" :alt="item.title" />
					<a-card-meta :title="item.title">
						<template slot="description">
							<ellipsis :length="50">{{ item.category }}</ellipsis>
						</template>
					</a-card-meta>
					<div class="cardItemContent">
						<span>{{ item.created_at | fromNow}}</span>
						<div class="avatarList">
							<span @click="jump('/account/center/video/update/'+item.id)">
								<a-icon type="edit" style="margin-right: 8px" />编辑
							</span>
							<a-popconfirm placement="top" okText="Yes" cancelText="No" @confirm="deleteart(item.id)">
								<template slot="title">
									<p>是否删除？</p>
								</template>
								<a-icon type="delete" style="margin-right: 8px" />删除
							</a-popconfirm>
						</div>
					</div>
				</a-card>
			</a-list-item>
		</a-list>
	</div>
</template>

<script>
    import moment from 'moment'
    import { Ellipsis } from '@/components'

    export default {
        name: 'Project',
        components: {
            Ellipsis,
        },
        data () {
            return {
                form: this.$form.createForm(this),
                loading: true,
                data: [],
                pagination: {
                    onChange: page => {
                        window.console.log(page);
                    },
                    pageSize: 10,
                },
            }
        },
        mounted () {
            this.init();
        },
        filters: {
            fromNow (date) {
                return moment(date).fromNow()
            }
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
                    guard: 'video',
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
	.ant-pro-pages-account-projects-cardList {
		margin-top: 24px;

		.ant-card-meta-title {
			margin-bottom: 4px;
		}

		.ant-card-meta-description {
			height: 44px;
			overflow: hidden;
			line-height: 22px;
		}

		.cardItemContent {
			display: flex;
			height: 20px;
			margin-top: 16px;
			margin-bottom: -4px;
			line-height: 20px;

			> span {
				flex: 1 1;
				color: rgba(0,0,0,.45);
				font-size: 12px;
			}

			.ant-pro-avatar-list {
				flex: 0 1 auto;
			}
		}
	}
</style>
