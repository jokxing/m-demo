<template>
    <div class='page has-navbar'>
        <von-header>
            <button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	帮助中心
	        </span>
        </von-header>

        <div class="page-content">
            <div class="helpCenter_main">
                <ul>
                    <li>
                        <router-link to="/helpDetail?num=1">
                            <span>1</span>
                            素命毛报系高引县历周与水属效光
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/helpDetail?num=2">
                            <span>2</span>
                            切小步权志又或包观子史题是快
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/helpDetail?num=3">
                            <span>3</span>
                            型须济统片时性属论己斗产从力满位
                        </router-link>
                    </li>
                </ul>
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
    @import '../../common/css/helpCenter.css';
</style>