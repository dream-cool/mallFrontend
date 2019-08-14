<template>

    <div class="goodsDetail">
        <h1>
            这是商品详情组件
        </h1>
        <el-link class="el-icon-back" :underline="false" @click="goBack">返回商品管理</el-link>
        <div class="main">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="main-left">
                    <el-form-item label="用户ID">
                        <el-input type="text"  v-model="ruleForm.userId" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" >
                        <el-input type="text"  v-model="ruleForm.userName" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="余额" >
                        <el-input type="text" v-model="ruleForm.money" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="地址" >
                        <el-input type="text"  v-model="ruleForm.address" autocomplete="off" disabled></el-input>
                        &nbsp;
                        <el-cascader
                                size="large"
                                :options="options"
                                @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                </div>
                <div class="main-right">
                    <el-form-item label="密码" prop="passWord" >
                        <el-input type="text" v-model="ruleForm.passWord" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱"
                                  prop="email"
                                  :rules="[
                              {  required :true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                        <el-input v-model="ruleForm.email"  ></el-input>
                    </el-form-item>
                    <el-form-item label="电话"  prop="tel" >
                        <el-input type="text"  v-model="ruleForm.tel" autocomplete="off"></el-input>
                    </el-form-item>
                </div>


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
                <div class="time">
                    <el-form-item label="用户注册时间">
                        <el-date-picker
                                v-model="ruleForm.regTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="最后登录时间">
                        <el-date-picker
                                v-model="ruleForm.lastLoginTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                        >
                        </el-date-picker>
                    </el-form-item>
                </div>

                <div class="foot-right">
                    <el-form-item label="角色">
                        <el-select v-model="ruleForm.role" placeholder="请选择角色权限">
                            <el-option label="普通用户" value="user"></el-option>
                            <el-option label="员工" value="employee"></el-option>
                            <el-option label="管理员" value="admin"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <div class="but">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>

</template>

<script>
    export default {
        name: "GoodsDetail",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
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
                ruleForm:{
                    isVIP:'',
                    userId:'',
                    userName:'',
                    passWord:'',
                    tel:'',
                    address:'',
                    state:'',
                    sex:'',
                    role:'',
                    money:'',
                    email:'',
                },
                user:{},
                options: regionData ,
                rules: {
                    passWord: [
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
                    }else {
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
                this.ruleForm.address = address
                console.log(this.ruleForm.address)
            },
            getUserInfo(){
                axios({
                    url: "/user/finduser",
                    params: {userId: this.$route.params.id},
                    timeout: 5000
                }).then( result => {
                    if (result.data.sex == '1'){
                        result.data.sex = '男'
                    } else {
                        result.data.sex = '女'
                    }
                    if (result.data.state == '1'){
                        result.data.state = '正常'
                    } else {
                        result.data.state = '锁定'
                    }
                    if (result.data.isVIP == '1'){
                        result.data.isVIP = '是'
                    } else {
                        result.data.isVIP = '不是'
                    }
                    console.log(result.data)
                    this.ruleForm = result.data
                    this.user = JSON.parse(JSON.stringify(this.ruleForm));
                })
            },
            updateInfo(){
                let data = this.ruleForm
                if (data.isVIP == '是'){
                    data.isVIP = '1'
                } else {
                    data.isVIP = '0'
                }
                if (data.sex == '男'){
                    data.sex = '1'
                } else {
                    data.sex = '0'
                }
                if (data.state == '正常'){
                    data.state = '1'
                } else {
                    data.state = '0'
                }
                console.log(data)

                axios.post("/user/update",data)
                    .then( result => {
                        if (result.data.code == 201) {
                            this.$message({
                                showClose: true,
                                message: '用户信息修改成功',
                                type: 'success',
                                duration: 2000,
                            });
                            this.getUserInfo()
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
            goBack(){
                let flag = true
                for (let key in this.ruleForm){
                    if (this.ruleForm[key] != this.user[key]){
                        flag = false
                        this.$confirm('您修改的信息未保存, 是否保存?', '提示', {
                            confirmButtonText: '保存',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.updateInfo()
                            return;
                        }).catch(() => {
                            this.$router.push({path:'/admin/userManager'});
                            this.$message({
                                type: 'info',
                                message: '信息未更改'
                            });
                        });
                    }
                }
                if (flag) {
                    this.$router.push({path: '/admin/goodsManager'});
                }
            },
        }
    }
</script>

<style scoped>
    .main{
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
    .main-right{
        position: absolute;
        left: 900px;
        top: 113px;
    }
    .foot-right{
        position: absolute;
        left: 750px;
        top: 365px;
    }
    .but{
        position: relative;
        margin-top: 5%;
        margin-left: 10%;
    }
    .time{
        position: relative;
        margin-left: 10%;
    }
    .el-link{
        font-size: 20px;
    }
</style>