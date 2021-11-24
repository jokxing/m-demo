<template>
	<div id="mypurse">
		<div class="purse">
			<!-- 钱包 -->
			<div class="wallet_balance">
				<div class="left">
					<p>主账户</p>
					<span>{{ m.money }}</span>
				</div>
				<div class="right" @click="showCustomPopup()">
					<p>一键回收</p>
				</div>
			</div>

			<!-- 数字 -->
			<div class="game_money fix">
				<ul class="fix">
					<li v-for="v in SportGame">
						<p>{{ v.gameTitle }}</p>
						<span>{{ v.gameMoney }}</span>
					</li>
					<li v-for="v in EsportsGame">
						<p>{{ v.gameTitle }}</p>
						<span>{{ v.gameMoney }}</span>
					</li>
					<li v-for="v in RealPeopleGame">
						<p>{{ v.gameTitle }}</p>
						<span>{{ v.gameMoney }}</span>
					</li>
					<li v-for="v in ChessGame">
						<p>{{ v.gameTitle }}</p>
						<span>{{ v.gameMoney }}</span>
					</li>
					<li v-for="v in LotteryGame" v-if="v.gameCode != 'code12'">
						<p>{{ v.gameTitle }}</p>
						<span>{{ v.gameMoney }}</span>
					</li>
					<li v-for="v in VideoGame" v-if="v.gameCode != 'code15'">
						<p>{{ v.gameTitle }}</p>
						<span>{{ v.gameMoney }}</span>
					</li>
				</ul>
				<!-- 更多 -->
				<div class="game_more" @click="gameMoreClick()">
					<p>更多</p>
					<img src="../../common/img/icon_more.png" width="14" />
				</div>
				<!-- 收回 -->
				<div class="collect" @click="collectClick()" v-show="showCollect">
					<p>收回</p>
					<img src="../../common/img/icon_collect.png" width="14" />
				</div>
			</div>
		</div>

		<!-- 自动免转 -->
		<div class="no_turn">
			<p>自动免转</p>
			<span>开启后自动转入</span>
			<div class="remind" :style="remindStyle" @click="handleClick()">
				<div class="btnn" :style="btnnStyle"></div>
			</div>
		</div>

		<!-- 互转 -->
		<div v-show="switchNoturn">
			<div class="inter_turn">
                <div class="select_game fix">
					<p @click="showOutPicker">{{ outtude }}</p>
					<span>转入</span>
					<p @click="showInPicker">{{ intude }}</p>
				</div>
				<div class="input_game_money fix">
					<input type="text" placeholder="请输入数字" v-model="money" @keyup="moneyKeyup()" />
					<div class="all_game_money" @click="allMomeyClick()">{{ moneyText }}</div>
				</div>
			</div>
	
			<div class="purse_btn">
				<md-button class="button" @click.native="showAlert()" :disabled="disPurse">立即提交</md-button>
			</div>
		</div>

        <!-- 转出 -->
        <awesome-picker
            ref="outPicker"
            :textTitle="outPicker.textTitle"
            :data="outPicker.data"
            :anchor="outPicker.anchor"
            :colorConfirm="outPicker.colorConfirm"
            @confirm="outConfirm">
        </awesome-picker>

        <!-- 转入 -->
        <awesome-picker
            ref="inPicker"
            :textTitle="inPicker.textTitle"
            :data="inPicker.data"
            :anchor="inPicker.anchor"
            :colorConfirm="inPicker.colorConfirm"
            @confirm="inConfirm">
        </awesome-picker>

        <!--错误提示-->
        <transition name="fade">
        	<div class="purse_error" v-show="showPurseError">{{ purseError }}</div>
        </transition>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				//收展
				showPurse: false,
				//总额度
				total:"",
				showLoad: true,
				showTotal: false,
				//
				money:"",
				//主账户
				m:{
					money: ""
				},
				//配置文件的
				SportGame:[],
				RealPeopleGame:[],
				VideoGame:[],
				LotteryGame:[],
				ChessGame:[],
				EsportsGame:[],
				//错误提示
				showPurseError: false,
				purseError: "",
				// 开关滑动
				remindStyle:{
					backgroundColor: "#bbb"
				},
				btnnStyle:{
					left:"0"
				},
				// 收回
				showCollect: false,
				// 显示隐藏互转
				switchNoturn: true,
				// 转出的code
				out_account: "main",
				// 转入的code
				in_account: "请选择",
				// 开关的参数
				is_on: 1,
				// 获取本地user
				user:"",
				// 判断输入
				moneyText: "全部余额",
				// 是否禁止按钮
                disPurse: true,
                // 转出
                outtude: "主账户",
                outPicker: {
                    anchor: [],
                    textTitle: '选择转出',
                    colorConfirm: '#3B83FF',
                    data: []
                },
                out_account: "main", //提交的参数
                // 转入
                intude: "请选择",
                inPicker: {
                    anchor: [],
                    textTitle: '选择转入',
                    colorConfirm: '#3B83FF',
                    data: []
                },
                in_account: ""
			}
		},
		mounted() {
			$("#wallet").parent().removeAttr("transition-direction");
            var userMoney = localStorage.getItem("userMoney");
			this.m.money = parseFloat(userMoney)

			var user = localStorage.getItem("user");
			this.user = JSON.parse(user);
			if(this.user.wallet == 1){ //默认
				this.switchNoturn = true;
				$(".btnn").animate({left:'0px'});
				$(".btnn").parent().css('background-color','#bbb');
			}else{ //默认免转
				this.switchNoturn = false;
				$(".btnn").animate({left:'22px'});
				$(".btnn").parent().css('background-color','#4c0');
            };
            
            this.pickerInit()
	    },
		methods:{
			//main读取配置文件的名称
			gameName: function () {
				var _this = this;
        		const time = new Date().getTime();
        		
        		this.SportGame = this.game.SportGame
				this.RealPeopleGame = this.game.RealPeopleGame;
				this.VideoGame = this.game.VideoGame;
				this.LotteryGame = this.game.LotteryGame;
				this.ChessGame = this.game.ChessGame;
				this.EsportsGame = this.game.EsportsGame;
				Object.keys(_this.game).forEach(function(j,k){
					$(_this.game[j]).each(function(i,v){
						if(v.gameCode != 'code12' && v.gameCode != 'code15'){
							_this.$http.post(_this.account_api + "?_=" + time,{
								p_code: v.gameCode,
								type:"getStatus"
							}).then(function(data){
								v.purseGameMoney = data.data.message;
								v.status_code = data.data.status_code;

								if(data.data.status_code != 1){
									v.purseGameMoney = 0
								}
								if(data.data.status_code == 1){
									v.gameMoney = data.data.message;
								}
								if(data.data.status_code == 2){
									v.gameMoney = '维护中';
								}
							}).catch(function(data){
								v.purseGameMoney = 0;
								v.gameMoney = ""
							})
						}
					});
				})
			},
			//点数全部转回主帐户按钮
			showCustomPopup() {
				var _this = this;
				$dialog.confirm({
				  title: '提示',
		          content: "全部点数将转回主账户",
		          okTheme: 'positive',
		          cancelText: '取消',
		        }).then((res) => {
		        	if(res){
		        		_this.cusBtn()
		        	}
		        })
		    },
			// 开关
			handleClick: function () {
				var _this = this;
				if(_this.user.wallet == 1){ //默认关闭时开启免转传1
					this.is_on = 2;
					this.walletApi();
				}else{ //默认开启时关闭免转传2
					this.is_on = 1;
					$dialog.confirm({
						title: "提示",
						content: '关闭后自动免转后，你将需要手动操作各个数字，确定关闭自动免转？',
						okTheme: 'positive',
						cancelText: '取消',
					}).then((res) => {
						if(res){
							_this.walletApi();
						}
					})
				};
			},
			// 开启关闭免转请求
			walletApi: function () {
				var _this = this;
				_this.switchNoturn =! _this.switchNoturn
				if(_this.switchNoturn){
					$(".btnn").animate({left:'0px'});
					$(".btnn").parent().css('background-color','#bbb');
				}else{
					$(".btnn").animate({left:'22px'});
					$(".btnn").parent().css('background-color','#4c0');
				};
				// 更新本地user信息
				_this.user['wallet'] = _this.is_on;
				var userObj = JSON.stringify(_this.user);
				localStorage.setItem('user',userObj);
				// 重置
				_this.out_account = 'main';
				_this.in_account = '请选择';
				_this.money = '';
				_this.moneyText = '全部余额'
			},
			// 更多
			gameMoreClick: function () {
				$(".game_money").css('height', "318px")
				setTimeout(function(){
					$(".game_money").css('overflow', 'unset')
				},300)
				$(".game_money ul li:eq(7)").css("opacity","1");
				$(".game_more").hide();
				this.showCollect = true
			},
			// 收回
			collectClick: function () {
				$(".game_money").css({
					height: "127px",
					overflow: 'hidden'
				})
				$(".game_money ul li:eq(7)").css("opacity","0");
				setTimeout(function(){
					$(".game_more").show()
				},300);
				this.showCollect = false;
			},
			// 点击全部余额事件
			allMomeyClick: function () {
				var _this = this;
				if(this.m.money <= 0){
					this.disPurse = true;
					this.moneyText = '请输入大于0'
				}else{
					this.disPurse = false
					this.moneyText = ''
				}

				if(this.out_account == 'main'){
					this.money = parseInt(this.m.money);
				}else{
					Object.keys(_this.game).forEach(function(j,k){
						$(_this.game[j]).each(function(i,v){
							if(v.gameCode == _this.out_account){
								_this.money = parseInt(v.gameMoney);
								if(parseInt(v.gameMoney) <= 0){
									_this.disPurse = true;
									_this.moneyText = '请输入大于0'
								}else{
									_this.disPurse = false
									_this.moneyText = ''
								}
							}
						});
					})
				}
			},
			// 输入事件
			moneyKeyup:function () {
				var _this = this;
				if(this.money == ''){
					this.moneyText = '全部余额';
					this.disPurse = true
				}else{
					if(this.out_account == 'main'){
						if(this.money > this.m.money){
							this.money = parseInt(this.m.money);
							if(this.money <= 0){
								this.moneyText = '钱包余额不足';
								this.disPurse = true
							}else{
								this.moneyText = '';
								this.disPurse = false
							}
						}else{
							this.disPurse = false
						}
					}else{
						Object.keys(_this.game).forEach(function(j,k){
							$(_this.game[j]).each(function(i,v){
								if(v.gameCode == _this.out_account){
									if(_this.money > parseInt(v.gameMoney)){
										_this.money = parseInt(v.gameMoney);
										if(_this.money <= 0){
											_this.moneyText = 'name余额不足';
											_this.disPurse = true
										}else{
											_this.moneyText = '';
											_this.disPurse = false
										}
									}else{
										_this.disPurse = false
									}
								}
							});
						})
					}
				}
			},
		    //点数全部转回主帐户提交
		    cusBtn: function () {
		    	var _this = this;
				$loading.show();
				var arrD = 0;
				var gameD = 0;
				var money = 0;
				Object.keys(_this.game).forEach(function(j,k){
					gameD += _this.game[j].length
					$(_this.game[j]).each(function(i,v){
						arrD ++;
						if(v.gameCode != 'code12' && v.gameCode != 'code15'){
							money += parseInt(v.gameMoney);
						}
						v.gameMoney = "0";
					});
				})
				var set = setInterval(function(){
					if(arrD == gameD){
						_this.m.money = parseInt(_this.m.money) + money;
						clearInterval(set);
						$loading.hide();
					}
				},1000)
            },
            // 转入和转出获取本地
            pickerInit: function() {
                var _this = this;
                _this.inPicker.data.push({value: "主账户", label: "main"})
				_this.outPicker.data.push({value: "主账户", label: "main"})
				Object.keys(_this.game).forEach(function(j,k){
					$(_this.game[j]).each(function(i,v){
						_this.outPicker.data.push({value: v.gameTitle, label: v.gameCode});
						_this.inPicker.data.push({value: v.gameTitle, label: v.gameCode})
					})
				})
            },
            // 转出账户
			showOutPicker: function (v) {
                this.$refs.outPicker.show();
			},
            outConfirm (v) {
                this.outPicker.anchor = v;
                this.outtude = v[0].value;
                this.out_account = v[0].lable;

                // 重置转入的
                this.intude = "请选择";
				this.inPicker.anchor = [];
				
				// 重置
				this.money = ""
            },
            // 转入账户
			showInPicker: function (v) {
                this.$refs.inPicker.show();
			},
            inConfirm (v) {
                this.inPicker.anchor = v;
                this.intude = v[0].value;
				this.in_account = v[0].lable;
				
				// 重置输入
				this.money = ""
            },
		    //确认送出按钮
		    showAlert(effect) {
		    	var _this = this;
		    	var a = parseFloat(this.money);
		    	if(this.out_account == ""){
		    		$dialog.alert({
			          content: '请选择转出账户！',
			          okTheme: 'positive',
			          effect: effect || 'default'
			        }).then(() => {
			        })
		    	}else if(this.in_account == ""){
		    		$dialog.alert({
			          content: '请选择转入账户！',
			          okTheme: 'positive',
			          effect: effect || 'default'
			        }).then(() => {
                    })
                }else if(this.out_account == this.in_account){
                    $dialog.alert({
			          content: '转出账户和转入账户不能同一个账户！',
			          okTheme: 'positive',
			          effect: effect || 'default'
			        }).then(() => {
                    })
		    	}else if(this.money == ""){
		    		$dialog.alert({
			          content: '请填写数字！',
			          okTheme: 'positive',
			          effect: effect || 'default'
			        }).then(() => {
			        })
		    	}else if(Number.isInteger(a) == false || a < 1){
		    		$dialog.alert({
				          content: "填写的数字必须为整数！",
				          okTheme: 'positive',
				    });
		    	}else{
		    		$dialog.confirm({
					  title: '提示',
			          content: "本次交易" + _this.money + "点数！",
			          okTheme: 'positive',
			          cancelText: '取消',
			        }).then((res) => {
			        	if(res){
			        		_this.aleBtn()
			        	}
			        })
		    	}
		    },
		    //提交
		    aleBtn: function () {
		    	var _this = this;
        		const time = new Date().getTime();
		    	var userMoney = localStorage.getItem("userMoney")
		    	$loading.show();
		    	var inMoney = parseFloat(_this.money)
	    		if(this.out_account != "main" && this.in_account != "main"){
					setTimeout(function(){
						$loading.hide();
						_this.money = "";
						_this.moneyText = '全部余额';

						$dialog.alert({
							content: "提交成功",
							okTheme: 'positive',
						});
						
						Object.keys(_this.game).forEach(function(j,k){
							$(_this.game[j]).each(function(i,v){
								if(v.gameCode == _this.out_account){
									v.gameMoney = parseFloat(v.gameMoney) - inMoney
								}
								if(v.gameCode == _this.in_account){
									v.gameMoney = parseFloat(v.gameMoney) + inMoney
								}
							});
						})
					},1000)
	    		}else{
	    			var u = parseFloat(userMoney);
	    			var m = parseFloat(_this.money)
	    			setTimeout(function(){
						_this.money = "";
			    		$loading.hide();
			    		$dialog.alert({
				          	content: "提交成功",
				          	okTheme: 'positive',
				        });
				        if(_this.out_account == "main"){
				        	_this.m.money = u - m;
				        	localStorage.setItem("userMoney",_this.m.money);
							Object.keys(_this.game).forEach(function(j,k){
								$(_this.game[j]).each(function(i,v){
									if(v.gameCode == _this.in_account){
										v.gameMoney = parseFloat(v.gameMoney) + m
									}
								});
							})
				        };
				        if(_this.in_account == "main"){
				        	_this.m.money = u + m;
				        	localStorage.setItem("userMoney",_this.m.money);
							Object.keys(_this.game).forEach(function(j,k){
								$(_this.game[j]).each(function(i,v){
									if(v.gameCode == _this.out_account){
										v.gameMoney = parseFloat(v.gameMoney) - m
									}
								});
							})
				        }
					},1000)
	    		}
            },
		},
		created: function () {
	    	this.gameName()
		},
	}
</script>

<style scope>
	@import '../../common/css/style.css';
	@import '../../common/css/account.css';
</style>
