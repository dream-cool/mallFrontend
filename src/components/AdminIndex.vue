<template>
    <div class="adminIndex">
        <el-container style="height: 880px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-active="$route.path" router>
                    <el-menu-item   index="/home">
                        <i class="el-icon-back"></i>返回首页
                    </el-menu-item>
                    <el-submenu index="/admin/userManager">
                        <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="/admin/userManager">用户列表</el-menu-item>
                            <el-menu-item index="/admin/addUser">添加用户</el-menu-item>
                            <el-menu-item index="/admin/userDetail" @click="EditDefault">修改用户</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/admin/goods">
                        <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
                            <el-menu-item index="/admin/goodsManager">商品列表</el-menu-item>
                            <el-menu-item index="/admin/addGoods">添加商品</el-menu-item>
                            <el-menu-item index="/admin/goodsDetail/:id">修改信息</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/admin/order">
                        <template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
                        <el-menu-item index="/admin/orderManager">订单列表</el-menu-item>
                        <el-menu-item index="/admin/addOrder">添加订单</el-menu-item>
                        <el-menu-item index="/admin/orderDetail/:id">处理订单</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px; background-color: rgb(238, 241, 246)">
                    <el-dropdown>
                        <i class="el-icon-user" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>测试人员</span>
                </el-header>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
    
</template>

<script>
export default {
    name: 'adminIndex',
    data() {
        return {
        }
    },
    created(){

    },
    methods: {
        EditDefault(){
        },
        jump(url){
            console.log(url)
            this.$router.push({path:''+url});
        }
    },
    components: {

    }
}
</script>

<style>

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    .el-aside {
        color: #333;
    }
    a{
        text-decoration: none;
    }

</style>