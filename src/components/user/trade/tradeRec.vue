<template>
	<div id="tradeRec" class="page has-navbar">
		<von-header>
			<button class="button button-icon ion-ios-arrow-left" slot="left" @click="back()"></button>
	        <span slot="title">
	        	提款记录
			</span>
			<span class="title_left" slot="right" @click="showTyep">
				{{ pickerVule }}
				<img src="../../../common/img/icon-trade-select.png" width="16">
			</span>
        </von-header>
	        
		<div class="page-content page-content-big">
	        <div class="trade_main trade_tab">
	        	<!--tab-->
	        	<ul class="fix">
		            <li
		            v-for="(item,index) in tabs"
		            :class="{active:index == num}"
		            @click="tab(index)">{{item}}</li>
		        </ul>
		        <!--列表-->
		        <div class="trade_box">
		        	<tradeList ref="tradeList"></tradeList>
		        </div>
	        </div>
		</div>

		<!--显示选择类型-->
		<awesome-picker
            ref="picker"
            :textTitle="picker.textTitle"
            :data="picker.data"
            :anchor="picker.anchor"
			:colorConfirm="picker.colorConfirm"
            @confirm="handlePickerConfirm">
        </awesome-picker>
	</div>
</template>

<script>
	import tradeList from './tradeList.vue' //列表组件
	export default{
		data(){
			return{
				//tab标题
				tabs: ["今天", "昨天", "本周", "上周"],
		        num: 0,
		      	//tab选择时给列表组件初始化接口传过去
	      		time: 3,
				// 选择类型
				picker: {
                    anchor: [],
                    textTitle: '请选择类型',
					colorConfirm: '#3B83FF',
                    data: [
						['全部', 'type1', 'type2', 'type3', 'type4']
                    ]
                },
				pickerVule: '全部',
			}
		},
		methods:{
			// tab
	    	tab(index) {
	    		$loading.show();
	            this.num = index;
				window.tradeNum = index;
				window.tradePage = 1;
	            //类别默认全部
            	this.$refs.tradeList.TransferType = "0" ;
            	this.$refs.tradeList.page = 1 ;
				this.pickerVule = "全部";
				this.picker.anchor = [];
            	//根据本周或上周，给列表组件传过去
	            if(index == 0){
	            	this.time = 3;
					this.$refs.tradeList.tradeRecData();
	            };
	            if(index == 1){
	            	this.time = 4;
					this.$refs.tradeList.tradeRecData();
	            };
	            if(index == 2){
	            	this.time = 1;
					this.$refs.tradeList.tradeRecData();
	            };
	            if(index == 3){
	            	this.time = 2;
					this.$refs.tradeList.tradeRecData();
	            }
	        },
			// 显示选择类型
			showTyep: function () {
				this.$refs.picker.show();
			},
			// 选中类型
            handlePickerConfirm (v) {
				// console.log(v)
                this.picker.anchor = v;
				this.$refs.tradeList.TransferType = v[0].index;
				this.pickerVule = v[0].value;
				this.$refs.tradeList.tradeRecData()
            },
			// 返回
            back: function () {
                this.onBackClick();
				window.tradeNum = null;
            },
		},
		mounted() {
			if(window.tradeNum){
				this.num = window.tradeNum;
			}
		},
		components: {
			tradeList
		}
	}
</script>

<style scope>
	@import "../../../common/css/style.css";
	@import "../../../common/css/tradeRec.css";
</style>
