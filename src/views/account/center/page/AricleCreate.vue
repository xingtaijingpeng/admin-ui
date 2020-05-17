<template>
	<a-form
			:form="form"
			v-bind="formItemLayout"
			:layout="formLayout"
			@submit="handleSubmit"
			class="ant-pro-form-wapper"
	>
		<a-divider orientation="left">文章添加/修改</a-divider>

		<a-form-item label="所属分类">
			<a-select
					v-decorator="['category_id',{rules: [{ required: true, message: '请填写!' }]}]"
					placeholder="请选择所属分类"
			>
				<a-select-option v-for="(item,index) in menuTree" :key="index" :value="item.id">
					|<span v-for="(n,i) in item.level" :key="i"> -- </span>{{item.name}}
				</a-select-option>
			</a-select>
		</a-form-item>

		<a-form-item label="标题1">
			<a-input
					v-decorator="['title',{initialValue: '',rules: [{ required: true, message: '请填写!' }]}]"
					placeholder="请输入显示名称"
			/>
		</a-form-item>

		<a-form-item label="描述">
			<a-input
					v-decorator="['description',{initialValue: '',rules: [{ required: true, message: '请填写!' }]}]"
					placeholder="请输入权限名称"
			/>
		</a-form-item>

		<a-form-item
				label="缩略图"
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
			<span style="color: red;">建议尺寸 288*210</span>
		</a-form-item>

		<a-form-item label="热门">
			<a-radio-group v-decorator="['hot',{ initialValue: 1 }]">
				<a-radio :value="1">是</a-radio>
				<a-radio :value="2">否</a-radio>
			</a-radio-group>
		</a-form-item>

		<a-form-item label="文章内容">
			<a-input
					v-decorator="['content']"
					type="hidden"
			/>
			<ueditor @ready="editorReady" ref="ue" :value="defaultMSG" :ueditorConfig="config" style="line-height: normal !important;"></ueditor>
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
    import Ueditor from '@/components/Ueditor';

    export default {
        data: () => ({
            formItemLayout: {
                labelCol: {sm: {span: 3}},
                wrapperCol: {sm: {span: 20} },
            },
            formLayout: 'horizontal',
            loading: false,
            imageUrl: '',
            defaultMSG: '',
            content: '',
            config: {
                initialFrameHeight: 500
            },
            menuTree: [],
        }),
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
        components: {
            Ueditor
        },
		mounted(){
            let _this = this,open = 0,level = 0;
            axios.post('category/index',{guard:'article',merge:1}).then((response) => {
                if(!response.status){
                    return this.$message.error(response.message);
                }
                _this.menuTree = response.data;
            });

            if(_this.$route.params.id){
                axios.post('article/detail/'+_this.$route.params.id,{}).then((response) => {
                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    _this.$nextTick(() => {
                        setTimeout(() => {
                            _this.defaultMSG = response.data.content
                        },1000)
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
            editorReady(instance) {
                // instance.setContent('公司简介');
                instance.addListener('contentChange', () => {
                    this.form.setFieldsValue({content:instance.getContent()});
                });
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
