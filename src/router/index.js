import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/views/LayoutView.vue'
import LoginView from '@/views/LoginView.vue'
import UserList from '@/views/UserList.vue'
import GoodsList from '@/views/GoodsList.vue'
import IndexView from '@/views/IndexView.vue'
import AdminList from '@/views/AdminList.vue'
import store from '@/store'
const routes = [

   {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: LayoutView,
    children:[
          {
            path:'index',
            name:'index',
            component:IndexView
          },
          {
            
            path:'userList',
            name:'userList',
            component:UserList
          },
          {
            path:'goodsList',
            name:'goodsList',
            component:GoodsList
          },
          {
            path:'admin',
            name:'admin',
            component:AdminList
          }
    ]
  },



  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) =>{ 
  console.log(store.getters['userData/getData']); 
    if(!store.getters['userData/getData']){
       if(to.path=='/login') { 
        next(); 
        return 
      } else{
        next("/login") 
      }
      
    }else{ 
      next()
     } 
    })
export default router
