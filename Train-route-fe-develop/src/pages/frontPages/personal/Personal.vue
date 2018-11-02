<template>
 <div class="warpper">
    <common-header @selectTab="changeTab"></common-header>
    <div id="page">
      <el-tabs type="border-card" v-model="tabs" :value='tabs'>
        <el-tab-pane name="note">
          <span slot="label"><i class="el-icon-edit"></i> 我的笔记</span>
          <NotesForm @updateNote="updateOne"></NotesForm>
        </el-tab-pane>
        <el-tab-pane name="notice">
          <span slot="label"> <i class="el-icon-bell"></i> 消息中心 <el-badge  is-dot :hidden="noReading" ></el-badge></span>
          <Notices @readNum="hasRead"></Notices>
        </el-tab-pane>
        <el-tab-pane name="user">
          <span slot="label"><i class="el-icon-date"></i> 个人资料</span>
          <UserMessage></UserMessage>
        </el-tab-pane>
      </el-tabs>
    </div>
    <update-note :noteId="noteId" :isShow="state" @hide="state=false"></update-note>
  </div>
</template>

<script>
import Header from 'common/header/Header.vue'
import NotesForm from './components/NotesForm'
import Notices from './components/Notices'
import UserMessage from './components/UserMessage'
import UpdateNote from 'common/editorNote/UpdateNote.vue'
import axios from 'axios'

export default {
  name: 'Note',
  components: {
    CommonHeader:Header,
    NotesForm,
    Notices,
    UserMessage,
    UpdateNote
  },
  data () {
    return {
      tabs:'note',
      key:0,
      notices:[],
      noReading:true,
      noteId:0,
      state:false
    }
  },
  mounted () {   //页面加载 自动执行
    if(this.$route.params.tab){            //其它页面点击 直接进入到消息tab
      this.tabs = this.$route.params.tab;  //接收笔记列表或我的笔记跳转 传递过来的参数
      // console.log(this.tabs)
    }
  },
  methods:{
    changeTab (tab){                       //点击个人中心与铃铛时切换 tab
      this.tabs=tab;
      // console.log(this.tabs)
    },
    hasRead (number){
     this.noReading=(number>0?false:true);
    },
    updateOne (noteId) {
      this.noteId=noteId;
      this.state=true;
    }
  }

}
</script>
<!--
<style lang="stylus" >
  #page
    width 1000px
    margin 100px auto
  .el-tabs__item
    line-height 0px !important
</style> -->
<style scoped>
  .warpper{
    height:100%; 
    overflow:auto; 
    background:#f0f5f7;
  }
  #page {
    width: 1000px;
    margin: 100px auto 50px auto;
    background:#f0f5f7;
  }
  .el-tabs__item{
    /*line-height:0px !important; */
    /*padding: 10px 10px;*/
  }

</style>
