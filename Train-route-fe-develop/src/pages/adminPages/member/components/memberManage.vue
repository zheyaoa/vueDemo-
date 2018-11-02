<template>
    <div class="memberManage">
        <div class="member">
            <div class="member-title">成员管理</div>
            <div class="member-search">
                <el-input v-model="elInput"
                          clearable
                          class="search-input"
                          placeholder="请输入姓名"
                          @clear="clearInput">
                </el-input>
                <el-button type="primary" icon="el-icon-search"
                           class="new-btn-primary search-button" @click="search(elInput)">查询</el-button>
            </div>
        </div>
        <el-table :data="searchMember" border style="width: 700px">
            <el-table-column prop="name"  label="姓名"></el-table-column>
            <el-table-column prop="group" label="所属小组"></el-table-column>
            <el-table-column prop="rate"  label="学习进度"></el-table-column>
            <el-table-column prop="notes" label="笔记数"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small">
                        <router-link :to="{name:'MemberData', params: {id: scope.row.memberId}}">查看</router-link>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "MemberManage",
        data () {
            return {
                elInput: '',
                allMember: [],
                searchMember: []
            }
        },
        methods: {
            // 查询
            search (name) {
                if(name === "") {
                    this.$message({
                        message: '请输入姓名！',
                        type: 'warning',
                        showClose: true
                    });
                }
                else {
                    for(var i = 0; i < this.allMember.length; i++) {
                        if(name === this.allMember[i].name) {
                            this.searchMember = this.allMember.slice(i, i + 1)
                        }
                        else {
                            this.$message({
                                message: '该学生不存在！',
                                type: 'error',
                                showClose: true
                            });
                        }
                    }
                }
            },
            // 清空输入框
            clearInput () {
                // console.log(1)
                this.searchMember = this.allMember
            },
            getInfo () {
                axios.get('/backstage/member.json')
                    .then(this.getInfoSucc)
            },
            getInfoSucc (res) {
                res = res.data
                if(res.ret && res.data) {
                    this.allMember = res.data.allMember
                    this.searchMember = res.data.allMember
                }
                // console.log(res)
            }
        },
        mounted () {
            this.getInfo()
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl';
    .memberManage
        manageArea()
        padding-left 40px
        .member
            margin-top 1.5rem
            .member-title
                font-size 24px
                margin-bottom .5rem
            .member-search
                margin-bottom .5rem
                display flex
                .search-input
                    width 4rem
                    margin-right .5rem
        .elTable
            box-sizing border-box
</style>
