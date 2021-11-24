<template>
    <div id="index" class="page">
        <div class='footer'>
            <ul>
                <li v-for="(item, index) in menus" :key="index" @click='tabbar(item)'>
                    <i :class="item.icon"></i>
                    <p :class="{ active: item.path == $router.history.current.path || item.path == path }">{{ item.text }}</p>

                    <!-- 红点 -->
                    <span class="red" v-if="index == 4" v-show="showMsgCount"></span>
                </li>
            </ul>
        </div>
        <transition name="floor">
            <div class="wallet_main" v-show="is_wallet == 1">
                <ul>
                    <li>
                        <a href="javascript:;" @click="rmdDpt">
                            功能1
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" @click="usdtDpt">
                            功能2
                        </a>
                    </li>
                </ul>
            </div>
        </transition>
        <router-view :showMsgCount="showMsgCount"></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menus: [
                    {
                        icon: this.$router.history.current.path == '/home' || this.$router.history.current.path == '/' ? 'home' : 'home-outline',
                        text: '首页',
                        path: '/home'
                    },
                    {
                        icon: this.$router.history.current.path == '/hdzq' ? 'hdzq' : 'hdzq-outline',
                        text: '优惠',
                        path: '/hdzq'
                    },
                    {
                        icon: this.$router.history.current.path == '/wallet' ? 'wallet' : 'wallet-outline',
                        text: '功能',
                        path: '/wallet',

                    },
                    {
                        icon: this.$router.history.current.path == '/customer' ? 'customer' : 'customer-outline',
                        text: '客服',
                        path: '/customer'
                    },
                    {
                        icon: this.$router.history.current.path == '/user' ? 'user' : 'user-outline',
                        text: '我的',
                        path: '/user'
                    }
                ],
                path: '',
                // 红点
                showMsgCount: false,
                footerTime: null,
                // 判断钱包
                is_wallet: 0,
            }
        },
        methods: {
            tabbar: function (item) {
                this.path = '';
                if(item.path == '/wallet'){
                    if(localStorage.getItem("access_token")){
                        if(this.is_wallet == 0){
                            $('.footer ul li:eq(2) i').css({
                                width: '38px',
                                marginTop: '-8px',
                                marginBottom: '8px'
                            });
                            this.is_wallet = 1;
                        }else{
                            $('.footer ul li:eq(2) i').css({
                                width: '20px',
                                marginTop: '0',
                                marginBottom: '0'
                            });
                            this.is_wallet = 0;
                        }
                    }else{
                        this.$router.back("/login");
                    }
                }else{
                    this.$router.push(item.path);
                    this.is_wallet = 0;
                    $('.footer ul li:eq(2) i').css({
                        width: '20px',
                        marginTop: '0',
                        marginBottom: '0'
                    })
                    this.menus[0].icon = 'home-outline';
                    this.menus[1].icon = 'hdzq-outline';
                    this.menus[2].icon = 'wallet-outline';
                    this.menus[3].icon = 'customer-outline';
                    this.menus[4].icon = 'user-outline';
                }
                for(var i = 0; i < this.menus.length; i++) {
                    if(this.menus[i].path == item.path){
                        this.menus[i].icon = item.path.split('/')[1]
                    }
                }

                window.hdzqType = "";
                window.hdzqNum = ""
            },
            rmdDpt: function () {
                this.is_wallet = 0;
                $('.footer ul li:eq(2) i').css({
                    width: '20px',
                    marginTop: '0',
                    marginBottom: '0'
                });
                this.$router.push('/deposit')
            },
            usdtDpt: function () {
                this.is_wallet = 0;
                $('.footer ul li:eq(2) i').css({
                    width: '20px',
                    marginTop: '0',
                    marginBottom: '0'
                });
                this.$router.push('/funcDeposit')
            },
            listenApi: function () {
                var _this = this;
                this.$http.get(_this.listen_api,{

                }).then(function(data){
                    if(data.data.message.Money < 0){
                        _this.userMoney = 0
                    }else{
                        _this.userMoney = data.data.message.Money;
                    }
                    localStorage.setItem("userMoney",data.data.message.Money);

                    if(data.data.message.MsgCount > 0){
                        _this.showMsgCount = true
                    }
                }).catch(function(data){
                    if(data.message == 'Token has expired'){
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('expires_time');
                        localStorage.removeItem('user');
                        localStorage.removeItem('userMoney');
                        _this.$cookies.remove("initData");
                        _this.$cookies.remove("games");
                        _this.$cookies.remove("SportData");
                        _this.$cookies.remove("dptName");
                        _this.$dialog.alert({
                            title: "安全提示",
                            content: "登录已超时，为了您的账号安全，请重新登录！",
                            okTheme: 'positive',
                        }).then(() => {
                            _this.$router.bakc('/login')
                        })
                    }
                })
            },
        },
        mounted() {
            if(this.$router.history.current.path == '/deposit' || this.$router.history.current.path == '/account' || this.$router.history.current.path == '/withdraw' || this.$router.history.current.path == '/funcDeposit' || this.$router.history.current.path == '/usdtWithdraw'){
                this.menus[2].icon = 'wallet';
                this.path = '/wallet'
            };

            if(localStorage.getItem('access_token')){
                this.listenApi()
            }
        },
        watch: {
            $route(to ,from){
                this.menus[0].icon = 'home-outline';
                this.menus[1].icon = 'hdzq-outline';
                this.menus[2].icon = 'wallet-outline';
                this.menus[3].icon = 'customer-outline';
                this.menus[4].icon = 'user-outline';
                if(to.path == '/deposit' || to.path == '/account' || to.path == '/withdraw' || this.$router.history.current.path == '/funcDeposit' || this.$router.history.current.path == '/usdtWithdraw'){
                    this.menus[2].icon = 'wallet';
                    this.path = '/wallet'
                }
                for(var i = 0; i < this.menus.length; i++) {
                    if(this.menus[i].path == to.path){
                        this.menus[i].icon = to.path.split('/')[1]
                    }
                };
                
                $('.footer ul li:eq(2) i').css({
                    width: '20px',
                    marginTop: '0',
                    marginBottom: '0'
                });
                this.is_wallet = 0;

                this.listenApi()
            },
        },
        beforeDestroy() {
        	window.clearInterval(this.footerTime);
        }
    }
</script>

<style scope>
    @import '../common/css/style.css';
    @import '../common/css/index.css';
</style>