<template>
  <div class="warpper">
    <common-header></common-header>
    <div id="page">
      <h2 class="h">排行榜</h2>
      <div class="main">
        <rank-one class="rank"
                  v-bind:class="classNames[0]"
                  v-bind:title="titles[0]"
                  v-bind:lists="ranks.startRank"
        ></rank-one>
        <rank-one class="rank"
                  v-bind:class="classNames[1]"
                  v-bind:title="titles[1]"
                  v-bind:lists="ranks.gradeRank"
        ></rank-one>
        <rank-one class="rank"
                  v-bind:class="classNames[2]"
                  v-bind:title="titles[2]"
                  v-bind:lists="ranks.speedRank"
        ></rank-one>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'common/header/Header.vue'
import RankOne from './components/RankOne'
import axios from 'axios'
export default {
  name: 'Rankings',
  components: {
    CommonHeader:Header,
    RankOne: RankOne
  },
  data: function () {
    return {
      classNames: ['rank-left', 'rank-center', 'rank-right'],
      titles: ['点赞数最多', '评分最高', '学习进度最快'],
      ranks: {
        startRank:[],
        gradeRank:[],
        speedRank:[]
      }
    }
  },
  mounted: function () {   //页面加载时 自动执行
    this.getJson()
  },
  methods: {
    getJson: function () {
      axios.get('/static/easymock/rank.json').then((res) => {  
        if (res.data.state) {
          this.ranks.startRank=res.data.data.startRank;
        }
      });
      axios.get('/static/easymock/rank.json').then((res) => {  
        if (res.data.state) {
          this.ranks.gradeRank=res.data.data.gradeRank;
        }
      });
      axios.get('/static/easymock/rank.json').then((res) => {  
        if (res.data.state) {
          this.ranks.speedRank=res.data.data.speedRank;
        }
      })
    } 
  }
}
</script>

<style scoped>
  .warpper{
    height: 100vh;
    background:#f0f5f7; 
  }           
  .warpper #page {
    margin-top: 100px;
  }
  .warpper .h {
    font-size: 30px;
    text-align: center;
  }
  .warpper .main {
    width: 1020px;
    margin: 20px auto;
    display: flex;
  }
  .warpper .rank {
    margin: 20px 20px;
  }
  .warpper .rank-left {
    float: left;
  }
  .warpper .rank-center {
    flex: 1;
  }
  .warpper .rank-right {
    float: right;
  }
</style>

