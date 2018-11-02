<template>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="detail">
            <div class="imgBox">
                <img src="http://lorempixel.com/400/200/" alt="">
            </div>
            <div class="desc">
                <h1 class="title">{{courseDetail.courseName}}</h1>
                <div class="info">简介:   <span>{{courseDetail.courseInfo}}</span></div>
                <p>  
                    难度:  <span>{{courseDetail.courseDifficult}}</span>  
                    时间:  <span>{{courseDetail.useTime}}</span>
                </p>
                <el-button 
                    ref="startBtn" 
                    type="primary" 
                    class="detail-button new-btn-primary" 
                    disabled="disabled" 
                    @click= "setStudyState">
                    {{studyState}}
                </el-button>    
            </div>
        </div>
      </el-col>
    </el-row>
</template>
<script>
import axios from 'axios'
export default {
    name:'Detail',
    props:{
        courseDetail:{
            type:Object
        },
        index:{
            type:Number
        }
    },
    data (){
        return {
            disabled:false,
            studyState:'结束学习',
            para:{

            }
        }
    },
    methods:{
        setStudyState(index){
            this.index ++
            //学习状态改变
            axios.post('api/learningRecord/updateLearningRecord',)
        },
        getStudyState (index){
            if(index==2){
                this.disabled = "true"
            }else{
                let StateList = ['开始学习','结束学习']
                this.studyState = StateList[index]
            }
        }
    }

}
</script>
<style lang="stylus" scoped>
    @import '~style/varible.styl';
    .detail
        background #fff
        margin-top .8rem
        display  flex
        border $borderColor
        .imgBox
            flex 1
            display flex
            justify-content center
            img 
                margin .4rem 0
                width 95%
                height 5rem
        .desc 
            flex 1
            position relative
            .title 
                line-height 1rem
                font-size .48rem
                margin  .2rem 0
            .info 
                height 3rem
                font-size .36rem
                line-height .6rem
                word-break:break-all
            span
                margin-right .4rem
            .detail-button
                position absolute
                bottom .2rem
                right .4rem

</style>

