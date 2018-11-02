<template>
    <div class="header">
        <el-row>
          <el-col :span="10" class="header-left">
            <img class="icon" src="" alt="">
            <span class="title">新媒体工作室</span>
            <el-menu
                class="menu"
                mode="horizontal"
                background-color="#0064a9"
                text-color="#fff"
                active-text-color="#fff"
            >
                <el-menu-item index="1" @click="jumpStudyRoute">我的路线</el-menu-item>
                <el-menu-item index="2" @click="jumpNoteList">笔记列表</el-menu-item>
                <el-menu-item index="3" @click="jumpRanks">排行榜</el-menu-item>
            </el-menu>
          </el-col>
          <el-col class="header-right" :span="10">
              <span class="exit" @click="handleExitClick">
                  退出
                  <span class="iconfont">&#xe64e;</span>
              </span>
              <span class="username">你好，{{userName}}</span>
              <el-popover
                placement="bottom"
                width="200"
                trigger="hover"
                :content="tipContent">
                <span slot="reference" class="notice" @click="jumpNotice">
                    <el-badge  is-dot :hidden="noticesNumber==0">
                        <i class="el-icon-bell"></i>
                    </el-badge>
                  </span>
              </el-popover>
              <span class="personal" @click="jumpPersonal">个人中心</span>
          </el-col>
        </el-row>

        <el-breadcrumb class="breadMenu" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>

        <el-dialog
            title="提示"
            :visible.sync="isShow"
            :modal-append-to-body="false"
            width="30%">
            <span>确定退出？</span>
            <span slot="footer" class="footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="Exit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'Header',
    data() {
        return{
            userName:'NewMedia',
            noticesNumber:0,
            tipContent:'',
            isShow : false
        }
    },
    mounted: function () {   //页面加载 自动执行获取数据
     let userId=localStorage.getItem('userId');
     let name=localStorage.getItem('name');
     this.userName=name;
     axios.get('/static/easymock/notices.json',{params: {messageType:0,userId,name} })
     .then((res) => {
          if (res.data.state) {
            var notices=res.data.data.notices;
            for (var i = 0; i < notices.length; i++) {
                if(notices[i].readed==0){
                  this.noticesNumber++;       //未读消息数量
                }
            }
            this.tip();
          }else{
            console.log("获取数据失败")
          }
      });
    },
    props:{
        menuList:{
            type:Array
        }
    },
    methods:{
        tip () {
            if(this.noticesNumber>0){
                this.tipContent='当前有'+this.noticesNumber+'条未读消息';
            }
            else{
                this.tipContent='当前没有未读消息';
            }
        },
        jumpStudyRoute(){
            this.$router.push({ path: '/slectStudyRoute'})
        },
        jumpNoteList() {
            this.$router.push({ path: '/noteList' });
        },
        jumpRanks () {
            this.$router.push({ path: '/rankings' });
        },
        jumpPersonal () {
            this.$emit('selectTab','note');                  //传递给父组件 消息中心tab
            this.$router.push({ path: '/personal' });   //默认我的笔记tab
        },
        jumpNotice () {
            this.$emit('selectTab','notice');                  //传递给父组件 消息中心tab
            this.$router.push({name:'Personal', params: { tab: 'notice'}});
        },
        handleExitClick(){
            this.isShow = true
        },
        Exit (){
            this.isShow = false;
             this.$router.push({ path: '/' });
            window.localStorage.removeItem('userId')
            window.localStorage.removeItem('pass')
            //跳转至login页面
        }
    }
}
</script>
<style lang="stylus" scoped>
  @import '~style/varible.styl'
    .breadMenu
        border none
    .breadMenu >>> .el-breadcrumb__item
        cursor pointer
    .breadMenu >>> .el-breadcrumb__inner
        font-size .36rem
        color #0064a9
    .header
        height 1rem
        line-height 1rem
        background $primaryColor
        color: #ffffff
        box-sizing border-box
        /*border-bottom  1px solid #999*/
        box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.2);
        z-index 8
        // position relative
        .header-left
            padding-left  .4rem
            display  flex
            .icon
                height .72rem
                line-height 1rem
                width 1rem
                margin-right .2rem
                margin-top .14rem
            .title
                font-size .32rem
            .menu
                margin-left .4rem
                border-bottom 0
            .menu>>>li
                height 1rem
                line-height 1rem
        .header-right
            float right
            display flex
            flex-direction row-reverse
            padding-right .4rem
            .username
                margin 0 .4rem
            .exit
                cursor pointer
            .personal
                cursor pointer
            .notice
                line-height 0px
                margin auto .2rem
                cursor pointer
            .notice>>>.el-badge__content
                    border none


</style>
