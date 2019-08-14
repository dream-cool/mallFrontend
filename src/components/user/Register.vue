<template>
    <div class="register">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input type="text"  v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        name: "Register",
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
                        if(res.data.code == 402){
                            callback(new Error('用户名重复'));
                        }
                        callback();
                    })
                }
            };
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
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    name:'',
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {userName:this.ruleForm.name,passWord:this.ruleForm.pass};
                        axios.post(
                            '/user/register',data
                        ).then(res => {
                            if(res.data.code != 402){
                                this.$message({
                                    showClose: true,
                                    message: '注册成功',
                                    type: 'success',
                                    duration: 2000,
                                });
                            }
                        })
                        this.$router.push('/logReg/passWordLogin')
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
    .el-input{
        width: 250px;
    }
</style>