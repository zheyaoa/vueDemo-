<template>
    <div class="menu">
        <el-row>
            <el-col :span="8" :offset = "8">
                <template v-for="chapter in chapterList">
                    <div class="item" :key="chapter.chapterId">
                        <div class="title">
                            <h1>{{chapter.chapterName}}</h1>
                        </div>
                        <div class="footer">
                            <div class="detail">
                                <div class="desc">{{chapter.chapterInfo}}</div>
                                <el-button type="primary" class="new-btn-primary" @click="chapterStudy(chapter.chapterId)">进入学习</el-button>
                            </div>
                        </div>
                    </div>
                </template>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'HomePageMenu',
    data (){
        return{

        }
    },
    props:{
        chapterList:{
            type:Array
        }
    },
    methods:{
        chapterStudy (chapterId){
            this.$router.push({name:'courceList',params:{chapterId}})
        }
    },
}
</script>
<style lang="stylus" scoped>
@import '~style/varible.styl'
    .menu
        .item
            width 100%
            box-sizing border-box
            margin .8rem  0
            padding .4rem
            border #7bb6d7
            border-radius .2rem
            background #ffffff
            box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.1);
            .title
                font-size .64rem
                padding .2rem
                border-bottom $borderColor
                color $darkTextColor
            .footer
                display flex
                .imgBox
                    flex 1
                    display flex
                    justify-content center
                    align-items center
                    .img
                        height 5rem
                        width  5rem
                .detail
                    flex 1
                    .desc
                        min-height 4rem
                        line-height .6rem
                        box-sizing border-box
                        margin: 0.4rem 0.2rem;
                        font-size .36rem
                    button
                        float right
                        margin 0 .2rem .2rem 0


</style>
