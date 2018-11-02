<template>
  <div class="notesForm">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="所属课程">
        <el-select v-model="optionValue" placeholder="全部">
          <el-option v-for="course in courses" :key="course.courseId"
          :label="course.courseName" :value="course.courseId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="搜索">
        <el-input v-model="searchWord" placeholder="输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="new-btn-primary" icon="el-icon-search"
                   @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="myNotes"
      border
      style="width: 960px">
      <el-table-column prop="notesId"       label="笔记ID"   > </el-table-column> 
      <el-table-column prop="updateTime"    label="跟新时间" > </el-table-column> 
      <el-table-column prop="chapterName"   label="所属章节" > </el-table-column>
      <el-table-column prop="notesTitle"    label="笔记标题" width="200"> </el-table-column>
      <el-table-column prop="read"          label="阅读数"   > </el-table-column>
      <el-table-column prop="comment"       label="评论数"   > </el-table-column>
      <el-table-column prop="starts"        label="点赞数"   > </el-table-column>
      <el-table-column
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="lookOne(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="editOne(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteOne(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NotesForm',
  data: function () {
    return {
      optionValue:'',
      courseId: 0,    //默认为0 代表全部
      searchWord: '',
      courses:[],
      myNotes:[]
    }
  },
  mounted: function () {   //页面加载 自动执行
    axios.get('/static/easymock/notes.json').then((res) => {
        this.courses=res.data.data.courses; 
      });
    this.getJson();
  },
  methods: {
    getJson: function () {
      let courseId=this.courseId;
      let searchWord=this.searchWord;
      let id=localStorage.getItem('userId');
      console.log(courseId+","+searchWord)
      axios.get('/static/easymock/myNotes.json',{params: {courseId,searchWord,id} }).then((res) => {
        if (res.data.state) {
          this.myNotes=res.data.data.myNotes;
        }
      })       
    },
    search() {
      this.courseId=this.optionValue;
      this.getJson();   //查询 刷新数据
    },
    lookOne (note) {
      console.log(note.notesId);
       this.$router.push({name:'Note', params: { id: note.notesId}});
    },
    editOne (note) {
      this.$emit('updateNote',note.notesId);  //传递给父组件 消息中心 
       this.getJson();   //编辑 刷新数据
    },
    deleteOne(note) {
        this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({type: 'success', message: '删除成功!'});
          console.log(note);
          this.getJson();   //删除 刷新数据
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      } 
  }
}
</script>

<style  scoped>
    .notesForm >>> .el-form-item__label {
      font-size: 13px !important;
    } /*.notesForm {
    width: 1000px;
    margin: 20px auto;
    border: 1px #ccc solid;
  }*/
  
</style>
