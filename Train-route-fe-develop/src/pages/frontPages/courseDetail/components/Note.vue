<template>
    <div>
        <el-row>
            <el-col :span="12" :offset="6">
                <div class="note">
                    <div class="noteList">
                        <h1 class="title">笔记列表</h1>
                        <el-button type="success" class="addButton new-btn-primary" @click="addNote">添加笔记</el-button>
                        <el-table
                            :data="noteList"
                            stripe
                            max-height="250px"
                            class="table"
                            style="width: 100%">
                                <el-table-column prop="noteTitle" label="笔记名称" width="150"></el-table-column>
                                <el-table-column prop="createTime" label="发表时间" width="150"></el-table-column>
                                <el-table-column prop="read" label="浏览量" width="120"> </el-table-column>
                                <el-table-column prop="stars" label="点赞数" width="120"> </el-table-column>
                                <el-table-column prop="grade" label="分数" width="120">    </el-table-column>
                                <el-table-column label="操作" class="acticon">
                                    <template slot-scope="scope">
                                        <el-button @click="lookNote(scope.row)" type="text" >查看</el-button>
                                        <el-button @click="editorNote(scope.row)" type="text" >编辑</el-button>
                                        <el-button @click="deleteNote(scope.$index)" type="text" >删除</el-button>
                                    </template>
                                </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'noteList',
    props:{
        noteList:{
            type:Array
        }
    },
    data (){
        return{
        }
    },
    methods:{
        addNote (){
            this.$store.commit('changeNoteStatus',true)
            this.$store.commit('getEditorType',{
                isEdit:false,
                row:''
            })
        },
        lookNote(row){//跳转到对应笔记
            this.$router.push({name:'Note', params: { id:row.noteId}})
        },
        editorNote(row){
            console.log(row);
            this.$store.commit('changeNoteStatus',true)
            this.$store.commit('getEditorType',{
                isEdit:true,
                row:row
            })
        },
        deleteNote (index){
            this.$confirm('此操作将删除笔记，确定删除？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{//删除笔记，参数为noteId
                let data = {}
                axios.post('api/note/removeNote',data)
                .then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$emit('deleteNote',index)
                })
            })
        },
    }
}
</script>
<style lang="stylus" scoped>
    .acticon >>> .cell
        display flex
        justify-content space-around
    .noteList
        position relative
        margin-top .6rem
        .title
            font-size 20px
            line-height .8rem
            margin .2rem 0
        .addButton
            position absolute
            top .1rem
            right .4rem
        .table
            overflow auto

</style>
