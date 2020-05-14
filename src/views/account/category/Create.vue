<template>
	<a-form
			:form="form"
			v-bind="formItemLayout"
			:layout="formLayout"
			@submit="handleSubmit"
			class="ant-pro-form-wapper"
	>
		<a-divider orientation="left">分类添加</a-divider>

		<a-form-item label="上级模块">
			<a-select
					v-decorator="['parent_id',{initialValue: 0}]"
					placeholder="请选择上级模块"
			>
				<a-select-option :value="0">
					请选择上级模块
				</a-select-option>
				<a-select-option v-for="(item,index) in menuTree" :key="index" :value="item.id" :disabled="item.disabled">
					|<span v-for="(n,i) in item.level" :key="i"> -- </span>{{item.name}}
				</a-select-option>
			</a-select>
		</a-form-item>

		<a-form-item label="分类名称">
			<a-input
					v-decorator="['name',{initialValue: '',rules: [{ required: true, message: 'Please input your route_name!' }]}]"
					placeholder="请输入权限名称"
			/>
		</a-form-item>

		<a-form-item label="状态">
			<a-radio-group v-decorator="['status',{ initialValue: 1 }]">
				<a-radio :value="1">正常</a-radio>
				<a-radio :value="2">停止</a-radio>
			</a-radio-group>
		</a-form-item>

		<a-form-item label="排序">
			<a-input-number v-decorator="['sort', { initialValue: 0 }]" :min="0" :max="99999999" style="width: 100px" />
			<span class="ant-form-text">
                (0 ~ 99999999) 值越大越靠前
            </span>
		</a-form-item>

		<a-form-item
				:wrapperCol="{ span: 24 }"
				style="text-align: center"
		>
			<a-button
					type="primary"
					html-type="submit"
					:disabled="hasErrors(form.getFieldsError())"
			>
				提交
			</a-button>
		</a-form-item>
	</a-form>
</template>

<script>
    export default {
        data: () => ({
            formItemLayout: {
                labelCol: {sm: {span: 5}},
                wrapperCol: {sm: {span: 14} },
            },
            formLayout: 'horizontal',
            menuTree: [],
        }),
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
        mounted(){
            let _this = this,open = 0,level = 0;
            axios.post('category/index',{merge:1,guard: this.$route.params.guard}).then((response) => {
                if(!response.status){
                    return this.$message.error(response.message);
                }
                _this.menuTree = response.data;
                _this.menuTree.forEach(item => {
                    if(item.id == _this.$route.params.id){
                        open = 1;
                        level = item.level;
                    }else if(item.level <= level && open == 1){
                        open = 0;
                    }
                    open ? item.disabled = true:item.disabled = false;
                });
            });

            if(_this.$route.params.id){
                axios.post('category/detail/'+_this.$route.params.id,{}).then((response) => {
                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    _this.$nextTick(() => {
                        _this.form.setFieldsValue(response.data);
                    });
                });
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                let _this = this;
                _this.form.validateFields((err, values) => {
                    if(err){
                        return false;
                    }

                    let url;
                    if(_this.$route.params.id){
                        url = 'category/update/'+_this.$route.params.id;
                    }else{
                        url = 'category/create';
                    }

                    axios.post(url,{...values,guard:this.$route.params.guard}).then((response) => {

                        if(!response.status){
                            return this.$message.error(response.message);
                        }
                        return this.$message.success(response.message,1,() => _this.$router.go(-1));

                    });

                });
            },
        },
    };
</script>
