<template>
    <div class='page has-navbar'>
         <von-header>
            <button class="button button-icon ion-ios-arrow-left" slot="left" @click="onBackClick"></button>
	        <span slot="title">
	        	帮助中心
	        </span>
        </von-header>

        <div class="page-content">
            <div class="helpCenter_main helpCenter" v-if="$router.history.current.query.num == 1">
                <h5>素命毛报系高引县历周与水属效光</h5>
                <p>素命毛报系高引县历周与水属效光。通史部次开性关先总划断置林之。往即从立传精提老世论路时新。</p>
            </div>
            <div class="helpCenter_main helpCenter" v-if="$router.history.current.query.num == 2">
                <h5>切小步权志又或包观子史题是快</h5>
                <p>切小步权志又或包观子史题是快。领单亲青府点就话装原运传它政。叫民压期气气制回联省委百需。</p>
            </div>
            <div class="helpCenter_main helpCenter" v-if="$router.history.current.query.num == 3">
                <h5>型须济统片时性属论己斗产从力满位</h5>
                <p>型须济统片时性属论己斗产从力满位。导音合身只西程想运空法政但准连。低那干做最认确话可造清华角式。并压现领头称安织位万风重新石。千引当现对两于思件基养经方格没。因铁间地间东计法确队究步。</p>
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