<template>
    <div class="vip_detail" v-if="showVipDetail">
        <div id="banner" class="banner">
        </div>

        <!-- vip等级tab -->
        <div class="vip_level_list fix">
            <ul>
                <li v-for="(item, index) in vipDetailData.slice(1,11)" @click="vipLevelClick(index)">
                    <div class="img" :class="{ active: index == vipLevelNum }"></div>
                    <span>{{ item.vip_level }}</span>
                </li>
            </ul>
        </div>

        <!-- vip等级 -->
        <div id="vipbot" class="vip_detail_bot fix">
            <div class="vip_level_bg" :class='"vip-" + (vipLevelNum + 1)'>
                <span class="current" v-if="vipDetailData[vipLevelNum + 1].is_my_vip == 0">
                    <img src="../../common/img/vip/unlock.png" />
                </span>
                <span class="current" v-if="vipDetailData[vipLevelNum + 1].is_my_vip == 1">
                    <img src="../../common/img/vip/current.png" />
                </span>
                <span class="current" v-if="vipDetailData[vipLevelNum + 1].is_my_vip == 2">
                    <img src="../../common/img/vip/complete.png" />
                </span>

                <div class="txt">
                    <h3>{{ vipDetailData[vipLevelNum + 1].vip_level }}</h3>
                    <p class="fix">
                        <span class="left">name1</span>
                        <span class="right">{{ vipDetailData[vipLevelNum].member_vip.upgrade_dpt }}</span>
                    </p>
                    <p class="fix">
                        <span class="left">name2</span>
                        <span class="right">{{ vipDetailData[vipLevelNum].member_vip.upgrade_beat }}</span>
                    </p>
                    <p class="fix">
                        <span class="left">name3</span>
                        <span class="right">{{ vipDetailData[vipLevelNum].member_vip.save_beat }}</span>
                    </p>
                </div>
            </div>

            <div class="vip_bonus fix">
                <div class="left">
                    <p>name：<span>{{ vipDetailData[vipLevelNum + 1].vip_info.upgrade_gift }}</span></p>
                    <i>(word)</i>
                </div>
                <div class="right">
                    <p>name：<span>{{ vipDetailData[vipLevelNum + 1].vip_info.every_month_gift }}</span></p>
                    <p>name：<span>{{ vipDetailData[vipLevelNum + 1].vip_info.every_month_gift }}</span></p>
                    <i>(word)</i>
                </div>
            </div>

            <div class="vip_birthday fix" v-if="vipDetailData[vipLevelNum + 1].vip_info.birth_gift > 0">
                <p class="fix">title：<span>{{ vipDetailData[vipLevelNum + 1].vip_info.birth_gift }}</span></p>
                <i class="fix">（word）</i>
                <button @click="vipActapplyClick(vipDetailData[vipLevelNum + 1].is_my_vip,'type1')">立即领取</button>
            </div>

            <div class="vip_discount fix">
                <div class="left">
                    <p>{{ vipDetailData[vipLevelNum + 1].vip_level }}晋级优惠</p>
                    <i>(优惠说明)</i>
                </div>
                <div class="right">
                    <p v-for="v in vipDetailData[vipLevelNum + 1].vip_detail.slice(0,6)" v-if="v.value != '0%'">
                        {{ v.name }}：<span>{{ v.value }}</span>
                    </p>
                </div>
            </div>

            <div class="vip_beat fix">
                <p>title</p>
                <button @click="vipActapplyClick(vipDetailData[vipLevelNum + 1].is_my_vip,'type2')">立即领取</button>
            </div>

            <div class="receive_bonus fix">
                <ul>
                    <li>
                        name1：<span>{{ vipDetailData[vipLevelNum + 1].member_vip.bonus_apply_amount }}</span>
                    </li>
                    <li>
                        name2：<span>{{ vipDetailData[vipLevelNum + 1].member_vip.bonus_got_amount }}</span>
                    </li>
                    <li>
                        name3：<span>{{ vipDetailData[vipLevelNum + 1].member_vip.bonus_limit_amount }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- vip表格 -->
        <div class="vip_tabel fix">
            <div class="vip_tabel_tab fix">
                <ul>
                    <li v-for="(item, index) in vipTabelTabs" :class="{ active: index == vipTabelnum }" @click='vipTabelTabClick(item,index)'>
                        <span>{{ item }}</span>
                    </li>
                </ul>
            </div>
        
            <div class="vip_tabel_top">
                <img src="../../common/img/vip/xiangqing.png" width="20" />
                <span>{{ vipTabelText }}</span>
            </div>
            <div class="vip_tabel_box1" v-if="vipTabelnum == 0">
                <table>
                    <thead>
                        <tr>
                            <th>等级</th>
                            <th v-for="v in vipDetailData[0].vip_detail.slice(6,14)" v-if="v.name != '豪礼赠送'">{{ v.name }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in vipDetailData">
                            <td>{{ item.vip_level }}</td>
                            <td v-for="v in item.vip_detail.slice(6,14)" v-if="v.name != '豪礼赠送'">
                                <span v-if="v.value != null">{{ v.value }}</span>
                                <span v-else>0</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="vip_tabel_box2" v-if="vipTabelnum == 1">
                <table>
                    <thead>
                        <tr>
                            <th>VIP等级</th>
                            <th>表头1</th>
                            <th>表头2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in vipDetailData">
                            <td>{{ item.vip_level }}</td>
                            <td>{{ item.vip_info.wtd_count }}</td>
                            <td>{{ item.vip_info.wtd_money }}.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- 规则 -->
        <div class="vip_rule fix">
            <div class="vip_rule_top fix">
                <h4>活动的一般条款与规则</h4>
            </div>

            <div class="vip_rule_inner">
                <div>
                    <h5>
                        <span>1</span>
                        标题
                    </h5>
                    <p>内容内容内容内容内容内容</p>
                </div>
                <div>
                    <h5>
                        <span>2</span>
                        标题
                    </h5>
                    <p>内容内容内容内容内容内容</p>
                </div>
            </div>
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
</template>

<script>
    export default {
        props:{
            // 获取初始化接口的数据
            vipDetailDatas: {
                type:Array,
                default: function() {
                    return [];
                }
            },
        },
        data() {
            return {
                showVipDetail: false,
                // vip等级tab
                vipLevelNum: 0,
                // vip表格tab
                vipTabelTabs: ['tab1', 'tab2'],
                vipTabelnum: 0,
                vipTabelText:'tab1',
                // 初始化
                vipDetailData:[],
            }
        },
        methods: {
            // vip等级tab
            vipLevelClick: function (index) {
                this.vipLevelNum = index;
            },
            // vip表格tab
            vipTabelTabClick: function (item, index) {
                this.vipTabelText = item
                this.vipTabelnum = index
            },
            // 判断领取方式
            vipActapplyClick: function (index,item) {
                if(index == 1){
                    $dialog.alert({
                        content: "领取成功",
                        okTheme: 'positive',
                    })
                }else{
                    $dialog.alert({
                        content: "VIP等级不符",
                        okTheme: 'positive',
                    })
                }
            },
            // 返回顶部
            backTop: function () {
                document.getElementsByClassName("page-content")[0].scrollTop = 0;
            },
        },
        mounted() {
            var _this = this;
            var set = setInterval(function(){
                if(_this.vipDetailDatas.length > 0){
                    _this.vipDetailData = _this.vipDetailDatas;
                    _this.showVipDetail = true;

                    // 显示当前VIP等级
                    $(_this.vipDetailDatas).each(function(i,v){
                        if(v.is_my_vip == 1){
                            if(i == 0){
                                _this.vipLevelNum = 0
                            }else{
                                _this.vipLevelNum = i - 1
                            }
                        }
                    })

                    clearInterval(set);
                }
            },100);

            if(window.location.hash.indexOf('scroll=1') != -1){
                var set1 = setInterval(function(){
                    if(document.getElementById('vipbot')){
                        document.querySelector('.page-content').scrollTop = document.getElementById('vipbot').offsetTop
                        clearInterval(set1);
                    }
                },100);
            }

            if(this.$parent.scroll == 1){
                var set1 = setInterval(function(){
                    if(document.getElementById('vipbot')){
                        document.querySelector('.page-content').scrollTop = document.getElementById('vipbot').offsetTop - 44
                        clearInterval(set1);
                    }
                },100);
            }else{
                document.querySelector('.page-content').scrollTop = 0
            }
        },
        watch: {
            $route(to ,from){
                if(to.query.scroll == 1){
                    if(document.getElementById('vipbot')){
                        document.querySelector('.page-content').scrollTop = document.getElementById('vipbot').offsetTop
                    }
                }else{
                    document.querySelector('.page-content').scrollTop = 0
                }
            }
        },
    }
</script>

<style>
</style>
