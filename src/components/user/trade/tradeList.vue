<template>
	<div>
		<!-- 无记录 -->
		<div class="no_trad_record" v-if="showNoRecord">
			无记录
		</div>

		<!--列表-->
		<div class="trad_center" v-if="!showNoRecord">
			<ul class="fix">
				<li v-for="v in q" class="fix" @click="gotradeDetail(v)">
					<img src="../../../common/img/icon-bonus-tran.png" />
					<div class="trad_text_left">
						<h5>{{ v.type }}</h5>
						<span>{{ v.created_at }}</span>
					</div>
					<div class="trad_text_right">
						<div class="trad_status trad_status_0" v-if="v.status == 0">处理中</div>
						<div class="trad_status trad_status_1" v-if="v.status == 1">成功</div>
						<div class="trad_status trad_status_2" v-if="v.status == 2">失败</div>
						<div class="trad_status trad_status_3" v-if="v.status == 3">已撤销</div>
						<i class="icon ion-ios-arrow-right"></i>
						<span>{{ v.apply_amount }}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				// 是否有记录
				showNoRecord: true,
	            //获取初始化数据
		        q:{
	            	type:"",
	            	created_at:"",
					apply_amount:"",
					id:""
	           },
				// 默认全部
			   TransferType: 0
			}
		},
		mounted() {
			this.tradeRecData();

			if(window.tradePage){
				this.pageInit()
			}
		},
		methods:{
			//初始化
			tradeRecData: function (data) {
				var _this = this;
	    		$loading.show();
				if(window.tradeNum){
					if(window.tradeNum == 0){
						var time = 3;
					};
					if(window.tradeNum == 1){
						var time = 4;
					};
					if(window.tradeNum == 2){
						var time = 1;
					};
					if(window.tradeNum == 3){
						var time = 2;
					}
				}else{
					var time = _this.$parent.time
				}
				if(window.tradePage){
					this.page = window.tradePage
				}
				this.$http.post(_this.tradeRec_api,{
					TransferType: _this.TransferType,
					Page: _this.page,
					time: time,
				}).then(function(data){
					$loading.hide();
					if(data.data.message.list.length > 0){
						_this.showNoRecord = false
					}else{
						_this.showNoRecord = true
					}
					_this.q = data.data.message.list;
					_this.pagesize = data.data.message.pagesize;
					_this.total = data.data.message.total;
					_this.showPage = true;
				}).catch(function(data){
					$loading.hide();
		
				})
			},
			// 跳转详情
			gotradeDetail: function (v) {
				var obj = JSON.stringify(v)
				this.$cookies.set("tradeDetail",obj);
				// window.tradeDetail = v;
				window.tradePrePageDown = this.prePageDown;
                window.tradePrePageUp = this.prePageUp;
                window.tradeNextPageDown = this.nextPageDown;
                window.tradeNextPageUp = this.nextPageUp;
				this.$router.forward('/tradeDetail');
			},
		},
	}
</script>

<style>
</style>
