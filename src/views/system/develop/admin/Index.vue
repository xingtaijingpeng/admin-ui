<template>
	<s-table ref="table" :columns="columns" dataUrl="system/develop/admin" :params="params">
		<template slot="title">
			<a-row type="flex" justify="space-around" align="middle">
				<a-col :span="8"><h3>管理员列表</h3></a-col>
				<a-col :span="16" :style="{ textAlign:'right'}">
					<a-button type="primary" icon="plus" @click="jump('/system/develop/admin/create')">添加管理员</a-button>
				</a-col>
			</a-row>
		</template>
		<template slot="is_work" slot-scope="data">
			{{data == 1 ? '正常' : '停止'}}
		</template>
		<template slot="operation" slot-scope="data, record">
			<a @click="jump('/system/develop/admin/update/'+record.id)">编辑</a>
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
                form: this.$form.createForm(this),
                columns: [
                    {title: 'ID', dataIndex: 'id', sorter: true,},
                    {title: '登录账号', dataIndex: 'mobile'},
                    {title: '笔名', dataIndex: 'name'},
                    {title: '角色', dataIndex: 'role.title'},
                    {title: '操作', dataIndex: 'operation', width: 150, scopedSlots: { customRender: 'operation' },
                    }],
                params: {}
            }
        },
        mounted(){

        },
        methods: {
            handleFormSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.params = values;
                        this.$nextTick(() => {
                            this.$refs.table.loadData()
                        });
                    }
                });
            },
            handleReset(){
                this.form.resetFields();
                this.params = {};
                this.$nextTick(() => {
                    this.$refs.table.loadData()
                });
            },
            onDelete(id){
                let _this = this;
                axios.post('system/develop/admin/delete/'+id,{}).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    _this.data = _this.data.filter(item => item.id !== id);

                });
            },
        }
    }
</script>
