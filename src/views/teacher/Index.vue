<template>
	<s-table ref="table" :columns="columns" dataUrl="article/index?guard=teacher" :pagination="false">
		<template slot="title">
			<a-row type="flex" justify="space-around" align="middle">
				<a-col :span="8">师资列表</a-col>
				<a-col :span="16" :style="{ textAlign:'right'}">
					<a-button type="primary" icon="plus" @click="jump('/teacher/create')">添加师资</a-button>
				</a-col>
			</a-row>
		</template>
		<template slot="operation" slot-scope="data, record">
			<a @click="jump('/teacher/update/'+record.id)">编辑</a>
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
                    {title: '姓名', dataIndex: 'title'},
                    {title: '描述', dataIndex: 'description'},
                    {title: '创建时间', dataIndex: 'created_at'},
                    {title: '操作', dataIndex: 'operation', width: 150, scopedSlots: { customRender: 'operation' },}
                ],
            }
        },
        methods: {
            onDelete(id){
                let _this = this;
                axios.post('article/delete/'+id,{}).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    _this.$refs.table.loadData();

                });
            }
        }
    }
</script>
