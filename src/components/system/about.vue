<template>
    <div class="page has-navbar">
        <von-header>
            <button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	关于我们
	        </span>
        </von-header>

        <div class="page-content">
            <div class="about_tab">
                <ul>
                    <li 
                        v-for="(item, index) in tabs" 
                        :class="{ active:index == num }"
                        @click="tabClick(index)">{{ item }}</li>
                </ul>
            </div>

            <!-- 1 -->
            <div class="about_box" v-if="num == 0">
                <div class="inner">
                    <h5>标题</h5>
                    <p>内容内容内容内容内容内容内容内容内容内容</p>
                    <br>
                    <h5>标题</h5>
                    <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                </div>
            </div>

            <!-- 2 -->
            <div class="about_box" v-if="num == 1">
                <div class="inner">
                    <h5>标题</h5>
                    <p>内容内容内容内容内容内容内容内容内容内容</p>
                    <br>
                    <h5>标题</h5>
                    <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                </div>
            </div>

            <!-- 3 -->
            <div class="about_box" v-if="num == 2">
                <div class="inner">
                    <h5>标题</h5>
                    <p>内容内容内容内容内容内容内容内容内容内容</p>
                    <br>
                    <h5>标题</h5>
                    <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs:['tab1','tab2','tab3'],
                num: 0
            }
        },
        methods: {
            tabClick: function (index) {
                this.num = index
            }
        },
    }
</script>

<style scope>
    @import '../../common/css/style.css';
    @import '../../common/css/about.css';
</style>