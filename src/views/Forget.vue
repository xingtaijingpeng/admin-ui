<template>
	<div>
		<div class="inner">
			<a-input size="large" placeholder="您的注册手机号" v-model="user_name" ref="userNameInput">
				<a-icon slot="prefix" type="user" />
				<a-tooltip slot="suffix" title="手机号">
					<a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
				</a-tooltip>
			</a-input>
			<br /><br/>

			<a-input-password size="large" v-model="reset_pwd" placeholder="重置密码">
				<a-icon slot="prefix" type="lock" />
			</a-input-password>
			<br /><br/>

			<a-input-password size="large" v-model="reset_pwd_confirm" placeholder="确认重置密码">
				<a-icon slot="prefix" type="lock" />
			</a-input-password>
			<br /><br/>

			<a-input-group compact>
				<a-input size="large" style="width: 60%" v-model="reset_code" placeholder="验证码" />
				<a-button size="large" style="width: 40%" type="primary" @click="sendSme">{{smstips}}</a-button>
			</a-input-group>
			<br/>

			<div class="submit-btn">
				<button @click="forget">找回密码</button>
			</div>
			<div class="connect">
				<p class="hd" align="center" v-if="false">
					<a>《 隐私条款 》</a>
				</p>
			</div>
		</div>
		<div class="bottom-link">
			<a @click="jump('/user/login')">马上登录</a>
		</div>
	</div>
</template>

<script>
    export default {
        name: "Password",
        data() {
            return {
                user_name: '',
                reset_pwd: '',
                reset_pwd_confirm: '',
                reset_code: '',
                smstips: '发送短信',
            };
        },
		methods:{
            forget(){
                axios.post('forget',{
					'mobile': this.user_name,
					'password': this.reset_pwd,
					'password_confirmation': this.reset_pwd_confirm,
					'code': this.reset_code,
                }).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    sessionStorage.setItem('access_token',response.data.token)
                    this.jump('/')

                });
            },
			sendSme(){
                axios.post('sms',{
					'mobile': this.user_name,
                }).then((response) => {

                    if(!response.status){
                        return this.$message.error(response.message);
                    }
                    let times = 60;
                    let timer = setInterval(()=>{
                        this.smstips = times;
                        times--;

                        if(times <= 0){
                            clearInterval(timer)
                            this.smstips = '发送短信';
                        }
					},1000);

                });
			}
		}
    }
</script>
