<template>
    <div id="announcement" class="page has-navbar">
        <von-header>
            <button class="button button-icon ion-ios-arrow-left" slot="left" @click="back"></button>
	        <span slot="title">
	        	公告专区
	        </span>
        </von-header>

        <div class="page-content">
            <div class="tab">
                <ul>
                    <li 
                        v-for="(item, index) in tabs" 
                        :class="{ active: index == num }"
                        @click="tabClick(index)">{{ item.text }}
                            <span v-if="item.b == 1"></span>
                        </li>
                </ul>
            </div>

            <div class="box">
                <div class="announcement_no_data" v-show="showData == 0">
                    <img src="../../common/img/announcement_no_data.png">
                </div>
                <div class="announcement_list" v-show="showData == 1">
                    <ul>
                        <li v-for="v in q" @click="goNewsClick(v)">
                            <p class="active fix">
                                <span class="left">【{{ v.title }}】</span>
                                <span class="right">{{ v.date }}</span>
                            </p>
                            <p class="active" v-html="v.content"></p>
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
                tabs:[
                    {
                        text: '维护',
                        type: '平台维护',
                        b: 0
                    },
                    {
                        text: '资讯',
                        type: '最新资讯',
                        b: 0
                    },
                    {
                        text: '活动',
                        type: '活动信息',
                        b: 0
                    },
                    {
                        text: '客服',
                        type: '客服信息',
                        b: 0
                    },
                    {
                        text: '得奖',
                        type: '得奖资讯',
                        b: 0
                    },
                ],
                num: 0,
                showData: 1,
                q: "",
                type: "平台维护"
            }
        },
        methods: {
            //公告专区红点
            annountData: function () {
                var _this = this;
                if(!this.$cookies.isKey("announcement")){
                    this.annountApi()
                }else{
                    var g = this.$cookies.get("announcement");
                    var data = typeof g == 'string' ? JSON.parse(g) : g;
                    this.annountInfo(data)
                }
            },
            // 初始化
            announInit: function (item) {
                var _this = this;
                if(item){
                    this.type = item
                }else{
                    this.type = '平台维护'
                }
                $loading.show();
                this.$http.get(_this.announcement_api + "?type=" + _this.type + "&host=" + window.location.host ,{
					
        		}).then(function(data){
                    $loading.hide()
        			if(data.data.message.length == 0){
        				_this.showData = 0
        			}else{
        				_this.showData = 1
        			}
        			_this.q = data.data.message
        		}).catch(function(data){
                    $loading.hide()
        		})

            },
            tabClick: function (index) {
                this.num = index;
                var item;
                if(index == 0){
                    item = '平台维护'
                }else if(index == 1){
                    item = '最新资讯'
                }else if(index == 2){
                    item = '活动消息'
                }else if (index == 3){
                    item = '客服信息'
                }else {
                    item = '得奖资讯'
                };
                this.announInit(item)
            },
            goNewsClick: function (v) {
                var _this = this;
        		if(v.is_read == "1"){
        			_this.$cookies.remove("announcement")
        		};
        		if(_this.type == "最新资讯"){
        			_this.$cookies.set("zxzx" + v.id, v.id, "1D");
        		};
        		if(_this.type == "平台维护"){
        			_this.$cookies.set("yxwh" + v.id, v.id, "1D");
        		};
        		if(_this.type == "活动信息"){
        			_this.$cookies.set("hdxx" + v.id, v.id, "1D");
        		};
        		if(_this.type == "客服信息"){
        			_this.$cookies.set("kfxx" + v.id, v.id, "1D");
        		};
        		if(_this.type == "得奖资讯"){
        			_this.$cookies.set("djzx" + v.id, v.id, "1D");
        		}

                this.$router.forward('/news?type=announ');
                window.tabNum = this.num;
                window.announcontent = v
            },
            // 返回
            back: function () {
                this.onBackClick();
                window.tabNum = null;
                window.announcontent = null
            }
        },
        mounted() {
            this.annountData();
            if(window.tabNum) {
                this.num = window.tabNum
                var item;
                if(window.tabNum == 0){
                    item = '平台维护'
                }else if(window.tabNum == 1){
                    item = '最新资讯'
                }else if(window.tabNum == 2){
                    item = '活动消息'
                }else if (window.tabNum == 3){
                    item = '客服信息'
                }else {
                    item = '得奖资讯'
                };
                this.announInit(item);
            }else{
                this.announInit();
            }
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/announcement.css';
</style>