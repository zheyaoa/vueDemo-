<template>
    <div class="notesManage">
        <div class="title">笔记管理</div>
        <el-table :data="allNote" border style="width: 900px">
            <el-table-column prop="title"   label="笔记标题" width="150"></el-table-column>
            <el-table-column prop="author"  label="作者"></el-table-column>
            <el-table-column prop="pubTime" label="发布时间" width="150"></el-table-column>
            <el-table-column prop="group"   label="所属小组"></el-table-column>
            <el-table-column prop="visits"  label="浏览量"></el-table-column>
            <el-table-column prop="thumbs"  label="点赞数"></el-table-column>
            <el-table-column prop="score"   label="分数"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small">
                        <router-link :to="{
                            name:'NoteScore',
                            params: {
                                noteId: scope.row.notesId,
                                memberId: scope.row.memberId
                            }
                        }">评分</router-link>
                    </el-button>
                    <el-button type="text" size="small"  @click="deleteIt(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "NotesManage",
        data () {
            return {
                allNote: []
            }
        },
        methods: {
            // 删除笔记
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
                        this.allNote.splice(index, 1)
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
                axios.get('/backstage/notes.json')
                    .then(this.getInfoSucc)
            },
            getInfoSucc (res) {
                res = res.data
                if(res.ret && res.data) {
                    this.allNote = res.data.allNote
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
    .notesManage
        manageArea()
        padding-left 40px
        .title
            margin-top 1.5rem
            font-size 24px
            margin-bottom .5rem
</style>
