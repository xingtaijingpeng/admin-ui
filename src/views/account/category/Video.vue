<template>
	<s-table ref="table" :columns="columns" dataUrl="category/index?guard=video&merge=1" :pagination="false">
		<template slot="title">
			<a-row type="flex" justify="space-around" align="middle">
				<a-col :span="8">视频分类</a-col>
				<a-col :span="16" :style="{ textAlign:'right'}">
					<a-button type="primary" icon="plus" @click="jump('/account/category/video/create/video')">添加分类</a-button>
				</a-col>
			</a-row>
		</template>
		<template slot="display_name" slot-scope="data, record">
			<h3 v-if="record.level == 1">{{data}}</h3>
			<span v-else style="padding-left: 40px;">{{data}}</span>
		</template>
		<template slot="is_menu" slot-scope="data">
			{{data == 1 ? '是' : '否'}}
		</template>
		<template slot="is_work" slot-scope="data">
			{{data == 1 ? '正常' : '停止'}}
		</template>
		<template slot="operation" slot-scope="data, record">
			<a @click="jump('/account/category/article/update/video/'+record.id)">编辑</a>
			<a-divider type="vertical" />
			<a-popconfirm
					title="Sure to delete?"
					@confirm="() => onDelete(record.id)">
				<a>停止</a>
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
                    {title: 'ID', dataIndex: 'id', align: 'right'},
                    {title: '名称', dataIndex: 'name', scopedSlots: { customRender: 'display_name' },},
                    {title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'is_work' },},
                    {title: '排序', dataIndex: 'sort'},
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
