<template>
    <div id="king_meal" class="page has-navbar">
        <von-header>
			<button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	标题1
	        </span>
        </von-header>

        <div class="page-content page-content-small">
            <div class="king_meal_main">
                <div class="picBox">
                    <div class="teamInfo">
                        <table>
                            <thead>
                                <tr>
                                    <th>表头1</th>
                                    <th>表头2</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="width: 42%;">
                                        <div class="game_name">{{ q.matchTitle }}</div>
                                        <div class="game_time">{{ q.matchStartTime }}</div>
                                    </td>
                                    <td class="teamLogo">
                                        <span class="temaOne">
                                          <img :src="q.hostTeamIcon">
                                          <i>{{ q.hostTeamName }}</i>
                                        </span>
                                        <i></i>
                                        <span class="temaTwo">
                                            <img :src="q.guestTeamIcon">
                                            <i>{{ q.guestTeamName }}</i>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="rules">
                    <div class="rules_img">
                        <img src="">   
                    </div>
                    <div class="rulesBox">
                        <div class="ruleItem">
                            <span class="noColor">活动对象 : </span>
                            <span class="colored"> </span>
                        </div>
                        <div class="ruleItem">
                            <span class="noColor">活动平台 : </span>
                            <span class="colored"> </span>
                        </div>
                        <div class="ruleItem">
                            <span class="noColor">活动时间 : </span>
                            <span class="colored"> </span>
                        </div>
                        <div class="ruleItem">
                            <span class="noColor">活动条件 : </span>
                            <span class="colored"></span>
                        </div>
                    </div>
                </div>

                <div class="otherRules">
                    内容内容内容内内容内容内容<span>100%</span>
                </div>

                <div class="vipInfo">
                    <div>
                        <span>表头1</span>
                        <span>表头2</span>
                    </div>
                    <p v-for="v in q.bonus">
                        <span>{{ v.name }}</span>
                        <span>{{ v.money }}</span>
                    </p>
                </div>

                <div class="resume">
                    注：内容内容内容内。
                </div>

                <div class="activityRules">
                    <div class="title">
                        <span><img src="../../common/img/recommend_line.png">活动规则</span>
                    </div>
                    <p>
                        <span>1</span>
                        内容内容内容
                    </p>
                    <p>
                        <span>2</span>
                        内容内容内容
                    </p>
                </div>

                <!-- 回到顶部 -->
                <div class="back_top_bg fix">
                    <div class="back_top">
                        <a href="javascript:;" @click="backTop" target="_self">
                            <img src="../../common/img/dingbu.png"/>
                            <p>回到顶部</p>
                        </a>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 初始化
                q:"",
            }
        },
        methods: {
            kingMealInfoInit: function () {
                var _this = this;
                $loading.show();
                this.$http.get(_this.KingMealInfo_api,{

                }).then(function(data){
                    $loading.hide();
                    _this.q = data.data.message
                }).catch(function(data){
                    $loading.hide()
                })
            },
            // 返回顶部
            backTop: function () {
                document.getElementsByClassName("page-content")[0].scrollTop = 0;
            },
        },
        mounted() {
            this.kingMealInfoInit();
            //原生APP隐藏网页的头部
        	if(this.$cookies.get("app")){
				$("#king_meal .bar-header").css("display","none");
				$('#king_meal .page-content').css("padding-top","0");
			}
        },
    }
</script>

<style>
    @import '../../common/css/style.css';
    @import '../../common/css/discount.css';
    @import '../../common/css/kingMeal.css';
</style>
