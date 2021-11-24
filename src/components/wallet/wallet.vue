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
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import deposit from './deposit.vue'
    import withdraw from './withdraw.vue'
    export default {
        data() {
            return {
                // tab
                tabs: [
                    {
                        text:"充值",
                        path:'/deposit'
                    },
                    {
                        text: "转账", 
                        path: '/account'
                    },
                    {
                        text: "提款",
                        path: '/withdraw'
                    }
                ],
                num: 0,
            }
        },
        methods: {
            tabClick: function (item){
                this.$router.push(item.path);
            }
        },
        mounted() {
            if(this.$router.history.current.query.num){
                this.num = this.$router.history.current.query.num
            }
        },
        components: {
            deposit,
            withdraw,
        }
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/wallet.css';
</style>