<template>
  <div class="page">
  	<div class="login">
      <h1>新媒体工作室</h1>
  		<el-form :model="user"  class="demo-ruleForm">
  		    <el-input type="" v-model.number="user.userId" placeholder="请输入学号" @blur="checkUser">
            <template slot="prepend" ><span class="label label1"><i class="iconfont">&#xe7ae;</i>用户名</span></template>
          </el-input>
  		    <el-input type="password" v-model="user.pass" placeholder="******" @blur="checkPass">
            <template slot="prepend" ><span class="label label2"><i class="iconfont">&#xe7e1;</i>密码</span></template>
          </el-input>
  		    <el-button  type="success" @click="login(user)">登录</el-button>
  		</el-form>
  	</div>
  </div>
</template>
<script>
export default {
  data() {
  	return {
      user: {
      	userId:'',
        pass: ''
      }
  	}
  },
  mounted () {

  	if(localStorage.getItem('userId')){
  		let userId=localStorage.getItem('userId');
  		let pass=localStorage.getItem('pass');
  		console.log("自动登录");
  		this.$router.push({ path: '/personal' });
  		// axios.get('/static/easymock/rank.json',{params: {userId,pass} }).then((res) => {  
    //       if (res.data.state) {
    //          this.$router.push({ path: '/personal' });
    //       }
    //     });
  	}
  	else{
  		console.log("手动登录");
  	}
  },
  methods: {
    checkUser () {
      if(this.user.userId=='')
        this.$message.warning('用户名不能为空！');
      else if(typeof this.user.userId != 'number')
      	this.$message.warning('用户名是数字！');
      else if(this.user.userId.toString().length!=10)
      	this.$message.warning('用户名为十位！');
      else
        return true;
    },
    checkPass () {
      if(this.user.pass=='')
        this.$message.warning('密码不能为空！');
      else
        return true;
    },
  	login (user) {
      if(this.checkUser()&&this.checkPass()){
  		  console.log(user)
  		  localStorage.setItem('userId',user.userId);
  		  localStorage.setItem('pass',user.pass);
  		  this.$router.push({ path: '/personal' });
  		  // axios.get('/static/easymock/rank.json',{params: {userId,pass} }).then((res) => {  
      //       if (res.data.state) {
      //         this.$router.push({ path: '/personal' });
      //       }
      //     });
      }

  	}
  }
}
</script>
<style scoped>
  .page {
	height: 100vh;
	padding-top: 100px;
	background-image:url('../../assets/image/pictrue.jpg');
  }
  .login {
  	width: 300px;
  	margin: 0px auto;
    padding: 60px 40px;
    border: 1px #ccc solid;
    background: #fff;
  }
  .login h1 {
    font-size: 30px;
    color: #660033;
    margin-bottom: 30px;
  }
  .label {
	margin:0px -10px;
  }
  .label2{
  	margin-right: 2px;
  }
  .el-input{
    margin-bottom: 30px;
  }
  .el-button {
    width: 300px ;
    height: 32px;
  }
</style>
