<template>
    <div class="noteScore">
        <common-header></common-header>
        <common-left-side></common-left-side>
        <div class="note-content">
            <div id="article">
                <h2 class="title">{{note.notesTitle}}</h2>
                <div class="infos">
                    <div class="info-left">
                        <span class="info">作者：{{note.name}}</span>
                        <span class="info">课程名称：{{note.courseName}}</span>
                    </div>
                    <div class="info-right">
                        <span class="info">评论数：{{note.commentNumber}}</span>
                        <span class="info">浏览量：{{note.read}}</span>
                        <span class="info">点赞数：{{note.starts}}</span>
                    </div>
                </div>
                <span class="time">跟新时间：{{note.updateTime}}</span>
                <div class="content" v-html="note.notesContent"></div>
                <div class="good">
                    <span class="imgs">
                        <i class="iconfont greyHeart" v-if="!isStared" @click="change()">&#xe849;</i>
                        <i class="iconfont redHeart" v-else @click="change()">&#xe849;</i>
                    </span> 
                    <span>点个赞鼓励下吧！</span>  
                </div>
            </div>
            <div id="score">
                <div class="scoreNumber">{{scoreNumber}}分</div>
                <el-button type="primary" icon="el-icon-edit" @click="scoreChange">评分</el-button>
                <el-dialog title="对本篇评分"
                       :visible.sync="dialogScoreVisible"
                       :modal-append-to-body="false"
                       width="400px">
                    <el-form label-width="60px">
                        <el-form-item label="分数">
                            <el-input v-model="scoreNumberEdit"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancelScore">取 消</el-button>
                        <el-button type="primary" @click="sureScore" :disabled="dialogScoreDisabled">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from 'common/header/Header.vue'
    import LeftSide from 'common/leftSide/LeftSide.vue'
    import axios from 'axios'
    export default {
        name: 'NoteScore',
        components: {
            CommonHeader: Header,
            CommonLeftSide: LeftSide
        },
        data () {
            return {
                dialogScoreVisible: false,
                dialogScoreDisabled: false,
                note: {},
                isStared: false,
                scoreNumber: 0,
                scoreNumberEdit: 0
            }
        },
        methods: {
            change () {
                this.isStared = (this.isStared == false ? true : false);
                localStorage.setItem('isStared',this.isStared);//储存状态到本地，关闭页面重新打开会显示点赞状态
                let notesId=this.note.notesId;
                let userId=localStorage.getItem('userId');
                console.log(notesId + "-" + userId)
                // axios.get('/static/easymock/rank.json',{params: {notesId,userId} }).then((res) => {  
                //    if (res.data.state) {
                //       console.log("已点赞")
                //    }
                //  });
            },
            scoreChange () {
                this.dialogScoreVisible = true
            },
            cancelScore () {
                this.dialogScoreVisible = false
                this.$message({
                    message: '您已经取消了评分！',
                    type: 'info',
                    showClose: 'true',
                    center: 'true'
                });
            },
            sureScore (score) {
                this.dialogScoreDisabled = true
                if(this.scoreNumberEdit == "") {
                    this.$message({
                        message: '新的评定分数未填！',
                        type: 'warning'
                    });
                    this.dialogScoreDisabled = false;
                    return 0;
                };
                this.scoreNumber = this.scoreNumberEdit
                this.$message({
                    message: '您已经成功的为这篇文章评分！',
                    type: 'success',
                    showClose: 'true',
                    center: 'true'
                });
                this.dialogScoreDisabled = false
                this.dialogScoreVisible = false
                // 向后端请求时用
                // axios.get('/backstage/notes.json', {
                //     params: {
                //         "noteId": 100
                //     }
                // }).then((res) => {
                //     this.$message({
                //         message: '您已经成功的为这篇文章评分！',
                //         type: 'success',
                //         showClose: 'true',
                //         center: 'true'
                //     });
                //     this.dialogScoreDisabled = false
                //     this.dialogScoreVisible = false
                // })
            },
            getInfo (note, member) {
                axios.get('/static/easymock/note.json',{
                    params: {
                        note,
                        member
                    }
                }).then(this.getInfoSucc);
                axios.get('/backstage/notes.json')
                    .then( (res) => {
                        res = res.data
                        if(res.ret && res.data) {
                            var allNote = res.data.allNote
                            // console.log(allNote)
                            for (var i = 0; i < allNote.length; i++) {
                                if (note == allNote[i].notesId && member == allNote[i].memberId) {
                                    this.scoreNumber = allNote[i].score
                                    this.scoreNumberEdit = allNote[i].score
                                }
                            }
                        }
                    })
            },
            getInfoSucc (res) {
                res = res.data
                if(res.state && res.data) {
                    this.note = res.data.note
                    this.isStared = res.data.isStared
                }
                // console.log(res.data)
            }
        },
        mounted () {
            var noteId = this.$route.params.noteId
            var memberId = this.$route.params.memberId
            // console.log(noteId + '-' + memberId)
            this.getInfo(noteId, memberId)
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl'
    .note-content
        manageArea()
        padding-top .8rem
        padding-left .8rem
        #article 
            width 16rem
            padding .5rem
            margin-bottom .5rem
            background-color #fff
            border 1px #ccc solid
            .title
                font-size 28px
                margin-left 10px
            .infos
                height 20px
                margin 20px 40px 10px 10px
            .info-left
                float left
            .info-right
                float right
            .time
                margin-left 10px
            .content
                margin 20px 10px
                font-size 14px
                color #333
                line-height 20px
            .good
                margin-left 20px
            .imgs
                cursor pointer
            .greyHeart
                font-size 26px
                color #ccc
            .redHeart
                font-size 26px
                color red
        #score
            width 17rem
            display flex
            justify-content flex-end
            .scoreNumber
                display flex
                width 2rem
                background-color #C0C4CC
                color #fff
                margin-right .5rem
                justify-content center
                align-items center
                font-size 20px
                border-radius 4px
            .el-button
                font-size 14px
</style>