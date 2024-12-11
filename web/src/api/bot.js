import $ from "jquery";


export const getAllBot = (store) => {
    return $.ajax({
        url:"http://localhost:3000/user/bot/getAllBot/",
        type:"GET",
        headers:{
            Authorization:"Bearer "+store.state.user.token
        },
        contentType:"application/json",
        success(resp){
            console.log(resp);
            return resp;
        },
        error(){
            console.log("没有成功连接到服务器");
            return null;
        }
    })
}

//添加bot
export const addBot = (data,store) => {
    console.log(data);
    return $.ajax({
        url:"http://localhost:3000/user/bot/add/",
        type:"POST",
        headers:{
            Authorization:"Bearer "+store.state.user.token
        },
        contentType:"application/json",
        data:JSON.stringify(
            {
                title:data.title,
                description:data.description,
                content:data.code,
            }
        ),
        success(resp){
            console.log(resp);
            return resp;
        },
        error(){
            console.log("没有成功连接到服务器");
            return null;
        }
    })
}

//删除bot
export const deleteBot = (data,store) => {
    return $.ajax({
        url:"http://localhost:3000/user/bot/remove/",
        type:"POST",
        headers:{ Authorization:"Bearer "+store.state.user.token},
        contentType:"application/json",
        data:JSON.stringify({
            bot_id:data.id,
        }),
        success(resp){
            console.log(resp);
            return resp;
        },
        error(){
            console.log("没有成功连接到服务器");
            return null;
        }
    })
}

export const updateBot = (data,store) => {
    console.log(data);
    return $.ajax({
        url:"http://localhost:3000/user/bot/update/",
        type:"POST",
        headers:{
            Authorization:"Bearer "+store.state.user.token
        },
        contentType:"application/json",
        data:JSON.stringify(
            {
                bot_id:data.id,
                title:data.title,
                description:data.description,
                content:data.code,
            }
        ),
        success(resp){
            console.log(resp);
            return resp;
        },
        error(){
            console.log("没有成功连接到服务器");
            return null;
        }
    })
}




