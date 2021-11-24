<template>
    <div id='vip_detail' class="page has-navbar">
        <von-header>
			<button class="button button-icon ion-ios-arrow-left" slot="left" @click="back"></button>
	        <span slot="title" v-for="(item, index) in titleTabs" :class="{ active: index == num }" @click="tabClick(index)">
	        	{{ item }}
	        </span>
        </von-header>

        <div class='page-content' style="padding-top:44px;position: fixed;bottom: 0;">
            <vipLevel v-if="num == 0" ref="myVipLevel" :vipLevelData="uservipinfoData"></vipLevel>

            <vipDetail v-if="num == 1" :vipDetailDatas="uservipinfoData"></vipDetail>
        </div>
    </div>
</template>

<script>
    import vipLevel from './vipLevel.vue'
    import vipDetail from './vipDetail.vue'
    export default {
        data() {
            return {
                titleTabs:['VIP等级','VIP详情'],
                num: 0,
                uservipinfoData: [],
                scroll: 0
            }
        },
        methods: {
            // 标题tab
            tabClick: function (index) {
                this.num = index;
                this.scroll = 0
                // this.$refs.myVipLevel.options.currentPage = 1
            },
            // vip详情初始化
            uservipinfoInit: function () {
                var _this = this;
                $loading.show();
                this.$http.get(_this.uservipinfo_api,{

                }).then(function(data){
                    $loading.hide();
                    // _this.$refs.myVipLevel.showVipLevel = true;
                    if(window.num != 1 || !window.num){
                        if(!_this.$cookies.get("app") && window.location.hash.indexOf("vipDetail=1") == -1){
                            _this.$refs.myVipLevel.q = data.data.message; //给VIP等级子组件传值
                        }
                    }
                    _this.uservipinfoData = data.data.message;
                    $(data.data.message).each(function(i,v){
                        if(v.is_my_vip == 1){
                            // 完成存款/条件存款 + 完成流水/条件流水  各50% 然后加起来
                            var perc = [(v.member_vip.completed_dpt/v.member_vip.upgrade_dpt)*0.5] + [(v.member_vip.completed_beat/v.member_vip.upgrade_beat)*0.5];
                            // 计算从180度到360度之间一个
                            var degree = perc * 1.6 + 180;
                            _this.$refs.myVipLevel.rotateNum = 'rotate(' + degree + ',210 210)';
                            // 等级
                            _this.$refs.myVipLevel.vipLevel = v.vip_level;
                            _this.$refs.myVipLevel.nextLevel = data.data.message[i + 1].vip_level;
                            _this.$refs.myVipLevel.initPage = i
                        }
                    })
                }).catch(function(data){
                    $loading.hide();    
                })
            },
            // 返回
            back: function () {
                window.num = null
                this.onBackClick();
            }
        },
        mounted() {
            this.uservipinfoInit();
            //原生APP隐藏网页的footer和返回icon
        	if(this.$cookies.get("app")){
				$("#vip_detail .bar.bar-header").css("display","none");
				$('#vip_detail .page-content').css("padding-top","0");
            }

            if(this.$router.history.current.query.vipDetail){
                this.num = parseInt(this.$router.history.current.query.vipDetail);
            }else{
                if(window.num){
                    this.num = window.num;
                }
            }
        },
        components:{
            vipLevel,
            vipDetail,
        },
        beforeDestroy() {
        	$loading.hide();
        }
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/vipStyle.css';
</style>
