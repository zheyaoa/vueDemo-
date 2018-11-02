<template>
    <div class="wayManage">
        <div class="add">
            <div class="add-title">路线管理</div>
            <!-- 添加按钮 -->
            <el-button type="primary"
                       icon="el-icon-circle-plus-outline"
                       class="new-btn-primary add-button"
                       @click="add">
               添加路线
            </el-button>
            <!-- 添加路线弹窗 -->
            <el-dialog title="添加路线"
                       :visible.sync="dialogAddVisible"
                       :modal-append-to-body="false"
                       width="400px">
                <el-form :model="form" label-width="60px">
                    <el-form-item label="路线名">
                        <el-input v-model="form.own"></el-input>
                    </el-form-item>
                    <el-form-item label="管理者">
                        <el-input v-model="form.admin"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelAdd">取 消</el-button>
                    <el-button type="primary" @click="sureAdd()"
                               :disabled="dialogAddDisabled">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 表格 -->
        <el-table :data="allWay" border style="width: 760px">
            <el-table-column prop="own"      label="已有路线" width="150"></el-table-column>
            <el-table-column prop="chapter"  label="章节数"></el-table-column>
            <el-table-column prop="course"   label="课程数"></el-table-column>
            <el-table-column prop="people"   label="学习人数"></el-table-column>
            <el-table-column prop="admin"    label="管理者" width="150"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope"  type="index">
                    <el-button type="text" size="small"  @click="editIt(scope.row, scope.$index)">编辑</el-button>
                    <!-- 编辑路线弹窗 -->
                    <el-dialog title="编辑路线"
                               :visible.sync="dialogEditVisible"
                               :modal-append-to-body="false"
                               width="400px">
                        <el-form label-width="60px">
                            <el-form-item label="路线名">
                                <el-input v-model="alterOwn"></el-input>
                            </el-form-item>
                            <el-form-item label="管理者">
                                <el-input v-model="alterAdmin"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancelEdit">取 消</el-button>
                            <el-button type="primary" @click="sureEdit(allWay[tableIndex])"
                                       :disabled="dialogEditDisabled">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-button type="text" size="small"  @click="deleteIt(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
            
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "WayManage",
        data () {
            return {
                dialogAddVisible: false,
                dialogAddDisabled: false,
                dialogEditVisible: false,
                dialogEditDisabled: false,
                allWay: [],
                tableIndex: 0,
                alterOwn: '',
                alterAdmin: '',
                form: {
                    own: '',
                    chapter: 0,
                    course: 0,
                    people: 0,
                    admin: ''
                }
            }
        },
        methods: {
            //“添加路线”按钮点击事件
            add () {
                this.dialogAddVisible = true
            },
            //取消添加
            cancelAdd () {
                this.dialogAddVisible = false
                this.$message({
                    message: '您已经取消了操作！',
                    type: 'info',
                    showClose: 'true',
                    center: 'true'
                });
            },
            //确认添加新路线
            sureAdd () {
                this.dialogAddDisabled = true;
                if(this.form.own == "" && this.form.admin == "") {
                    this.$message({
                        message: '路线名或管理者未填！',
                        type: 'warning'
                    });
                    this.dialogAddDisabled = false;
                    return 0;
                };
                let newRow = {
                    own: this.form.own,
                    chapter: this.form.chapter,
                    course: this.form.course,
                    people: this.form.people,
                    admin: this.form.admin
                };
                // console.log(tmp)
                this.allWay.push(newRow);
                let data = JSON.stringify(newRow);
                // console.log(data)
                this.$message({
                    message: '您已经添加路线成功！',
                    type: 'success',
                    showClose: 'true',
                    center: 'true'
                });
                this.form.own = '';
                this.form.admin = '';
                this.dialogAddDisabled = false;
                this.dialogAddVisible = false
                //向后端请求时用
                // axios.get('/backstage/way.json').then((res) => {
                //     this.$message({
                //         message: '您已经添加路线成功！',
                //         type: 'success',
                //         showClose: 'true',
                //         center: 'true'
                //     });
                //     this.form.own = ''
                //     this.form.admin = ''
                //     this.dialogAddDisabled = false
                //     this.dialogAddVisible = false
                // })
            },
            //编辑路线
            editIt(row, index) {
                this.alterOwn = row.own
                this.alterAdmin = row.admin
                this.tableIndex = index
                this.dialogEditVisible = true
            },
            //删除路线，包括了“取消”和“确定”两个事件
            deleteIt (index) {
                // console.log(index)
                this.$confirm('此操作将删除该路线, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // axios.get('', {
                        //     params: {
                        //         "id": index
                        //     }
                        // }).then(() => {

                        // })
                        this.allWay.splice(index, 1)
                        this.$message({
                            message: '您已经删除该路线！',
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
            //取消编辑
            cancelEdit () {
                this.dialogEditVisible = false
            },
            //确定编辑
            sureEdit (row) {
                this.dialogEditDisabled = true
                row.own = this.alterOwn
                row.admin = this.alterAdmin
                this.$message({
                    message: '您已经编辑路线成功！',
                    type: 'success',
                    showClose: 'true',
                    center: 'true'
                });
                this.dialogEditDisabled = false
                this.dialogEditVisible = false
                //向后端请求时用
                // axios.get('/backstage/way.json',{
                //     params: {
                //         "id": this.tableIndex
                //     }
                // }).then((res) => {
                //     this.$message({
                //         message: '您已经编辑路线成功！',
                //         type: 'success',
                //         showClose: 'true',
                //         center: 'true'
                //     });
                //     this.dialogEditDisabled = false
                //     this.dialogEditVisible = false
                // })
            },
            getInfo () {
                axios.get('/backstage/way.json')
                    .then(this.getInfoSucc)
            },
            getInfoSucc (res) {
                res = res.data
                if(res.ret && res.data) {
                    this.allWay = res.data.allWay
                }
                // console.log(res)
            }
        },
        mounted () {
            this.getInfo()
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~style/varible.styl';
    .wayManage
        manageArea()
        padding-left .8rem
        .add
            margin-top 1.5rem
            .add-title
                font-size 24px
                margin-bottom .5rem
            .add-button
                margin-bottom .5rem
</style>
