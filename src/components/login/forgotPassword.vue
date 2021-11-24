<template>
    <div id="forgotPassword" class='page has-navbar'>
        <von-header>
            <button class="button button-icon ion-ios-arrow-left" slot="left" @click='$router.back("/login")'></button>
            <span slot="title">找回密码</span>
        </von-header>

        <div class='login_from'>
            <ul>
                <li style='margin-bottom: 0'>
                    <i class="iconfont icon-phone left"></i>
                    <input type='text' placeholder='手机号码' maxlength='11' v-model="q.mobile" @keyup="handleKeyup" />
                </li>
            </ul>

            <md-button class='button' :disabled='passBtnDis' @click.native="forgotPasswordBtn">立即送出</md-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                passBtnDis: true,
                q:{
                    mobile: ""
                }
            }
        },
        methods: {
            // 输入事件
            handleKeyup: function () {
                if(this.q.mobile.length < 11){
                    this.passBtnDis = true
                }else{
                    this.passBtnDis = false
                }
            },
            forgotPasswordBtn: function () {
                var _this = this;
				var tel = /^1[3456789]\d{9}$/

                if(_this.q.mobile == ""){
					$dialog.alert({
			          content: "请填写手机号码！",
			          okTheme: 'positive',
			        })
				}else if(!tel.test(_this.q.mobile)){
					$dialog.alert({
			          content: "手机格式不正确",
			          okTheme: 'positive',
			        })
				}else{
                    $loading.show()
                    this.$http.post(_this.forgotpassword_api,{
						type: 1,
						mobile: this.q.mobile
					}).then(function(data){
                        $loading.hide();
                        $dialog.alert({
                            content: data.data.message,
                            okTheme: 'positive',
                        })
					}).catch(function(data){
                        $loading.hide();
						if(data){
							if(data.status_code){
								$dialog.alert({
						          content: data.message,
						          okTheme: 'positive',
						        })
							}else{
								$dialog.alert({
									content: '网络不给力:' + window.requestStatus,
									okTheme: 'positive',
								})
							}
						}else{
							$dialog.alert({
								content: '网络不给力:' + window.requestStatus,
								okTheme: 'positive',
							})
						}
					})
                }
            }
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/icon.css';
    @import '../../common/css/login.css';
</style>