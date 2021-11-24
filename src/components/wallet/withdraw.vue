<template>
    <div class="withdraw">
        <div class="withdraw_main fix" v-show="showContent">
            <div class="user_money fix">
                主账户&nbsp;
                <span class="primary">{{ i.money }}</span>
            </div>

            <div class="withdraw_bank">
                <div class="top">列表</div>

                <div class="mid">
                    <ul>
                        <li v-for="v in q" @click="chooseBank(v,v.id)">
							{{ v.name }}
                            <span> *** {{ v.mun }}</span>
                            <i class="icon ion-close-round" v-if="v.is_selected == 0" @click.stop="delBtn(v.id,v.card,v.code)"></i>
                            <img class="bank_sele" src="../../common/img/icon-selection.png" v-if="v.is_selected == 1" />
                        </li>
                    </ul>
                </div>
            </div>

            <div class="withdraw_detailed fix">
                <ul>
                    <li>
                        <span class="fLeft">内容1</span>
                        <span class="fRight red">{{ u.fee1 }}</span>
                    </li>
                    <li>
                        <span class="fLeft">内容2</span>
                        <span class="fRight red">{{ u.fee2 }}</span>
                    </li>
                    <li>
                        <span class="fLeft">内容3</span>
                        <span class="fRight green" :class="{ finalRed : finalOn }">{{ finalMoney }}</span>
                        <p v-show="showZztkTs">请重新输入</p>
                    </li>
                </ul>
            </div>

            <div class="withdraw_money">
                <div class="tsAmount" v-show="showTsMinAmount">最低{{ u.unionPayCardMinMoney }}</div>
                <div class="tsAmount" v-show="showTsMaxAmount">最高{{ u.unionPayCardMaxMoney }}</div>

				<input type="number" autocomplete="off" :data-min="u.unionPayCardMinMoney" :data-max="u.unionPayCardMaxMoney" :maxlength="u.unionPayCardMaxMoney.length" :placeholder="'最低' + u.unionPayCardMinMoney" v-model="t.money" @keyup="tkje">
            </div>

            <div class="withdraw_bot">
				<div class="ts">
                    <p v-show="showTkje">
                        <img src="../../common/img/icon-ts.png">
                        输入数字不能大于余额。
                    </p>
                </div>

                <div class="withdraw_btn">
                    <md-button class="button" :disabled="rgtkDis" @click.native="rgtkBtn">提交1</md-button>
                    <md-button class="button" :disabled="zdtkDis" @click.native="zdtkBtn">提交2</md-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //返回有数据展示页面
                showContent: false,
				//选择列表
				showDown:true,
				showUp: false,
		        d:{
		        	card:"",
		        	bankImg:""
		        },
		        q:"",
		        //输入限制提示
		        showTsMinAmount: false,
		        showTsMaxAmount: false,
		        //
		        u:{
		        	IsVoicePass:null,
		        	unionPayCardMaxMoney:"",
		        	unionPayCardMinMoney:"",
		        },
		        //输入
		        t:{
		        	money:"",
		        },
		      	//
	      		showTkje: false,
	      		fee1:"",
	      		fee2:"",
	      		finalMoney:"0",
	      		showZztkTs: false,
	      		finalOn: false,
	      		//主账户
	      		i:{},
	      		//提交按钮的disabled
	      		zdtkDis: true,
	      		rgtkDis: true,
	      		//定时器
	      		setTimeoutC:"",
	      		//提交按钮的方式
	      		WtdType: "",
            }
        },
        methods: {
            //初始化
			withData: function () {
				var _this = this;
				$loading.show();
				_this.showContent = false;
				this.$http.get(_this.withdrawInit_api,{

				}).then(function(data){
					$loading.hide();
					//获取列表
					var bankApi = data.data.message.list;
					_this.q = bankApi;
					var bankIdArr = [];
					$(bankApi).each(function(i,v){
						if(v.is_selected == 1){
							_this.d = bankApi[i];
						};
						bankIdArr.push(v.id)
					});
					
					_this.u = data.data.message;
					_this.fee1 = data.data.message.fee1;
					_this.fee2 = data.data.message.fee2;
					//判断是否0，否的话加"-"
					if(data.data.message.fee1 == 0){
						_this.u.fee1 = data.data.message.fee1
					}else{
						_this.u.fee1 = "-" + data.data.message.fee1
					};
					if(data.data.message.fee2 == 0){
						_this.u.fee2 = data.data.message.fee2
					}else{
						_this.u.fee2 = "-" + data.data.message.fee2
					};
					
					_this.showContent = true;
				}).catch(function(data){
					$loading.hide();
				});
				
				var userMoney = localStorage.getItem("userMoney")
				_this.i.money = parseFloat(userMoney)
			},
			//输入keyup事件
			tkje: function () {
				var _this = this;
				//计算
				if(_this.t.money == ""){
					_this.finalMoney = 0
				}else{
					_this.finalMoney = _this.t.money - _this.fee1 - _this.fee2;
				}
				
				var moneyInput = _this.t.money;
				_this.t.money.replace(/[^\d]/g,'')
				//最低条件
				if(moneyInput != ""){
					if(moneyInput < parseInt(_this.u.unionPayCardMinMoney)){
						_this.showTsMinAmount = true;
						_this.zdtkDis = true;
						_this.rgtkDis = true;
					}else{
						_this.showTsMinAmount = false
						_this.zdtkDis = false;
						_this.rgtkDis = false;
					};
				}else{
					_this.showTsMinAmount = false;
					_this.zdtkDis = true;
					_this.rgtkDis = true;
				}
				//最高条件
				if(moneyInput > parseInt(_this.u.unionPayCardMaxMoney)){
					_this.showTsMaxAmount = true;
					_this.zdtkDis = true;
					_this.rgtkDis = true;
				}else{
					_this.showTsMaxAmount = false;
					_this.zdtkDis = false;
					_this.rgtkDis = false;
				};
				//
				if(_this.fee1 != 0 || _this.fee2 != 0){
					//
					if(_this.t.money > _this.i.money || _this.finalMoney <= 0 || moneyInput < parseInt(_this.u.unionPayCardMinMoney)){
						_this.zdtkDis = true;
						_this.rgtkDis = true;
					}else{
						_this.zdtkDis = false;
						_this.rgtkDis = false;
					};
					if(_this.t.money > _this.i.money){
						_this.showTkje = true;
						_this.finalMoney = 0
					}else{
						_this.showTkje = false;
					};
				};
				//最终少于0提示
				if(_this.finalMoney < 0){
					_this.finalOn = true;
					_this.showZztkTs = true;
				}else{
					_this.finalOn = false;
					_this.showZztkTs = false;
				};
				
				//内容1和内容2各为0
				if(_this.fee1 == 0 && _this.fee2 == 0){
					if(_this.t.money > _this.i.money){
						_this.showTkje = true;
						_this.finalMoney = 0
					}else{
						_this.showTkje = false;
					};

					var moneyInput = _this.t.money;
					_this.t.money.replace(/[^\d]/g,'');
					if(moneyInput != ""){
						if(moneyInput < parseInt(_this.u.unionPayCardMinMoney) || _this.t.money > _this.i.money){
							_this.zdtkDis = true;
							_this.rgtkDis = true;
						}else{
							_this.zdtkDis = false;
							_this.rgtkDis = false;
						};
					}else{
						_this.showTsMinAmount = false
					}
					if(moneyInput > parseInt(_this.u.unionPayCardMaxMoney)){
						_this.showTsMaxAmount = true;
					}else{
						_this.showTsMaxAmount = false
					};
				}
			},
			//删除按钮
			delBtn: function(id){
				var _this = this;
				$dialog.confirm({
                    content: "是否确定要删除？",
                    okTheme: 'positive',
                    cancelText: '取消',
                }).then((res) => {
                    if(res == true){
						_this.q = _this.q.filter(item => item.id !== id);
						$dialog.alert({
							content: '删除成功',
							okTheme: 'positive',
						})
                    }
                })
			},
	    	//提交1按钮
	    	rgtkBtn: function () {
	    		var _this = this;
	    		$dialog.confirm({
					content: "内容",
					okTheme: 'positive',
					cancelText: '取消',
				}).then((res) => {
					if(res == true){
						clearTimeout(_this.setTimeoutC);
						_this.withdrawApi("1")
					}
				})
	    	},
	    	//提交2按钮
	    	zdtkBtn: function () {
	    		var _this = this;
	    		$dialog.confirm({
					title: '提示',
					content: "内容",
					okTheme: 'positive',
					cancelText: '取消',
				}).then((res) => {
					if(res == true){
						$dialog.confirm({
							title: '再次确认提示',
							content: "内容",
							okTheme: 'positive',
							cancelText: '取消',
						}).then((res) => {
							if(res == true){
								clearTimeout(_this.setTimeoutC);
								_this.withdrawApi("2")
							}
						})
					}
				})
	    	},
	    	//提交接口
	    	withdrawApi: function (index) {
	    		var _this = this;
	    		$dialog.alert({
					content: "提交" + index + "成功",
					okTheme: 'positive',
				}).then(() => {
					window.clearInterval(_this.setTime);
					window.clearInterval(_this.setTimeTwo);		
					setTimeout(function(){
						_this.$router.forward('/tradeRec')
					},200);
				});
	    	},
	    	//选中列表
	    	chooseBank: function (v,id) {
				if(v.is_selected != 1){
					for(var i = 0; i < this.q.length; i++){
						this.q[i].is_selected = 0
						if(this.q[i].id == id){
							this.q[i].is_selected = 1
						}
					}
	    		}
	    	},
        },
        mounted() {
            this.withData()
        },
        beforeDestroy() {
        	$loading.hide();
        	window.clearInterval(this.loadTime);
        	window.clearInterval(this.setTime);
        	window.clearInterval(this.setTimeTwo);
        	this.setTime = null;
        	this.setTimeTwo = null;
        	this.showContent = false
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/withdraw.css';
</style>