<template>
	<s-table ref="table" :columns="columns" dataUrl="orders" :params="params">
		<template slot="title">
			<a-row type="flex" justify="space-around" align="middle">
				<a-col :span="8">订单列表</a-col>
				<a-col :span="16" :style="{ textAlign:'right'}">
				</a-col>
			</a-row>
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
                    {title: '订单号', dataIndex: 'serial'},
                    {title: '支付方式', dataIndex: 'pay_type'},
                    {title: '购买者信息', dataIndex: 'user.name'},
                    {title: '购买者电话', dataIndex: 'user.mobile'},
                    {title: '视频名称', dataIndex: 'good_name'},
                    {title: '订单金额', dataIndex: 'price'},
                    {title: '支付时间', dataIndex: 'payed_at'},
                    {title: '创建时间', dataIndex: 'created_at'},
                ],
            }
        },
		created(){

		},
		computed: {
            params(){
                let id = this.$route.params.id
                if(id>0){
                    return {
                        user_id: id
                    }

                }else{
                    return {};
				}
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
