<template>
    <div id="bestdraw" class="page has-navbar">
        <von-header>
			<button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	标题7
	        </span>
        </von-header>

        <div class="page-content">
            <div class="bestdraw_banner">
                <img src="../../common/img/discount/bestDraw_banner.jpg">
            </div>

            <div class="bestdraw_main fix">
                <h5>签满7日得更多礼品</h5>
                <div class="progres fix">
                    <ul>
                        <li v-for="(item, index) in progress">
                            <div class="strip" 
                                :class="{ active: index + 1 < nextStep, last: index + 1 == nextStep, complete: signDay == 7 }">
                            </div>
                            <p>
                                <span v-if="index + 1 > signDay">未签</span>
                                <span v-if="index + 1 <= signDay">已签</span>
                            </p>
                            <div class="check" :class="{ active: index + 1 <= signDay }">
                                <img src="../../common/img/discount/checkIcon.png">
                            </div>
                            <p>第{{ index + 1 }}天</p>
                        </li>
                    </ul>
                </div>
                <p class="logout" v-show="showLogout">请登录后查看</p>
                <div class="bestdraw_btn fix">
                    <md-button class="button" :disabled="q.info.signed == 1" @click.native="signClick">
                        <span v-if="q.info.signed == 0">点击签到</span>
                        <span v-if="q.info.signed == 1">已签到</span>
                    </md-button>
                    <p>您已经连续签到 <span>{{ signDay }}</span> 天，再接再厉哦！</p>
                </div>
            </div>

            <div class="bestdraw_rule fix">
                <h5>活动规则</h5>
                <table>
                    <thead>
                        <tr>
                            <th>时间</th>
                            <th>表头1</th>
                            <th>表头2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="v in q.list.list">
                            <td>{{ v.day }}</td>
                            <td>{{ v.give_money }}</td>
                            <td>{{ v.give_money_2 }}</td>
                        </tr>
                    </tbody>
                </table>

                <ul>
                    <li>
                        <span>1</span>
                        内容内容内容内容内容内容
                    </li>
                    <li>
                        <span>2</span>
                        内容内容内容内容内容内容
                    </li>
                    <li>
                        <span>3</span>
                        内容内容内容内容内容内容
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                progress:['','','','','','',''],
                q:{
                    list:'',
                    info:'',
                },
                nextStep: 0,
                // 已签的天数
                signDay: "",
                // 显示隐藏登录
                showLogout: false
            }
        },
        methods: {
            // 初始化
            ActGiftDetailInit: function () {
                var _this = this;
                $loading.show();
                this.$http.get(_this.ActGiftDetail_api + "?type=SignBonus",{

                }).then(function(data){
                    $loading.hide();
                    _this.q = data.data.message
                    _this.signDay = data.data.message.info.signDay;
                    if(localStorage.getItem('access_token')){
                        _this.nextStep = data.data.message.info.nextStep
                    }else{
                        _this.nextStep = 0
                    }
                }).catch(function(data){
                    $loading.hide()
                })
            },
            // 签到
            signClick: function () {
                if(localStorage.getItem("access_token")){
                    this.nextStep++;
                    this.signDay++;
                    this.q.info.signed = 1
                }else{
                    $dialog.alert({
                        content: "请登入后再进行申请！",
                        okTheme: 'positive',
			        })
                }
            },
        },
        mounted() {
            this.ActGiftDetailInit();

            if(!localStorage.getItem("access_token")){
                this.showLogout = true
            }
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/discount.css';
    @import '../../common/css/bestdraw.css';
</style>
