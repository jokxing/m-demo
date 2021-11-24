<template>
    <div id="gift" class="page has-navbar">
        <von-header>
			<button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	标题4
	        </span>
        </von-header>

        <div class="page-content">
            <!-- 我的内容浮窗 -->
            <div class="my_beat my_dtp" v-if="$router.history.current.query.type == 'dpt' && is_token" @click="onMyMoney">
                <div class="my_beat_img">
                </div>
                <div class="my_beat_p" v-show="!is_myMoney">
                    <p>内容内容: <span>{{ dpted }}</span></p>
                </div>
                <div class="my_money" v-show="is_myMoney">
                    我的内容
                </div>
            </div>

            <div class="gift_main">
                <!-- banner -->
                <div class="gift_banner fix">
                    <img src="../../common/img/discount/gift_banner2.jpg?v=20201219-1" v-if="type == 'DptGift'" />
                    <ul>
                        <li v-for="(item, index) in q.giftList" @click="giftDetailClick(item)">{{ item.title }}</li>
                    </ul>
                </div>

                <!-- 礼品详情弹窗 -->
                <div class="gift_detail_bg" v-show="showGiftDetail" @click="showGiftDetail = false"></div>
                <div class="gift_detail" v-show="showGiftDetail">
                    <div class="gift_detail_head">
                        所有颜色
                        <i class="ion-ios-close-empty" @click="showGiftDetail = false"></i>
                    </div>
                    <div class="gift_detail_main">
                        <span v-for="(item, index) in giftDetail.pic">
                            <img :src="item.url" />
                            {{ item.name }}
                        </span>
                    </div>
                </div>

                <!-- tab -->
                <div class="gift_tab fix">
                    <ul>
                        <li 
                            v-for="(item, index) in tabs" 
                            :class="{ active: index == num }"
                            @click="tabClick(index)">{{ item }}</li>
                    </ul>
                </div>

                <!-- box -->
                <div class="gift_box fix" v-if="num == 0">
                    <p v-if="type == 'DptGift'">* 注意内容注意内容3</p>
                    <div class="gift_money_list fix">
                        <ul>
                            <li 
                                v-for="(item, index) in q.moneyList" 
                                :class="{ active: index == moneyNum }"
                                @click="giftMoneyClick(item, index)">
                                <div class="left"> {{ item.money }}</div>
                                <div class="right" v-if="item.is_gift2money == 0 || !item.is_gift2money">{{ item.gift }}</div>
                                <div class="right" v-if="item.is_gift2money == 1">{{ item.gift }}/<span style="color:#bd8d14!important;font-size:16px">{{ item.player_money }}</span></div>
                            </li>
                        </ul>
                    </div>
                    <md-button 
                        class="button apply" 
                        @click.native="fillActapplyClick('1')" 
                        v-show="showDiscount">申请1</md-button>
                    <md-button 
                        class="button apply" 
                        @click.native="fillActapplyClick('2')">申请2</md-button>
                </div>
                <!-- 活动规则 -->
                <div class="gift_box fix" v-if="num == 1 && type == 'DptGift'">
                    <h5>活动规则</h5>
                    <span>1.内容内容</span>
                    <br />
                    <span>2.内容内容</span>
                    <br />
                    <span>3.内容内容</span>
                </div>
            </div>
        </div>

        <dialogalter v-if="showDialog" :content="message"></dialogalter>
    </div>
</template>

<script>
    import dialogalter from './dialog.vue'
    export default {
        data() {
            return {
                // 我的积累浮窗
                is_myMoney: false,
                myMoneySet:null,
                myBeatWidth: 0,
                myBeatRight: 0,
                is_token: true,
                // 标题
                type: "",
                // 第一个tab
                tabs:['活动详情','活动细则'],
                num: 0,
                // 第二个tab
                moneyNum: 0,
                // 初始化
                q: {
                    giftList: [],
                    moneyList: [],
                },
                beated: {
                    Set: 0,
                    Sport: 0,
                    Vedio: 0,
                    Chess: 0,
                    Tiyu: 0,
                    Dianzi: 0,
                    Buyu: 0,
                },
                dpted: 0,
                initSet: null,
                // 隐藏申请按钮
                showDiscount: false,
                // 隐藏礼品详情
                showGiftDetail: false,
                giftDetail: '',
                // 礼品颜色选中
                giftMoneyNum: 0,
                giftMoneyData: '',
                // 选择颜色
                detailList: [],
                // 提交的数据
                data:'',
                // 提示
                showDialog: false,
                message: "",
                // 
                beat_act: 0
            }
        },
        methods: {
            // 初始化
            giftInit: function () {
                var _this = this;
                if(this.$router.history.current.query.type == 'dpt'){
                    this.type = 'DptGift';
                    this.tabs = ['活动详情','活动细则'];
                    var data = "?type=" + _this.type
                }
                
                $loading.show()
                this.$http.get(_this.ActGiftDetail_api + data,{

                }).then(function(data){
                    $loading.hide();
                    _this.q = data.data.message;
                    _this.q.giftList = data.data.message.giftList;
                    _this.q.moneyList = data.data.message.moneyList;
                    _this.dpted = _this.q.dpted;
                    _this.giftMoneyData = data.data.message.moneyList[0];

                    if(_this.q.moneyList[0].is_gift2money && _this.q.moneyList[0].is_gift2money == 1){
                        _this.showDiscount = true
                    }

                    _this.initSet = setTimeout(function(){
                        _this.myBeatWidth = $(".my_beat").outerWidth(true);
                        $(".my_beat").css("width", _this.myBeatWidth + "px");
                        if(_this.beat_act == 3){
                            _this.myBeatRight = (_this.myBeatWidth - 98) + "px";
                        }
                        if(_this.beat_act == 0 || _this.beat_act == 2){
                            _this.myBeatRight = (_this.myBeatWidth - 77) + "px";
                        }
                    },500)
                    _this.myMoneySet = setTimeout(function(){
                        $(".my_beat").css('right', "-" + _this.myBeatRight);
                        _this.is_myMoney = true
                    },3000)
                }).catch(function(data){
                    $loading.hide();
                })
            },
            // 礼品详情
            giftDetailClick: function (item) {
                this.showGiftDetail = true;
                this.giftDetail = item
            },
            // tab
            tabClick: function (index) {
                this.num = index
            },
            // 选择
            giftMoneyClick: function (item,index) {
                this.moneyNum = index;
                this.giftMoneyData = item;
                // 设置默认color
                this.giftMoneyNum = 0;
                this.detail = "";
                // 判断is_gift2money显示隐藏申请按钮
                if(item.is_gift2money == 1){
                    this.showDiscount = true
                }else{
                    this.showDiscount = false
                }
            },
            // 选择礼品的颜色
            colorClick: function (item,index) {
                this.giftMoneyNum = index; 
                this.detail = item.name
            },
            // 提交
            fillActapplyClick: function (index) {
                 if(localStorage.getItem("access_token")){
                    $dialog.alert({
                        content: '提交成功' + index,
                        okTheme: 'positive',
                    })
                }else{
                    $dialog.alert({
                        content: "请登入后再进行申请！",
                        okTheme: 'positive',
                    })
                }
            },
            // 提交接口
            VipActapplyApi: function (index) {
                $dialog.alert({
                    content: '提交成功',
                    okTheme: 'positive',
                })
            },
            // 我的内容浮窗
            onMyMoney: function () {
                var _this = this;
                clearTimeout(_this.myMoneySet);
                $(".my_beat").css('right', "0");
                _this.is_myMoney = false;
                _this.myMoneySet = setTimeout(function(){
                    $(".my_beat").css('right', "-" + _this.myBeatRight);
                    _this.is_myMoney = true
                },3000)
            },
        },
        mounted() {
            this.giftInit();
            if(localStorage.getItem('access_token')){
                this.is_token = true
            }else{
                this.showBeated = false;
                this.is_token = false
            }
        },
        components: {
            dialogalter,
        },
        beforeDestroy() {
            clearTimeout(this.myMoneySet);
            this.myMoneySet = null

            clearTimeout(this.initSet);
            this.initSet = null
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/discount.css';
</style>
