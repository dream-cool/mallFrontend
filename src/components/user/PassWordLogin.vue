<template>
    <div class="passWordLogin">
        <div class="choose">
            <el-menu
                    default-active="/logReg/passWordLogin"
                    class="el-menu-demo"
                    mode="horizontal"
                    router>
                <el-menu-item index="/logReg/passWordLogin">密码登录</el-menu-item>
                <el-menu-item index="/logReg/verificationLogin">验证码登录</el-menu-item>
            </el-menu>
        </div>
        <br>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="userName">
                <el-input type="text" v-model="ruleForm.userName" autocomplete="off"
                          placeholder="请输入用户名"  ></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
                <el-input type="password" v-model="ruleForm.passWord" autocomplete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "PassWordLogin",
        data() {
            var validateName = (rule,value,callback)=>{
                console.log(1)
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else{
                    let data = {"userName":value};
                    axios.post(
                        '/user/registerCheck',data
                    ).then(res => {
                        if(res.data.code != 402){
                            callback(new Error('用户名不存在，请检查用户名是否输入正确'));
                        }
                        callback();
                    })
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    userName:'',
                    passWord: ''
                },
                rules: {
                    userName: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    passWord: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {userName:this.ruleForm.userName,passWord:this.ruleForm.passWord};
                        axios.post(
                            '/login/passwordLoginCheck',data
                        ).then(res => {
                            if(res.data.code == 2000){
                                this.$message({
                                    showClose: true,
                                    message: '登录成功',
                                    type: 'success',
                                    duration: 2000,
                                });
                                this.$router.push('/home')
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '密码错误，登录失败，请检查密码是否输入正确',
                                    type: 'error',
                                    duration: 2000,
                                });
                            }
                        })

                        console.log(data)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .choose{
        position:relative;
        text-align: center;
        margin-left: 20%;
        margin-right: 20%;
    }
    .el-input{
        width: 250px;
    }

</style>