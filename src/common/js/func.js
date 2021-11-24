export default{
    install(Vue, options){
		// init
		Vue.prototype.initApi = function () {
			var _this = this;
			if(!_this.$cookies.isKey("initData")){
				this.$http.get(_this.init_api+"?host=" + document.domain + "&llweb=1",{

				}).then(function(data){
					var obj = JSON.stringify(data.data.message);
					_this.$cookies.set("initData",obj,"15MIN");
					localStorage.setItem('AgentHostKey',data.data.message.f_AgentHostKey);
					if(_this.$router.history.current.path == '/login' || _this.$router.history.current.path == '/register'){
						_this.r.AgentHostKey = localStorage.getItem('AgentHostKey');
						_this.l.appkey = data.data.message.f_capt;
                    	_this.r.appkey = data.data.message.f_capt;
						_this.r.agent = data.data.message.f_AgentCode
					}
				}).catch(function(data){
				})
			}else{
				var init = this.$cookies.get('initData');
				if(_this.$router.history.current.path == '/login' || _this.$router.history.current.path == '/register'){
					_this.r.AgentHostKey = localStorage.getItem('AgentHostKey');
					_this.l.appkey = init.f_capt;
					_this.r.appkey = init.f_capt;
					_this.r.agent = init.f_AgentCode
				}
			}
		};
        // 用户信息
        Vue.prototype.userInit = function () {
			var _this = this;
            if(localStorage.getItem("access_token")){
	        	if(localStorage.getItem("user") && localStorage.getItem("userMoney")){
					_this.user = JSON.parse(localStorage.getItem("user"))
                    _this.userMoney = JSON.parse(localStorage.getItem("userMoney"))
	        	}else{
	        		this.$http.get(_this.user_api,{
	    		  	}).then(function(data){
						_this.user = data.data;
						_this.userMoney = data.data.money;
						_this.user.wallet = data.data.meta.wallet;
		                var userArr = {
		                	name: data.data.name,
        					level: data.data.level,
							id: data.data.id,
							wechat: data.data.wechat,
							qq: data.data.qq,
							is_voicepass: data.data.is_voicepass,
							mobile: data.data.mobile,
							nickname: data.data.nickname,
							bound_paypwd: data.data.bound_paypwd,
							is_bind: data.data.is_bind,
							wallet: data.data.meta.wallet,
							vip_level_logo: data.data.vip_level_logo,
							act_fail: data.data.act_fail,
							created_at: data.data.created_at,
							join_day: data.data.join_day
		                };
		            	var userObj = JSON.stringify(userArr);
		                localStorage.setItem("user",userObj);
						localStorage.setItem("userMoney",data.data.money);
						localStorage.setItem("shengqianbaoMoney",data.data.qianshengbao_money);
						
						localStorage.setItem("mobile",data.data.mobile);
		    		}).catch(function(data){
			            if(data){
							if(data.status_code){
		
							}else{
								_this.userNum++
								if(_this.userNum == 3){
									_this.userNum = 0;
									$loading.hide();
									$dialog.alert({
										content: '网络不给力:' + window.requestStatus,
										okTheme: 'positive',
									})
								}else{
									$loading.show()
									_this.userInit()
								}
							}
						}else{
							_this.userNum++
							if(_this.userNum == 3){
								_this.userNum = 0;
								$loading.hide();
								$dialog.alert({
									content: '网络不给力:' + window.requestStatus,
									okTheme: 'positive',
								})
							}else{
								$loading.show()
								_this.userInit()
							}
						}
		    		})
	        	}
	        }
		};
		// 公告专区初始化
		Vue.prototype.annountApi = function () {
			var _this = this;
			this.$http.get(_this.announcement_api + "?type=getstat&host=" + window.location.host,{
            
			}).then(function(data){
				var data = data.data.message;
				var obj = JSON.stringify(data);
				_this.$cookies.set("announcement",obj,"15MIN");
				//公告专区新消息的条数方法
				_this.annountInfo(data)
			}).catch(function(data){
	
			})
		};
		Vue.prototype.annountInfo = function (data) {
			var _this = this;
			var z = [];
			var y = [];
			var h = [];
			var k = [];
			var d = [];
			var a = _this.$cookies.keys();
			$(a).each(function(i,v){
				if(v.substring(0,4) == "zxzx"){
					z.push(a[i])
				};
				if(v.substring(0,4) == "yxwh"){
					y.push(a[i])
				};
				if(v.substring(0,4) == "hdxx"){
					h.push(a[i])
				};
				if(v.substring(0,4) == "kfxx"){
					k.push(a[i])
				};
				if(v.substring(0,4) == "djzx"){
					d.push(a[i])
				};
			})
			
			if(data["最新资讯"] == undefined){
				data["最新资讯"] = 0
			};
			if(data["平台维护"] == undefined){
				data["平台维护"] = 0
			};
			if(data["活动信息"] == undefined){
				data["活动信息"] = 0
			};
			if(data["客服信息"] == undefined){
				data["客服信息"] = 0
			};
			if(data["得奖资讯"] == undefined){
				data["得奖资讯"] = 0
			}
			
			// 公告专区页面
			if(this.$router.history.current.path == '/announcement'){
				var zxzxNum = data["最新资讯"] - z.length;
				var yxwhNum = data["平台维护"] - y.length;
				var hdxxNum = data["活动信息"] - h.length;
				var kfxxNum = data["客服信息"] - k.length;
				var djzxNum = data["得奖资讯"] - d.length;

				if(zxzxNum > 0){
					_this.tabs[1].b = 1;
				};
				if(yxwhNum > 0){
					_this.tabs[0].b = 1;
				};
				if(hdxxNum > 0){
					_this.tabs[2].b = 1;
				};
				if(kfxxNum > 0){
					_this.tabs[3].b = 1;
				};
				if(djzxNum > 0){
					_this.tabs[4].b = 1;
				};
			}

			var i = (parseFloat(data["最新资讯"]) - z.length) + (parseFloat(data["平台维护"]) - y.length) + (parseFloat(data["活动信息"]) - h.length) + (parseFloat(data["客服信息"]) - k.length) + (parseFloat(data["得奖资讯"]) - d.length);
			_this.annountNum = i

			if(i > 0){
				this.showAnnountRed = true
			}
		};
		//分页效果
	    Vue.prototype.pageEffect = function (respose) {
	    	if(this.page != 1){
	    		this.prePageDown = false;
	    		this.prePageUp = true;
	    	}else{
	    		this.prePageDown = true;
	    		this.prePageUp = false;
			};
	    	if(this.pagesize * this.page >= this.total){
	    		this.nextPageDown = true;
	    		this.nextPageUp = false;
	    	}else{
	    		this.nextPageDown = false;
	    		this.nextPageUp = true;
	    	}
	    };
		// 清除缓存
		Vue.prototype.clearCache = function (data) {
			var _this = this;
			localStorage.removeItem('access_token');
			localStorage.removeItem('expires_time');
			localStorage.removeItem('user');
			localStorage.removeItem('userMoney');
			_this.$cookies.remove("initData");
			_this.$cookies.remove("games");
			_this.$cookies.remove("dptName");
		};
    }
}
