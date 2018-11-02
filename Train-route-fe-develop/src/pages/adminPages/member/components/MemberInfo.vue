<template>
    <div class="memberInfo">
        <div class="title">个人资料</div>
        <el-row type="flex">
            <div class="item">姓名：{{memberInfo.name}}</div>
            <div class="item">班级：{{memberInfo.memberClass}}</div>
            <div class="item">所属小组：{{memberInfo.group}}</div>
        </el-row>
        <el-row type="flex">
            <div class="item">学习方向：{{memberInfo.direction}}</div>
            <div class="item">联系方式：{{memberInfo.phoneNumber}}</div>
        </el-row>
        <el-row type="flex">
            <div>座右铭：{{memberInfo.motto}}</div>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "MemberInfo",
        data () {
            return {
                memberId: "0",
                memberInfo: {}
            }
        },
        methods: {
            getInfo (id) {
                axios.get('/backstage/member.json')
                    .then(this.getInfoSucc)
            },
            getInfoSucc (res) {
                res = res.data
                if(res.ret && res.data) {
                    this.memberInfo = res.data.allMember[this.memberId - 1]
                }
                // console.log(this.memberInfo)
            }
        },
        mounted () {
            this.memberId = this.$route.params.id
            // console.log(this.memberId)
            this.getInfo(this.memberId)
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl'
    .memberInfo
        background-color #fff
        border-radius 10px
        padding .5rem .5rem 0
        margin .5rem 0 .8rem
        width 15rem
        .title
            font-size 18px
            margin-bottom .4rem
        .el-row
            font-size 16px
            padding .5rem 0
            .item
                width 5rem
</style>