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
                              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                            ]">
                <el-input v-model="dynamicValidateForm.email"  placeholder="请输入邮箱用户名"></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"
                          placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button type="info" size="small"  @click="submitForm('ruleForm')">获取验证码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "VerificationLogin",
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
                },
                dynamicValidateForm: {
                    email: ''
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