<template>
    <div id='customer' class='page has-navbar'>
        <von-header>
            <span slot="title">客服</span>
        </von-header>

        <div class='customer_topBg'></div>

        <div class='customer_main'>
            <div class='customer_list'>
                <div class='customer_list_img'>
                    <img src='../../common/img/tell-customer.png' />
                </div>
                <div class='customer_list_btn'>
                    <h4>唤起qq</h4>
                    <a class="md-button button" href="mqqwpa://im/chat?chat_type=wpa&uin=64809547&version=1">立即咨询</a>
                </div>
            </div>
            <div class='customer_list'>
                <div class='customer_list_img'>
                    <img src='../../common/img/tell-customer.png' />
                </div>
                <div class='customer_list_btn'>
                    <h4>唤起电话</h4>
                    <a class="md-button button" href="tel:00000000">立即咨询</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/customer.css';
</style>