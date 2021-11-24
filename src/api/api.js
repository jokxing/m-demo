exports.install = function (Vue, options) {
	//移动端
	const host = "/api" 
		
	Vue.prototype.setTime = null;	
	Vue.prototype.setTimeTwo = null;	
	Vue.prototype.loadTime = null;	
	Vue.prototype.userNum = 0;	
	
    Vue.prototype.login_api = host + "/authorizations"
    Vue.prototype.forgotpassword_api = host + "/forgot_password"
    Vue.prototype.user_api = host + "/user"
    Vue.prototype.message_api = host + "/message"
    Vue.prototype.init_api = host + "/init"
    Vue.prototype.pic_api = host + "/pic"
    Vue.prototype.account_api = host + "/account"
    Vue.prototype.mypurse_api = host + "/mypurse"
    Vue.prototype.withdrawInit_api = host + "/withdrawInit"
    Vue.prototype.deposInitV2_api = host + "/depositInit"
    Vue.prototype.tradeRec_api = host + "/tradeRec"
    Vue.prototype.announcement_api = host + "/announcement"
    Vue.prototype.listen_api = host + "/listen"
    Vue.prototype.ActGiftDetail_api = host + "/ActGiftDetail"
    Vue.prototype.KingMealInfo_api = host + "/KingMealInfo"
    Vue.prototype.walletsLinkDptInit_api = host + "/walletsLinkDptInit"
    Vue.prototype.getWallets_api = host + "/getWallets"
    Vue.prototype.withdrawInit_api = host + "/withdrawInit"
    Vue.prototype.uservipinfo_api = host + "/uservipinfo"
};
