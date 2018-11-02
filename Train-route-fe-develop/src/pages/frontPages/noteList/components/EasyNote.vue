<template>
  <div class="note" @click="jump(note.notesId)">
    <h3>{{note.notesTitle}}</h3>
    <div class="infos">
      <span class="info">作者：{{note.name}}</span>
      <span class="info">时间：{{note.updateTime}}</span>
      <span class="info">浏览量：{{note.read}}</span>
      <span class="info">点赞数：{{note.starts}}</span>
    </div>
    <div class="content" v-html="note.notesContent"></div>
  </div>
</template>

<script>
export default {
  name: 'EasyNote',
  props: ['note'],
  methods: {
    jump (noteId) {
      this.$router.push({name:'Note', params: { id: noteId}});
    }
  }
  // data: function () {
  //   return {

  //   }
  // }
}
</script>

<style scoped>
  .note {
    cursor: pointer;
    width: 800px;
    margin: 20px auto;
    border: 1px #ccc solid;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
  }
  h3 {
    font-size: 20px;
    margin-top: 20px;
  }
  .infos {
    margin: 15px 0px;
  }
  .info {
    margin-right: 8px;
  }
  .content {
    font-size: 14px;
    color: #333;
    margin: 0px 0px 20px 0px;
    height: 86px;
    line-height: 18px;
    overflow: hidden;
  }
</style>
