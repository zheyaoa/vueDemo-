<template>
    <div class="chapter">
        <common-header></common-header>
        <common-left-side></common-left-side>
        <div class="chapter-content">
            <div class="content-title">章节管理</div>
            <div class="content-tabs">
                <own-chapter></own-chapter>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from 'common/header/Header.vue'
    import LeftSide from 'common/leftSide/LeftSide.vue'
    import OwnChapter from './components/OwnChapter.vue'
    export default {
        name: 'Chapter',
        components: {
            CommonHeader: Header,
            CommonLeftSide: LeftSide,
            OwnChapter: OwnChapter
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl'
    .chapter-content
        manageArea()
        padding-left 40px
        .content-title
            margin-top 1.5rem
            font-size 24px
            margin-bottom .5rem
        .content-tabs
            width 15rem
    .el-tabs--border-card >>> .el-tabs__content
        padding .8rem 1.2rem
</style>