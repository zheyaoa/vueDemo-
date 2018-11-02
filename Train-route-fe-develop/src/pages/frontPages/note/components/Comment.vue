<template>
  <div class="comments">
    <div class="commentBox">
        <h3>评论</h3>
        <p v-if="commentss.length==0">暂无评论，我来发表第一篇评论！</p>
        <div v-else>
            <div class="comment" v-for="(comment,index) in comments" v-if="comment.isFirst" v-bind:index="index" >
                <b>{{comment.name}}
                  <span>{{comment.creatTime}}</span>
                  <a href="javascript:void(0)" @click="talkTo(comment.name,comment.conversationId)">回复</a>
                </b>
                <p >{{comment.commentContent}}</p>
            </div>
            <div class="comment reply"  v-else >
                <b>{{comment.name}}
                  <span>{{comment.creatTime}}</span>
                  <a href="javascript:void(0)" @click="talkTo(comment.name,comment.conversationId)">回复</a>
                </b>
                <p >{{comment.commentContent}}</p>
            </div>

        </div>
    </div>
    <div class="commentBox">
      <h3>{{label}}</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5}"
        placeholder="期待你的评论哦！"
        v-model="commentText">
      </el-input>
      <el-row>
        <el-button type="primary" class="new-btn-primary" @click="addComment">发表</el-button>
        <el-button type="primary" class="new-btn-cancel" @click="initComment">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['comments'],
  data: function () {
    return {
       toOther: false,
       label:'发表评论',
       commentText: '',

       newComment:{
         notesId:0,               //到父组件中赋值
         conversationId:0,
         isFirst:false,
         commentContent:'',
         userId:localStorage.getItem('userId'),  //本地存储
         name:localStorage.getItem('name'),  //本地存储
         createTime:''
       },
       talkToId:0
    }
  },
  computed:{
    commentss:function () {   // .length 出错的解决办法
      return this.comments||''
    }
  },
  methods: {
    toSubmit (id,isFirst,content) {
      let newComment=this.newComment;
      newComment.conversationId=id;
      newComment.isFirst=isFirst;
      newComment.commentContent=content;
      newComment.createTime=new Date();
      this.$emit("submit",newComment);  //通过函数submit传递给父组件
      this.initComment();
    },
    talkTo (name,id) {            //回复 某人 某评论
      this.toOther=true;
      this.toName=name;
      this.talkToId=id;                              //新回复的会话Id
      this.label='回复：'+name;
    },
    addComment () {            //添加评论
      let len=this.comments.length;
      let newComment=this.newComment;
      let id=this.comments[len-1].conversationId+1;  //新评论的会话id为旧评论最大+1
      let content=this.commentText;
      if(content=='')
        return ;
      if(this.toOther)
        this.toSubmit(this.talkToId,false,content);  //添加回复评论
      else
        this.toSubmit(id,true,content);   //添加笔记评论
    },
    initComment () {        //点击取消 还原
      this.toOther=false;
      this.label='发表评论';
      this.commentText = "";
    }
  }
}
</script>

<style scoped>
  .comments {
    width:800px;
    margin:20px auto;
  }
  /*.commentBox {*/
    /*margin:20px;*/
  /*}*/
  .commentBox h3 {
    color:#333;
    background:#f0f5f7;
    padding:8px 15px;
    margin-bottom: 10px;
    text-align:left;
    font-size:16px;
    border-left: 3px solid #7bb6d7;
  }
  .comment {
    font-size: 14px;
    color: #333;
    /*margin-left: 15px;*/
    padding-left: 18px;
    margin-bottom:15px;
    border-top:1px solid #ccc;
  }
  .comment b {
    display:block;
    margin:10px 0;
  }
  .comment b span {
    font-size:14px;
    margin:0 12px;
  }
  .comment p {
    line-height: 20px;
    /*margin-left: 5px;*/
  }
  .reply {
    margin-left:64px;
  }
  .commentBox button {
    float: right;
    margin: 20px 0 10px 10px;
  }

</style>
