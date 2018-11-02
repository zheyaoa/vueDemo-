<template>
    <div class="leftSide">
        <el-menu text-color="#00588D"
                 active-text-color="#fff"
                 :default-active="show">
            <el-menu-item class="menuItem" @click="jumpWay"     index="1"><i class="iconfont">&#xe732;</i>路线管理</el-menu-item>
            <el-menu-item class="menuItem" @click="jumpChapter" index="2"><i class="iconfont">&#xe7b3;</i>章节管理</el-menu-item>
            <el-menu-item class="menuItem" @click="jumpMember"  index="3"><i class="iconfont">&#xe7af;</i>成员管理</el-menu-item>
            <el-menu-item class="menuItem" @click="jumpNotes"   index="4"><i class="iconfont">&#xe7b9;</i>笔记管理</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'LeftSide',
        data () {
            return {
                show: '0'
            }
        },
        methods: {
            jumpWay () {
                this.$router.push({ path: '/Way' });
                
            },
            jumpChapter () {
                this.$router.push({ path: '/Chapter' });
                
            },
            jumpMember () {
                this.$router.push({ path: '/Member' });
                
            },
            jumpNotes () {
                this.$router.push({ path: '/Notes' });
                
            }
        },
        mounted () {
            var name = this.$route.name;
            if(name === 'Way')
                this.show = '1'
            else if (name === 'Chapter' || name === 'ChapterEdit')
                this.show = '2'
            else if (name === 'Member' || name === 'MemberData')
                this.show = '3'
            else if (name === 'Notes' || name === 'NoteScore')
                this.show = '4'
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl'
    .leftSide
        position fixed
        left 0
        top 1rem
        height 100%
        width 200px
        box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
        z-index: 10;
    .menuItem
        height 45px
        line-height 45px
        text-align center
        font-size: 14px;
        text-align left
    .is-active
        background #0067A6
    .iconfont
        padding: 0 12px 0 8px;
        font-size: 20px;
        color #00588D
    >>>.el-menu
        border none
</style>
