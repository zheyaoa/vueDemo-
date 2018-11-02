<template>
    <el-row class="step">
        <el-col :span="20" :offset="2">
            <div>
                <el-steps :active="stepActive" align-center>
                    <template v-for="chapter in chapterList" >
                        <el-step  :title='chapter.chapterName' :description="chapter.chapterInfo" :key="chapter.chapterId"></el-step>
                    </template>
                </el-steps>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name:'HomePageStep',
    props:{
        chapterList:{
            Type:Array
        }
    },
    data (){
        return {
        }
    },
    computed:{
        stepActive (){
            return this.chapterList.length
        }
    }
}
</script>
<style lang="stylus" scoped>
    .step
        padding .6rem 0
</style>
