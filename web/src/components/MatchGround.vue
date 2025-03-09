<script setup>

import { ref } from 'vue';
import { useStore } from 'vuex';
import {getAllBot} from "@/api/bot";

const store = useStore();
let bots = ref([]);
let selected_bot = ref("-1");

const fetchBots = async () => {
  const response = await getAllBot(store);
  bots.value = response || [];
  console.log(bots.value);
};

fetchBots();

let match_btn = ref("开始匹配");
const click_match_btn = () => {
  if(match_btn.value === "开始匹配"){
    match_btn.value = "取消匹配";
    store.state.pk.socket.send(JSON.stringify({
      event: "start-matching",
      bot_id: selected_bot.value
    }));

  }else{
    match_btn.value = "开始匹配";
    store.state.pk.socket.send(JSON.stringify({
      event: "stop-matching"
    }));
  }
}
</script>

<template>
  <div class="matchground">
    <div class="row">
      <div class="col-4">
        <div class="user-photo">
          <img v-bind:src="$store.state.user.photo" alt="">
        </div>
        <div class="username">
            {{$store.state.user.username}}
        </div>
      </div>

      <div class="col-4">
        <div class="user-select-bot">
          <select v-model="selected_bot" class="form-select" aria-label="Default select example">
            <option value="-1">亲自上阵</option>
            <option v-for="bot in bots" :key="bot.id" :value="bot.id">
              {{bot.title}}
            </option>
          </select>
        </div>
      </div>


      <div class="col-4">
        <div class="user-photo">
          <img v-bind:src="$store.state.pk.opponent_photo" alt="">
        </div>
        <div class="username">
          {{$store.state.pk.opponent_username}}
        </div>
      </div>
    </div>
    <div class="clo-12" style="text-align: center">
      <button @click="click_match_btn" type="button" class="btn btn-warning">{{match_btn}}</button>
    </div>
  </div>
</template>

<style scoped>
div.matchground{
  width: 60vw;
  height: 70vh;
  margin: 40px auto;
  background-color: lightblue;
}

div.user-photo{
  text-align: center;
  padding-top: 20vh;
}

div.user-select-bot{
  padding-top: 20vh;
}
div.user-select-bot > select{
  width: 60%;
}
div.user-photo>img{
  border-radius: 50%;
}
div.username{
  text-align: center;
  font-size: 150%;
}

</style>