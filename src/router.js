import VueRouter from 'vue-router'
import userInfo from './components/user/UserDetail'
import userManager from './components/user/UserManager'
import mallIndex from './components/MallIndex'
import test from './components/Test'
import logAndReg from './components/user/LogAndReg'
import verificationLogin from './components/user/VerificationLogin'
import passWordLogin from './components/user/PassWordLogin'
import register from './components/user/Register'
import addUser from './components/user/AddUser'
import orderManager from './components/order/OrderManager'
import addOrder from './components/order/AddOrder'
import orderDetail from './components/order/OrderDetail'
import goodsDetail from './components/goods/GoodsDetail'
import goodsManager from './components/goods/GoodsManager'
import addGoods from './components/goods/AddGoods'



// 导入对应的路由组件
import adminIndex from './components/AdminIndex'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    // { path:"/", component: userManager},
    // { path:"/user/login", component: userManager},
    { path:"/", redirect: '/home'},
    { path:"/home", component: mallIndex},
    { path:"/admin", component: adminIndex,
      children:[
        { path:"/admin/userManager", component:userManager },
        { path:"/admin/userDetail/:id", component:userInfo },
        { path:"/admin/addUser", component:addUser },
        { path:"/admin/orderManager", component:orderManager },
        { path:"/admin/orderDetail/:id", component:orderDetail },
        { path:"/admin/addOrder", component:addOrder },
        { path:"/admin/goodsManager", component:goodsManager },
        { path:"/admin/goodsDetail/:id", component:goodsDetail },
        { path:"/admin/addGoods", component:addGoods },
      ]
    },
    { path:"/logReg", component:logAndReg,
      children: [
        { path:"/logReg/passWordLogin",component:passWordLogin},
        { path:"/logReg/verificationLogin",component:verificationLogin},
        { path:"/logReg/register",component:register}
        ],
    }
  ],
  mode:'history',
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router