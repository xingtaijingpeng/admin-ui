<template>
	<s-table ref="table" :columns="columns" dataUrl="users" :pagination="false">
		<template slot="title">
			<a-row type="flex" justify="space-around" align="middle">
				<a-col :span="8">用户列表</a-col>
				<a-col :span="16" :style="{ textAlign:'right'}">
				</a-col>
			</a-row>
		</template>

		<template slot="operation" slot-scope="data, record">
			<a @click="jump('/account/category/article/update/article/'+record.id)">已购买课程</a>
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
                    {title: '状态', dataIndex: 'mobile'},
                    {title: '名称', dataIndex: 'name'},
                    {title: '注册时间', dataIndex: 'created_at'},
                    {title: '操作', dataIndex: 'operation', width: 150, scopedSlots: { customRender: 'operation' },}
                ],
            }
        },
        methods: {
            onDelete(id){
                let _this = this;
                axios.post('category/delete/'+id,{}).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    _this.$refs.table.loadData();

                });
            }
        }
    }
</script>
