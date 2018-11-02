<template>
  <div id="notice">
    <el-select v-model="type" placeholder="全部" >
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      >      
        <span >{{option.label}}<el-badge :value="option.number" v-if="option.number>0" style="float: right"></el-badge></span>    
      </el-option>
    </el-select>
    <el-collapse accordion>
      <el-collapse-item 
          v-for="notice in notices"
          :key="notice.noticeId">
        <template slot="title">
          <p @click="reading(notice)">
            <span class="noticeHead">{{notice.noticeTitle}}</span>
            <span class="noticeHead">{{notice.noticeTime}}</span>
            <span class="noticeHead"><el-tag size="mini" >{{noticeType(notice.noticeType)}}</el-tag></span>
            <span class="noticeHead"><el-badge value="new" :hidden="notice.readed==1"></el-badge></span>
          </p>
        </template>
        <div class="noticeDetail">
          <div class="content" v-html="notice.notesContent"></div>
          <div class="origin" style="float:right">————{{notice.from}}</div>
        </div>
      </el-collapse-item>      
    </el-collapse>
  </div>
</template>

<script>
import axios from 'axios'
var id=localStorage.getItem('userId')
var name=localStorage.getItem('name')
export default {
  name: 'Notices',
  data () {
    return {
      options: [
        {
          value: '1',
          label: '评分结果',
          number:0
        }, {
          value: '2',
          label: '评论通知',
          number:0
        }, {
          value: '3',
          label: '新的任务',
          number:0
        }, {
          value: '4',
          label: '点赞通知',
          number:0
        }],

      numbers:0,  //未读消息总数
      type:'',    //选项实际值
      messageType:0,
      
      notices:[]
    }
  },
  watch: {
    type () {                         //选择消息类型
      this.messageType=this.type;
      this.getJson();
    },
    numbers () {
      this.$emit('readNum',this.numbers);  //传递给父组件 消息中心 
    }
  },
  mounted: function () {   //页面加载 自动执行获取数据
     this.getJson()
  },
  methods: {
    init () {
      this.numbers=0;
      for (var i = 0; i < 4; i++) {
        this.options[i].number=0;
      }
    },
    getJson: function () {
      let messageType=this.messageType;
      console.log(messageType)
      axios.get('/static/easymock/notices.json',{params: {messageType,id,name} }).then((res) => {     
          if (res.data.state) {
            this.notices=res.data.data.notices;
            this.count(this.notices);
          }else{
            console.log("获取数据失败")
          }
      })
    },
    readNew (noticeId) {
      console.log(noticeId)
      // axios.get('/static/easymock/notices.json',{params: {noticeId,id,name} }).then((res) => {     
      //         if (res.data.state) {
                
      //         }else{
      //           console.log("获取数据失败")
      //         }
      //     })
    },
    count (notices) {          //统计各类型 未读消息数量
      this.init();           //初始化计数器
      let options=this.options;
      for (var i = 0; i < notices.length; i++) {
        if(notices[i].readed==0){
          this.numbers++;       //统计总数
          switch(notices[i].noticeType)
          {
            case 1: options[0].number++; break;
            case 2: options[1].number++; break;
            case 3: options[2].number++; break;
            case 4: options[3].number++; break;
            default: return '';
          }
        }
      }
    },
    reading (notice){   //展开消息时 将未读消息设置为已读
      if(notice.readed==1)
        return ;
      else{
        let type=notice.noticeType;
        this.options[type-1].number--;  //跟新各类型 未读消息数量
        this.numbers--;                 //统计总数
        notice.readed=1;             //触发wtach-> notices
        this.count(notice);
        this.readNew(notice.noticeId);
        // this.getJson();        //前后台跟新已读
      }
    },
    noticeType (id) {   //将消息Id转换为消息类型
      switch(id)
      {
        case 1: return '评分结果'; 
        case 2: return '评论通知'; 
        case 3: return '新的任务'; 
        case 4: return '点赞通知';
        default: return '';
      }
    }
  }
  
}
</script>

<style lang="stylus" scoped>
  .el-select
    margin-bottom 20px
  .noticeHead
    margin 0 10px
  .noticeDetail
    margin 10px 30px 10px 15px
</style>
