<template>
    <div class="userInfo">
        <el-form status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="用户ID">
                <el-input type="text"  v-model="user.userId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名" >
                <el-input type="text"  v-model="user.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" >
                <el-input type="password" v-model="user.passWord" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱"
                          :rules="[
                              {  message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                            ]">
                <el-input v-model="user.email"  ></el-input>
            </el-form-item>
            <el-form-item label="电话" >
                <el-input type="text"  v-model="user.tel" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="地址" >
                <el-input type="text"  v-model="user.address" autocomplete="off"></el-input>
                &nbsp;
                <el-cascader
                        size="large"
                        :options="options"
                        @change="handleChange">
                </el-cascader>
            </el-form-item>



            <el-form-item label="性别">
                <el-radio-group v-model="user.sex">
                    <el-radio label="1" ></el-radio>
                    <el-radio label="0" ></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="VIP">
                <el-radio-group v-model="user.isVIP">
                    <el-radio label="1" ></el-radio>
                    <el-radio label="0" ></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="user.state">
                    <el-radio label="1" ></el-radio>
                    <el-radio label="0" ></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="user.role" placeholder="请选择角色权限">
                    <el-option label="普通用户" value="user"></el-option>
                    <el-option label="员工" value="employee"></el-option>
                    <el-option label="管理员" value="admin"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="test('hello')">测试</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { regionData ,CodeToText } from 'element-china-area-data'
    import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:8090'

    export default {
        name: "UserInfo",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    if (value.length < 8){
                        callback(new Error('密码不能小于八位数'));
                    }
                    callback();
                }
            };
            var validateTel = (rule, value, callback) => {
                if (value !== '') {
                    if (value.length !== 11){
                        callback(new Error('请输入正确的电话号码'));
                    }
                    callback();
                } else {
                    callback();
                }
            };
            return {
                user:{
                    userId:'',
                    userName:'',
                    tel:'',
                    address:'',
                    state:'',
                    sex:'',
                    isVIP:'',
                    role:'',
                    money:'',
                    email:'',
                },
                options: regionData ,
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur',required:true }
                    ],
                    tel:[
                        { validator:validateTel,trigger:'blur'}
                    ]
                },
            }
        },
        created(){
            this.getUserInfo()
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateInfo()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleChange (value) {
                let address = ''
                for (let i = 0; i < value.length; i++) {
                    address += CodeToText[value[i]]
                }
                this.user.address = address
                console.log(this.user.address)
            },
            getUserInfo(){
                axios({
                    url: "/user/finduser",
                    params: {userId: 10175},
                    timeout: 5000
                }).then( result =>{
                    console.log(result)
                    this.user = result.data
                    console.log(this.user)
                })
            },
            updateInfo(){
                console.log(this.user.role)
                let data = {
                    userId:this.user.userId,
                    userName:this.user.userName,
                    tel:this.user.tel,
                    address:this.user.address,
                    sex:this.user.sex,
                    state:this.user.state,
                    email:this.user.email,
                    isVIP:this.user.isVIP,
                    role:this.user.role,
                    money:this.user.money,
                    lastLoginTime:this.user.lastLoginTime,
                    regTime:this.user.regTime
                }
                this.axios.post("/user/update",data)
                    .then(function (result) {
                        if (result.data.code == 201) {
                            this.$message({
                                showClose: true,
                                message: '用户信息修改成功',
                                type: 'success',
                                duration: 2000,
                            });
                        } else if (result.data.code == 401) {
                            this.$message({
                                showClose: true,
                                message: '操作失败，请重试',
                                type: 'fail',
                                duration: 2000,
                            });
                        }
                        console.log(result.data)
                    })
            },
            test(data){
                this.getUserInfo()
                this.user = 1
            }
        }
    }
</script>

<style scoped>
    .userInfo{
        margin-left: 300px;
    }
    .el-input{
        width: 300px;
    }
    .el-cascader{
        width: 400px;
    }
    .el-button{
        margin-top: 50px;
    }
</style>