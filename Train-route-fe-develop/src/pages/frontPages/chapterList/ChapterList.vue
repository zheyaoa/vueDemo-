<template>
    <div class="warpper">
        <common-header></common-header>
        <div class="content_wrap">
            <step :chapter-list="chapterList"></step>
            <home-page-menu :chapter-list="chapterList"></home-page-menu>
        </div>
    </div>
</template>
<script>
import Header from 'common/header/Header.vue'
import Step from './components/Step.vue'
import HomePageMenu from './components/Menu.vue'
import axios from  'axios'
export default {
    name:'HomePage',
    components:{
        CommonHeader:Header,
        Step,
        HomePageMenu
    },
    data (){
        return{
            chapterList:[]
        }
    },
    mounted (){
        let data = {
            learnId:this.$route.params.learnId
        }
        data = JSON.stringify(data)
        console.log(data)
        axios.post('/api/learning/showAllChapters',data)
        .then((res) =>{
            this.chapterList = res.data.data.chapters
        })
    }
}
</script>
<style lang="stylus" scoped>
  @import '~style/varible.styl'
    .warpper
        height 100%
        background #fff
        display  flex
        flex-direction column
        .content_wrap
            flex 1
            background $contentBackground
</style>
