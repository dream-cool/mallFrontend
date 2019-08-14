<template>
    <div class="addGoods">
        <el-link class="el-icon-back" :underline="false" @click="goBack">返回</el-link>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
            <el-input type="text"  v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
            <el-input type="password" v-model="ruleForm.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email"
                      :rules="[
                              {  message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                            ]">
            <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
            <el-input type="text"  v-model="ruleForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
            <el-cascader
                    size="large"
                    :options="options"
                    @change="handleChange">
            </el-cascader>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男" ></el-radio>
                <el-radio label="女" ></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="VIP">
            <el-radio-group v-model="ruleForm.isVIP">
                <el-radio label="是" ></el-radio>
                <el-radio label="不是" ></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
            <el-radio-group v-model="ruleForm.state">
                <el-radio label="正常" ></el-radio>
                <el-radio label="锁定" ></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="角色">
            <el-select v-model="ruleForm.role" placeholder="请选择角色权限">
                <el-option label="普通用户" value="user"></el-option>
                <el-option label="员工" value="employee"></el-option>
                <el-option label="管理员" value="admin"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    import { regionData ,CodeToText } from 'element-china-area-data'
    import axios from 'axios'
    export default {
        name: "AddGoods",
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    let data = {"userName": value};
                    axios.post(
                        '/user/registerCheck', data
                    ).then(res => {
                        if (res.data.code == 402) {
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
                    if (value.length < 8) {
                        callback(new Error('密码不能小于八位数'));
                    }
                    callback();
                }
            };
            var validateTel = (rule, value, callback) => {
                if (value !== '') {
                    if (value.length !== 11) {
                        callback(new Error('请输入正确的电话号码'));
                    }
                    callback();
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    userName: '',
                    passWord: '',
                    email: '',
                    tel: '',
                    sex: '男',
                    state: '正常',
                    isVIP: '不是',
                    role: 'user',
                    address: '',
                },
                options: regionData,
                rules: {
                    userName: [
                        {validator: validateName, trigger: 'blur', required: true}
                    ],
                    passWord: [
                        {validator: validatePass, trigger: 'blur', required: true}
                    ],
                    tel: [
                        {validator: validateTel, trigger: 'blur'}
                    ]
                },

            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = this.ruleForm
                        if (data.isVIP == '是') {
                            data.isVIP = '1'
                        } else {
                            data.isVIP = '0'
                        }
                        if (data.sex == '男') {
                            data.sex = '1'
                        } else {
                            data.sex = '0'
                        }
                        if (data.state == '正常') {
                            data.state = '1'
                        } else {
                            data.state = '0'
                        }

                        axios.post(
                            '/user/register', data
                        ).then(res => {
                            if (res.data.code != 402) {
                                this.$message({
                                    showClose: true,
                                    message: '用户添加成功',
                                    type: 'success',
                                    duration: 2000,
                                });
                                this.$router.push('/admin/userManager')
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '操作失败，请重试',
                                    type: 'success',
                                    duration: 2000,
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleChange(value) {
                let address = ''
                for (let i = 0; i < value.length; i++) {
                    address += CodeToText[value[i]]
                }
                this.ruleForm.address = address
                console.log(this.ruleForm.address)
            },
            goBack() {
                this.$router.push({path: '/admin/userManager'});
            }
        },
    }
</script>

<style scoped>

</style>