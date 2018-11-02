<template>
    <div class="warpper" >
        <common-header></common-header>
        <div class="box">
            <h1 class="title">章节列表</h1>
            <el-steps direction="vertical" :active="courceList.length" class="step">
                <template v-for="course in courceList">
                    <el-step    :title="course.courseName" :key="course.courseId"  @click.native="courseStudy(course.courseId)">

                    </el-step>
                </template>
            </el-steps>
        </div>
    </div>
</template>
<script>
import Header from 'common/header/Header.vue'
import axios  from 'axios'
export default {
    name:'courceList',
    components:{
        CommonHeader:Header
    },
    data (){
        return{
            courceList:[]
        }
    },
    methods:{
        //跳转至对应的courseDeatil页面
       courseStudy(courseId) {
           this.$router.push({name:'courseDetail',params:{courseId}})
       }
    },
    computed:{
    },
    mounted (){
        //初始化根据chapterId获取对应的courseList
        let data = {
            chapterId:parseInt(this.$route.params.chapterId)
        }
        data = JSON.stringify(data)
        console.log(data)
        axios.post('/api/chapter/showAllCourses',data)
        .then((res) => {
            this.courceList = res.data.data.courses
        })
        .catch(() =>{
            this.$alert('系统繁忙，请稍后再试','提示',{
                confirmButtonText:'确认'
            })
        })
    }
}
</script>
<style lang="stylus" scoped>
    .step >>> .el-step__title
        cursor pointer
    .warpper
        position absolute
        top 0
        right 0
        left 0
        bottom 0
        display flex
        flex-direction column
        overflow hidden
        .box
            flex 1
            display flex
            flex-direction column
            .title
                margin .4rem 0
                text-align center
                font-size .64rem
                box-sizing border-box
            .step
                flex 1
                padding 0 0 .4rem 0
                display flex
                align-items center
                justify-content center
</style>
