<template>
    <div class="notes">
        <common-header></common-header>
        <common-left-side></common-left-side>
        <notes-manage></notes-manage>
    </div>
</template>

<script>
    import Header from 'common/header/Header.vue'
    import LeftSide from 'common/leftSide/LeftSide.vue'
    import NotesManage from './components/NotesManage'
    export default {
        name: 'Notes',
        components: {
            CommonHeader: Header,
            CommonLeftSide: LeftSide,
            NotesManage: NotesManage
        }
    }
</script>

<style lang="stylus" scoped>

</style>