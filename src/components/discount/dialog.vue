<template>
    <div class="hdzq_dialog">
        <transition name="slide-dialog">
            <div class="dialog_main">
                {{ content }}
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props:['content'],
        mounted() {
            var _this = this;
            setTimeout(function(){
                _this.$parent.showDialog = false;
            },3000)
        },
    }
</script>

<style scope>
    .hdzq_dialog{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0);
        z-index: 1;
    }
    .dialog_main{
        min-width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.7);
        padding: 4% 6%;
        border-radius: 10px;
        color: #fff;
        opacity: 1;
    }
    .slide-dialog-enter-active {
        transition: all .3s ease;
    }
    .slide-dialog-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-dialog-enter, .slide-dialog-leave-to {
        opacity: 0;
    }
</style>
