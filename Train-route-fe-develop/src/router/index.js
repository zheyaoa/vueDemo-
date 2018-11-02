import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login.vue'
import ChapterList from 'frontPages/chapterList/ChapterList.vue'
import StudyRoute from 'frontPages/StudyRoute/StudyRoute.vue'
import CourceList from 'frontPages/courceList/CourceList.vue'
import CourseDetail from 'frontPages/courseDetail/CourseDetail.vue'
import Rankings from '@/pages/frontPages/rankings/Rankings'
import NoteList from '@/pages/frontPages/noteList/NoteList'
import Note from '@/pages/frontPages/note/Note'
import Personal from '@/pages/frontPages/personal/Personal'
import Way from '@/pages/adminPages/way/Way'
import Chapter from '@/pages/adminPages/chapter/Chapter'
import ChapterEdit from '@/pages/adminPages/chapter/components/ChapterEdit.vue'
import Member from '@/pages/adminPages/member/Member'
import MemberData from '@/pages/adminPages/member/components/MemberData.vue'
import Notes from '@/pages/adminPages/notes/Notes'
import NoteScore from '@/pages/adminPages/notes/components/NoteScore.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
      //修改成登入页面
    },
    {
      path:'/chapterList/:learnId',
      name:'chapterList',
      component:ChapterList
    },
    {
      path:'/slectStudyRoute',
      name:'StudyRoute',
      component:StudyRoute
    },
    {
      path:'/courceList/:chapterId',
      name:'courceList',
      component:CourceList
    },
    {
      path:'/courseDetail/:courseId',
      name:'courseDetail',
      component:CourseDetail
    },
    {
      path: '/rankings',
      name: 'Rankings',
      component: Rankings
    },{
      path: '/noteList',
      name: 'NoteList',
      component: NoteList
    },{
      path: '/note/noteId=:id',
      name: 'Note',
      component: Note
    },{
      path: '/personal',
      name: 'Personal',
      component: Personal
    },{
      path: '/way',
      name: 'Way',
      component: Way
    },{
      path: '/chapter',
      name: 'Chapter',
      component: Chapter
    },{
      path: '/chapterEdit/chapterId=:id',
      name: 'ChapterEdit',
      component: ChapterEdit
    },{
      path: '/member',
      name: 'Member',
      component: Member
    },{
      path: '/memberData/memberId=:id',
      name: 'MemberData',
      component: MemberData
    },{
      path: '/notes',
      name: 'Notes',
      component: Notes
    },{
      path: '/noteScore/noteId=:noteId&memberId=:memberId',
      name: 'NoteScore',
      component: NoteScore
    }
  ]
})
