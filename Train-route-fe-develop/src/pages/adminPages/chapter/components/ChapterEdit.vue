<template>
    <div class="chpaterEdit">
        <common-header></common-header>
        <common-left-side></common-left-side>
        <div class="edit-content">
            <div class="bigTitle">编辑章节资料</div>
            <div class="smallTitle">章节名称：{{chapterInfo.chapterName}}</div>
            <div class="smallTitle">章节描述：{{chapterInfo.chapterDescribe}}</div>
            <div class="smallTitle">推荐用时：{{chapterInfo.suggestTime}}</div>
            <div class="smallTitle">课程数：{{chapterInfo.courseNumber}}</div>
            <div class="bigTitle">现有课程：</div>
            <el-row class="existCourse">
                <el-col :span="4" 
                        v-for="(item, index) in courseInfo"
                        :key="item.courseId"
                        :offset="(index % 5) > 0 ? 1 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="tinyTitle">{{item.courseTitle}}</div>
                        <!-- <div class="tinyTitle">课程介绍：</div> -->
                        <div class="courseDescribe">{{item.courseDescribe}}</div>
                        <el-button type="text" class="button" @click="editCourse(item.courseId)">查看及编辑</el-button>
                        <el-dialog title="编辑课程"
                                   :visible.sync="dialogEditVisible"
                                   :modal-append-to-body="false"
                                   width="600px">
                            <el-form label-width="70px">
                                <el-form-item label="课程名">
                                    <el-input v-model="alterTitle"></el-input>
                                </el-form-item>
                                <el-form-item label="课程介绍">
                                    <el-input type="textarea" v-model="alterDescribe" autosize></el-input>
                                </el-form-item>
                                <el-form-item label="推荐用时">
                                    <el-input v-model="alterTime"></el-input>
                                </el-form-item>
                                <el-form-item label="难度">
                                    <el-input v-model="alterRank"></el-input>
                                </el-form-item>
                                <el-form-item label="课程详情">
                                    <el-input type="textarea" v-model="alterDetail" :autosize="{minRows: 3}"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="cancelEdit">取 消</el-button>
                                <el-button type="primary" @click="sureEdit(courseInfo[theCourseId - 1])"
                                           :disabled="dialogEditDisabled">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Header from 'common/header/Header.vue'
    import LeftSide from 'common/leftSide/LeftSide.vue'
    import axios from 'axios'
    export default {
        name: 'ChapterEdit',
        components: {
            CommonHeader: Header,
            CommonLeftSide: LeftSide
        },
        data () {
            return {
                dialogEditVisible: false,
                dialogEditDisabled: false,
                chapterInfo: {},
                courseInfo: [],
                theCourse: {},
                theCourseId: 0,
                alterTitle: '',
                alterDescribe: '',
                alterTime: '',
                alterRank: '',
                alterDetail: ''
            }
        },
        methods: {
            // 编辑课程
            editCourse (id) {
                // console.log(id)
                this.theCourse = this.courseInfo[id -1]
                this.theCourseId = id
                this.alterTitle = this.theCourse.courseTitle
                this.alterDescribe = this.theCourse.courseDescribe
                this.alterTime = this.theCourse.courseTime
                this.alterRank = this.theCourse.courseRank
                this.alterDetail = this.theCourse.courseDetail
                // console.log(this.theCourse)
                this.dialogEditVisible = true
            },
            // 取消编辑课程
            cancelEdit () {
                this.dialogEditVisible = false
                this.$message({
                    message: '您已经取消了编辑！',
                    type: 'info',
                    showClose: 'true',
                    center: 'true'
                });
            },
            // 确认编辑课程
            sureEdit (editInfo) {
                this.dialogEditDisabled = true
                editInfo.courseTitle = this.alterTitle
                editInfo.courseDescribe = this.alterDescribe
                editInfo.courseTime = this.alterTime
                editInfo.courseRank = this.alterRank
                editInfo.courseDetail = this.alterDetail
                this.$message({
                    message: '您已经成功编辑课程！',
                    type: 'success',
                    showClose: 'true',
                    center: 'true'
                });
                this.dialogEditDisabled = false
                this.dialogEditVisible = false
                //向后端请求时用
                // axios.get('/backstage/course.json',{
                //     params: {
                //         "id": this.theCourseId
                //     }
                // }).then((res) => {
                //     this.$message({
                //         message: '您已经成功编辑课程！',
                //         type: 'success',
                //         showClose: 'true',
                //         center: 'true'
                //     });
                //     this.dialogEditDisabled = false
                //     this.dialogEditVisible = false
                // })
            },
            getInfo (id) {
                axios.get('/backstage/course.json')
                    .then(this.getInfoSucc)
            },
            getInfoSucc (res) {
                res = res.data
                if(res.ret && res.data) {
                    this.chapterInfo = res.data.htmlChapter,
                    this.courseInfo = res.data.htmlCourse
                }
                // console.log(res)
            }
        },
        mounted () {
            var chapterId = this.$route.params.id
            // console.log(chapterId)
            this.getInfo(chapterId)
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl'
    .edit-content
        manageArea()
        padding-top 1rem
        padding-left .8rem
        .bigTitle
            font-size 24px
            color #303133
            margin-bottom .5rem
        .smallTitle
            font-size 16px
            color #606266
            margin-bottom .5rem
        .existCourse
            padding .25rem .5rem
            background-color #dcdfe6
            border-radius 10px
            width 60vw
            height 4.3rem
            overflow-y scroll
            .el-card
                font-size 14px
                margin .25rem 0
                .tinyTitle
                    height .4rem
                    line-height .4rem
                    padding .15rem
                    color #333
                    text-align center
                    white-space nowrap
                    overflow hidden
                    text-overflow ellipsis
                .courseDescribe
                    height 2rem
                    line-height .5rem
                    padding 0 .15rem
                    color #999
                    overflow hidden
                .button
                    float right
                    padding .15rem
                    .el-button
                        padding 0
</style>