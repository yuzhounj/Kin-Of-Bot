<script>
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  setup() {
    const route = useRoute();
    let rout_name= computed(() =>route.name);
    return {
      rout_name
    }
  }
}
</script>

<template>


<nav class="navbar navbar-expand-lg bg-dark">
    <div class="container">
      <router-link class="navbar-brand text-light" to="/">King Of Bots</router-link>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-light" :class="{active:rout_name==='pk_index'}" to="/pk/">对战</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" :class="{active:rout_name==='record_index'}" to="/record/">对局列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" :class="{active:rout_name==='rankList_index'}" to="/rankList/">排行榜</router-link>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              周煜
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/userBot/">我的Bot</router-link>
              </li>

              <li>
                <router-link class="dropdown-item" to="#">退出</router-link>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>


<style scoped>
.nav-link {
  color: #adb5bd; /* 默认文本颜色 */
}
.nav-link.active {
  color: #ffffff; /* 活动状态下的文本颜色 */
  background-color: #007bff; /* 活动状态下的背景颜色 */
}
</style>
