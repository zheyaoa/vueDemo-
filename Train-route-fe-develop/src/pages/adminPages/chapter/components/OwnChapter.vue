<template>
    <div class="ownChapter">
        <div class="title">已有章节</div>
        <!-- 章节标签页 -->
        <el-tabs v-model="tabsActive" type="border-card" @tab-click="handleClick">
            <el-tab-pane v-for="item in tabs"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name">
                <el-table :data="showChapter"
                            border
                            style="width: 100%">
                    <el-table-column prop="name" label="章节名称"></el-table-column>
                    <el-table-column prop="course" label="课程数"></el-table-column>
                    <el-table-column prop="people" label="学习人数"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">
                                <router-link :to="{name:'ChapterEdit', params: {id: scope.row.chapterId}}">编辑</router-link>
                            </el-button>
                            <el-button type="text" size="small" @click="deleteIt(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'OwnChapter',
        data() {
            return {
                tabsActive: '1',
                tabs: [{
                    title: "前端",
                    name: "1"
                }, {
                    title: "Java",
                    name: "2"
                }, {
                    title: "Python",
                    name: "3"
                }],
                tabIndex: "0",
                allChapter: {}
            }
        },
        methods: {
            //点击标签页时触发检索变化
            handleClick (tab) {
                this.tabIndex = tab.index
            },
            //删除章节，包括了“取消”和“确定”两个事件
            deleteIt (index) {
                this.$confirm('此操作将删除该章节, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        // axios.get('', {
                        //     params: {
                        //         "id": index
                        //     }
                        // })
                        // .then(() => {

                        // })
                        this.showChapter.splice(index, 1)
                        this.$message({
                            message: '您已经删除该章节！',
                            type: 'success',
                            showClose: 'true',
                            center: 'true'
                        });
                    }).catch(() => {
                        this.$message({
                            message: '已取消删除',
                            type: 'info',
                            showClose: 'true',
                            center: 'true'
                        });          
                    });
            },
            getInfo () {
                axios.get('/backstage/chapter.json')
                    .then(this.getInfoSucc)
            },
            getInfoSucc (res) {
                // console.log(this.tabIndex)
                res = res.data
                if(res.ret && res.data) {
                    this.allChapter = res.data
                    // console.log(this.allChapter)
                }
            }
        },
        mounted () {
            this.getInfo()
        },
        computed: {
            showChapter () {
                if(this.tabIndex === "0")
                    return this.allChapter.frontChapter
                else if(this.tabIndex === "1")
                    return this.allChapter.javaChapter
                else if(this.tabIndex === "2")
                    return this.allChapter.pythonChapter
            }
        }
  }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl'
    .title
        font-size 18px
        margin-bottom .4rem
</style>
