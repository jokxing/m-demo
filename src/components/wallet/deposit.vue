<template>
    <div class="deposit fix">
        <!--主体-->
        <div class="deposit_main"  v-if="is_dpting == 0" v-show="showMain">
            <h5>小额度</h5>
            <div class="recharge_money fix">
                <ul>
                    <li v-for="(item, index) in smallMoney" :key="index" :class="{active:item.b}" @click="smallMoneyClick(item)">{{ item.num }}</li>
                </ul>
            </div>
            <div v-show="bigMoney.length > 0">
                <h5>大额度</h5>
                <div class="recharge_money fix">
                    <ul>
                        <li v-for="(item, index) in bigMoney" :key="index" :class="{active:item.b}" @click="bigMoneyClick(item)">{{ item.num }}</li>
                    </ul>
                </div>
            </div>

            <div class="recharge_input">
				<span>￥</span>
				<input type="number" placeholder="输入其他" v-model="p.payMoney" @keyup="keyMoneyRange">

                <md-button class="button" @click.native="nextOneClick()">下一步</md-button>
            </div>

            <div class="course">
                <p>如有其它疑问，请前往<span @click="$router.forward('/depositCourse')">教程</span></p>
            </div>
        </div>

        <!--选择方式-->
		<div class="depositTyep_bg" v-if="showDepositTyep" @click="showDepositTyep = false"></div>
		<transition name="depositTyep-fade">
			<div class="depositTyep" v-if="showDepositTyep">
				<div class="head">
					<i class="icon ion-chevron-left" @click="showDepositTyep = false"></i>
					请选择方式
				</div>
				<div class="main">
					<ul class="depositTyepList">
						<li v-for="(item, index) in payList" v-if="item.status == 1 || item.status == 3" :class="{active:activeType == item.pname}" @click="depositTyepClick(item,index)">
							<div class="payList_img">
								图标
								<!-- <img :src="item.img" /> -->
							</div>
							<p>{{ item.pname }}</p>
						</li>
					</ul>
				</div>
				<div class="depositTyep_btn">
					<md-button type="button" class="button" :disabled="nextTwoDis" @click.native="nextTwoClick()">提交</md-button>
				</div>
			</div>
		</transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 判断初始化是否提交
				is_dpting: 0,
            	//初始化返回之前隐藏页面
            	showMain: false,
		      	//禁止按钮
		      	nextTwoDis: false,
		      	submisDis: false,
		      	//输入的值
				p:{
					payMoney:""
				},
				//选择数字
				smallMoney: [],
				bigMoney: [],
				//选择方式
				showDepositTyep: false,
				
				//选中的存款方式
				payType: {},
				
				//最小值和最大值
				moneyMin: 0,
				moneyMax: 0,

	      		//选中方式
				activeType: "",
	      		//方式列表
	      		payList:[
					{
						pname:"type1",
						code: "code1",
						min: 0,
						max: 0,
						sort: 1,
						status:0
					},{
						pname:"type2",
						code: "code1",
						min: 0,
						max: 0,
						sort: 1,
						status:0
					},{
						pname:"type3",
						code: "code1",
						min: 0,
						max: 0,
						sort: 1,
						status:0
					},{
						pname:"type4",
						code: "code2",
						min: 0,
						max: 0,
						sort: 1,
						status:0
					},{
						pname:"type5",
						code: "code3",
						min: 0,
						max: 0,
						sort: 1,
						status:0
					}
				],
				bonus_rate: 0,
				bonus_count: 0,
            }
        },
        methods:{
        	//初始化
        	depositData: function () {
        		var _this = this;
        		$loading.show();
        		_this.showMain = false;
				_this.smallMoney = [];
        		
        		_this.$http.post(_this.deposInitV2_api,{
        			
        		}).then(function(data){
        			$loading.hide();
					_this.bonus_rate = data.data.message.bonus_rate;
					_this.bonus_count = data.data.message.bonus_count;
        			var data = data.data.message;
        			
					_this.is_dpting = data.is_dpting
	        		if(data.is_dpting == 1){
						_this.dpt = data.dpt
	        		}else{
	        			_this.showMain = true;
		        		$(data.money).each(function(i,v){
		        			var moneyArr = {num: v,b: false}
		        			_this.smallMoney.push(moneyArr)
		        		})
		        		$(data.nmoney).each(function(i,v){
		        			var moneyArr = {num: v,b: false}
		        			_this.bigMoney.push(moneyArr)
		        		})
		        		
		        		_this.allDepositList(data);
						
		        		var minArr = [];
		        		var maxArr = [];
		        		Object.keys(data.Paylimit).forEach(function(key,value){
		        			minArr.push(data.Paylimit[key].min);
		        			maxArr.push(data.Paylimit[key].max)
						});
						_this.moneyMin = Math.min.apply(null, minArr);
						_this.moneyMax = Math.max.apply(null, maxArr);
	        		}
        			
        		}).catch(function(data){
        			
        		})
        	},
        	//初始化展示列表
        	allDepositList: function (data){
        		var _this = this;
        		var Paylimit = data.Paylimit;
				if(Paylimit.code1){
					var arrWay = Paylimit.code1.way.split(',');
					$(arrWay).each(function(i,v){
						if(v == 1){
							_this.payList[0].sort = 1;
							_this.payList[0].min = Paylimit.code1.min;
							_this.payList[0].max = Paylimit.code1.max;
						}
						if(v == 2){
							_this.payList[1].sort = 1;
							_this.payList[1].min = Paylimit.code1.min;
							_this.payList[1].max = Paylimit.code1.max;
						}
						if(v == 3){
							_this.payList[2].sort = 1;
							_this.payList[2].min = Paylimit.code1.min;
							_this.payList[2].max = Paylimit.code1.max;
						}
					})
				};
				if(Paylimit.code2){
					_this.payList[3].sort = Paylimit.code2.sort;
					_this.payList[3].min = Paylimit.code2.min;
					_this.payList[3].max = Paylimit.code2.max;
				};
				if(Paylimit.code3){
					_this.payList[4].min = Paylimit.code3.min;
					_this.payList[4].max = Paylimit.code3.max;
				};
				_this.payList = _this.insertSort(_this.payList);
        	},
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
			depositTyepClick: function (item,index){
				this.payType = item;
				this.activeType = item.pname;
				this.onlineType = item.pname;

				// type2和type3加随机两位小数
				if(item.pname == 'type2' || item.pname == 'type3'){
					var mathNum = parseFloat(Math.random().toFixed(2))
					if(mathNum == 0){
						this.p.payMoney = parseInt(this.p.payMoney) + (mathNum + 0.1)
					}else{
						this.p.payMoney = parseInt(this.p.payMoney) + mathNum
					}
				}else{
					this.p.payMoney = parseInt(this.p.payMoney)
				}
			},
        	//选择标题1
        	smallMoneyClick: function (item) {
        		for(var i = 0; i < this.smallMoney.length; i++){
        			this.smallMoney[i].b = false;
        		};
        		for(var i = 0; i < this.bigMoney.length; i++){
        			this.bigMoney[i].b = false;
        		};
        		item.b = true;
        		this.p.payMoney = item.num;
        	},
        	//选择标题2
        	bigMoneyClick: function (item) {
        		for(var i = 0; i < this.smallMoney.length; i++){
        			this.smallMoney[i].b = false;
        		};
        		for(var i = 0; i < this.bigMoney.length; i++){
        			this.bigMoney[i].b = false;
        		};
        		item.b = true;
        		this.p.payMoney = item.num;
        	},
        	//输入的事件
        	keyMoneyRange: function () {
        		var _this = this;
        		if(parseInt(_this.p.payMoney) > _this.moneyMax){
        			$dialog.alert({
			       		title: '提示',
			        	content: '不能大于' + _this.moneyMax,
			          	okTheme: 'positive',
			        }).then(() => {
			        })
			        _this.p.payMoney = _this.moneyMax + ""
        		};
        	},
        	//下一步
        	nextOneClick: function (){
        		var _this = this;
        		if(_this.p.payMoney == ''){
        			$dialog.alert({
			       		title: '提示',
			        	content: '请输入',
			          	okTheme: 'positive',
			        }).then(() => {
			        })
		        }else if (parseInt(_this.p.payMoney) < _this.moneyMin) {
		        	$dialog.alert({
			       		title: '提示',
			        	content: '不能少于' + _this.moneyMin,
			          	okTheme: 'positive',
			        }).then(() => {
			        })
		        }else if (parseInt(_this.p.payMoney) > _this.moneyMax) {
		        	$dialog.alert({
			       		title: '提示',
			        	content: '不能大于' + _this.moneyMax,
			          	okTheme: 'positive',
			        }).then(() => {
			        })
        		}else{
        			var arr = [];
        			$(_this.payList).each(function(i,v){
        				v.status = 3;
        				if(v.min <= parseInt(_this.p.payMoney) && v.max >= parseInt(_this.p.payMoney)){
        					arr.push(v);
        					_this.payType = arr[0];
        					_this.activeType = arr[0].pname
        				}else{
        					v.status = 0
        				}
        				
        				if(parseInt(_this.p.payMoney) >= 10000){
        					if(v.pname == 'type3'){
        						v.status = 0
        					};
        				}
        			})
	        		this.showDepositTyep =! this.showDepositTyep;
	        		$(".page-content").css("overflow","hidden");
        		}
        	},
        	nextTwoClick: function (){
        		this.nextTwoDis = true;
				this.submisDis = true;
				$dialog.alert({
					title: '提示',
					content: '提交成功：' + this.p.payMoney,
					okTheme: 'positive',
				}).then(() => {
				})
				console.log(this.payType)
        	},
        },
        mounted() {
        },
        created() {
        	this.depositData();
        },
        beforeDestroy() {
        	$loading.hide();
        	window.clearInterval(this.loadTime);
        	window.clearInterval(this.setTime);
        	window.clearInterval(this.setTimeTwo);
        	this.setTime = null;
        	this.setTimeTwo = null;
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/deposit.css';
</style>