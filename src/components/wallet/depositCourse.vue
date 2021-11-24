<template>
	<div class="page has-navbar" id="depositCourse">
		<von-header>
			<button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	教程
	        </span>
        </von-header>
        
        <!--主体-->
        <div class="page-content page-content-big" style="overflow: hidden;">
        	<!--tab-->
        	<div class="newDepositTutorial" id="newDepositTutorial">
			    <div class="tabsBox tabsBox2" id="tabsBox">
				    <ul class="swicthWrap" id="newDepositTutorialTab">
				        <li v-for="(item,index) in tab" :key="index" :class="{active:index == num}" @click="tabClick(index)">{{ item }}</li>
				    </ul>
			    </div>
		  	</div>
		  	
		  	<div id="container" :style="container" class="containerFull">
		  		<div v-if="num == 0">
		  			tab1
		  		</div>
		  		<div v-if="num == 1">
		  			tab2
		  		</div>
		  		<div v-if="num == 2">
		  			tab3
		  		</div>
		  	</div>
        </div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tab: ["tab1", "tab2", "tab3"],
				num: 0,
				container:{
					height: ""
				}
			}
		},
		methods: {
			tabClick: function (index) {
				this.num = index;
			}
		},
		mounted() {
			//tab
			var moveTab = function(id) {
			  	var container = document.getElementById(id);
			  	// 开始的x坐标
			  	var startX = 0;
			  	// 移动距离
			  	var translateDistance = 0;
			  	var startTranslateDistance = 0;
			  	// 滑动开始
			  	function touchstartHandler(e) {
			    	// 记录手指最开始的落点
			    	startX = e.changedTouches[0].clientX;
			  	}
			  	// 滑动持续中
			  	function touchmoveHandler(e) {
				    // 获取差值 自带正负
				    translateDistance = e.changedTouches[0].clientX - startX;
				    container.scrollLeft = startTranslateDistance - translateDistance;
			  	}
			  	// 滑动结束
			  	function touchendHandeler(e) {
			    	startTranslateDistance = container.scrollLeft;
			  	}
			
			  	container.addEventListener('touchstart', touchstartHandler); // 滑动开始绑定的函数 touchstartHandler
			  	container.addEventListener('touchmove', touchmoveHandler); // 持续滑动绑定的函数 touchmoveHandler
			  	container.addEventListener('touchend', touchendHandeler); // 滑动结束绑定的函数 touchendHandeler
			};
			moveTab('tabsBox');
			
			//获取浏览器高度给长图的div赋值
			this.container.height = window.innerHeight - 50 + 'px';


			//原生APP隐藏网页的header
			if(this.$cookies.get("app")){
				$("#depositCourse .bar-header").css("display","none")
			}
		}
	}
</script>

<style>
	@import '../../common/css/style.css';
	@import '../../common/css/depositCourse.css';
</style>
