<template>
  <div id="article">
    <h2 class="title">{{note.notesTitle}}</h2>
    <div class="infos">
      <div class="info-left">
        <span class="info">作者：{{note.name}}</span>
        <span class="info">课程名称：{{note.courseName}}</span>
      </div>
      <div class="info-right">
        <span class="info">评论数：{{note.commentNumber}}</span>
        <span class="info">浏览量：{{note.read}}</span>
        <span class="info">点赞数：{{note.starts}}</span>
      </div>
    </div>
    <span class="time">跟新时间：{{note.updateTime}}</span>
    <div class="content" v-html="note.notesContent"></div>
    <div class="good">
      <span class="imgs">
        <i class="iconfont greyHeart" v-if="!view" @click="change()">&#xe849;</i>
        <i class="iconfont redHeart"  v-else       @click="change()">&#xe849;</i>
      </span> 
      <span>点个赞鼓励下吧！</span>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'
var local_view=localStorage.getItem('view');     //获取存储在本地的点赞状态
export default {
  name: 'Article',
  props: ['note','start'],
  data: function () {
    return {
      view:this.start     //local_view
    }
  },
   methods:{
     change:function () {
       this.view=(this.view==false?true:false);
       localStorage.setItem('view',this.view);            //储存状态到本地，关闭页面重新打开会显示点赞状态
       let notesId=this.note.notesId;
       let userId=localStorage.getItem('userId');
       console.log(notesId+userId)
       // axios.get('/static/easymock/rank.json',{params: {notesId,userId} }).then((res) => {  
       //    if (res.data.state) {
       //       console.log("已点赞")
       //    }
       //  });
    }
  }
 
}
</script>

<style lang="stylus" scoped>
  #article 
    width 800px
    margin 50px auto
  .title
    font-size 28px
    margin-left 10px
  .infos
    height 20px
    margin 20px 40px 10PX 10PX
  .info-left
    float left
  .info-right
    float right
  .time
     margin-left 10px
  .content
    margin 20px 10px
    font-size 14px
    color #333
    line-height 20px
  .good
    margin-left 20px
  .imgs
    cursor pointer
  .greyHeart
    font-size 26px
    color #ccc
  .redHeart
    font-size 26px
    color red
</style>

