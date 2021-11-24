<template>
    <div class='sidebar'>
        <div class='sidebar_top'></div>
        <h3>logo</h3>
        <div class='sidebar_list fix'>
            <ul>
                <li>
                    <router-link to="/announcement">
                        <i class='icon-notice'></i>
                        <p>
                            公告专区
                            <span v-if="annountNum > 0">{{ annountNum }}</span>
                        </p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/helpCenter">
                        <i class='icon-help1'></i>
                        <p>帮助中心</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/about">
                        <i class='icon-usergroup'></i>
                        <p>关于我们</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class='sidebar_btn' v-if="is_token == 1">
            <md-button class='button icon-shutdown_icon' @click.native='logout'>安全退出</md-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                annountNum: 0,
                is_token: 0
            }
        },
        methods: {
            annountInit: function () {
                if(!this.$cookies.isKey("announcement")){
                    this.annountApi()
                }else{
                    var g = this.$cookies.get("announcement");
                    var data = typeof g == 'string' ? JSON.parse(g) : g;
                    this.annountInfo(data)
                }
            },
            // 登出
            logout: function () {
                var _this = this;
				this.$router.back('/login');
				window.clearInterval(_this.userTime);
				window.clearInterval(_this.setTime);
				window.clearInterval(_this.setTimeTwo);
				_this.setTime = null;
				_this.setTimeTwo = null;
	   			_this.clearCache()
            }
        },
        mounted() {
            if(localStorage.getItem('access_token')){
                this.annountInit();
                this.is_token = 1
            }else{
                this.is_token = 0
            }
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/icon.css';
    @import '../../common/css/home.css';
</style>