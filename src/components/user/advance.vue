<template>
    <div id="advance" class="page has-navbar">
        <von-header>
            <button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
	        <span slot="title">
                标题
	        </span>
        </von-header>

        <div class="page-content">
            <div class="advance_main">
                <div class="advance_club fix">
                    <video :poster="sponsorVideoImg" style="width:100%" preload="none" controls="true" muted="true">
                        <source src="https://video_shejigao.redocn.com/video/201801/20180131/Redcon_201801291114374680611275.mp4" type="video/mp4">
                    </video>
                </div>


                <div class="advance_exhibition fix">
                    <div class="advance_exhibition_slider swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" 
                                v-for="(item, index) in someList" 
                                :key="index"
                                :data-Ename='item.Ename'
                                :data-name="item.name">
                                    <img :src="item.img">
                            </div>
                        </div>
                    </div>
                    <h5>{{ Ename }}</h5>
                    <p>{{ name }}</p>
                </div>

                <div class="advance_cooper fix">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { slider, slideritem } from 'vue-concise-slider'
    export default {
        data () {
            return {
                options: {
                    pagination: true,
                    thresholdDistance: 100, // Sliding distance threshold
                    thresholdTime: 300, // Sliding time threshold decision
                    grabCursor: true, // Scratch style
                },
                someList:[
                    {
                        img: require('../../common/img/advance_exhibition_img1.png'),
                        Ename: 'aaa',
                        name: 'name1',
                        style: {
                            'width': '60%'
                        }
                    },
                    {
                        img: require('../../common/img/advance_exhibition_img1.png'),
                        Ename: 'bbb',
                        name: 'name2',
                        style: {
                            'width': '60%'
                        }
                    },
                    {
                        img: require('../../common/img/advance_exhibition_img1.png'),
                        Ename: 'ccc',
                        name: 'name3',
                        style: {
                            'width': '60%'
                        }
                    },
                    {
                        img: require('../../common/img/advance_exhibition_img1.png'),
                        Ename: 'ddd',
                        name: 'name4',
                        style: {
                            'width': '60%'
                        }
                    },
                    {
                        img: require('../../common/img/advance_exhibition_img1.png'),
                        Ename: 'eee',
                        name: 'name5',
                        style: {
                            'width': '60%'
                        }
                    },
                ],
                Ename: '',
                name: '',
                sponsorVideoImg: require('../../common/img/sponsor_video_img.png'),
            }
        },
        methods: {
        },
        mounted () {
            var _this = this;

            var swiper = new Swiper('.swiper-container', {
                loop: true,
                effect: "coverflow",
                centeredSlides: true,
                slidesPerView: "auto",
                initialSlide: 0,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 97,
                    depth: 240,
                    modifier: 1,
                    slideShadows: false
                },
                on:{
                    init: function(){
                        _this.Ename = $(".advance_exhibition_slider .swiper-wrapper .swiper-slide").eq(this.activeIndex)[0].dataset.ename;
                        _this.name = $(".advance_exhibition_slider .swiper-wrapper .swiper-slide").eq(this.activeIndex)[0].dataset.name 
                    },
                    slideChange: function (){
                        _this.Ename = $(".advance_exhibition_slider .swiper-wrapper .swiper-slide").eq(this.activeIndex)[0].dataset.ename;
                        _this.name = $(".advance_exhibition_slider .swiper-wrapper .swiper-slide").eq(this.activeIndex)[0].dataset.name 
                    }
                },
            }); 
        },
        components: {
            slider,
            slideritem,
        }
    }
</script>

<style scoped>
    @import '../../common/css/swiper.min.css';
    @import "../../common/css/style.css";
    @import "../../common/css/advance.css";
</style>