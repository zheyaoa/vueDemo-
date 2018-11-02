<template>
    <div class="way">
        <common-header></common-header>
        <common-left-side></common-left-side>
        <way-manage></way-manage>
    </div>
</template>

<script>
    import Header from 'common/header/Header.vue'
    import LeftSide from 'common/leftSide/LeftSide.vue'
    import WayManage from './components/WayManage'
    export default {
        name: 'Way',
        components: {
            CommonHeader: Header,
            CommonLeftSide: LeftSide,
            WayManage: WayManage
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl'

</style>