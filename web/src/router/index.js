import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView  from "@/views/pk/PkIndexView.vue";
import RankListIndexView from "@/views/rankList/RankListIndexView.vue";
import RecordIndexView  from "@/views/record/RecordIndexView.vue";
import UserBotIndexView from "@/views/user/bot/UserBotIndexView.vue";
import NotFound from "@/views/error/NotFound.vue";
import UserAccountLoginView from "@/views/user/account/UserAccountLoginView.vue";
import UserAccountRegisterView from "@/views/user/account/UserAccountRegisterView.vue";
import store from "@/store/index.js";
const routes = [
  {
    path: "/",
    name:"root",
    redirect: "/pk/",
    meta:{
      requestAuth: true
    }
  }
      ,
  {
    path: '/pk/',
    name: 'pk_index',
    component: PkIndexView,
    meta:{
      requestAuth: true
    }
  }
  ,
  {
    path:"/rankList/",
    name:"rankList_index",
    component:RankListIndexView,
    meta:{
      requestAuth: true
    }
  }
  ,
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
    meta:{
      requestAuth: true
    }
  }
  ,
  {
    path: "/user/bot",
    name: "userBot_index",
    component: UserBotIndexView,
    meta:{
      requestAuth: true
    }
  }
  ,
  {
    path: "/404"
    ,name: "404"
    ,component: NotFound,
    meta:{
      requestAuth: false
    }
  }
  ,
  {
    path: "/user/account/login"
    ,name: "userAccount_login"
    ,component: UserAccountLoginView,
    meta:{
      requestAuth:false
    }
  },
  {
    path: "/user/account/register"
    ,name: "userAccount_register"
    ,component: UserAccountRegisterView,
    meta:{
      requestAuth: false
    }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requestAuth){
        if(store.state.user.isLogin){
        next();
        }else{
        next("/user/account/login");
        }
    }else{
        next();
    }
})

export default router
