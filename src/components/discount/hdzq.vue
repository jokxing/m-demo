<template>
    <div id="discount" class="page has-navbar">
        <von-header>
			<button class="button button-icon ion-ios-arrow-left" slot="left" v-show="showBackBtn" @click="$router.back('/login')"></button>
	        <span slot="title">
	        	优惠
	        </span>
        </von-header>

        <div class="page-content">
            <div class="discount_tab fix">
                <ul>
                    <li 
                        v-for="(item, index) in tabs" 
                        :key="index"
                        :class="{ active:index == num && index != 6 }"
                        @click="tabClick(item.type, index)">{{ item.name }}</li>
                </ul>
            </div>

            <div class="discount_main fix">
                <div class="discount_list" v-for="(item, index) in discountList" :key="index" @click="disListClick(item)">
                    <span class="discount_flag" :class='"state_" + item.state' v-if="item.state == 0">新人</span>
                    <span class="discount_flag" :class='"state_" + item.state' v-if="item.state == 1">日常</span>
                    <span class="discount_flag" :class='"state_" + item.state' v-if="item.state == 2">最新</span>
                    <span class="discount_flag" :class='"state_" + item.state' v-if="item.state == 3">热门</span>
                    <span class="discount_flag" :class='"state_" + item.state' v-if="item.state == 4">推荐</span>
                    <div class="discount_img">
                        <img src="../../common/img/discount/discount_loading.jpg" />
                        <img class="discount_newImg fix" :src="item.img + '?v=20210114'">
                    </div>
                    <div class="discount_txt fix">
                        <h5>
                            {{ item.title }} 
                            <span v-if="item.time" :class="{ 'red': item.time == '已结束', 'green': item.time == '进行中' }">{{ item.time }}</span>
                        </h5>
                        <p>{{ item.date }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var myDate = new Date();
            var year = myDate.getFullYear()
            var month = myDate.getMonth() + 1
            if(month < 10){
                month = "0" + month
            }
            var endDay = new Date(year, month, 0);
            var lestDay = endDay.getDate()
            return {
                tabs: [
                    {
                        name: "全部",
                        type: ""
                    },
                    {
                        name: "类型1",
                        type: "dpt"
                    },
                    {
                        name: "类型2",
                        type: "beat"
                    },
                    {
                        name: "类型3",
                        type: "digital"
                    },
                    {
                        name: "类型4",
                        type: "insu"
                    },
                    {
                        name: "类型5",
                        type: "vip"
                    },
                ],
                num: 0,
                // 列表
                discountData:[
                    {
                        type: 'insu',
                        state: 4,
                        img: require("../../common/img/discount/discount1.jpg"),
                        title: "标题1",
                        date: "",
                        urlType: '/kingMeal',
                        time: "",
                        sort: 1
                    },
                    {
                        type: "beat",
                        state: 1,
                        img: require("../../common/img/discount/discount1.jpg"),
                        title: "标题2",
                        date: "",
                        urlType: '/chessWar',
                        time: "",
                        sort: 1
                    },
                    {
                        type: "beat",
                        state: 1,
                        img: require("../../common/img/discount/discount1.jpg"),
                        title: "标题3",
                        date: "",
                        urlType: '/chessRescueMoney',
                        time: "",
                        sort: 1
                    },
                    {
                        type: "dpt",
                        state: 0,
                        img: require("../../common/img/discount/discount1.jpg"),
                        title: "标题4",
                        date: "长期活动",
                        urlType: '/gift',
                        time: "进行中",
                        sort: 1
                    },
                    {
                        type: "digital",
                        state: 2,
                        img: require("../../common/img/discount/discount1.jpg"),
                        title: "标题5",
                        date: "",
                        urlType: '/UsdtDptBonus',
                        time: "敬请期待",
                        sort: 1
                    },
                    {
                        type: "digital",
                        state: 3,
                        img: require("../../common/img/discount/discount1.jpg"),
                        title: "标题6",
                        date: "长期活动",
                        urlType: '/usdtRefund',
                        time: "进行中",
                        sort: 1
                    },
                    {
                        type: "beat",
                        state: 1,
                        img: require("../../common/img/discount/discount1.jpg"),
                        title: "标题7",
                        date: "长期活动",
                        urlType: '/bestdraw',
                        time: "进行中",
                        sort: 1
                    },
                ],
                discountArr: [],
                discountList: [],
                // 隐藏返回按钮
                showBackBtn: false,
                user:{
                    act_fail: 0
                }
            }
        },
        methods: {
            // 初始化
            hdzqInit: function () {
                var _this = this;
                $loading.show();
                this.$http.get(_this.ActGiftDetail_api + "?type=List",{

                }).then(function(data){
                    $loading.hide();
                    var myGetTime = new Date().getTime() / 1000;
                    
                    var chess_sTime = data.data.message.chess.start_time_str;
                    var chess_eTime = data.data.message.chess.end_time_str;
                    
                    var chess_hand_sTime = data.data.message.chess_hand.start_time_str;
                    var chess_hand_eTime = data.data.message.chess_hand.end_time_str;
                    
                    var chess_save_sTime = data.data.message.chess_save.start_time_str;
                    var chess_save_eTime = data.data.message.chess_save.end_time_str;
                    
                    var beat_time = data.data.message.beat.beat_time_str;

                    $(_this.discountData).each(function(i,v){
                        
                        if(v.urlType == '/chessWar'){
                            v.date = data.data.message.chess.start_time + "~" + data.data.message.chess.end_time
                            if(myGetTime < chess_sTime){
                                var t = chess_sTime - myGetTime;
                                v.time = _this.getRTime(t);
                                setInterval(function(){
                                    myGetTime ++
                                    var t = chess_sTime - myGetTime;
                                    v.time = _this.getRTime(t);
                                },1000) 
                            }
                            if(myGetTime > chess_sTime && myGetTime < chess_eTime){
                                v.time = "进行中"
                            } 
                            if (myGetTime > chess_eTime) {
                                v.time = "已结束"
                            }
                        }
                        
                        if(v.urlType == '/chessHand'){
                            v.date = data.data.message.chess_hand.start_time + "~" + data.data.message.chess_hand.end_time;
                            if(myGetTime < chess_hand_sTime){
                                var t = chess_hand_sTime - myGetTime;
                                v.time = _this.getRTime(t);
                                setInterval(function(){
                                    myGetTime ++
                                    var t = chess_hand_sTime - myGetTime;
                                    v.time = _this.getRTime(t);
                                },1000) 
                            }
                            if(myGetTime > chess_hand_sTime && myGetTime < chess_hand_eTime){
                                v.time = "进行中"
                            } 
                            if (myGetTime > chess_hand_eTime) {
                                v.time = "已结束"
                            }
                        };
                        
                        if(v.urlType == '/chessRescueMoney'){
                            v.date = data.data.message.chess_save.start_time + "~" + data.data.message.chess_save.end_time;
                            if(myGetTime < chess_save_sTime){
                                var t = chess_save_sTime - myGetTime;
                                v.time = _this.getRTime(t);
                                setInterval(function(){
                                    myGetTime ++
                                    var t = chess_save_sTime - myGetTime;
                                    v.time = _this.getRTime(t);
                                },1000) 
                            }
                            if(myGetTime > chess_save_sTime && myGetTime < chess_save_eTime){
                                v.time = "进行中"
                            } 
                            if (myGetTime > chess_save_eTime) {
                                v.time = "已结束"
                            }
                        };
                        
                        if(v.urlType == '/kingMeal'){
                            v.date = data.data.message.beat.beat_time;
                            if(myGetTime < beat_time){
                                var t = beat_time - myGetTime;
                                v.time = _this.getRTime(t);
                                setInterval(function(){
                                    myGetTime ++
                                    var t = beat_time - myGetTime;
                                    v.time = _this.getRTime(t);
                                },1000) 
                            }else{
                                v.time = "已结束"
                            }
                             // 固定第一
                            v.sort = 1
                        }else{
                            // 根据进行中-长期活动-未开始-结束顺序
                            if(v.time == '进行中'){
                                v.sort = 2
                            }
                            if(v.date == '长期活动'){
                                v.sort = 3
                            }
                            if(v.time != '进行中' && v.time != '已结束' && v.date != '长期活动'){
                                v.sort = 4
                            }
                            if(v.time == '已结束'){
                                v.sort = 5
                            }
                        }
                    });
                    _this.discountData = _this.insertSort(_this.discountData);
                    _this.discountArr = _this.discountData;
                    // 根据选中分类显示
                    if(window.hdzqType){
                        _this.discountList = []
                        $(_this.discountData).each(function(i,v){
                            if(v.type == window.hdzqType){
                                _this.discountList.push(v)
                            }
                        })
                    }else{
                        _this.discountList = _this.discountData;
                    }
                }).catch(function(data){
                    $loading.hide()
                })
            },
            // 处理排序
        	insertSort:function(arr){
				var len = arr.length;
			　　for (var i = 0; i < len; i++) {
			　　　　for (var j = 0; j < len - 1 - i; j++) {
			　　　　　　if (arr[j].sort > arr[j+1].sort) { //相邻元素两两对比
			　　　　　　　　var temp = arr[j+1]; //元素交换
			　　　　　　　　arr[j+1] = arr[j];
			　　　　　　　　arr[j] = temp;
			　　　　　　}
			　　　　}
			　　}
			　　return arr;
			},
            // 倒计时格式化
            getRTime: function (t){
                var d = Math.floor(t/60/60/24);//天
                var h = Math.floor(t/60/60%24);//时
                var m = Math.floor(t/60%60);//分
                var s = Math.floor(t%60);//秒
                this.date1 = d;
                if(h < 10){
                    h = "0" + h
                }
                if(m < 10){
                    m = "0" + m
                }
                if(s < 10){
                    s = "0" + s
                }
                var text
                if(d == 0){
                    text = h + "小时" + m + "分钟" + s + "秒"
                }else if(d == 0 && h == 0){
                    text = m + "分钟" + s + "秒"
                }else if(d == 0 && h == 0 && m == 0){
                    text = s + "秒"
                }else{
                    text = d + "天" + h + "小时" + m + "分钟" + s + "秒"
                }
                return text
            },
            // tab
            tabClick: function (type,index) {
                var _this = this;
                // 判断vip不变色
                if(type == 'vip'){
                    var _this = this;
                    var u = navigator.userAgent;
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    this.$router.forward('/vipPage')
                }else{
                    window.hdzqNum = index;
                    window.hdzqType = type;
                    this.num = index;
                    if(index != 0){
                        this.discountList = []
                        $(_this.discountArr).each(function(i,v){
                            if(type == 'digital'){
                                if(v.type == type){
                                    _this.discountList.push(v)
                                }
                            }else{
                                if(v.type == type){
                                    _this.discountList.push(v)
                                }
                            }
                        })
                    }else{
                        this.discountList = this.discountArr
                    }
                };
            },
            // 列表事件
            disListClick: function (item) {
                if(item.urlType == '/gift'){
                    if(item.beat_act){
                        this.$router.forward('/gift?type=' + item.type + "&beat_act=" + item.beat_act)
                    }else{  
                        this.$router.forward('/gift?type=' + item.type)
                    }
                }else{
                    if(item.urlType == '/invitePrizes'){
                        this.useragentApi()
                    }else{
                        this.$router.forward(item.urlType)
                    }
                }
            },
            // 
			useragentApi: function () {
				var _this = this;
                var u = navigator.userAgent;
			    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(this.$cookies.get("app") && !isiOS){
                    try{
                        window.android.intoInvitation();
                    }catch(error){
                        this.useragent()
                    }
                }else{
                    this.useragent()
                }
			},
            useragent: function () {
                this.$router.forward('/invitePrizes');
            },
        },
        mounted() {
            // 判断是否值显示tab的num
            if(window.hdzqNum){
                this.num = window.hdzqNum;
            }

            this.hdzqInit();

            if(!localStorage.getItem("access_token")){
                this.showBackBtn = true;
                $(".discount_tab ul li").css("width","20%");
                $(".discount_tab ul li:eq(3)").css("width","24%");
            }
        },
        watch: {
            $route(to ,from){
                this.hdzqInit();
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

<style>
    @import '../../common/css/discount.css';
</style>
