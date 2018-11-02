<template>
    <div class="warpper">
        <router-link to="./">
            <div class="iconfont header-back">&#xe624;</div>
        </router-link>
        <h1 class="title">城市选择</h1>
    </div>
</template>
<script>
export default {
    name:'CityHeader',
}
</script>
<style lang="stylus" scoped>
    @import '~style/varibles.styl'
    @import '~style/mixins.styl'
    .warpper
        background $bgColor
        height .88rem
        line-height .88rem
        color #ffffff
        .header-back
            position absolute
            color #fff
            font-size .36rem
            height .88rem
            line-height .88rem
            padding  0 .1rem
        .title
            margin 0 1rem
            text-align  center
            ellipsis()
</style>