<template>
  <div class="head">
    <div class="select">
      <el-select v-model="params.courseId" placeholder="请选择">
        <el-option
          v-for="option in options"
          :key="option.courseId"
          :label="option.courseName"
          :value="option.courseId"
          >   
        </el-option>
      </el-select>
      <!-- `checked` 为 true 或 false -->
      <el-checkbox class="addselect" v-model="params.isChoose">精选笔记</el-checkbox>
    </div>
    <div class="sorts">
      <ul>
        <li v-for="(sort,index) in sorts" :key="sort">
            <a href="javascript:void(0)"  @click="params.sortWay=index">{{sort}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SelectNote',
    props:['options'],
    data() {
      return {
        params:{courseId:"",isChoose:false,sortWay:0}, //参数: 所属课程名称 是否精选笔记 排序方法
        sorts:['默认','发布时间','浏览量','点赞数']
      }
    },
    watch: { 
      params: {   //当三个参数有变化时触发
　　　　 handler(newValue, oldValue) {
　　　　　　console.log(newValue);
          this.$emit('selectSort',newValue);
　　　　 },
　　　　 deep: true
　　　}
    }
  }
</script>
<style scoped>
  .head {
    width: 800px;
    margin: 20px auto;
    border: 1px #ccc solid;
    background: #fff;
  }
  .select {
    margin: 20px 20px;

  }
  .addselect {
    margin-left: 20px;
  }
  .sorts {
    margin: 0px 15px 10px 15px;
    height: 30px;
  }
  .sorts ul{
    float: left;
  }
  .sorts li {
    margin: 2px 10px;
    float: left;
    list-style: none;
    line-height: 30px;
  }
  a {
    text-decoration: none;
  }
</style>