<template>
    <NavBar />
   <router-view></router-view>
</template>
<script>
import NavBar from './components/NavBar.vue';
import "bootstrap/dist/css/bootstrap.min.css";
//import js
import "bootstrap/dist/js/bootstrap";

export default {
    components: {
        NavBar
    }
}
</script>
<style>
body{
  background-image: url("@/assets/picture/logo.png");
  background-size: cover;
}

</style>
