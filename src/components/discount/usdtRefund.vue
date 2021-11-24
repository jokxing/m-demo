<template>
    <div id="battleOfKings" class="page has-navbar usdtRefund">
        <von-header>
			<button class="button button-icon ion-ios-arrow-back" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	标题6
	        </span>
        </von-header>

        <div class="page-content">
            <div class="banner">
                <img src="../../common/img/discount/usdtRefund_banner.jpg">
            </div>
            <div class="battle_main fix">
                <div class="battle_explain usdtRefund fix">
                    <h5 class="primary_color">活动内容</h5>
                    <p>活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容</p>
                </div>
                
                <div class="duel fix">
                    <div class="usdtRefund_list fix">
                        <table
                            cellspacing="0">
                            <!-- 顶部title -->
                            <tr>
                                <th class="primary_cr_bg">表头1</th>
                                <th class="primary_cr_bg">表头2</th>
                                <th class="primary_cr_bg">表头3</th>
                                <th class="primary_cr_bg">表头4</th>
                            </tr>
                            <!-- template不会被渲染 -->
                            <template v-for="(item,index) in tableInfo.data">
                                <!-- 左侧跨行区域 -->
                                <tr>
                                    <td :rowspan="item.list.length+1" class="td_left">{{ item.name.split(" ")[0] }} <br> {{ item.name.split(" ")[1] }} <br> {{ item.name.split(" ")[2] }}</td>
                                </tr>
                                <tr v-for="(child,index) in item.list">
                                    <td>
                                        {{child.deposit_money}}<br><span style="font-size: 0.6rem">({{ child.deposit_money*7 }})</span>
                                    </td>
                                    <td>
                                        {{child.deposit_money}}<br><span style="font-size: 0.6rem">({{ child.deposit_money*7 }})</span>
                                    </td>
                                    <td>
                                        {{child.monthly_rebate_rate}}<br><span style="font-size: 0.6rem">({{ child.monthly_rebate_rate*7 }})</span>
                                    </td>
                                </tr>
                            </template>
                            <tr>
                                <td colspan="4">内容</td>
                            </tr>
                        </table>
                    </div>
                    <md-button class="button" @click.native="receive">提交</md-button>
                </div>

                <div class="battle_rule">
                    <h5 class="primary_color">活动规则</h5>
                    <ul>
                        <li>
                            <span>1</span>
                            活动规则内容活动规则内容活动规则内容活动规则内容
                        </li>
                        <li>
                            <span>2</span>
                            活动规则内容活动规则内容活动规则内容活动规则内容
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showAppHdzqBack: false,
                is_token: false,
                tableInfo:"",
            }
        },
        methods: {
            ActGiftDetailInit: function () {
                var _this = this;
                $loading.show();
                this.$http.get(_this.ActGiftDetail_api + "?type=UsdtRefund", {

                }).then(function(data){
                    $loading.hide();
                    _this.tableInfo = data.data.message
                }).catch(function(data){
                    $loading.hide()
                })
            },
            receive: function () {
                $dialog.alert({
                    content: '提交成功',
                    okTheme: 'positive',
                })
            },
        },
        mounted() {
            this.ActGiftDetailInit()
            if(localStorage.getItem('access_token')){
                this.is_token = true
            }else{
                this.is_token = false
            }
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/chessWar.css';
</style>