<template>
    <div class="member">
        <common-header></common-header>
        <common-left-side></common-left-side>
        <member-manage></member-manage>
    </div>
</template>

<script>
    import Header from 'common/header/Header.vue'
    import LeftSide from 'common/leftSide/LeftSide.vue'
    import MemberManage from './components/MemberManage.vue'
    export default {
        name: 'Member',
        components: {
            CommonHeader: Header,
            CommonLeftSide: LeftSide,
            MemberManage: MemberManage
        }
    }
</script>

<style lang="stylus" scoped>

</style>