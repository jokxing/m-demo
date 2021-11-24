<template>
    <div id="message" class="page has-navbar">
        <von-header>
            <button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	讯息
	        </span>
            <div class="message_func" slot="right">
                <span @click="editClick()">{{ editText }}</span>
                <span v-if="showEdit == false" @click="showScreen = true">筛选</span>
            </div>
        </von-header>

        <transition name="slide-screen">
            <div class="message_screen" v-show="showScreen">
                <div class="message_screen_sjx"></div>
                <ul class="fix">
                    <li @click="readClick('-1')">
                        <img src="../../common/img/icon-all.png" />
                        <span>全部</span>
                    </li>
                    <li @click="readClick('0')">
                        <img src="../../common/img/icon-no-read.png" style="vertical-align: unset;" />
                        <span>未读</span>
                    </li>
                    <li @click="readClick('1')">
                        <img src="../../common/img/icon-read.png" />
                        <span>已读</span>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="message_screen_bg" v-show="showScreen" @click="showScreen = false"></div>

        <div class="page-content">
            <div class="no_data" v-show="!is_data">
                <img src="../../common/img/no_data.png" alt="" srcset="">
            </div>

            <div v-show="is_data">
                <div class="message_main">
                    <ul>
                        <li v-for="(item, index) in messageList">
                            <div class="spot" v-if="item.is_read == 0"></div>
                            <div class="selection" v-show="showEdit">
                                <img src="../../common/img/icon-selection.png" v-show="item.is_selection" />
                            </div>
                            <span class="left">{{ item.title }}</span>
                            <span class="right">{{ item.created_at }}</span>
                        </li>
                    </ul>
                </div>
                
                <div class="message_btn" v-show="showEdit">
                    <md-button class="button" @click.native="delClick()">删除</md-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 是否有数据
                is_data:false,
                // 显示编辑还是完成
                editText: "编辑",
                // 筛选下拉
                showScreen: false,
                // 是否编辑
                is_edit: false,
                showEdit: false,
                // 列表
                messageList:[],
                // 默认全部
                is_read: -1  
            }
        },
        methods: {
            //个人讯息获取数据
        	mailInfor: function (index) {
        		var _this = this;
                $loading.show();

                if(window.messageRead){
                    _this.is_read = window.messageRead
                }
                if(window.messagePage){
                    _this.page = window.messagePage
                }

        		this.$http.get(_this.message_api + "?page=" + _this.page + "&is_read=" + _this.is_read,{

        		}).then(function(data){
        			$loading.hide();
                    $(data.data.message.list).each(function(i,v){
                        data.data.message.list[i]['is_selection'] = false;
                    });

                    // 判断是否有数据
                    if(data.data.message.list.length > 0){
                        _this.is_data = true
                    }else{
                        _this.is_data = false
                    };

        			_this.messageList = data.data.message.list;
					_this.showPage = true;
        		}).catch(function(data){
        			$loading.hide();
        		})
        	},
            // 筛选
            readClick: function (index) {
                // 默认
                this.page = 1;
                this.messageList = [];
                this.showScreen = false;
                this.is_read = index;
                window.messageRead = index;
                if(!index){
                    this.is_read = -1;
                }
                $dialog.alert({
                    content: "这里调用接口",
                    okTheme: 'positive',
                })
            },
            // 编辑
            editClick: function () {
                var _this = this;
                this.is_edit =! this.is_edit;
                this.showEdit =! this.showEdit;
                if(this.is_edit){
                    this.editText = "完成"
                }else{
                    this.editText = "编辑";
                    $(_this.messageList).each(function(i,v){
                        v.is_selection = false
                    })
                }
            },
            // 删除
            delClick: function () {
                var _this = this;
                $dialog.confirm({
                    content: "确认删除该消息吗？",
                    okTheme: 'positive',
                    okText: "确认",
                    cancelText: "取消",
                }).then((res) => {
                    if(res){
                        $dialog.alert({
                            content: "这里调用接口",
                            okTheme: 'positive',
                        })
                    }
                })
            },
            // 返回
            back: function () {
                this.onBackClick();
                window.messagePage = null;
                window.mesPrePageDown = null;
                window.mesPrePageUp = null;
                window.mesNextPageDown = null;
                window.mesNextPageUp = null;
                window.messageRead = null
            }

        },
        mounted() {
            this.mailInfor();
            if(window.messagePage){
				this.pageInit()
			}
        },

    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/message.css';
</style>