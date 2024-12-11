import $ from "jquery"
export default {
    state: {
        id:"",
        username:"",
        photo:"",
        token:"",
        isLogin:false,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user){
            state.id = user.id
            state.username = user.username
            state.photo = user.photo
            state.isLogin = true
        },
        updateToken(state, token){
            state.token = token
        },
        logout(state){
            state.id = ""
            state.username = ""
            state.photo = ""
            state.token = ""
            state.isLogin = false
        }
    },
    actions: {
        login(context, data){
            $.ajax({
                url: "http://localhost:3000/user/account/login/",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    username: data.username,
                    password: data.password
                }),
                success(resp){
                    if(resp.error_message==="success"){
                        localStorage.setItem("jwt_token", resp.token);
                        context.commit("updateToken", resp.token);
                        data.success(resp);
                        console.log(localStorage.getItem("jwt_token"));
                    }else{
                        data.error(resp);
                    }
                },
                error(resp){
                    data.error(resp);
                }
            })

        },

        getInfo(context,data){
            $.ajax({
                url: "http://localhost:3000/user/account/info/",
                type: "get",
                headers: {
                    Authorization: "Bearer "+context.state.token
                },
                success(resp) {
                    if(resp.error_message==="success") {
                        context.commit("updateUser", {
                            ...resp,
                            is_login: true,
                        });
                        data.success(resp);
                    }else{
                        data.error(resp);
                    }
                },
                error(){
                    console.log(context.state.token);
                    console.log("连接失败");
                }
            });

        },
        logout(context) {
            localStorage.removeItem("jwt_token");
            context.commit("logout");
        }
    },
    modules: {
    }
}