<template>
    <div v-show="showNewNews">
        <div class="listen_bg"></div>
        <div class="news_bg">
            <div class="news fix">
                <div class="news_T">信息
                    <i class="btn_close ion-ios-close-empty closeNewNews" @click="showNewNews = false"></i>
                </div>
                <div class="news_In news">
                    <p>您有信息尚未读取！</p>
                    <span>【{{ m.title }}】</span>
                    <md-button class="button" @click.native="read(m.id)">查看</md-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                m:{},
                setTime: null,
                setTimeTwo: null,
                showNewNews: false
            }
        },
        methods: {
            listenInit: function () {
                var _this = this;
                _this.listenApi()
                window.clearInterval(_this.setTime);
                window.clearInterval(_this.setTimeTwo);
                if(_this.$cookies.get("listenTime")){
                    var timeM = 10000;
                }else{
                    var timeM = 20000;
                }
                _this.setTime = window.setInterval(function(){
                    if(_this.$cookies.get("listenTime")){
                        _this.listenApi()
                    }else{
                        window.clearInterval(_this.setTime);
                        window.clearInterval(_this.setTimeTwo);
                        _this.setTimeTwo = window.setInterval(function(){
                            _this.listenApi()
                        },20000)
                    }
                },timeM);
            },
            listenApi: function () {
                var _this = this;
                const item = new Date().getTime();
                if(localStorage.getItem("access_token") != undefined){
                    _this.$http.get(_this.listen_api + "?_=" + item,{
                        timeout: 10000
                    }).then(function(data){
                        if(!data){
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('expires_time');
                            localStorage.removeItem('user');
                            localStorage.removeItem('userMoney');
                            _this.$router.back('/login')
                        }else{
                            var listenData = data.data.message;
                            //新消息条数
                            if(_this.$router.history.current.path == '/user'){
                                if(listenData.MsgCount > 0){
                                    _this.$parent.showMsgCount = true
                                }else{
                                    _this.$parent.showMsgCount = false
                                }
                            }
                            if(listenData.MsgCount > 0){
                                window.showMsgCount = true
                            }else{
                                window.showMsgCount = false
                            }
                            //新消息弹窗内容
                            if(listenData.Msg.title){
                                _this.m.title = listenData.Msg.title;
                                _this.m.id = listenData.Msg.id;
                                _this.showNewNews = true;
                                if(listenData.Msg.title.indexOf("存款订单") != 1 || listenData.Msg.title.indexOf("提款订单") != 1){
                                    _this.$cookies.remove("listenTime");
                                    window.clearInterval(_this.setTime);
                                    window.clearInterval(_this.setTimeTwo);
                                    setTimeout(function(){
                                        _this.listenInit()
                                    },1000);
                                }
                            };
                            //token令牌
                            if(listenData.access_token != undefined){
                                localStorage.setItem("access_token", listenData.access_token);
                            }
                            if(listenData.access_token_expire != undefined){
                                const expires_time = new Date().getTime() + listenData.access_token_expire * 1000;
                                localStorage.setItem("expires_time", expires_time);
                            }
                            if(listenData.Money != undefined){
                                localStorage.setItem("userMoney",listenData.Money)
                            }
                        }
                    }).catch(function(data){
                        if(data.message == "Token has expired"){
                            $dialog.alert({
                                title: "安全提示",
                                content: "登录已超时，为了您的账号安全，请重新登录！",
                                okTheme: 'positive',
                            })
                            window.clearInterval(_this.setTime);
                            window.clearInterval(_this.setTimeTwo);
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('expires_time');
                            localStorage.removeItem('user');
                            localStorage.removeItem('userMoney');
                            _this.$router.back('/login')
                        }
                    })
                }else if(_this.$router.history.current.meta.requireAuth){
                    window.clearInterval(_this.setTime);
                    window.clearInterval(_this.setTimeTwo);
                }else if(localStorage.getItem("expires_time") > 0 && localStorage.getItem("expires_time") < item){
                    window.clearInterval(_this.setTime);
                    window.clearInterval(_this.setTimeTwo);
                    $dialog.alert({
                        content: "由于长时间未登陆，系统自动退出，请重新登陆！",
                        okTheme: 'positive',
                    })
                    _this.clearCache(); //清除缓存-func.js
                    _this.$router.back('/login')
                }else if(localStorage.getItem("access_token") == undefined){
                    window.clearInterval(_this.setTime);
                    window.clearInterval(_this.setTimeTwo);
                    _this.clearCache(); //清除缓存-func.js
                    _this.$router.back('/login')
                }else if(localStorage.getItem("expires_time") == undefined){
                    window.clearInterval(_this.setTime);
                    window.clearInterval(_this.setTimeTwo);
                    _this.clearCache(); //清除缓存-func.js
                }else{
                    return false;
                }

            },
            //新消息弹窗查看
	    	read: function (id) {
	    		this.$router.forward('/news?type=message&id=' + id)
	    	},
        },
        mounted() {
            if(localStorage.getItem('access_token')){
                if(!this.$cookies.get("app")){
					this.listenInit()
				}
            }
        },
        beforeDestroy() {
        	window.clearInterval(this.setTime);
        	window.clearInterval(this.setTimeTwo);
        	this.setTime = null;
        	this.setTimeTwo = null;
        }

    }
</script>

<style scope>
    @import '../../common/css/style.css';
</style>