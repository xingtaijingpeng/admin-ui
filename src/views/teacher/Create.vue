<template>
	<a-form
			:form="form"
			v-bind="formItemLayout"
			:layout="formLayout"
			@submit="handleSubmit"
			class="ant-pro-form-wapper"
	>
		<a-divider orientation="left">师资添加/修改</a-divider>

		<a-form-item label="姓名">
			<a-input
					v-decorator="['category_id']"
                    type="hidden"
			/>
			<a-input
					v-decorator="['title',{initialValue: '',rules: [{ required: true, message: 'Please input your display_name!' }]}]"
					placeholder="请输入显示名称"
			/>
		</a-form-item>

		<a-form-item label="描述">
			<a-input
					v-decorator="['description',{initialValue: '',rules: [{ required: true, message: 'Please input your route_name!' }]}]"
					placeholder="请输入权限名称"
			/>
		</a-form-item>

		<a-form-item
				label="头像"
		>
			<a-input
					v-decorator="['cover']"
					type="hidden"
			/>
			<a-upload
					name="file"
					:headers="authHeader()"
					listType="picture-card"
					class="avatar-uploader"
					:showUploadList="false"
					:action="baseUrl('upload/image')"
					@change="handleChangeLogo"
			>
				<img v-if="imageUrl" :src="imageUrl" alt="avatar" width="100%" />
				<div v-else>
					<a-icon :type="loading ? 'loading' : 'plus'" />
					<div class="ant-upload-text">Upload</div>
				</div>
			</a-upload>
			<span style="color: red;">建议尺寸 100*100</span>
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
                labelCol: {sm: {span: 3}},
                wrapperCol: {sm: {span: 20} },
            },
            formLayout: 'horizontal',
            loading: false,
            imageUrl: '',
        }),
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
		mounted(){
            let _this = this,open = 0,level = 0;
            _this.form.setFieldsValue({category_id: 1});

            if(_this.$route.params.id){
                axios.post('article/detail/'+_this.$route.params.id,{}).then((response) => {
                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    _this.$nextTick(() => {
                        _this.imageUrl = response.data.cover
                        _this.form.setFieldsValue(response.data);
                    });
                });
            }
        },
        methods: {
            handleChangeLogo({file}) {
                if (file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (file.status === 'done') {
                    // Get this url from response in real world.
                    this.loading = false;
                    this.imageUrl = file.response.data
                    this.form.setFieldsValue({cover:file.response.data});
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
                        url = 'article/update/'+_this.$route.params.id;
                    }else{
                        url = 'article/create';
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
