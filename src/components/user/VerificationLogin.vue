<template>
    <div class="verificationLogin">
        <div class="choose">
            <el-menu
                    default-active="/logReg/verificationLogin"
                    class="el-menu-demo"
                    mode="horizontal"
                    router>
                <el-menu-item index="/logReg/passWordLogin">密码登录</el-menu-item>
                <el-menu-item index="/logReg/verificationLogin">验证码登录</el-menu-item>
            </el-menu>
        </div>
        <br>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
                    prop="email"
                    :rules="[
                              { required:true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                            ]">
                <el-input v-model="ruleForm.email"  placeholder="请输入邮箱用户名"></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
                <el-input type="password" v-model="ruleForm.passWord" autocomplete="off"
                          placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button type="info" size="small" :disabled="isDisabled" @click="send">{{buttonName}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "VerificationLogin",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };
            return {
                isDisabled:false,
                buttonName:'获取验证码',
                time: 60,
                ruleForm: {
                    email:'',
                    passWord: '',
                },
                rules: {
                    passWord: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            send(){
                if (this.ruleForm.email === ''){
                    this.$message({
                        showClose: true,
                        message: '请输入邮箱',
                        type: 'error',
                        duration: 2000,
                    });
                    return;
                }
                this.isDisabled = true;
                let data = {userName:this.ruleForm.email};
                let me = this;
                axios.post(
                    '/login/sendVerificationLogin',data
                ).then(res => {
                    if(res.code == 500){
                        this.$message({
                            showClose: true,
                            message: '验证码发送成功',
                            type: 'success',
                            duration: 2000,
                        });
                        let interval = window.setInterval(function() {
                            me.buttonName = me.time + '秒后失效重新发送';
                            --me.time;
                            if(me.time < 0) {
                                me.buttonName = "已失效，请重新发送";
                                me.time = 60;
                                me.isDisabled = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    } else if(res.code == 200) {
                        this.$message({
                            showClose: true,
                            message: '你已连续请求三次',
                            type: 'error',
                            duration: 2000,
                        });
                        this.isDisabled = true;
                    }
                })
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