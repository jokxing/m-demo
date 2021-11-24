<template>
    <div id="login">
        <transition name="login-err">
            <div class="top_error_ts" v-show="showErr">{{ errTxt }}</div>
        </transition>

        <div class="login_txt fix">
            LOGO
        </div>

        <div class="login_tab fix">
            <ul>
                <li v-for="(item, index) in tabs" :key="index" :class='{active:index == num}' @click="tabClick(index)">{{ item }}</li>
            </ul>
        </div>

        <div class="login_from fix">
            <!-- 登录 -->
            <div class="login_main">
                <ul>
                    <li>
                        <i class="iconfont icon-user left"></i>
                        <input type='text' placeholder='手机/用户名' autocomplete="off" maxlength='11' v-model="l.username" />
                        <i class="icon ion-ios-close right" @click="l.username = ''"></i>
                    </li>
                    <li>
                        <i class="iconfont icon-et-lock left"></i>
                        <input type='password' placeholder='密码' autocomplete="new-password" maxlength='15' v-model="l.password" />
                    </li>
                </ul>
                <div class="bot fix">
                    <label class="fLeft" @click='remPass =! remPass'>
                        <div class='remPass_border'>
                            <i v-show="remPass"></i>
                        </div>
                        <span>记住密码</span>
                    </label>
                    <router-link to='/forgotPassword' class="fRight">忘记密码</router-link>
                </div>
                <md-button class='button' @click.native="loginClick" :disabled="loginDis">立即登入</md-button>
                <p @click="$router.forward('/home')">去逛逛 <i class="icon ion-log-in"></i></p>
            </div>

            <!-- 注册 -->
            <div class="register_main">
                <ul>
                    <li>
                        <i class="iconfont icon-user left"></i>
                        <input type='text' placeholder='6-10位英、数字符' autocomplete="off" maxlength='10' v-model="r.name" @keyup="handlekeyup" @blur="handleBluer('name')" />
                    </li>
                    <li>
                        <i class="iconfont icon-et-lock left"></i>
                        <input :type='passTypeOne' placeholder='8-15位英、数字组合 ' autocomplete="new-password" maxlength='15' v-model="registerPass" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" @keyup="handlekeyup" @blur="handleBluer('registerPass')" />
                        <i 
                            class="iconfont right" 
                            :class="{'icon-eye': isEyeOne == true, 'icon-Eyeblind':isEyeOne == false}" @click='passEyeClick("passOne")'></i>
                    </li>
                    <li>
                        <i class="iconfont icon-et-lock left"></i>
                        <input :type='passTypeTwo' placeholder='请再次输入密码' autocomplete="new-password" maxlength='15' v-model="r.password" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" @keyup="handlekeyup" @blur="handleBluer('password')" />
                        <i 
                            class="iconfont right" 
                            :class="{'icon-eye': isEyeTwo == true, 'icon-Eyeblind':isEyeTwo == false}" @click='passEyeClick("passTwo")'></i>
                    </li>
                </ul>

                <div class="bot fix">
                    <div class="fLeft" @click='agree =! agree'>
                        <div class='remPass_border'>
                            <i v-show="agree"></i>
                        </div>
                        <span>我已阅读并同意相关的<a href="javascript:;" @click.stop="$router.push('/agreement')">条款和隐私政策</a></span>
                    </div>
                </div>

                <md-button 
                    class='button' 
                    id="TencentCaptcha"
                    data-appid="appId"
                    data-cbfn="callback"
                    :disabled='regBtnDis' 
                    @click.native="registerClick">注册会员</md-button>
            </div>
        </div>
    </div>
</template>

<script>
    import totp from '../../common/js/totp.js'
    import '../../common/js/awsc.js'
    import '../../common/js/tool.min.js'
    export default {
        data() {
            return {
                showErr: false,
                errTxt: '',
                // tab
                tabs: ["登录", "注册"],
                num: 0,
                // 获取屏幕宽度
                width: '',
                // 是否记住密码
                remPass: true,
                // 眼睛开关
                isEyeOne: false,
                isEyeTwo: false,
                // 初始化密码
                passTypeOne: 'password',
                passTypeTwo: 'password',
                // 同意
                agree: true,
                // 禁止按钮
                regBtnDis: true,
                // 登录提交
                l:{
                    username:"",
                    password: "",
                    setSessionId: "",
                    setToken: "",
                    setSig: "",
                    deviceToken: "",
                },
                // 登录-显示隐藏验证码
                flag: 0,
                // 定时器
                loginSet: null,
                // 防止重复点击
                loginDis: false,
                // 注册提交
                registerPass: '', //第一个密码
                r:{
                    AgentHostKey: '',
                    agent: '',
                    name: "",
                    password: "",
                    is_phonemsg: 0,
                    u_code: "",
                    setSessionId: "",
                    setToken: "",
                    setSig: ""
                },
            }
        },
        methods: {
            // 登录和注册tab切换
            tabClick: function (index) {
                var _this = this;
                this.num = index;
                if(index == 1){
                    $('.login_main').css('left', '-' + _this.width + 'px');
                    $('.register_main').css('left', '0px');
                    this.$router.push('/register')
                }else{
                    $('.login_main').css('left', '0px');
                    $('.register_main').css('left', _this.width + 'px');
                    this.$router.push('/login')
                }
            },
            // 密码眼睛事件
            passEyeClick: function (row){
                if(row == 'passOne'){
                    this.isEyeOne =! this.isEyeOne;
                    if(this.isEyeOne){
                        this.passTypeOne = 'text'
                    }else{
                        this.passTypeOne = 'password'
                    }
                };
                if(row == 'passTwo'){
                    this.isEyeTwo =! this.isEyeTwo;
                    if(this.isEyeTwo){
                        this.passTypeTwo = 'text'
                    }else{
                        this.passTypeTwo = 'password'
                    }
                }
            },
            hideErr: function () {
                var _this = this;
                clearTimeout(this.errSet)
                this.errSet = null
                this.errSet = setTimeout(function() {
                    _this.showErr = false;
                    _this.errTxt = '';
                },3000)
            },
            // 登录提交
            loginClick: function () {
                var _this = this;
                window.clearInterval(_this.loginSet);

                if(_this.l.name == ""){
                    this.showErr = true;
                    this.errTxt = '账号或密码不能为空！';
	    		}else if(_this.l.password == ""){
                    this.showErr = true;
                    this.errTxt = '账号或密码不能为空！';
	 			}else if(_this.l.password.length < 8){
                    this.showErr = true;
                    this.errTxt = '密码至少8位！';
	    		}else{
                    _this.loginDis = true;
                    var counts = 10;
                    _this.loginSet = window.setInterval(function(){
                        if((counts--) <= 0){
                            window.clearInterval(_this.loginSet);
                            counts = 10;
                            $dialog.confirm({
                                content: "通讯异常，建议进行通讯检测，或者切换其他WIFI、4G。",
                                okTheme: 'positive',
                                cancelText: '检测',
                            }).then((res) => {
                                if(res == false){
                                    window.location.href = "https://www.baidu.com/"
                                }
                            })
                        }
                    },1000);
                    this.loginSubmit()
                };
                
                this.hideErr()
            },
            loginSubmit () {
                this.loginApi()
            },
            loginApi: function (token) {
                var _this = this;

                // 谷歌验证码
                var totps = totp.getCode('PVHQW7VZGZE3PMAN');

                function bin2hex(str) {
                    var result = "";
                    for (var i = 0; i < str.length; i++ ) {
                        result += int16_to_hex(str.charCodeAt(i));
                    }
                    return result;
                }
        
                function int16_to_hex(i) {
                    var result = i.toString(16);
                    var j = 0;
                    while (j+result.length < 4){
                        result = "0" + result;
                        j++;
                    }
                    return result;
                }
                // 生成uuid
                function get_uuid(){
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var txt = window.location.host;
                    ctx.textBaseline = "top";
                    ctx.font = "14px 'Arial'";
                    ctx.textBaseline = "tencent";
                    ctx.fillStyle = "#f60";
                    ctx.fillRect(125,1,62,20);
                    ctx.fillStyle = "#069";
                    ctx.fillText(txt, 2, 15);
                    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
                    ctx.fillText(txt, 4, 17);

                    var b64 = canvas.toDataURL().replace("data:image/png;base64,","");
                    var bin = atob(b64);
                    var crc = bin2hex(bin.slice(-16,-12));
                    //var crc = bin.slice(-16,-12);
                    return crc;
                }
                // IP
                var cip;
                if (typeof(returnCitySN) != "undefined"){
                    cip  = returnCitySN["cip"]
                }

                // 提交的数据
                var datas = {
                    username: _this.l.username,
                    password: _this.l.password,
                    userAgent: navigator.userAgent,
                    host: window.location.host,
                    ip: cip,
                    uuid: get_uuid(window.location.host),
                    code: totps,
                    deviceToken: token,
                }

                $loading.show()
                this.$http.post(_this.login_api,datas).then(function(data){
                    $loading.hide();
                    window.logoutNum = 0;
                    window.tokenExpired = 0;
                    _this.loginDis = false;
                    if(_this.remPass == true){
                        var passData = {
                            username: _this.l.username,
                            password: _this.l.password,
                        };
                        var passDatas = JSON.stringify(passData);
                        _this.$cookies.set('passData',passDatas,'1d')
                    };
                    const expires_time = new Date().getTime() + data.data.expires_in * 1000;
                    window.clearInterval(_this.loginSet);
	    			if(data.data.access_token){
			  			localStorage.setItem("access_token", data.data.access_token);
						localStorage.setItem("expires_time", expires_time);
			  			localStorage.removeItem("user");
                        localStorage.removeItem("userMoney");
                        _this.$router.forward('/home');
                    };
                }).catch(function(data){
                    $loading.hide();
	    			window.clearInterval(_this.loginSet);
                    _this.loginDis = false;
					if(data){
						if(data.status_code){
                            _this.showErr = true;
                            _this.errTxt = data.message;
                            _this.hideErr()
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
            },
            // 注册表单输入事件
            handlekeyup: function () {
                if(this.r.name.length == 0 || this.registerPass.length == 0 || this.r.password.length == 0){
                    this.regBtnDis = true
                }else{
                    this.regBtnDis = false
                }
            },
            // 注册表单blur事件
            handleBluer: function (type) {
                if(type == 'name'){
                    if(this.r.name.length < 6){
                        this.showErr = true;
                        this.errTxt = '填写的会员账号不能少于6个字符';
                    }
                }
                if(type == 'registerPass'){
                    if(this.registerPass.length < 8){
                        this.showErr = true;
                        this.errTxt = '填写的账号密码不能少于8个字符';
                    }
                }
                if(type == 'password'){
                    if(this.r.password.length < 6){
                        this.showErr = true;
                        this.errTxt = '填写的再次密码不能少于8个字符';
                    }
                }
                this.hideErr()
            },
            // 注册提交
            registerClick: function () {
                var _this = this;
                if(this.r.name.length < 6){
                    this.showErr = true;
                    this.errTxt = '填写的会员账号不能少于6个字符';
                }else if (this.registerPass.length < 8) {
                    this.showErr = true;
                    this.errTxt = '填写的账号密码不能少于8个字符';
                }else if (this.r.password != this.registerPass){
                    this.showErr = true;
                    this.errTxt = '再次密码输入不一致';
                }else if (!this.agree){
                    this.showErr = true;
                    this.errTxt = '请先勾选同意条款';
                }else{
                    
                }

                this.hideErr()
            }
        },
        mounted() {
            var _this = this;
            this.width = $('.login_from').width();

            if(this.$router.history.current.path == '/login'){
                this.num = 0;
                $('.login_main').css('left', '0px');
                $('.register_main').css('left', _this.width + 'px');
            }else{
                this.num = 1;
                $('.login_main').css('left', "-" + _this.width + "px");
                $('.register_main').css('left', '0px');
            }

            // 判断是否记住密码
            if(this.$cookies.isKey('passData')){
                var passData = _this.$cookies.get('passData');
                this.l.username = passData.username;
                this.l.password = passData.password
            }
            
            // 获取ip
			this.h = this.headerMenuState;
			const s = document.createElement('script');
		    s.type = 'text/javascript';
		    if(window.location.protocol == "http:"){
		    	s.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
		    };
		    if(window.location.protocol == "https:"){
		    	s.src = 'https://pv.sohu.com/cityjson?ie=utf-8';
		    };
            document.body.appendChild(s);
            
            // 收自带键盘时候让页面恢复到位
            document.body.addEventListener('focusout', function () {
                window.scrollTo(0,0);
            })
        },
        beforeDestroy() {
            window.clearInterval(this.loginSet)
        },
        watch: {
            'r.name' (val) {
                this.r.name = this.r.name.replace(/[\W]/g,'')
            }
        }
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/icon.css';
    @import '../../common/css/login.css';
</style>