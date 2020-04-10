<template>
	<a-form class="ant-pro-form-wapper"
			:form="form"
			v-bind="formItemLayout"
			:layout="formLayout"
			@submit="handleSubmit"
	>
		<a-divider orientation="left">角色添加</a-divider>

		<a-form-item label="头像">
			<a-input
					v-decorator="['avatar',{initialValue: '',rules: [{ required: true, message: 'Please input your display_name!' }]}]"
					placeholder="请输入登录手机号"
					type="hidden"
			/>
			<a-upload
					name="file"
                    :headers="authHeader()"
					listType="picture-card"
					class="avatar-uploader"
					:showUploadList="false"
					:action="baseUrl('upload/image')"
					@change="handleChange"
			>
				<img v-if="imageUrl" :src="imageUrl" alt="avatar" width="100%" />
				<div v-else>
					<a-icon :type="loading ? 'loading' : 'plus'" />
					<div class="ant-upload-text">Upload</div>
				</div>
			</a-upload>
		</a-form-item>

        <a-form-item label="所属角色">
            <a-select
                v-decorator="['role',{initialValue: '',rules: [{ required: true, message: '请选择角色!' }] }]"
                placeholder="请选择角色"
            >
                <a-select-option v-for="(value,key) in roles" :key="key" :value="value.id">
                    {{value.title}}
                </a-select-option>
            </a-select>
        </a-form-item>

		<a-form-item label="登录手机号">
			<a-input
					v-decorator="['mobile',{initialValue: '',rules: [{ required: true, message: 'Please input your display_name!' }]}]"
					placeholder="请输入登录手机号"
			/>
		</a-form-item>

		<a-form-item label="管理员名称">
			<a-input
					v-decorator="['name',{initialValue: '',rules: [{ required: true, message: 'Please input your route_name!' }]}]"
					placeholder="请输入管理员名称"
			/>
		</a-form-item>

		<a-form-item label="密码">
			<a-input
					v-decorator="['password',{initialValue: '',rules: [{ required: true, message: 'Please input your route_name!' }]}]"
					placeholder="请输入密码"
			/>
		</a-form-item>

		<a-form-item label="电子邮箱">
			<a-input
					v-decorator="['email',{initialValue: '',rules: [{ required: false, message: 'Please input your route_name!' }]}]"
					placeholder="请输入电子邮箱"
			/>
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
				Submit
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
            loading: false,
            imageUrl: '',
            roles: []
        }),
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
        mounted(){
            let _this = this;

            //获取角色列表
            axios.post('system/develop/role',{pageSize:999}).then((response) => {
                if(!response.status){
                    return this.$message.error(response.message);
                }
                _this.roles = response.data;
            });

            if(_this.$route.params.id){
                axios.post('system/develop/admin/detail/'+_this.$route.params.id).then((response) => {
                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    _this.$nextTick(() => {
                        this.imageUrl = response.data.avatar;
                        let roleId = response.data.role.id;
                        delete response.data.role;
                        _this.form.setFieldsValue({...response.data,password: '********',role:roleId});
                    });
                });
            }
        },
        methods: {
            handleChange({file}) {
                if (file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (file.status === 'done') {
                    // Get this url from response in real world.
                    this.loading = false;
                    this.imageUrl = file.response.data
                    this.form.setFieldsValue({
                        avatar: file.response.data
                    });
                }
            },
            handleSubmit(e) {
                e.preventDefault();

                let _this = this;
                _this.form.validateFields((err, values) => {
                    if(err){
                        return false;
                    }

                    let url;
                    if(_this.$route.params.id){
                        url = 'system/develop/admin/update/'+_this.$route.params.id;
                    }else{
                        url = 'system/develop/admin/create';
                    }

                    axios.post(url,values).then((response) => {

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
