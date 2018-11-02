<template>
  <div id="user">
    <h3>个人资料</h3>
    <el-form :model="user"  label-width="80px" label-position="left" class="demo-ruleForm">
      <el-form-item label="学号：">
        <el-input v-model="user.id" size="medium" readonly></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="user.name" size="medium" readonly></el-input>
      </el-form-item>
      <el-form-item label="技能：" >
        <el-input  size="medium" type="textarea" autosize
                  v-model="user.skills" :readonly="nowrite"></el-input>
      </el-form-item>
      <el-form-item label="座右铭：">
        <el-input  size="medium" type="textarea" autosize
                  v-model="user.motto" :readonly="nowrite"></el-input>
      </el-form-item>
      <el-form-item label="qq邮箱：">
        <el-input v-model="user.email" size="medium" :readonly="nowrite"></el-input>
      </el-form-item>
      <el-form-item label="QQ：">
        <el-input v-model="user.qq" size="medium" :readonly="nowrite"></el-input>
      </el-form-item>
      <el-form-item label="微信：">
        <el-input v-model="user.weChat" size="medium" :readonly="nowrite"></el-input>
      </el-form-item>
      <el-form-item label="github：">
        <el-input v-model="user.github" size="medium" :readonly="nowrite"></el-input>
      </el-form-item>
      <el-button type="primary" class="new-btn-primary" 
                 v-if="nowrite" @click="nowrite=false">补充修改</el-button>
      <el-button type="primary" class="new-btn-primary"
                 v-else @click="submit(user)">确认保存</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
var id=localStorage.getItem('userId')
export default {
  name: 'UserMessage',
  data () { 
    return {
      user: {},
      nowrite:true,
      change:false,
      inputs: {
        border:'none'
      }
      
    }
  },
  mounted: function () {   //页面加载 自动执行获取数据
     this.getJson();
  },
  watch: {
    user: {               //检测是否修改         
　　　 handler(newValue, oldValue) {
        if(oldValue.name!=undefined) {   //初始化过程 不计变化
            this.change=true;
        }
　　　 },
　　　 deep: true
　　}
  },
  methods: {
    getJson: function (message) {
      axios.get('/static/easymock/user.json',{params: {id} }).then((res) => {   
        if (res.data.state) {
          this.user=res.data.data.user;
        }else{
          console.log("获取数据失败")
        }
      });
    },
    update () {

    },
    submit(newUser) {
      if(this.change){
        this.$message.success('修改成功！');
        // this.update(user);  //跟新
        this.getJson();
        console.log(newUser)
      }
      this.nowrite=true;  
      this.change=false;
    }
    
  }
  
}
</script>

<style lang="stylus" scoped>
  #user
    width 500px
    margin-left 20px
  #user h3
    font-size 24px
    width 160px
    margin 10px auto 20px 0px
  #user >>> .el-form-item
    margin-bottom 0px 
  #user >>> .el-form-item__label
    font-size 13px !important
  #user >>> .el-input__inner
    margin 5px auto
    padding-left 30px
    font-size 13px
    color #666666
  #user >>> .el-textarea__inner
    resize none
    min-height 36px !important
    margin 5px auto
    padding 6px 5px 6px 30px 
    font-size 13px
    color #666666
  #user >>> .el-textarea__inner[readonly]
    border none
  #user >>> .el-input__inner[readonly]
    border none
  #user >>> .new-btn-primary
    margin-top 20px
    margin-bottom 30px
</style>
