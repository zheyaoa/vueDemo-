<template>
    <div class="editorNote">
        <el-dialog
            :title="this.editorType" 
            :visible="this.$store.state.isNoteComponentShow" 
            :close-on-click-modal ="false"
            :show-close ="false"
            :modal="false"
            width="45%" 
            top="5vh"
            @open ="handleOpen"
            ref="note"
            >
            <div class="formTable">
                <el-form :model="note" ref="note" label-width="120" :label-position= 'labelPosition' >
                    <el-form-item label="笔记所属课程">
                        <el-input v-model="this.$store.state.courseDetail.courseName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="标题" prop="noteTitle">
                        <el-input v-model="note.noteTitle" placeholder="请输入标题内容" :disabled="titleDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="笔记内容" prop="noteContent">
                        <mavon-editor 
                            v-model="note.noteContent"
                            :subfield ='false'
                            class="editor"
                            ref= "md"
                            @imgAdd="imgAdd"
                            :toolbars = 'toolbars'>
                        </mavon-editor>
                    </el-form-item>
                </el-form>
            </div>
            <div class="buttonGroup">
                <el-button class="new-btn-cancel" @click="handleClose">取消</el-button>
                <el-button
                    :disabled = "disabled"
                    type="primary" 
                    class="new-btn-primary" 
                    @click="onSubmit('note')" 
                    ref= "submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'EditorNote',
    data (){
        return{
            isShow:true,
            disabled:false,
            titleDisabled:false,
            labelPosition:'top',
            editorType:'添加笔记',
            note:{
                id:'',
                learningRecordId:0,
                noteTitle:'',
                noteContent:'',
            },
            toolbars:{
                        bold: true, // 粗体
                        italic: true, // 斜体
                        header: true, // 标题
                        quote: true, // 引用
                        ol: true, // 有序列表
                        ul: true, // 无序列表
                        link: true, // 链接
                        imagelink: true, // 图片链接
                        code: true, // code
                        table: true, // 表格
                        fullscreen: true, // 全屏编辑
                        htmlcode: true, // 展示html源码
                        help: true, // 帮助
                        /* 1.3.5 */
                        undo: true, // 上一步
                        redo: true, // 下一步
                        trash: true, // 清空
                         /* 1.4.2 */
                        navigation: true, // 导航目录
                        /* 2.2.1 */
                        subfield: true, // 单双栏模式
                        preview: true, // 预览
            }
        }
    },
    methods:{
        onSubmit(formName){
            this.disabled = true
            let editor =  this.$store.getters.editorDetail
                this.$refs[formName].validate((valid) =>{
                    if(!editor.isEdit){//如果是增加笔记状态
                        let data = JSON.stringify(this.note)
                        //笔记上传，若上传成功，跳转回detail页面,且删除localStorge的保存
                        axios.post('/api/note/addNote',data).then((res) => {
                            this.note.noteTitle = ''
                            this.note.noteContent = ''                    
                            this.$emit('submit', this.note)
                            this.$store.commit('changeNoteStatus',false)
                            this.$message({
                                type: 'success',
                                message: '上传成功!'
                            });
                            this.disabled = false 
                        })
                    }else{//如果是编辑笔记状态
                        let data = {
                            noteId:editor.noteId,
                            noteContent:this.note.notesContent
                        }
                        data = JSON.stringify(data)
                        axios.post('api/note/editNote',data).
                        then(()=>{
                            this.note.noteTitle = ''
                            this.note.noteContent = ''                    
                            this.$store.commit('changeNoteStatus',false)
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                        })
                    }
                })

        },
        //关闭笔记页面时保留输入
        handleClose (){
                this.$confirm(`你正在${this.editorType},退出后不能保存,确定退出吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.$store.commit('changeNoteStatus',false)
                    //将状态转化为编辑状态
                    this.$store.commit('getEditorType',{
                        isEdit:false,
                    })
                })
        },
        handleOpen (){
            //根据打开方式进行改变数据
            let editor =  this.$store.getters.editorDetail
            if(!editor.isEdit){
                this.editorType = '添加笔记'
                this.note.noteTitle = ''
                this.titleDisabled = false
            }else{//编辑笔记状态
                this.editorType = '编辑笔记'
                this.note.noteTitle = editor.noteTitle
                this.titleDisabled = true
                //根据noteId 获取 note内容
                let data = {
                    noteId : editor.noteId,
                    id:window.localStorage.getItem('userId')
                }
                axios.post('api/note/getNoteDetailInformation',data)
                .then((res)=>{
                    this.note.noteContent =  res.data.data.note.notesContent
                })
            } 
        },
        imgAdd (pos,$file){
            var formdata = new FormData()
            formdata.append('image', $file)
            axios({
                url: 'server url',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((url)=>{
                this.$refs.md.$img2Url(pos, url);
            })
        },
    },
    mounted (){
        //初始化时，若曾经在笔记页面有输入，则保留
        this.note.id = window.localStorage.getItem('userId')

        //获取learningRecordId
        let data = this.$store.getters.para
        axios.post('/api/learningRecord/insertLearningRecord',data)
        .then((res) =>{
            this.note.learningRecordId = parseInt(res.data.data.learningRecordId)
        })
    }
}
</script>
<style lang="stylus" scoped>
    .editorNote >>> .el-dialog__wrapper
        overflow hidden
        z-index 999 !important
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
    .editor>>>.v-note-edit
        height 6rem
    .v-note-help-wrapper
        z-index 9999 !important
    .editorNote
        overflow hidden
        .formTable
            width 90%
            padding 0 5%
        .buttonGroup
            position absolute
            right 7%
            bottom .3rem

</style>
