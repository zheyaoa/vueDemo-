<template>
    <el-row>
      <el-col :span="12" :offset="6">
          <div class="otherNoteList">
            <div class="clearfix">
              <h1 class="title">看看其它<router-link :to="{path:`/noteList`}" class="fr" style="margin-right: 20px">查看更多</router-link></h1>

            </div>
            <div class="list_wrap">
                <template v-for="note in otherNoteList">
                    <div class="note-item" :key="note.noteId">
                        <div class="note-title" @click="pathToNote(note.noteId)">{{note.noteTitle}}</div>
                        <div class="note-detail">
                            <span class="editorName">{{note.name}}</span>
                            <span class="createTime">{{note.createTime}}</span>
                            <span class="star"><i class="el-icon-star-on icon">({{note.stars}})</i></span>
                        </div>
                    </div>
                </template>
            </div>
          </div>
      </el-col>
    </el-row>
</template>
<script>
import axios from 'axios'
export default {
    name:'otherNoteList',
    props:{
        otherNoteList:{
            type:Array
        }
    },
    data() {
        return{
        }
    },
    methods:{
        pathToNote(noteId){
            this.$router.push({name:'Note', params: { id:noteId}})
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '~style/varible.styl'
    body
        height 100%
    .otherNoteList
        margin-top .6rem
        margin-bottom .4rem
        .title
            font-size 20px
            line-height .8rem
            margin .2rem 0
        .list_wrap
            /*background #fff*/
            display flex
            justify-content: space-between;
            .note-item
                width 30%
                box-sizing border-box
                padding 8px 15px
                background #fff
                border-radius 5px
                box-shadow 0 1px 5px 0 rgba(0,0,0,0.2)
                .note-title
                    cursor pointer
                    color $primaryColor
                    height .6rem
                    line-height .6rem
                    font-size 16px
                    margin-bottom 6px
                .note-detail
                    /*display flex*/
                    /*justify-content space-between*/
                    padding .1rem 0
                    font-size 14px
                    .editorName
                        /*padding-left .1rem*/
                    .createTime
                        padding-left 6px
                    span
                        /*font-size .36rem*/
                    .star
                        /*padding-right .2rem*/
                        float right
</style>
