<template>
    <div id='user' class='page has-navbar'>
        <div class='page-content'>
            <div class='user_head fix'>
                <div class='user_head_img'></div>

                <div class='user_head_txt' v-if="is_user == 0">
                    <h4 @click="$router.forward('/register')">立即登录</h4>
                    <p>登录体验更多乐趣</p>
                </div>

                <div class='user_head_txt' v-if="is_user == 1">
                    <h4 >{{ user.name }} <img :src='user.vip_level_logo' width='60' /></h4>
                    <p>您已加入平台第{{ user.join_day }}天</p>
                </div>
            </div>

            <div class='user_infor'>
                <ul>
                    <li>
                        <span>主账户</span>
                        <div v-if="is_user == 1">{{ userMoney }}</div>
                    </li>
                </ul>
            </div>

            <div class='user_fun fix'>
                <ul class="top fix">
                    <li @click="handleClick('/vipPage')">
                        <img src='../../common/img/icon-vip.png' width="40" />
                        <span>vip</span>
                    </li>
                    <li>
                        <img src='../../common/img/icon-vip.png' width="40" />
                        <span>name2</span>
                    </li>
                </ul>
                <ul class="bot fix">
                    <li>
                        <img src='../../common/img/icon-dpt.png' />
                        <p>name1</p>
                    </li>
                    <li>
                        <img src='../../common/img/icon-dpt.png' />
                        <p>name2</p>
                    </li>
                    <li>
                        <img src='../../common/img/icon-dpt.png' />
                        <p>name3</p>
                    </li>
                    <li>
                        <img src='../../common/img/icon-dpt.png' />
                        <p>name4</p>
                    </li>
                </ul>
            </div>
            
            <div class='user_list'>
                <ul>
                    <li>
                        <i class='icon-bestdraw'></i>
                        列表1
                        <i class='icon ion-chevron-right'></i>
                    </li>
                    <li>
                        <i class='icon-bestdraw'></i>
                        列表2
                        <i class='icon ion-chevron-right'></i>
                    </li>
                </ul>

                <ul>
                    <li>
                        <i class='icon-joint-venture'></i>
                        列表3
                        <i class='icon ion-chevron-right'></i>
                    </li>
                    <li @click="$router.push('/joinus')">
                        <i class='icon-joint-venture'></i>
                        点击我
                        <i class='icon ion-chevron-right'></i>
                    </li>
                    <li @click="$router.push('/advance')">
                        <i class='icon-joint-venture'></i>
                        点击我
                        <i class='icon ion-chevron-right'></i>
                    </li>
                </ul>
                
                <ul>
                    <li>
                        <i class='icon-shuju'></i>
                        列表4
                        <i class='icon ion-chevron-right'></i>
                    </li>
                    <li @click="handleClick('/tradeRec')">
                        <i class='icon-shuju'></i>
                        提款记录
                        <i class='icon ion-chevron-right'></i>
                    </li>
                    <li>
                        <i class='icon-shuju'></i>
                        列表5
                        <i class='icon ion-chevron-right'></i>
                    </li>
                </ul>
                
                <ul>
                    <li @click="handleClick('/message')">
                        <i class='icon-Message'><span v-show="showMsgCount"></span></i>
                        讯息
                        <i class='icon ion-chevron-right'></i>
                    </li>
                    <li>
                        <i class='icon-xiugai'></i>
                        列表6
                        <i class='icon ion-chevron-right'></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['showMsgCount'],
        data() {
            return {
                is_user: 0,
                user:"",
                userMoney: "",
                shengqianbaoMoney: "",
            }
        },
        methods: {
            handleClick: function (item) {
                if(localStorage.getItem("access_token")){
                    this.$router.forward(item)
                }else{
                    this.$router.forward("/register")
                }
            },
        },
        mounted() {
            // 动态给列表高度赋值
            setTimeout(function(){
                var user_head = $('.user_head').outerHeight(true);
                var user_infor = $('.user_infor').outerHeight(true);
                var user_fun = $('.user_fun').outerHeight(true);
                var height = $(document).height();
                var userListHeight = height - user_head - user_infor - user_fun - 44 - 50
                $('.user_list').css('height', userListHeight + 'px')
            },600);
            
            // 获取user数据
            var users = localStorage.getItem('user');
            this.user = JSON.parse(users)
            if(users){
                this.is_user = 1
            }else{
                this.is_user = 0
            }

            if(localStorage.getItem('access_token')){
                // 获取user余额
                var userMoney = localStorage.getItem("userMoney");
                this.userMoney = JSON.parse(userMoney)
                // 获取生钱宝余额
                var shengqianbaoMoney = localStorage.getItem('shengqianbaoMoney');
                this.shengqianbaoMoney = JSON.parse(shengqianbaoMoney)
            }
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/icon.css';
    @import '../../common/css/user.css';
</style>