<template>
    <div id="joinus" class="page has-navbar">
        <von-header>
            <button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
            <span slot="title">
                标题
            </span>
        </von-header>

        <div class="page-content">
            <div class="joinus_inner">
                <slider ref="slider" :options="options" @slide='slide'>
                    <slideritem class="joinus_box1">
                        <img src="../../common/img/joinus_title.png" class="title" >
                        <img :src="require('../../common/img/joinus_sadf.png')" class="img">
                        <ul>
                            <li class="fix">
                                <div class="mid">
                                    <h6>标题</h6>
                                    <p>word</p>
                                </div>
                            </li>
                            <li class="fix">
                                <div class="mid">
                                    <h6>标题</h6>
                                    <p>word</p>
                                </div>
                            </li>
                        </ul>
                    </slideritem>
                    <slideritem class="joinus_box2" style="overflow-y: auto;padding-bottom: 40px;">
                        <div class="fix">
                            <img src="../../common/img/joinus_title.png" >
                        </div>
                        <ul>
                            <li>
                                <img src="../../common/img/joinus_gks.png">
                                <div>
                                    <h6 class="primary_color">标题</h6>
                                    <p>wordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordword</p>
                                </div>
                            </li>
                            <li>
                                <img src="../../common/img/joinus_gks.png">
                                <div>
                                    <h6 class="primary_color">标题</h6>
                                    <p>wordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordword</p>
                                </div>
                            </li>
                            <li>
                                <img src="../../common/img/joinus_gks.png">
                                <div>
                                    <h6 class="primary_color">标题</h6>
                                    <p>wordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordword</p>
                                </div>
                            </li>
                            <li>
                                <img src="../../common/img/joinus_gks.png">
                                <div>
                                    <h6 class="primary_color">标题</h6>
                                    <p>wordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordword</p>
                                </div>
                            </li>
                        </ul>
                    </slideritem>
                    <slideritem class="joinus_box3">
                        <img src="../../common/img/joinus_title.png">
                        <ul>
                            <li>
                                <img src="../../common/img/joinus_hytj.png">
                            </li>
                            <li>
                                <img src="../../common/img/joinus_hytj.png">
                            </li>
                            <li>
                                <img src="../../common/img/joinus_hytj.png">
                            </li>
                            <li>
                                <img src="../../common/img/joinus_hytj.png">
                            </li>
                        </ul>
                    </slideritem>
                </slider>
                <md-button 
                    class="button copyBtn" 
                    style="position: absolute;z-index: 1;opacity:0" 
                    :style="{ top: boxOneTop, left: boxOneLeft }"
                    data-clipboard-text="liairyu2020@gmail.com" 
                    v-show="showCopy"
                    @click.native="copyClick">复制</md-button>
                <md-button 
                    class="button copyBtn" 
                    style="position: absolute;z-index: 1;opacity:0" 
                    :style="{ top: boxTwoTop, left: boxTwoLeft }"
                    data-clipboard-text="@LLxiaoqi" 
                    v-show="showCopy"
                    @click.native="copyClick">复制</md-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard'
    import { slider, slideritem } from 'vue-concise-slider'
    export default {
        data() {
            return {
                showCopy: true,
                boxOneTop: '0px',
                boxOneLeft: '0px',
                boxTwoTop: '0px',
                boxTwoLeft: '0px',
                options: {
                    pagination: false,
                    thresholdDistance: 100, // Sliding distance threshold
                    thresholdTime: 300, // Sliding time threshold decision
                    grabCursor: true, // Scratch style
                    speed: 300, // Sliding speed
                    loop: true, // Infinite loop
                    autoplay: 3000 // Auto play[ms]
                },
                clipboardO: null
            }
        },
        methods: {
            slide (data) {
                if(data.currentPage == 0){
                    this.showCopy = true
                }else{
                    this.showCopy = false
                }
            },
        },
        components: {
            slider,
            slideritem,
        },
        destroyed: function () {
            if(this.clipboardO != null){
                this.clipboardO.destroy();
            }
        }
    }
</script>

<style scoped>
    @import url(../../common/css/joinus.css);
</style>