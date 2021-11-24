<template>
    <div class='vip_level'>
        <div class='vip_level_top'>
            <svg class="ProgressSVG" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns-xmlnsXlink="http://www.w3.org/1999/xlink" v-if="showVipLevel">
                <defs>
                    <clipPath id="cut-off-bottom">
                        <rect x="0" y="0" width="450" height="180"></rect>
                    </clipPath>
                    <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="50%">
                        <stop offset="10%" stop-color="#fff2"></stop>
                        <stop offset="99%" stop-color="#fff2"></stop>
                        <stop offset="100%" stop-color="#A89260"></stop>
                    </linearGradient>
                    <linearGradient id="linearText" x1="0%" y1="0%" x2="50%" y2="50%">
                        <stop offset="10%" stop-color="#A89260"></stop>
                        <stop offset="70%" stop-color="#E7D3A5"></stop>
                    </linearGradient>
                    <path id="path1" d="M-80,210 A1,1 0 0,1 500,210"></path>
                </defs>
                <g transform="scale(2.2) translate(3.1 0) " fill="#E7D3A5" font-size="8" font-weight="bold">
                    <text>
                        <tspan x="-4" y="68" font-size="7">
                            10<tspan font-size="7">%</tspan>
                        </tspan>
                    </text>
                    <text>
                        <tspan x="8" y="46" font-size="7">
                            20<tspan font-size="7">%</tspan>
                        </tspan>
                    </text>
                    <text>
                        <tspan x="26" y="28" font-size="7">
                            30<tspan font-size="7">%</tspan>
                        </tspan>
                    </text>
                    <text>
                        <tspan x="52" y="14" font-size="7">
                            40<tspan font-size="7">%</tspan>
                        </tspan>
                    </text>
                    <text>
                        <tspan x="84" y="9" font-size="7">
                            50<tspan font-size="7">%</tspan>
                        </tspan>
                    </text>
                    <text>
                        <tspan x="116" y="14" font-size="7">
                            60<tspan font-size="7">%</tspan>
                        </tspan>
                    </text>
                    <text>
                        <tspan x="143" y="28" font-size="7">
                            70<tspan font-size="7">%</tspan>
                        </tspan>
                    </text>
                    <text>
                        <tspan x="162" y="46" font-size="7">
                            80<tspan font-size="7">%</tspan>
                        </tspan>
                    </text>
                    <text>
                        <tspan x="173" y="68" font-size="7">
                            90<tspan font-size="7">%</tspan>
                        </tspan>
                    </text>
                </g>
                <g clip-path="url(#cut-off-bottom)">
                    <g :transform="rotateNum">
                        <circle cx="210" cy="210" r="180" stroke="url(#linear)" stroke-width="10" fill="none" transform="rotate(0,210 210)"></circle>
                        <circle cx="30" cy="210" r="7" fill="#E7D3A5"></circle>
                        <circle fill="#E7D3A5" opacity="0.3" cx="30" cy="210" r="12"></circle>
                    </g>
                </g>
            </svg>

            <div class="vip_infor fix" v-show="showVipLevel">
                <div class="vip_head fix">
                    <div></div>
                </div>
                <p style="margin-top:-10px">{{ userLevel }}</p>
                <p>{{ userName }}</p>
                <div class="vip_txt">
                    <span>{{ vipLevel }}</span>
                    <span>{{ nextLevel }}</span>
                </div>
            </div>

            <div class="vip_card">
                <slider ref="slider" :sliderinit="options" @slide='slide' @init='onInit'>
                    <slideritem v-for="(item,index) in q" style="width: 100%;margin-right: 10px;" :class="{ active: item.is_my_vip == 1}">
                        <span class="current" v-if="item.is_my_vip == 0">
                            <img src="../../common/img/vip/unlock.png" />
                        </span>
                        <span class="current" v-if="item.is_my_vip == 1">
                            <img src="../../common/img/vip/current.png" />
                        </span>
                        <span class="current" v-if="item.is_my_vip == 2">
                            <img src="../../common/img/vip/complete.png" />
                        </span>
                        <div v-if="index != 10">
                            <div class="txt">
                                <h3>{{ item.vip_level }}</h3>
                                <p>您需要<span> {{ item.member_vip.upgrade_dpt }} </span>和</p>
                                <p><span> {{ item.member_vip.upgrade_beat }} </span>升级至{{ q[index+1].vip_level }}</p>
                            </div>
                            <div class="tips">
                                <span>提示：截止{{ dateEnd }}（每日16点更新）</span>
                                <span>您已完成<i> {{ item.member_vip.completed_dpt }} </i>和<i> {{ item.member_vip.completed_beat }} </i></span>
                            </div>
                        </div>
                        <div v-else>
                            <div class="txt">
                                <h3>{{ item.vip_level }}</h3>
                                <p>您已到达最高等级</p>
                                <p style="height: 15px;"></p>
                            </div>
                            <div class="tips">
                                <span>提示：截止{{ dateEnd }}</span>
                                <span>您已完成</span>
                            </div>
                        </div>
                        <div class="sxj"></div>
                    </slideritem>
                </slider>
            </div>
        </div>

        <div class="vip_level_bot" v-show="showVipLevel" v-for="(item, index) in q" :id="'vip_level_' + index" :class="{ is_my_vip: vipLevel == '' ? index == 1 : item.is_my_vip == 1}">
            <!-- 特权 -->
            <div class="vip_main fix">
                <h4>
                    <img src="../../common/img/recommend_line.png">{{ privilegeText }}
                    <md-button class="button" v-show="item.is_my_vip == 1" @click.native="applyVipClick">申请VIP福利</md-button>
                </h4>
                <div class="privilege_list fix">
                    <ul>
                        <li>
                            <div class="fLeft">
                                <i class="icon-cishu"></i>
                                <p>
                                    <span>{{ item.vip_info.wtd_count }}</span>
                                    <span>name1</span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="fRight">
                                <i class="icon-cishu"></i>
                                <p>
                                    <span>{{ item.vip_info.wtd_money }}</span>
                                    <span>name2</span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="fLeft">
                                <i class="icon-cishu"></i>
                                <p>
                                    <span>{{ item.vip_info.upgrade_gift }}</span>
                                    <span>name3</span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="fRight">
                                <i class="icon-cishu"></i>
                                <p>
                                    <span>{{ item.vip_info.birth_gift }}</span>
                                    <span>name4</span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="fLeft">
                                <i class="icon-cishu"></i>
                                <p>
                                    <span>name5</span>
                                    <span>小name: <em>{{ item.vip_info.every_month_gift }}</em></span>
                                    <span>小name: <em>{{ item.vip_info.every_month_gift }}</em></span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="fRight">
                                <i class="icon-cishu"></i>
                                <p>
                                    <span>name6</span>
                                    <span>小name: <em>{{ item.vip_info.dpt_count }}</em></span>
                                    <span>小name: <em>{{ item.vip_info.dpt_rate }}</em></span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- VIP详情 -->
            <div class="vip_main fix" style="padding-bottom: 28px;margin-bottom: 0">
                <h4><img src="../../common/img/recommend_line.png">{{ detailText }}</h4>
                <div class="vip_detail_list">
                    <ul>
                        <li v-for="(v, index) in item.vip_detail">
                            <span v-if="v.value != null">{{ v.value }}</span>
                            <span v-else>0</span>
                            <p>{{ v.name }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { slider, slideritem } from 'vue-concise-slider' //轮播图插件
    export default {
        props:{
            // 获取初始化接口的数据
            vipLevelData: {
                type:Array,
                default: function() {
                    return [];
                }
            },
        },
        data() {
            return {
                showVipLevel: false,
                // 用户名字
                userName: '0',
                rotateNum: 'rotate(0,210 210)',
                showKing: false,
                userLevel: "",
                vipLevel: '',
                nextLevel: '',
                // 轮播图
                initPage: 0,
                options: {
                    currentPage: 0,
                },
                privilegeText: '我享有的特权',
                detailText: '我的VIP详情',
                // 截止时间
                dateEnd: "",
                // 获取初始化接口的数据
                q:[],
            }
        },
        methods: {
            // 滑动事件
            slide (data) {
                if(data.currentPage == this.initPage){
                    this.privilegeText = '我享有的特权';
                    this.detailText = '我的VIP详情'
                }else{
                    this.privilegeText = '享有的特权';
                    this.detailText = 'VIP详情'
                }

                $(".vip_level_bot").hide()
                var idName = "#vip_level_" + data.currentPage
                $(idName).show()
            },
            // 初始化
            onInit (data) {
                var _this = this;
                if(this.vipLevelData.length == 0){
                    var set = setInterval(() => {
                        if(this.vipLevelData.length > 0){
                            data.currentPage = _this.initPage;
                            if(!this.$cookies.get("app")){
                                var sliderWidth = $(".vip_card .slider-item")[0].clientWidth;
                            }
                            var num = data.currentPage * (sliderWidth + 10);
                            var nums = "";
                            if(num == 0){
                                nums = "0px"
                            }else{
                                nums = "-" + num + "px"
                            };
                            $(".vip_card .slider-touch").css("transform", "translate3d(" + nums + ", 0px, 0px)");
                            _this.showVipLevel = true;
                            setTimeout(() => {
                                $(".vip_card").css("opacity","1")
                            }, 80);
                            // 计算进度条
                            $(_this.q).each(function(i,v){
                                if(v.is_my_vip == 1){
                                    // 完成存款/条件存款 + 完成流水/条件流水  各50% 然后加起来
                                    var upgrade_dpt = (v.member_vip.completed_dpt/v.member_vip.upgrade_dpt)*0.5 //计算存款
                                    var completed_beat = (v.member_vip.completed_beat/v.member_vip.upgrade_beat)*0.5 //计算流水
                                    // 存款超过0.5限制0.5
                                    if(upgrade_dpt > 0.5){
                                        upgrade_dpt = 0.5
                                    }
                                    // 流水超过0.5限制0.5
                                    if(completed_beat > 0.5){
                                        completed_beat = 0.5
                                    }
                                    // 存款的比例和流水的比例相加
                                    var perc = upgrade_dpt + completed_beat;
                                    // 计算从180度到360度之间一个
                                    var degree = perc * 100 * 1.75;
                                    _this.rotateNum = 'rotate(' + degree + ',210 210)';
                                    // 用户级别
                                    _this.userLevel = v.vip_level;
                                    // 等级
                                    _this.vipLevel = v.vip_level;
                                    _this.nextLevel = _this.q[i + 1].vip_level;
                                    // 显示当前
                                    data.currentPage = i;
                                    _this.initPage = i;
                                    // 6级以上显示皇图片
                                    if(i >= 5){
                                        _this.showKing = true
                                    }else{
                                        _this.showKing =false
                                    }
                                }
                            });
                            if(_this.userLevel == ''){
                                _this.userLevel = JSON.parse(localStorage.getItem('user')).level
                            }
                            if($(".vip_card .slider-item")[0].clientWidth > 0){
                                clearInterval(set)
                            };
                        }
                    }, 500); 
                }else{
                    this.q = this.vipLevelData;
                    this.showVipLevel = true;
                    $(_this.q).each(function(i,v){
                        if(v.is_my_vip == 1){
                            // 完成存款/条件存款 + 完成流水/条件流水  各50% 然后加起来
                            var upgrade_dpt = (v.member_vip.completed_dpt/v.member_vip.upgrade_dpt)*0.5 //计算存款
                            var completed_beat = (v.member_vip.completed_beat/v.member_vip.upgrade_beat)*0.5 //计算流水
                            // 存款超过0.5限制0.5
                            if(upgrade_dpt > 0.5){
                                upgrade_dpt = 0.5
                            }
                            // 流水超过0.5限制0.5
                            if(completed_beat > 0.5){
                                completed_beat = 0.5
                            }
                            // 存款的比例和流水的比例相加
                            var perc = upgrade_dpt + completed_beat;
                            // 计算从180度到360度之间一个
                            var degree = perc * 100 * 1.75 + 180;
                            _this.rotateNum = 'rotate(' + degree + ',210 210)';
                            // 用户级别
                            _this.userLevel = v.vip_level;
                            // 等级
                            _this.vipLevel = v.vip_level;
                            _this.nextLevel = _this.q[i + 1].vip_level;
                            // 显示当前
                            data.currentPage = i;
                            _this.initPage = i;
                            // 6级以上显示皇图片
                            if(i >= 5){
                                _this.showKing = true
                            }else{
                                _this.showKing =false
                            }
                        }
                    });
                    if(_this.userLevel == ''){
                        _this.userLevel = JSON.parse(localStorage.getItem('user')).level
                    }
                    $(".vip_card").css("opacity","1")
                }
            },
            // 申请VIP福利
            applyVipClick: function () {
                this.$parent.num = 1;
                this.$parent.scroll = 1;
            }
        },
        mounted() {
            var bgHeight = $(".vip_level_top").outerHeight();
            var topHeight = $(".vip_infor").innerHeight() + 9.6 + 6.4 - 2;
            var botHeight = bgHeight - topHeight;
            $(".vip_card").css("height", botHeight + 'px');

            if(!this.$cookies.get("app")){
                var user = JSON.parse(localStorage.getItem('user'))
                this.userName = user.name;
            }

            // 截止时间
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            if(month < 10){
                month = "0" + month
            };
            var date = myDate.getDate();
            if(date < 10){
                date = "0" + date
            };
            this.dateEnd = year + "-" + month + "-" + date
        },
        components: {
            slider,
            slideritem
        }
    }
</script>

<style>
    .vip_card .slider-touch{
        width: 84%;
        height: 100%;
        margin: 0 auto;
    }
    .vip_card .slider-pagination-bullets{
        display: none;
    }
</style>
