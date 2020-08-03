<template>
	<div>
		<s-table ref="table" :columns="columns" dataUrl="orders" :params="params">
			<template slot="title">
				<a-row type="flex" justify="space-around" align="middle">
					<a-col :span="8">订单列表</a-col>
					<a-col :span="16" :style="{ textAlign:'right'}">
					</a-col>
				</a-row>
			</template>
			<template slot="operation" slot-scope="data, record">
				<a v-if="record.status == 1" @click="gggg(record)">改价</a>
			</template>
			<template slot="operation3" slot-scope="data, record">
				{{record.nprice ? record.nprice : record.price}}
			</template>
		</s-table>

		<a-modal v-model="visible" title="改价" @ok="handleOk" cancelText="取消" okText="确定" style="text-align: center;">
			<a-input-group compact>
				<a-select v-model="fenqi" default-value="1" style="width:100px;">
					<a-select-option :value="1">
						分期
					</a-select-option>
					<a-select-option :value="2">
						不分期
					</a-select-option>
				</a-select>
				<a-input style="width: 50%" type="number" v-model="active.price" />
			</a-input-group>
		</a-modal>
	</div>
</template>
<script>
    import { STable } from '@/components'

    export default {
        components: {
            STable
        },
        data() {
            return {
                fenqi: 1,
                visible: false,
				active: {},
                columns: [
                    {title: 'ID', dataIndex: 'id'},
                    {title: '订单号', dataIndex: 'serial'},
                    {title: '支付方式', dataIndex: 'pay_type'},
                    {title: '购买者信息', dataIndex: 'user.name'},
                    {title: '购买者电话', dataIndex: 'user.mobile'},
                    {title: '购买者地址', dataIndex: 'user.address'},
                    {title: '视频名称', dataIndex: 'good_name'},
                    {title: '订单金额', dataIndex: 'price', scopedSlots: { customRender: 'operation3' }},
                    {title: '支付时间', dataIndex: 'payed_at'},
                    {title: '创建时间', dataIndex: 'created_at'},
                    {title: '操作', width: 100, scopedSlots: { customRender: 'operation' }},
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
            handleOk(){
                axios.post('order/fenqi',{
                    fenqi: this.fenqi,
                    id: this.active.id,
                    price: this.active.price,
				}).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    this.visible = false;
                    this.$refs.table.loadData();

                });
			},
            gggg(data){
                this.visible = true;
                this.active = JSON.parse(JSON.stringify(data))
			},
        }
    }
</script>
