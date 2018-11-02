<template>
    <div class="warpper">
        <common-header></common-header>
        <div class="content_wrap box">
            <el-dialog 
                title="选择学习路线" 
                :visible.sync="isShow"
                :show-close="false"
                :close-on-click-modal = "false"
                :close-on-press-escape = "false"
                width="40%">
                <el-form  class="formTable"
                    ref="form" 
                    :model="form" 
                    :rules="rules"
                    label-width="80px"
                    label-position="left"
                >
                    <el-form-item label="名字" prop='name'>
                        <el-input v-model="form.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="班级"  prop="class">
                        <el-input v-model="form.class"></el-input>
                    </el-form-item>
                    <el-form-item label="所属小组" prop="groupId">
                        <el-input v-model="form.groupId"></el-input>
                    </el-form-item>
                    <el-form-item label="学习方向" prop="direction">
                        <el-input v-model="form.direction"></el-input>
                    </el-form-item>
                    <el-form-item label="有无基础" prop="base">
                        <el-radio-group v-model="form.base">
                        <el-radio label="有"></el-radio>
                        <el-radio label="无"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="contact">
                        <el-input v-model="form.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="座右铭">
                        <el-input  type="textarea" v-model="form.motto"></el-input>
                    </el-form-item>
                    <el-form-item class="buttonGroup">
                        <el-button type="danger" class="new-btn-cancel" @click="resetForm('form')">重置</el-button>
                        <el-button type="primary" class="new-btn-primary"  @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import CommonHeader from 'common/header/Header.vue'
export default {
    name:'StudyRoute',
    components:{
        CommonHeader
    },
    data (){
        var checkPhone = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('号码格式错误'))
            }
            let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
            if(!phoneReg.test(value)){
                callback(new Error('号码格式错误'))
            }
            callback()
        }
        return {
            isShow:true,
            form:{
                id:'',
                name:'zheyaoa',
                class:'计科167',
                groupId:'2',
                direction:'1',
                base:'',
                contact:'18879717716',
                motto:'sgusg'
            },
            rules:{
                name:[{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                class:[{
                    required: true,
                    message: '请输入班级',
                    trigger: 'blur'
                }],
                direction:[{
                    required: true,
                    message: '请填写学习路线',
                    trigger: 'blur'
                }],
                groupId:[{
                    required: true,
                    message: '请填写活动形式',
                    trigger: 'blur'
                }],
                contact:[{ 
                    validator : checkPhone,
                    trigger : 'blur'
                }]
            }
        }
    },
    methods:{
        onSubmit (formName){
            //把name存入localStorge
            window.localStorage.setItem('name',this.form.name)
            //向后端传输数据
            let data = JSON.stringify(this.form)
            console.log(data)
            this.$refs[formName].validate((valid) => {
               if(valid){
                   axios.post('/api/learningRoute/chooseRoute',data)
                   .then((res) => {
                        this.$router.push({name:'chapterList',params:{learnId:res.data.data.learnId}})
                    })
                   .catch((res) => {
                        this.$alert(`上传失败 ${res}`,'提示',{
                        confirmButtonText:'确认'
                        })
                   })   
               } else {
                    return false;
                    this.$alert('上传失败','提示',{
                        confirmButtonText:'确认'
                    })
               }
           })
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        }

    },
    mounted (){
        this.form.studentId = window.localStorage.getItem('userId')
        //获取learningRouteId,若获取，则跳转。
        let data = {
            userId : this.form.studentId
        }
        data = JSON.stringify(data)
        axios.post('api/getLearningRouteId',data)
        .then((res) =>{
            console.log(res.data.data.learningRouteId)
            if(res.data.data.learningRouteId != '-1'){//已经选择过
                this.$router.push({name:'chapterList',params:{learnId:res.data.data.learningRouteId}})
            }
        })
    }
}
</script>
<style lang="stylus" scoped>
    .box >>> .el-dialog__header
        padding .08rem .6rem
    .box >>> .el-dialog__title
        line-height 24px
        font-size 14px
        color #303133
    .box >>> .el-dialog__body
        padding-top .4rem
        padding-bottom  1rem
    .formTable >>> .el-textarea__inner
        height 1.6rem
    .warpper
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        display flex
        flex-direction column
        overflow hidden
        .box
            flex 1
            .formTable
                width 100%
            .buttonGroup
                position absolute
                bottom  0 
                right 7%   
</style>
