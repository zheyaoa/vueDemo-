import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        isNoteComponentShow:false,
        courseDetail:{

        },
        editorDetail:{
            isEdit:false
        }
    },

    mutations:{
        changeNoteStatus (state,status){
            state.isNoteComponentShow = status
        },
        getCourseDetail (state,detail){
            state.courseDetail = detail;
        },
        //向editorNote传递编辑笔记的类型
        getEditorType (state,obj){
            state.editorDetail.isEdit = obj.isEdit,
            state.editorDetail.row = obj.row
        }
    },
    getters:{
        para:(state)=>{
            let para = {}
            para.studentId = window.localStorage.getItem('userId')
            para.courseId  = state.courseDetail.courseId
            para = JSON.stringify(para)
            return para
        },
        editorDetail:(state)=>{
            let data = {

            }
            if(!state.editorDetail.isEdit){
                data.isEdit = false
            }else{
                data.isEdit = true
                data.noteTitle = state.editorDetail.row.noteTitle
                data.noteId = state.editorDetail.row.noteId
            }
            return data
        }
    }
})