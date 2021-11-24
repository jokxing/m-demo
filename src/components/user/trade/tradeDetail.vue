<template>
    <div id="tradeRec" class="page has-navbar">
        <von-header>
			<button class="button button-icon ion-ios-arrow-left" slot="left" @click="back()"></button>
	        <span slot="title">
                {{ q.type }}记录
            </span>
        </von-header>

        <div class="page-content page-content-big">
            <div class="trade_detail_main">
                <ul>
                    <li>
                        <span class="left">状态</span>
                        <span class="right trad_status_0" v-if="q.status == 0">处理中</span>
                        <span class="right trad_status_1" v-if="q.status == 1">成功</span>
                        <span class="right trad_status_2" v-if="q.status == 2">失败</span>
                        <span class="right trad_status_3" v-if="q.status == 3">已撤销</span>
                    </li>
                    <li>
                        <span class="left">数字</span>
                        <span class="right" style="color: #4EB3A5;">{{ q.apply_amount }}</span>
                    </li>
                    <li>
                        <span class="left">时间</span>
                        <span class="right">{{ q.created_at }}</span>
                    </li>
                    <li>
                        <span class="left">id</span>
                        <span class="right">
                            {{ q.fundsn }}&nbsp;
                            <button class="trade_copyBtn CopyBt" :data-clipboard-text="q.fundsn" @click="copy()">复制</button>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard'
    export default {
        data() {
            return {
                q:'',
                // 复制
                clipboardO: null
            }
        },
        methods: {
            back: function () {
                this.onBackClick();
                this.$cookies.remove('tradeDetail')
            },
            //复制
			copy: function () {
				var _this = this;
				
				
				_this.clipboardO = new Clipboard('.CopyBt');
				_this.clipboardO.on('success', function(e) {
					$dialog.alert({
				          content: '复制成功',
				          okTheme: 'positive',
				    });
				    e.clearSelection();
				})
				setTimeout(function(){
					_this.clipboardO.destroy();
				},200)
			},
        },
        mounted() {
            var t = this.$cookies.get('tradeDetail')
            this.q = typeof t == "string" ? JSON.parse(t) : t
        },
        destroyed: function () {
        	if(this.clipboardO != null){
        		this.clipboardO.destroy();
        	}
		},
    }
</script>

<style scope>
	@import "../../../common/css/style.css";
	@import "../../../common/css/tradeRec.css";
</style>
