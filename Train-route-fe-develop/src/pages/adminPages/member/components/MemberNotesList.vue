<template>
    <div class="memberNotesList">
        <div class="title">笔记列表</div>
        <el-table :data="notesList" border height="250">
            <el-table-column prop="title"   label="笔记标题" width="150"></el-table-column>
            <el-table-column prop="pubTime" label="提交时间" width="150"></el-table-column>
            <el-table-column prop="visits"  label="浏览数"></el-table-column>
            <el-table-column prop="thumbs"  label="点赞数"></el-table-column>
            <el-table-column prop="score"   label="分数"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="text" size="small">
                        <router-link :to="{name:'Note', params: {id: scope.row.notesId}}">查看</router-link>
                    </el-button>
                    <el-button type="text" size="small">
                        <router-link :to="{
                            name:'NoteScore',
                            params: {
                                noteId: scope.row.notesId,
                                memberId: scope.row.memberId
                            }
                        }">评分</router-link>
                    </el-button>
                    <el-button type="text" size="small" @click="deleteIt(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "MemberNotesList",
        data () {
            return {
                notesList: []
            }
        },
        methods: {
            deleteIt (index) {
                this.$confirm('此操作将删除该笔记, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        // let data = {}
                        // axios.get('', data)
                        // .then(() => {

                        // })
                        this.notesList.splice(index, 1)
                        this.$message({
                            message: '您已经删除该笔记！',
                            type: 'success',
                            showClose: 'true',
                            center: 'true'
                        });
                    }).catch(() => {
                        this.$message({
                            message: '已取消删除',
                            type: 'info',
                            showClose: 'true',
                            center: 'true'
                        });          
                    });
            },
            getInfo () {
                axios.get('/backstage/notesList.json')
                    .then(this.getInfoSucc)
            },
            getInfoSucc (res) {
                res = res.data
                if(res.ret && res.data) {
                    this.notesList = res.data.memberNotesList
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
    .memberNotesList
        background-color #fff
        border-radius 10px
        padding .5rem
        width 15rem
        height 5.5rem
        .title
            font-size 18px
            margin-bottom .4rem
</style>