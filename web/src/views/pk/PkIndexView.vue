<script>
import PlayGround from '../../components/PlayGround.vue';
import {useStore} from "vuex";
import ResultBoard from "@/components/ResultBoard.vue";
import {onMounted, onUnmounted} from "vue";
import MatchGround from "@/components/MatchGround.vue";
export default {
  components:{
    MatchGround,
    PlayGround,
    ResultBoard
  },
  setup(){
    const store = useStore();
    let socketUrl = `ws://127.0.0.1:3000/websocket/${store.state.user.token}/`;
    store.commit("updateLoser","none");

    let socket = null;
    onMounted(()=>{
      store.commit("updateOpponent",{
        username: "test",
        photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
      })
      socket = new WebSocket(socketUrl);
      socket.onopen = ()=> {
        console.log("WebSocket is open now.");
        store.commit("updateSocket",socket);
      };
      socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if(data.event==="start-matching"){
          store.commit("updateOpponent",{
            username: data.opponent_username,
            photo: data.opponent_photo
          });
          setTimeout(()=>{
            store.commit("updateStatus","playing");
          },200);
          store.commit("updateGame",data.game);
        }else if(data.event==="move"){
          const game= store.state.pk.GameObject
          const [snake0,snake1]=game.snakes;
          snake0.direction=data.a_direction;
          snake1.direction=data.b_direction;
        }
        else if(data.event=="result"){
          const game= store.state.pk.GameObject
          const [snake0,snake1]=game.snakes;
          if(data.loser==="all"||data.loser==="A"){
            snake0.status="die";
          }
          if(data.loser==="all"||data.loser==="B") {
            snake1.status = "die";
          }

          store.commit("updateLoser",data.loser);

        }

      };
      socket.onclose = () => {
        console.log("WebSocket is closed now.");
      };

    })
    onUnmounted(()=>{
      socket.close();
      store.commit("updateStatus","matching");
    })


  }
};


</script>

<template>
 <PlayGround v-if="$store.state.pk.status=== 'playing'"></PlayGround>
  <MatchGround v-else></MatchGround>
  <ResultBoard v-if="$store.state.pk.loser !== 'none'"></ResultBoard>

</template>

<style scoped>

</style>