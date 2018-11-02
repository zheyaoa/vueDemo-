<template>
  <div class="warpper">
    <common-header></common-header>
    <div id="page">
      <SelectNote class="head" 
                  v-bind:options="courses" 
                  v-on:selectSort="sentSort">
      </SelectNote>
      <EasyNote class="note"
                  v-for="note in notes"
                  v-bind:key="note.notesId"
                  v-bind:note="note">
      </EasyNote>
    </div>
  </div>
</template>

<script>
import Header from 'common/header/Header.vue'
import SelectNote from './components/SelectNote'
import EasyNote from './components/EasyNote'
import axios from 'axios'
export default {
  name: 'NoteList',
  components: {
    CommonHeader:Header,
    EasyNote: EasyNote,
    SelectNote: SelectNote
  },
  data: function () {
    return {
      params:{courseId:0,isChoose:false,sortWay:0}, //参数: 所属课程名称 是否精选笔记 排序方法
      way:-1,
      courses: [],
      notes: []
    }
  },
  mounted: function () {   //页面加载 自动执行
    axios.get('/static/easymock/notes.json') .then((res) => {
        this.courses=res.data.data.courses; 
      });
    this.getJson(this.params)
  },
  methods: {
    sentSort (newParams) {
      this.params=newParams;
      console.log(this.params)
      this.getJson(this.params)
    },
    getJson (message) {
      // let courseId=this.params.courseId;
      // let isChoose=this.params.isChoose;
      // let sortWay=this.params.sortWay;
      // console.log(courseId+","+isChoose+","+sortWay)
      axios.get('https://www.easy-mock.com/mock/5ae9a3e72143971175d787ed/test/post',{params: {message} }).then((res) => {  
          if (res.data.state) {
            this.notes=res.data.data.notes;
          }
      });
    }
  }

  
}
</script>

<style  scoped>
  .warpper{
    height:100%; 
    overflow:auto; 
    background:#f0f5f7; 
  }
  #page {
    width: 900px;
    margin: 70px auto;
    padding: 30px 0;
    background: #fff;
  }
</style>

