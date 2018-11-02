<template>
    <div class="wrapper">
        <common-header></common-header>
        <div class="content_wrap">
            <detail :course-detail="courseDetail" :index="stateIndex"> </detail>
            <note :note-list="noteList" @deleteNote="handleDelete"></note>
            <other-note-list :otherNoteList="otherNoteList"></other-note-list>
            <editor-note @submit="addNote"></editor-note>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios'
import CommonHeader from 'common/header/Header.vue'
import Detail   from './components/Detail.vue'
import Note from './components/Note.vue'
import otherNoteList from './components/other.vue'
import EditorNote from 'common/editorNote/EditorNote.vue'
export default {
    name:'CourseDetail',
    components:{
        CommonHeader,
        Detail,
        Note,
        otherNoteList,
        EditorNote
    },
    data (){
        return {
            stateIndex:0,            
            courseDetail:{},
            noteList:[],
            otherNoteList:[]
        }
    },
    methods:{
        handleDelete(index){
            this.noteList.splice(index,1)
        },
        addNote(note){
            let tmp = {
                noteTitle:note.noteTitle,
                read:0,
                stars:0,
                grade:0,
                createTime:new Date().toLocaleDateString()
            }
            console.log(tmp)
            
            this.noteList.push(tmp)
        }
    },
    mounted() {
        //做成异步请求,当获取到courseDetail时再进行后面的操作
        const promise = new Promise((reslove,reject) =>{
            //获取课程详情
            let data = {//参数为courseId
                courseId:parseInt(this.$route.params.courseId)
            }
            data = JSON.stringify(data)
            axios.post('/api/course/detail',data)
            .then((res) => {
                //courceDetail的数据传入vuex        
                this.courseDetail = res.data.data
                this.$store.commit('getCourseDetail',res.data.data)
                reslove()
            })

            //获取其他的笔记,参数为courseId 
            axios.post('api/note/othersNotes', data)
            .then((res)=>{
                this.otherNoteList = res.data.data.notes
            })
        })

        //进行第二步的操作
        promise.then((value) =>{
            //获取我的笔记详情
            let noteData = JSON.stringify(this.$store.getters.para)
            axios.post('/api/note/myNotes',noteData)
            .then((res) =>{
                this.noteList = res.data.data.notes
            })

            //获取页面的学习状态，参数为学号与课程号
            let para = {}
            para.studentId = window.localStorage.getItem('userId')
            para.courseId = parseInt(this.$store.state.courseDetail.courseId)
            axios.post('/api/learningRecord/getStudyState',para).
            then((res)=>{
                this.stateIndex = parseInt(res.data.data.studyState)
            })
        })


    },
}   
</script>
<style lang="stylus" scoped>
    .wrapper
        display flex
        flex-direction column
        height 100%
        .content_wrap
            flex 1
</style>
