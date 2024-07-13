import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView  from "@/views/pk/PkIndexView.vue";
import RankListIndexView from "@/views/rankList/RankListIndexView.vue";
import RecordIndexView  from "@/views/record/RecordIndexView.vue";
import UserBotIndexView from "@/views/userBot/UserBotIndexView.vue";
import NotFound from "@/views/error/NotFound.vue";
const routes = [
  {
    path: "/",
    name:"root",
    redirect: "/pk/",
  }
      ,
  {
    path: '/pk/',
    name: 'pk_index',
    component: PkIndexView
  }
  ,
  {
    path:"/rankList/",
    name:"rankList_index",
    component:RankListIndexView
  }
  ,
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView
  }
  ,
  {
    path: "/userBot/",
    name: "userBot_index",
    component: UserBotIndexView
  }
  ,
  {
    path: "/404"
    ,name: "404"
    ,component: NotFound
  }
  ,
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
