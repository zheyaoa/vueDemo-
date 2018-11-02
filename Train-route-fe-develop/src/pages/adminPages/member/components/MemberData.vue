<template>
    <div class="memberData">
        <common-header></common-header>
        <common-left-side></common-left-side>
        <div class="member-content">
            <member-info></member-info>
            <member-notes-list></member-notes-list>
        </div>
    </div>
</template>

<script>
    import Header from 'common/header/Header.vue'
    import LeftSide from 'common/leftSide/LeftSide.vue'
    import MemberInfo from './MemberInfo.vue'
    import MemberNotesList from './MemberNotesList.vue'
    import axios from 'axios'
    export default {
        name: "MemberData",
        components: {
            CommonHeader: Header,
            CommonLeftSide: LeftSide,
            MemberInfo: MemberInfo,
            MemberNotesList: MemberNotesList
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl'
    .member-content
        manageArea()
        padding-left 1.5rem
</style>