<template>
	<div>
		<s-table ref="tabl222e" :columns="columns" dataUrl="users" :pagination="false" :params="params">
			<template slot="title">
				<a-row type="flex" justify="space-around" align="middle">
					<a-col :span="10">
						<a-input-search placeholder="请输入手机号" v-model="ppppp" enter-button @search="onSearch" width="200" />
					</a-col>
					<a-col :span="14"></a-col>
				</a-row>
				<br />
				<a-row type="flex" justify="space-around" align="middle">
					<a-col :span="8">用户列表</a-col>
					<a-col :span="16" :style="{ textAlign:'right'}">
					</a-col>
				</a-row>
			</template>

			<template slot="operation" slot-scope="data, record">
				<a @click="jump('/orders/'+record.id)">已购买</a> <a @click="shouquan(record.id)">授权</a>
			</template>
		</s-table>
		<a-modal v-model="visible" title="授权视频" on-ok="handleOk">
			<template slot="footer">
				<a-button key="back" @click="handleCancel">
					取消
				</a-button>
			</template>

            <div class="navDown">
                <div v-for="item in options" :key="item.id">
                    <h3>{{item.name}}</h3>
                    <div class="navList">
                        <span v-for="ite in item.children" :key="ite.id" style="cursor: pointer;"> <a-checkbox :value="ite.id" @change="onChange" :checked="Gchecks.indexOf(ite.id) != -1">{{ite.name}}</a-checkbox>  </span>
                    </div>
                </div>
            </div>

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
                columns: [
                    {title: 'ID', dataIndex: 'id'},
                    {title: '状态', dataIndex: 'mobile'},
                    {title: '名称', dataIndex: 'name'},
                    {title: '真实姓名', dataIndex: 'real_name'},
                    {title: '身份证', dataIndex: 'real_num'},
                    {title: '收货地址', dataIndex: 'address'},
                    {title: '注册时间', dataIndex: 'created_at'},
                    {title: '操作', dataIndex: 'operation', width: 150, scopedSlots: { customRender: 'operation' },}
                ],
                params: {},
                visible: false,
                ppppp:'',
                options: [],
                Gchecks: [],
                Guserid: 0
            }
        },
        mounted(){//获取分类
            axios.post('category/index',{
                guard: 'video',
                pageSize: 30,
            }).then((response) => {
                if(!response.status){
                    return this.$message.error(response.message);
                }
                this.options = response.data
            });

        },
        methods: {
            onChange(e) {
                let _this = this;
                if(e.target.checked){
                    axios.post('orders/own',{id:e.target.value,hasc:1,userid:this.Guserid}).then((response) => {

                        if(!response.status){
                            return this.$message.error(response.message);
                        }
                        _this.getcategory()
                    });

                }else{
                    axios.post('orders/own',{id:e.target.value,hasc:2,userid:this.Guserid}).then((response) => {

                        if(!response.status){
                            return this.$message.error(response.message);
                        }
                        _this.getcategory()

                    });

                }
            },
            getcategory(){
                axios.post('users/category',{userid:this.Guserid}).then((response) => {

                    this.Gchecks = response.data;
                });
            },
            onDelete(id){
                let _this = this;
                axios.post('category/delete/'+id,{}).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    _this.$refs.table.loadData();

                });
            },
			onSearch(){
                let _this = this;
                this.params = {mobile:_this.ppppp};
                this.$nextTick(function () {
                    _this.$refs.tabl222e.loadData()
                })
			},
            shouquan(uid){
                this.Guserid = uid;
                //获取用户分类权限
                this.getcategory();
                this.$nextTick(function () {
                    this.visible = true;
                });
			},
            handleCancel(e) {
                this.visible = false;
            },
        }
    }
</script>
