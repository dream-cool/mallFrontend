<template>
    <div class="userManager">
        <el-table :data="users" @filter-change="filterHandler"
                  >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="用户密码">
                            <span>{{ props.row.passWord }}</span>
                        </el-form-item>
                        <el-form-item label="用户电话">
                            <span>{{ props.row.tel }}</span>
                        </el-form-item>
                        <el-form-item label="用户地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="用户邮箱">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="用户余额">
                            <span>{{ props.row.money }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" width="100" sortable></el-table-column>
            <el-table-column prop="userName" label="姓名" width="100" sortable></el-table-column>
            <el-table-column prop="tel" label="电话" width="170" sortable></el-table-column>
            <el-table-column prop="role" label="角色" width="150" size="medium"
                             :filters="[{ text: '用户', value: 'user' }, { text: '员工', value: 'employee' },
                                            {text:'管理员',value:'admin'}]"
                             :filter-change="filterHandler"
                             :filter-method="filterRole"></el-table-column>
            <el-table-column prop="sex" label="性别" width="100"
                             :filters="[{ text: '男', value: '1' }, { text: '女', value: '0' }]"
                             :filter-method="filterSex"></el-table-column>
            <el-table-column prop="isVIP" label="VIP" width="100"
                             :filters="[{ text: 'VIP', value: '1' }, { text: '普通用户', value: '0' }]"
                             :filter-method="filterVIP"></el-table-column>
            <el-table-column prop="state" label="状态" width="100"
                             :filters="[{ text: '正常', value: '1' }, { text: '锁定', value: '0' }]"
                             :filter-method="filterState"></el-table-column>

            <el-table-column prop="regTime" label="注册时间" width="200"
                             column-key="regdate"
                             :filters="[{text: '最近一小时', value: 3600},{text: '最近一天', value: 3600*24},
                             {text: '最近一个月', value: 3600*24*30},{text: '最近一年', value: 3600*24*356}]"
                             :filter-method="filterRegTime"></el-table-column>
            <el-table-column prop="lastLoginTime" label="最后登录" width="200"
                             column-key="logdate"
                             :filters="[{text: '最近一小时', value: 3600},{text: '最近一天', value: 3600*24},
                             {text: '最近一个月', value: 3600*24*30},{text: '最近一年', value: 3600*24*356}]"
                             :filter-method="filterLastLoginTime"></el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="medium"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" @click="userEdit(scope.row.userId)"></el-button>
                    <el-button  icon="el-icon-delete" @click="userDelete(scope.row.userId)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    :hide-on-single-page=true
                    @prev-click ="prevPage()"
                    @next-click ="nextPage()"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page.sync="currentPage"
                    :page-sizes	="['10','50','100']"
                    :page-size.sync = "pageSize"
                    layout="total ,sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>

    import axios from 'axios'
    export default {
        name: 'userManager',
        data() {
            return {
                currentPage: 1,
                total: 0,
                users: [],
                pageSize:10,
                search:'',
                defaultUser:'',
                condiction:{}
            }
        },
        created() {
            this.getUserInfo()
        },
        methods: {
            getUserInfo() {
                axios({
                    url: '/user/list',
                    params: {pageSize: this.pageSize, currentPage: this.currentPage},
                    timeout: 5000
                }).then(res => {
                    this.users = res.data.list;
                    for (let i = 0; i < this.users.length; i++) {
                        if (this.users[i].sex == '1'){
                            this.users[i].sex = '男'
                        } else {
                            this.users[i].sex = '女'
                        }
                        if (this.users[i].state == '1'){
                            this.users[i].state = '正常'
                        } else {
                            this.users[i].state = '锁定'
                        }
                        if (this.users[i].isVIP == '1'){
                            this.users[i].isVIP = '是'
                        } else {
                            this.users[i].isVIP = '不是'
                        }
                        if (i == 0){
                            this.defaultUser = this.users[i];
                        }
                    }
                    this.currentPage = res.data.pageNum;
                    this.total = res.data.total;
                    console.log(this.defaultUser)
                })
            },
            handleCurrentChange(val) {
                this.currentPage =  val
                this.getUserInfo();
            },
            handleSizeChange(val){
                this.pageSize = val
                this.getUserInfo();
            },
            filterHandler(value, row, column) {
                console.log(value)
                console.log(row)
                const property = column['property'];
                return row[property] === value;
            },
            filterRole(value){
                this.condiction.role = value
                this.select();
            },
            filterSex(value){
                this.condiction.sex = value
                this.select();
            },
            filterVIP(value){
                this.condiction.isVIP = value
                this.select();
            },
            filterState(value){
                this.condiction.state = value
                this.select();
            },
            filterRegTime(value){
                this.condiction.regTime = value
                this.select();
            },
            filterLastLoginTime(value){
                this.condiction.lastLoginTime = value
                this.select();
            },
            userEdit(userId) {
                this.$router.push({ path:'/admin/userDetail/'+userId})
            },
            userDelete(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios({
                        url: '/user/delete',
                        params: {type: '', userId: id},
                        timeout: 5000
                    }).then(res => {
                        this.getUserInfo()
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success',
                            duration: 2000,
                        });
                        console.log(res.data)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            select(){
                axios({
                    url: '/user/delete',
                    params: {type: '', userId: id},
                    timeout: 5000
                }).then(res => {
                    this.getUserInfo()
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success',
                        duration: 2000,
                    });
                    console.log(res.data)
                });
            },
        },
        components: {}
    }
</script>

<style scoped>
    .block{
        margin-left: 400px;
    }
</style>