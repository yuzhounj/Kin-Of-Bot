<script>
import {GameMap} from "@/assets/scripts/GameMap";
import {ref,onMounted} from "vue";
import {useStore} from "vuex";
export default {
    setup(){
        const store=useStore();
        let parent=ref(null);
        let canvas=ref(null);
        onMounted(()=>
            {
                store.commit(
                    "updateGameObject",
                    new GameMap(canvas.value.getContext('2d'),parent.value,store)
                )
            }
        )
        return{
          parent,
          canvas

        }
    }
};
</script>

<template>
<div ref="parent"  class="gameMap">
  <canvas ref="canvas" tabindex="0"></canvas>
</div>
</template>

<style scoped>
div.gameMap{
  width: 80%;
  height: 80%;
  background: #adb5bd;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 40px auto;
}
</style>