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
                <el-input type="text" v-model="ruleForm.pass" autocomplete="off"
                          placeholder="请输入用户名"  ></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"
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
    export default {
        name: "PassWordLogin",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
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