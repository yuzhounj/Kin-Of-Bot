<script>
import {GameMap} from "@/assets/scripts/GameMap";
import {ref,onMounted} from "vue";
export default {
    setup(){
        let parent=ref(null);
        let canvas=ref(null);
        onMounted(()=>
            {
                new GameMap(canvas.value.getContext('2d'),parent.value);

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