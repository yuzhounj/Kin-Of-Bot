<script>
import ContentField from "@/components/ContentField.vue";
import {useStore} from "vuex";
import {ref} from "vue";
import router from "@/router/index";
export default {
  components: {
    ContentField,
  },
  setup(){
    const store = useStore();
    const username = ref('');
    const password = ref('');
    const error_message= ref('');
    let show_content=ref(false);
    const jwt_token = sessionStorage.getItem('jwt_token');
    if(jwt_token){
      store.commit("updateToken",jwt_token);
      store.dispatch("getInfo",{
        success(){
          router.push({name:'root'});
        },
        error(){
          show_content.value=true;
        }
      });
    }else{
      show_content.value=true;
    }

    const login = () => {
      error_message.value='';
      store.dispatch("login", {
            username: username.value,
            password: password.value,
            success() {
              store.dispatch("getInfo",{
                success(){
                  router.push({name:'root'});
                  console.log(store.state.user);
                }
              })
            },
            error() {
              error_message.value ="用户名或密码错误";
            }
          });
    }
    return {
      username,
      password,
      error_message,
      show_content,
      login
    };
  }
};
</script>

<template>
  <ContentField v-if="show_content">
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
          </div>
          <div class="error-message">
            {{ error_message }}
          </div>
          <button type="submit" class="btn btn-primary">登录</button>
        </form>
      </div>
    </div>
  </ContentField>
</template>

<style scoped>
button {
  width: 100%;
}
.error-message {
  color: red;
}
</style>