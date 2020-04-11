<template>
    <div class="box-container">
        <a-textarea placeholder="底部版权" v-model="textvalue" :rows="4" />
        <div style="margin: 24px 0" />
        <ueditor @ready="editorReady" ref="ue" :value="defaultMSG" :ueditorConfig="config"></ueditor>
        <div style="margin: 24px 0" />
        <a-button type="primary" block @click="handleSubmit">提交</a-button>
    </div>
</template>

<script>
    import Ueditor from '@/components/Ueditor';

    export default {
        name: "Custom",
        data() {
            return {
                defaultMSG: '',
                textvalue: '',
                content: '',
                form: {
                    content: ''
                },
                config: {
                    initialFrameHeight: 500
                },
            };
        },
        mounted(){
            axios.post('/base/info').then((response) => {

                if(!response.status){
                    return this.$message.error(response.message);
                }
                setTimeout(() => {
                    this.textvalue = response.data.banquan
                    this.defaultMSG = response.data.content
                },1000)
            });
        },
        components: {
            Ueditor
        },
        methods: {
            handleSubmit () {
                axios.post('/base/update',{
                    banquan: this.textvalue,
                    content: this.content
                }).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    return this.$message.success(response.message);

                });
            },
            editorReady(instance) {
                // instance.setContent('公司简介');
                instance.addListener('contentChange', () => {
                     this.content = instance.getContent();
                });
            },
        }
    }
</script>

<style scoped>

</style>
