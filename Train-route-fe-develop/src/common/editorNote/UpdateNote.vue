<template>
    <div class="editorNote">
        <el-dialog 
            title="新增笔记" 
            :visible="isShow" 
            width="50%" 
            @close="handleClose"
            ref="note"
            >
            <div class="formTable">
                <el-form :model="note" ref="note" label-width="120" :label-position= 'labelPosition' >
                    <el-form-item label="笔记所属课程">
                        <el-input v-model="note.courseName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="note.noteTitle" placeholder="请输入标题内容"></el-input>
                    </el-form-item>
                    <el-form-item label="笔记内容">
                        <mavon-editor v-model="note.notesContent"/>
                    </el-form-item>
                </el-form>
            </div>
            <div class="buttonGroup">
                <el-button type="primary" class="new-btn-primary" @click="onSubmit('note')">完成修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'EditorNote',
    props: ['noteId','isShow'],
    data (){
        return{
            submit:false,
            labelPosition:'top',
            note:{
                id:'',
                courseName:'',
                learningRecordId:'',
                noteTitle:'',
                notesContent:'',
            },
            local_title:'',
            local_content:''
        }
    },
    watch : {
        noteId () {    //修改不同笔记时
            window.localStorage.removeItem('noteTitle')
            window.localStorage.removeItem('notesContent')
            this.getDate(this.noteId);
        }  
    },
    methods:{
        getDate (id) {
            axios.get('/static/easymock/note.json') .then((res) =>{
                console.log(id)
                let data=res.data.data.note;
                window.localStorage.setItem('noteTitle',data.notesTitle);
                window.localStorage.setItem('noteContent',data.notesContent);
                this.local_title=localStorage.getItem('noteTitle');
                this.local_content=localStorage.getItem('noteContent');
                this.note.id=id;
                this.note.courseName=data.courseName;
                this.note.learningRecordId=666;
                this.note.noteTitle=this.local_title;
                this.$nextTick(() => { this.note.notesContent=this.local_content; })
                console.log(this.note)
            })
        },
        update (note) {
            // let noteId=this.note.id;
            // let noteTitle=this.note.noteTitle;
            // let noteContent=this.note.notesContent;
            axios.get('/static/easymock/note.json',{params: {note} }) .then((res) =>{
                if(res.data.state)
                    console.log("ok")
            })
        },
        change () {     //判断笔记是否有修改
            if(this.note.noteTitle==this.local_title&&this.note.notesContent==this.local_content)
                return false;
            else
                return true;
        },
        onSubmit(formName){
          this.submit=true;
          if(this.change())
            this.$refs[formName].validate((valid) =>{
                let newNote = JSON.stringify(this.note)
                this.$confirm('确认修改笔记', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({type: 'success', message: '修改成功!'}); 
                    this.update(newNote);
                    this.getDate(this.noteId);    //笔记修改后刷新
                    // this.$emit('hide');        //传递给父组件 控制关闭
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消修改'});
                    this.note.noteTitle=this.local_title;
                    this.note.notesContent=this.local_content;
                });
            })

        },
        //关闭笔记页面时
        handleClose (){
            if(this.change()&&!this.submit)    //修改且没有上传
                this.$message.warning('你忘记保存所做的修改！');
            else{
                this.submit=false;
                this.$emit('hide');  //传递给父组件 控制关闭
                
            }
        },
    }
}
</script>
<style lang="stylus" scoped>
    .editorNote >>> .el-dialog__wrapper
       
    .editorNote >>> .el-dialog__header
        padding .08rem .6rem
    .editorNote >>> .el-dialog__title
        line-height 24px
        font-size 14px
        color #303133
    .editorNote >>> .el-dialog__body
        padding-top .2rem
        padding-bottom  1.4rem
    .editorNote >>> .el-form-item
        margin 0
    .editorNote >>> .el-form-item__label
        padding  0
    .editorNote >>> .el-dialog
        margin-top 10vh
    .editorNote
        overflow hidden
        .formTable
            width 90%
            padding 0 5%
        .buttonGroup
            position absolute
            right 47%
            bottom .3rem

</style>
