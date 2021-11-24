import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import Vonic from 'vonic'
import axios from 'axios'
import AwesomePicker from 'vue-awesome-picker';
import api from './api/api.js'
import './common/js/jquery.qrcode.min.js'
import func from './common/js/func.js'
import gameConfigure from './common/js/gameConfigure'
import back from './common/js/back.js'

Vue.prototype.$http = axios
Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.use(api)
Vue.use(func)
Vue.use(AwesomePicker);
Vue.use(gameConfigure)
Vue.use(back)


function GetRequest() {
	var url = window.location.hash; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1).split("&");
		for(var i = 0; i < str.length; i ++) {
			theRequest[str[i].split("=")[0]] = unescape(str[i].split("=")[1]);
		}
	}
	return theRequest;
}
var Request = new Object();
Request = GetRequest();



import home from './components/index.vue'
const routes = [
    { 
		path: '/', 
		component: home,
		redirect: '/home',
		children: [
			{ path: 'home', component: resolve => require(['./components/home/home.vue'], resolve) },
			{ path: 'hdzq', component: resolve => require(['./components/discount/hdzq.vue'], resolve) },
			{ 
				path: 'wallet', 
				redirect: 'deposit',
				meta:{
					requireAuth: true,
				},
				component: resolve => require(['./components/wallet/wallet.vue'], resolve),
				children:[
					{ path: '/deposit', component: resolve => require(['./components/wallet/deposit.vue'], resolve) },
					{ path: '/account', component: resolve => require(['./components/wallet/account.vue'], resolve) },
					{ path: '/withdraw', component: resolve => require(['./components/wallet/withdraw.vue'], resolve) },
				]
			},
			{ 
				path:'virtual', 
				redirect: 'funcDeposit',
				meta:{
					requireAuth: true, 
				},
				component: resolve => require(['./components/funcs/virtual.vue'], resolve),
				children:[
					{ path: '/funcDeposit', component: resolve => require(['./components/funcs/funcDeposit.vue'], resolve) },
					{ path: '/funcWithdraw', component: resolve => require(['./components/funcs/funcWithdraw.vue'], resolve) },
				]
			},
			{ 
				path: 'customer', 
				meta:{
					requireAuth: false,
				},
				component: resolve => require(['./components/customer/customer.vue'], resolve) 
			},
			{ 
				path: 'user', 
				meta:{
					requireAuth: false,
				},
				component: resolve => require(['./components/user/user.vue'], resolve) 
			}
		]
	},

	// 登录组
	{
		path: '/login',
		meta:{
			requireAuth: false,
		},
		component:resolve => require(['./components/login/login.vue'], resolve)
	},{
		path: '/register',
		meta:{
			requireAuth: false,
		},
		component:resolve => require(['./components/login/login.vue'], resolve)
	},
	{
		path: '/forgotPassword',
		meta:{
			requireAuth: false,
		},
		component:resolve => require(['./components/login/forgotPassword.vue'], resolve)
	},
	{
		path: '/agreement',
		meta:{
			requireAuth: false,
		},
		component:resolve => require(['./components/login/agreement.vue'], resolve)
	},

	// 优惠组
	{ 
		path:'/gift', 
		component: resolve => require(['./components/discount/gift.vue'], resolve)
	},
	{ 
		path:'/kingMeal', 
		component: resolve => require(['./components/discount/kingMeal.vue'], resolve)
	},
	{ 
		path:'/bestdraw', 
		component: resolve => require(['./components/discount/bestdraw.vue'], resolve)
	},
	{ 
		path:'/UsdtDptBonus', 
		component: resolve => require(['./components/discount/UsdtDptBonus.vue'], resolve)
	},
	{ 
		path:'/usdtRefund', 
		component: resolve => require(['./components/discount/usdtRefund.vue'], resolve)
	},
	{ 
		path:'/chessWar', 
		component: resolve => require(['./components/discount/chessWar.vue'], resolve)
	},
	{ 
		path:'/chessRescueMoney', 
		component: resolve => require(['./components/discount/chessRescueMoney.vue'], resolve)
	},

	// VIP组
	{
		path: '/vipPage',
		meta:{
			requireAuth: true,
		},
		component:resolve => require(['./components/vip/vipPage.vue'], resolve)
	},

	// 功能组
	{
		path: '/depositCourse',
		meta:{
			requireAuth: true,
		},
		component:resolve => require(['./components/wallet/depositCourse.vue'], resolve)
	},

	// 系统组
	{
		path: '/announcement',
		meta:{
			requireAuth: true,
		},
		component:resolve => require(['./components/system/announcement.vue'], resolve)
	},
	{
		path: '/about',
		meta:{
			requireAuth: true,
		},
		component:resolve => require(['./components/system/about.vue'], resolve)
	},
	{
		path: '/helpCenter',
		meta:{
			requireAuth: true,
		},
		component:resolve => require(['./components/system/helpCenter.vue'], resolve)
	},
	{
		path: '/helpDetail',
		meta:{
			requireAuth: true,
		},
		component:resolve => require(['./components/system/helpDetail.vue'], resolve)
	},

	// 我的组
	{
		path: '/advance',
		component:resolve => require(['./components/user/advance.vue'], resolve)
	},
	{
		path: '/joinus',
		component:resolve => require(['./components/user/joinus.vue'], resolve)
	},
	{
		path: '/message',
		meta:{
			requireAuth: true,
		},
		component:resolve => require(['./components/user/message.vue'], resolve)
	},
	{
		path: '/tradeRec',
		meta:{
			requireAuth: true,
		},
		component:resolve => require(['./components/user/trade/tradeRec.vue'], resolve)
	},
	{
		path: '/tradeDetail',
		meta:{
			requireAuth: true,
		},
		component:resolve => require(['./components/user/trade/tradeDetail.vue'], resolve)
	},
]

const router = new VueRouter({
	routes: routes
})

router.beforeEach((to,from,next)=>{
	const item = new Date().getTime();
	if(to.meta.requireAuth == true){
	  	if(localStorage.getItem("access_token") != null) {
			next()
	  	}
	  	
	  	if(localStorage.getItem("access_token") == null || localStorage.getItem("expires_time") < item){
			if(!$cookies.get('app')){
				$router.push('/login')
			}
	  	}
	}else{
	  	next()
  	}
});

// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
	config => {
		if(localStorage.getItem("access_token")){
			config.headers.Authorization = 'Bearer' + '  ' + localStorage.access_token;
		}
		return config;
    },
    err => {
    	return Promise.reject(err);
    }
);

// http response 服务器响应拦截器，这里统一错误的处理
window.logoutNum = 0;
window.tokenExpired = 0;
window.requestStatus = "";
axios.interceptors.response.use(
	response => {
        if(response.data.message){
        	if(response.data.message.type == "logout"){
				window.logoutNum++
				if(logoutNum == 1){
					$dialog.alert({
						title: "安全提示",
						content: "你的帐号在别处登陆，请注意！",
						okTheme: 'positive',
					})
				}
	        	$router.back('/login')
           		localStorage.removeItem('access_token');
           		localStorage.removeItem('expires_time');
                localStorage.removeItem('user');
                localStorage.removeItem('userMoney');
           		$cookies.remove("initData");
           		$cookies.remove("games");
           		$cookies.remove("dptName");
			}
		}
		return response;
    },
    error => {
      	switch (error.response.status) {
          	case 401:
				if(error.response.data.message == 'Token has expired'){
					window.tokenExpired++
					if(window.tokenExpired == 1){
						$dialog.alert({
							title: "安全提示",
							content: "登录已超时，为了您的账号安全，请重新登录！",
							okTheme: 'positive',
						})
					}
					$router.back('/login')
					localStorage.removeItem('access_token');
					localStorage.removeItem('expires_time');
					localStorage.removeItem('user');
					localStorage.removeItem('userMoney');
					$cookies.remove("initData");
					$cookies.remove("games");
					$cookies.remove("dptName");
				}
				return false;
		}
		if(!error.response.data || !error.response.data.status_code){
			window.requestStatus = error.response.request.status
		}
		return Promise.reject(error.response.data)
    }
);

export default axios;


Vue.use(Vonic.app, {
  	routes: routes
})

Vonic.app.setConfig('pushMethod', 'replace')