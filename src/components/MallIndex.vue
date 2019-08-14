<template>
    <div class="mallIndex">
        这是商城首页<br>
        <router-link to="/admin/userManager" > 管理员界面</router-link>
        <router-link to="/logReg/passWordLogin"> 登录注册界面界面</router-link>
    </div>
</template>

<script>
    export default {
        name: "mallIndex"
    }
</script>

<style scoped>

</style>