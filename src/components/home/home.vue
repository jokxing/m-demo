<template>
    <div id="home" class='page has-navbar'>
        <von-header>
            <button class="button button-icon icon-caidan" slot="left" @click='showSidebar = true'>
                <i v-show="showAnnountRed"></i>
            </button>
            <span slot="title">首页</span>
        </von-header>

        <!-- 主体 -->
        <div class="page-content">
            <div class='home_main fix'>
                <div class='top fix'>
                    <div>
                        <div class="home_banner">
                            <slider ref="slider" :options="options" @tap='onBanner'>
                                <slideritem v-for="(item,index) in bannerList" :data-code="item.ptitle" :key="index" :style="{backgroundImage: 'url(' + item.pic + '?v=20210107)' }"></slideritem>
                                <div slot="loading"></div>
                            </slider>
                        </div>

                        <div class='annount fix' @click="runMsgTop()" v-show="showHorse && announcement != ''">
                            <div>
                                <i></i>
                                <marquee scrollamount="2" style="float: left; width: 90%;">
                                    <span style="color: rgb(88, 88, 88); line-height: 20px; font-size: 0.8rem;">{{ announcement }}</span>
                                </marquee>
                            </div>
                        </div>
    
                        <div class='home_info fix'>
                            <div class='left'>
                                <p>
                                    主账户 <img :src='user.vip_level_logo' width='60' v-if="is_token" />
                                </p>
                                <h5 v-if="userMoney == null">登录后查看</h5>
                                <h5 v-if="userMoney != null">{{ parseInt(userMoney) }}</h5>
                            </div>
                            <div class='right'>
                                <ul>
                                    <li @click="homeInfoClick('vipPage')">
                                        <img src='../../common/img/icon-dpt.png' />
                                        <p>VIP</p>
                                    </li>
                                    <li @click="homeInfoClick('account')">
                                        <img src='../../common/img/icon-dpt.png' />
                                        <p>转账</p>
                                    </li>
                                    <li @click="homeInfoClick('withdraw')">
                                        <img src='../../common/img/icon-dpt.png' />
                                        <p>提款</p>
                                    </li>
                                    <li @click="homeInfoClick('deposit')">
                                        <img src='../../common/img/icon-dpt.png' />
                                        <p>充值</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="bottom fix">
                    <div>
                        <div class='game_tab fix'>
                            <ul>
                                <li v-for="(item, index) in gameTabs" :class="{active: index == gameTabNum}" @click="gameTabClick(index)">
                                    <transition name="bounce">
                                        <div class="game_logo" v-show="gameTabNum == index"></div>
                                    </transition>
                                </li>
                            </ul>
                        </div>
                        <div class="game_box">
                            <div v-for="(item, index) in gameArr" :key="index" :class="item + '_box'" v-if='gameTabNum == index'>
                                <ul>
                                    <li 
                                        v-for='v in game[item]'
                                        @click="showGamePopup = true">
                                        <div :style="{backgroundImage: v.p_status == 1 ? 'url(' + v.homeGameImg + '?v=20210331)' : 'url(' + v.homeGameWhImg + '?v=20210331)'}"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 弹窗 -->
        <div class="gamePopup" v-show="showGamePopup">
            <div class="gamePopup_main">
                <div class="gamePopup_head fix">
                    标题
                    <i class="icon ion-close-round" @click="Cancel"></i>
                </div>
                <div class="gamePopup_mid fix">
                    内容
                </div>
                <div class="gamePopup_bot fix">
                    <md-button class="button fLeft">进入平台</md-button>
                    <md-button class="button fRight">确认送出</md-button>
                </div>
            </div>
        </div>

        <!-- 提示登录 -->
        <div class="go_login" v-if="!is_token">
            <div class="inner">
                <span>登录平台，体验更多精彩服务</span>
                <md-button class="button" @click.native='$router.back("/login")'>立即登录</md-button>
            </div>
        </div>

        <!-- 侧栏 -->
        <transition name="slide-sidebar">
            <sidebar v-if='showSidebar'></sidebar>
        </transition>
        <div class="sidebar_bg" v-if='showSidebar' @click='showSidebar = false'></div>

        <!-- 重要公告弹窗-->
        <transition name="cus">
            <div id="homeAnnoun" class="secCus" v-show="showAnnounPopup" style="z-index: 150;">
                <div class="popup">
                    <div class="popup-head">
                        <div class="popup-title primary-color">重要公告</div>
                        <div class="popup-close" @click="showAnnounPopup = false"><i class="icon ion-ios-close-outline"></i></div>
                    </div>
                    <div id="ggTopHtml" class="popup-body"></div>
                    <div class="popup-buttons">
                        <button class="button button-block btn_active" @click="showAnnounPopup = false">确定</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { slider, slideritem } from 'vue-concise-slider'
    import sidebar from '../public/sidebar.vue';
    export default {
        data() {
            return {
                // 轮播图
                bannerList:[],
                options: {
                    pagination: true,
                    thresholdDistance: 100, // Sliding distance threshold
                    thresholdTime: 300, // Sliding time threshold decision
                    grabCursor: true, // Scratch style
                    speed: 300, // Sliding speed
                    loop: true, // Infinite loop
                    autoplay: 3000 // Auto play[ms]
                },
                // tab
                gameTabs: ['','','','','',''],
                gameTabNum: 0,
                // 类型
                gameArr: [],
                // 侧栏显示隐藏
                showSidebar: false,
                // 用户信息
                user:{
                    wallet: 1,
                },
                // 用户余额
                userMoney: null,
                // 是否token存在
                is_token: false,
                // 快速弹窗
                showGamePopup: false,
                gameTitles: '',
                gameMoney: "loading..",
                is_accountError: false,
                accountNum: 0,
                gameCode: '',
                mypurseMoney: '',
                // 跑马灯  
				showHorse: false,
				announcement:{},
				strHtml:"",
                announcementB: false,
                // 公告专区红点
                showAnnountRed: false,
                // 重要公告
                showAnnounPopup: false,
				//路由
				fromUrl: "",
            }
        },
        methods: {
            // 轮播图初始化
            bannerInit: function () {
                var _this = this;
                _this.bannerWidth = $(".swiper").parent().width()
                if(_this.$cookies.isKey('pic')){
                    var pic = JSON.parse(_this.$cookies.get('pic'))
                    _this.bannerList = pic
                }else{
                    this.$http.get(_this.pic_api + '?platform=mobile',{

                    }).then(function(data){
                        _this.bannerList = data.data.message;
                        var obj = JSON.stringify(data.data.message);
                        _this.$cookies.set("pic",obj,"1d");
                    }).catch(function(data){

                    })
                }
            },
            onBanner: function (data){
                var initData = this.$cookies.get('initData');
                if(localStorage.getItem("access_token")){
                    if(data.currentPage == 0){
                        this.$router.push('/shengqianbao')
                    }else if(data.currentPage == 1){
                        this.$router.push('/kingMeal')
                    }else if (data.currentPage == 2){
                        this.$router.push('/advance')
                    }else if (data.currentPage == 3){
                        this.$router.push('/invitation')
                    }else if (data.currentPage == 4){
                        this.$router.push('/beatGift')
                    }else if (data.currentPage == 5){
                        this.$router.push('/liveLottery')
                    }else if (data.currentPage == 6){
                        this.$router.push('/gift?type=dpt')
                    }else if (data.currentPage == 7){
                        this.$router.push('/chessRescueMoney')
                    }else if (data.currentPage == 8){
                        this.$router.push('/bestdraw')
                    }else{
                        $dialog.confirm({
                            content:"影城仅在APP开放，请先下载APP",
                            okTheme: 'positive',
                            okText: '立即下载',
                            cancelText: '取消',
                        }).then((res) => {
                            if(res){
                                window.open(initData.f_app)
                            }
                        })
                    }
                }else{
                    this.$router.forward("/login")
                }
            },
            // 用户信息点击事件
            homeInfoClick: function (item) {
                var url = "/" + item;
                if(localStorage.getItem('access_token')){
                    this.$router.forward(url)
                }else{
                    this.$router.back('/login')
                }
            },
            // 游戏tab
            gameTabClick: function (index) {
                this.gameTabNum = index
            },
			// 关闭弹窗  
	      	Cancel(){
	      		this.showGamePopup = false;
	      		this.source.cancel();
	      	},
            //跑马灯
	    	runHorseData: function () {
	    		var _this = this;
	    		if(!window.announcementList){
                    _this.announcementB = false
	    			this.$http.get(_this.announcement_api + "?type=跑马灯1&host=" + window.location.host,{
	
		    		}).then(function(data){
		    			window.announcementList = data.data.message;
		    			if(data.data.message.length != 0){
		    				_this.showHorse = true
		    			}
		    			_this.announcement = data.data.message.content.replace(/::/g, '  ');
		    		}).catch(function(data){
	
		    		})
	    		}else{
                    _this.announcementB = true
	    			if(window.announcementList.length != 0){
	    				_this.showHorse = true
	    			}
	    			_this.announcement = window.announcementList.content.replace(/::/g, '  ');
	    		}
	    	},
            // 跑马灯弹窗
			runMsgTop(event){
				var _this = this;
				_this.showAnnounPopup = true;
				var arr = _this.announcement.split("  ")
				var html = ""	
				for(var i = 0; i < arr.length;i++){
					html += "<div class='ggTop'>";
					var arrI = arr[i].split("：")
					html += "<div class='ggTop_txt'><p>【" + arrI[0] + "】</p></div>"			
					html += "<div class='ggTop_inner'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + arr[i].split("#")[0] + "<p>" + arr[i].split("#")[1] + "</p></div></div>"
					html += "</div>"
				}
				$("#ggTopHtml").html(html)
	        },
            //公告专区红点
            annountData: function () {
                if(!this.$cookies.isKey("announcement")){
                    this.annountApi()
                }else{
                    var g = this.$cookies.get("announcement");
                    var data = typeof g == 'string' ? JSON.parse(g) : g;
                    this.annountInfo(data)
                }
            },
        },
		// 获取上一页的路由
	    beforeRouteEnter(to, from, next){
	    	next(vm =>{
				vm.fromUrl = from.path;
			})
		},
        mounted() {
            var _this = this;
            this.bannerInit();
            this.initApi();

            Object.keys(_this.game).forEach(function(j,k){
                _this.gameArr.push(j)
            })

            if(localStorage.getItem('access_token')){
                this.is_token = true;

                // func.js--用户信息初始化
                this.userInit();
                // 游戏初始化
            };
            // 跑马灯
            this.runHorseData();
            setTimeout(function(){
                _this.annountData()
            },3000)
        },
        components: {
            slider,
            slideritem,
            sidebar,
        }
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/icon.css';
    @import '../../common/css/home.css';
</style>