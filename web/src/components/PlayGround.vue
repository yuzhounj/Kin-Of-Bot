<script>
import GameMap from "@/components/GameMap.vue";
export default {
  components: {
    GameMap,
  }
};
</script>

<template>
  <div class="playground">
     <GameMap></GameMap>
  </div>
</template>

<style scoped>
div.playground{
  width: 100vw;
  height: 100vh;
  background: bisque;
  display: flex;
  justify-content: center;
  align-content: center;
}

</style>

