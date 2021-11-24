<template>
    <div id="wallet" class='page has-navbar'>
        <von-header>
            <span 
                slot="title" 
                v-for="(item, index) in tabs"
                :key="index"
                :class="{ active: item.path == $router.history.current.path }"
                @click="tabClick(item)">{{ item.text }}</span>
        </von-header>

        <div class="page-content">
            <router-view :userMoney="userMoney"></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['userMoney'],
        data() {
            return {
                // tab
                tabs: [
                    {
                        text:"tab1",
                        path:'/funcDeposit'
                    },
                    {
                        text: "tab2", 
                        path: '/usdtWithdraw'
                    },
                ],
                num: 0,
            }
        },
        methods: {
            tabClick: function (item){
                this.$router.push(item.path);
            },
        },
        mounted() {
            if(this.$router.history.current.query.num){
                this.num = this.$router.history.current.query.num
            }
        },
        beforeDestroy() {
        	window.clearInterval(this.setTime);
        	window.clearInterval(this.setTimeTwo);
        	this.setTime = null;
        	this.setTimeTwo = null;
        }
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/wallet.css';
</style>