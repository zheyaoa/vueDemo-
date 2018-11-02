<template>
  <div class="warpper">
    <common-header></common-header>
    <div id="page">
      <Article :note="oneNote" :start="isStared"></Article>
      <Comment 
        :comments="comment"
        @submit="newComment"
      ></Comment>
    </div>
  </div>
</template>

<script>
import Header from 'common/header/Header.vue'
import Article from './components/Article'
import Comment from './components/Comment'
import axios from 'axios'
export default {
  name: 'Note',
  components: {
    CommonHeader:Header,
    Article,
    Comment
  },
  data () {
    return {
      key:0,
      oneNote:{},
      isStared:false,
      comment:[]
    }
  },
  mounted: function () {   //页面加载 自动执行
    this.key = this.$route.params.id;  //接收笔记列表或我的笔记跳转 传递过来的参数
    console.log("获取id为"+this.key+"的笔记")
    this.getJson(this.key);
  },
  methods: {
    getJson: function (notesId) {
      let userId=localStorage.getItem('userId');
      axios.get('/static/easymock/note.json',{params: {notesId,userId} }).then((res) => {   //{params: {message} }
        console.log(res.data)
         if(res.data.state) {
          console.log(res.data.data)
           this.oneNote=res.data.data.note;
           this.isStared=res.data.data.isStared;
           this.comment=res.data.data.comment;
         }
      })
    },
    
    newComment (newComments) {   //获取子组件 传来的 评论 数据 并发送
      newComments.notesId=this.oneNote.notesId;
      let comments= JSON.stringify(newComments)
      console.log(comments) 
      // axios.get('https://www.easy-mock.com/mock/5ae9a3e72143971175d787ed/test/post',
      //      {params: {comments} })//参数
      //      .then(this.getData)
    }
  }

  
}
</script>

<style lang="stylus" scoped>
  .warpper
    height 100%
    overflow auto
    background #f0f5f7
  #page 
    width 900px
    margin 100px auto
    border 1px #ccc solid
    background #fff
</style>
