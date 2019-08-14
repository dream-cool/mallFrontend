<template>
    <div class="login">
        <el-menu
                default-active="/logReg/passWordLogin"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#909399"
                text-color="#fff"
                active-text-color="#67C23A"
                router>
            <el-menu-item index="/home">返回首页</el-menu-item>
            <el-menu-item index="/logReg/passWordLogin">用户登录</el-menu-item>
            <el-menu-item index="/logReg/register">账号注册</el-menu-item>
        </el-menu>
        <br>

        <router-view></router-view>


    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .login{
        margin-left: 30%;

        width: 30%;
    }

</style>