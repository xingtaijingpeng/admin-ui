<template>
	<s-table ref="table" :columns="columns" :dataUrl="'comment/'+$route.params.id" :pagination="false">
		<template slot="title">
			<a-row type="flex" justify="space-around" align="middle">
				<a-col :span="8">评论列表</a-col>
				<a-col :span="16" :style="{ textAlign:'right'}">
					<a-button type="primary" icon="plus" @click="jump('/account/center/comments/'+$route.params.id+'/create')">添加评论</a-button>
				</a-col>
			</a-row>
		</template>
		<template slot="operation" slot-scope="data, record">
			<a @click="jump('/account/center/comments/'+$route.params.id+'/update/'+record.id)">编辑</a>
			<a-divider type="vertical" />
			<a-popconfirm
					title="Sure to delete?"
					@confirm="() => onDelete(record.id)">
				<a>删除</a>
			</a-popconfirm>
		</template>
	</s-table>
</template>
<script>
    import { STable } from '@/components'

    export default {
        components: {
            STable
        },
        data() {
            return {
                columns: [
                    {title: 'ID', dataIndex: 'id'},
                    {title: '内容', dataIndex: 'contents'},
                    {title: '创建时间', dataIndex: 'created_at'},
                    {title: '操作', dataIndex: 'operation', width: 150, scopedSlots: { customRender: 'operation' },}
                ],
            }
        },
        methods: {
            onDelete(id){
                let _this = this;
                axios.post('comments/delete/'+id,{}).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    _this.$refs.table.loadData();

                });
            }
        }
    }
</script>
