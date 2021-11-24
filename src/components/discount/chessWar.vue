<template>
    <div id="battleOfKings" class="page has-navbar">
        <von-header>
			<button class="button button-icon ion-ios-arrow-back" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	标题2
	        </span>
        </von-header>

        <div class="page-content">
            <div class="banner">
                <img src="../../common/img/discount/top-image.jpg" alt="" srcset="">
            </div>
            <div class="battle_main fix">
                <div class="battle_explain fix">
                    <h5 class="primary_color">活动说明</h5>
                    <ul>
                        <li class="fix">
                            <p class="left">活动对象：</p>
                            <p class="right">对象</p>
                        </li>
                        <li class="fix">
                            <p class="left">活动时间：</p>
                            <p class="right">{{ q.start_time }} ~ {{ q.end_time }}</p>
                        </li>
                        <li class="fix">
                            <p class="left">活动内容：</p>
                            <p class="right">活动内容活动内容活动内容。</p>
                        </li>
                    </ul>
                </div>
                
                <div class="duel fix">
                    <h5 class="primary_color">标题</h5>
                    <div class="count_down fix">
                        倒计时
                        <span>{{ date1 }}</span>
                        天
                        <span>{{ date2 }}</span>
                        <span>{{ date3 }}</span>
                        时
                        <span>{{ date4 }}</span>
                        <span>{{ date5 }}</span>
                        分
                        <span>{{ date6 }}</span>
                        <span>{{ date7 }}</span>
                        秒
                    </div>
                    <div class="duel_list fix">
                        <table>
                            <thead>
                                <tr>
                                    <th class="primary_cr_bg">排行榜单</th>
                                    <th class="primary_cr_bg">表头1</th>
                                    <th class="primary_cr_bg">表头2</th>
                                    <th class="primary_cr_bg">表头3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="startTime > curTime" v-for="v in list">
                                    <td>—</td>
                                    <td>—</td>
                                    <td>—</td>
                                    <td>—</td>
                                </tr>
                                <tr v-if="startTime < curTime" v-for="v in list" :key="v.id">
                                    <td>{{ v.id }}</td>
                                    <td>{{ v.name }}</td>
                                    <td>{{ v.betAmount }}</td>
                                    <td>{{ v.handsel }}</td>
                                </tr> 
                            </tbody>
                        </table>
                    </div>
                    <div class="duel_more primary_color fix" v-if="list.length < allList.length" @click="moreClick()">点击加载更多</div>
                    <div class="duel_more primary_color fix" v-if="list.length >= allList.length && startTime < curTime" @click="retractClick()">点击收起</div>
                </div>

                <div class="battle_rule">
                    <h5 class="primary_color">活动规则</h5>
                    <ul>
                        <li>
                            <span>1</span>
                            内容内容内容；
                        </li>
                        <li>
                            <span>2</span>
                            内容内容内容；
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
                q:"",
                ulist: "",
                list: [],
                allList: "",
                i: 20,
                j: 20,
                date1: 0,
                date2: 0,
                date3: 0,
                date4: 0,
                date5: 0,
                date6: 0,
                date7: 0,
                set: null,
                curTime: "",
                startTime: "",
                endTime: "",
            }
        },
        methods: {
            ActGiftDetailInit: function () {
                var _this = this;
                $loading.show();
                this.$http.get(_this.ActGiftDetail_api + "?type=ChessRank", {

                }).then(function(data){
                    $loading.hide();
                    _this.q = data.data.message;
                    _this.ulist = data.data.message.ulist;
                    _this.allList = data.data.message.list;
                    _this.list = data.data.message.list.slice(0,20);
                    
                    _this.curTime = data.data.message.curTime;
                    _this.startTime = data.data.message.start_time_str;
                    _this.endTime = data.data.message.end_time_str;
                    if(_this.startTime > _this.curTime){
                        // 开始之前
                        _this.list.length = 20
                    }else{ //开始之后
                        // 倒计时已结束
                        if(_this.endTime <= _this.curTime){
                            _this.date1 = 0;
                            _this.date2 = 0;
                            _this.date3 = 0;
                            _this.date4 = 0;
                            _this.date5 = 0;
                            _this.date6 = 0;
                            _this.date7 = 0;
                        }else{ //倒计时
                            var t = _this.endTime - _this.curTime;
                            _this.getRTime(t)
                            _this.set = window.setInterval(function(){
                                _this.curTime++
                                var t = _this.endTime - _this.curTime;
                                _this.getRTime(t)
                                if(_this.endTime <= _this.curTime){
                                    window.clearInterval(_this.set)
                                }
                            },1000)
                        }
                    }   
                }).catch(function(data){
                    $loading.hide()
                })
            },
            getRTime: function (t){
                var d = Math.floor(t/60/60/24);//天
                var h = Math.floor(t/60/60%24);//时
                var m = Math.floor(t/60%60);//分
                var s = Math.floor(t%60);//秒
                this.date1 = d;
                if(h < 10){
                    this.date2 = 0;
                    this.date3 = h;
                }else{
                    this.date2 = ("" + h).slice(0,1)
                    this.date3 = ("" + h).slice(1,2)
                }
                if(m < 10){
                    this.date4 = 0;
                    this.date5 = m;
                }else{
                    this.date4 = ("" + m).slice(0,1)
                    this.date5 = ("" + m).slice(1,2)
                }
                if(s < 10){
                    this.date6 = 0;
                    this.date7 = s;
                }else{
                    this.date6 = ("" + s).slice(0,1)
                    this.date7 = ("" + s).slice(1,2)
                }
            },
            // 点击加载更多
            moreClick: function () {
                this.i += 20
                this.list.push(...this.allList.slice(this.j,this.i))
                this.j = this.i
            },
            // 点击收起
            retractClick: function () {
                this.i = 20;
                this.j = 20;
                this.list = this.list.slice(0,20)
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
        beforeDestroy() {
        	window.clearInterval(this.setTime);
        	window.clearInterval(this.setTimeTwo);
        	window.clearInterval(this.set);
        	this.setTime = null;
        	this.setTimeTwo = null;
        	this.set = null;
        }
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/chessWar.css';
</style>