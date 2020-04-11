<template>
	<div class="account-settings-info-view">

        <a-form
                :layout="formLayout"
                v-bind="formItemLayout"
                @submit="handleSubmit"
        >
            <a-form-item
                    label="Logo"
            >
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
            </a-form-item>
            <a-form-item
                    label="Banner"
            >
                <a-upload
                        :action="baseUrl('upload/image')"
                        listType="picture-card"
                        :fileList="fileList"
                        :multiple="true"
                        :headers="authHeader()"
                        @preview="handlePreview"
                        @change="handleChange"
                >
                    <div v-if="fileList.length < 8">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
                <a-button type="primary" html-type="submit">
                    Submit
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    export default {
        components: {

        },
        data () {
            return {
                // cropper
                formItemLayout: {
                    labelCol: {sm: {span: 3}},
                    wrapperCol: {sm: {span: 14} },
                },
                loading: false,
                imageUrl: '',
                formLayout: 'horizontal',
                preview: {},
                option: {
                    img: '/img/avatar.jpg',
                },
                previewVisible: false,
                previewImage: '',
                fileList: [],
            }
        },
        mounted(){
            axios.post('/base/info').then((response) => {

                if(!response.status){
                    return this.$message.error(response.message);
                }

                this.imageUrl = response.data.logo
                this.fileList = response.data.banner

            });
        },
        methods: {
            handleSubmit () {
                axios.post('/base/update',{
                    logo: this.imageUrl,
                    banner: this.fileList.map(function ($item) {
                        return {
                            uid: $item['uid'],
                            name: $item['name'],
                            status: 'done',
                            url: $item['url'] ? $item['url'] : $item['response'].data,
                        };
                    }),
                }).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    return this.$message.success(response.message);

                });
            },
            async handlePreview(file) {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                this.previewImage = file.url || file.preview;
                this.previewVisible = true;
            },
            handleCancel() {
                this.previewVisible = false;
            },
            handleChange({file,fileList,event}) {
                // window.console.log(file,fileList);
                this.fileList = fileList;
            },
            handleChangeLogo({file}) {
                if (file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (file.status === 'done') {
                    // Get this url from response in real world.
                    this.loading = false;
                    this.imageUrl = file.response.data
                }
            },
        }
    }
</script>

<style lang="less" scoped>

	.avatar-upload-wrapper {
		height: 200px;
		width: 100%;
	}

	.ant-upload-preview {
		position: relative;
		margin: 0 auto;
		width: 100%;
		max-width: 180px;
		border-radius: 50%;
		box-shadow: 0 0 4px #ccc;

		.upload-icon {
			position: absolute;
			top: 0;
			right: 10px;
			font-size: 1.4rem;
			padding: 0.5rem;
			background: rgba(222, 221, 221, 0.7);
			border-radius: 50%;
			border: 1px solid rgba(0, 0, 0, 0.2);
		}
		.mask {
			opacity: 0;
			position: absolute;
			background: rgba(0,0,0,0.4);
			cursor: pointer;
			transition: opacity 0.4s;

			&:hover {
				opacity: 1;
			}

			i {
				font-size: 2rem;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -1rem;
				margin-top: -1rem;
				color: #d6d6d6;
			}
		}

		img, .mask {
			width: 100%;
			max-width: 180px;
			height: 100%;
			border-radius: 50%;
			overflow: hidden;
		}
	}
</style>
