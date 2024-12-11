
<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <img v-bind:src="$store.state.user.photo" alt="">
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="card">
          <div class="card-header">
            <span style="font-size: 150%">my bot</span>
            <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#add-bot">
              添加Bot
            </button>

            <!-- Modal -->
            <div class="modal fade" id="add-bot" tabindex="-1">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">创建bot</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="add-bot-title" class="form-label">title</label>
                      <input v-model="bot.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入bot名称">
                    </div>
                    <div class="mb-3">
                      <label for="add-bot-dsc" class="form-label">简介</label>
                      <textarea v-model="bot.description" class="form-control" id="add-bot-dsc" rows="3" placeholder="请输入简介"></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="add-bot-code" class="form-label">代码</label>
                      <VAceEditor
                          v-model:value="bot.code"
                          @init="editorInit"
                          lang="c_cpp"
                          theme="textmate"
                          style="height: 300px" />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="add">创建</button>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div class="card-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Bot名称</th>
                  <th scope="col">创建时间</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="botIt in botList" :key="botIt.id">
                  <td>{{botIt.title}}</td>
                  <td>{{botIt.createTime}}</td>
                  <td>
                    <button type="button" class="btn btn-primary" @click="beforeUpdate(botIt)" data-bs-toggle="modal" :data-bs-target="'#update-bot'+botIt.id">编辑</button>

                    <!-- Modal -->
                    <div class="modal fade" :id="'update-bot'+botIt.id" tabindex="-1">
                      <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">创建bot</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div class="mb-3">
                              <label for="add-bot-title" class="form-label">title</label>
                              <input v-model="botUpdate.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入bot名称">
                            </div>
                            <div class="mb-3">
                              <label for="add-bot-dsc" class="form-label">简介</label>
                              <textarea v-model="botUpdate.description" class="form-control" id="add-bot-dsc" rows="3" placeholder="请输入简介"></textarea>
                            </div>
                            <div class="mb-3">
                              <label for="add-bot-code" class="form-label">代码</label>
                              <VAceEditor
                                  v-model:value="botUpdate.code"
                                  @init="editorInit"
                                  lang="c_cpp"
                                  theme="textmate"
                                  style="height: 300px" />
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="update(botIt.id)">更新</button>
                          </div>
                        </div>
                      </div>
                    </div>


                    <button type="button" class="btn btn-danger" @click="deletes(botIt)">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref} from "vue";
import {addBot, getAllBot, deleteBot,updateBot} from "@/api/bot";
import {useStore} from "vuex";
import {Modal} from "bootstrap/dist/js/bootstrap";
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';

export default {

  components: {
    VAceEditor
  },
  setup(){
    ace.config.set(
        "basePath",
        "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/"
    )
    const store = useStore();
    let botList = ref([]);
    const bot = ref({
      title: "",
      description: "",
      code: ""
    });


    const botUpdate = ref({
      id: "",
      title: "",
      description: "",
      code: ""
    });

    const fetchBots = async () => {
      const response = await getAllBot(store);
      botList.value = response || [];
      console.log(botList.value);
    };

    const beforeUpdate = (bot) => {
      botUpdate.value = {
        id: bot.id,
        title: bot.title,
        description: bot.description,
        code: bot.content
      };
    };
    const add = async () => {
      //如果成功添加bot，重新获取bot列表
      const response = await addBot(bot.value,store)
      if(response){
        await fetchBots();
        //清空bot
        bot.value = {
          title: "",
          description: "",
          code: ""
        };
        //关闭modal
        Modal.getInstance("#add-bot").hide();

      }
    };

    //删除
    const deletes = async (bot) => {
      const response = await deleteBot(bot,store)
      if(response){
        await fetchBots();
      }
    };

    const update = async (id) => {
      botUpdate.value.id = id;
      const response = await updateBot(botUpdate.value,store)
      if(response){
        //清空botUpdate
        botUpdate.value = {
          id: "",
          title: "",
          description: "",
          code: ""
        };
        //关闭modal
        Modal.getInstance("#update-bot"+id).hide();
        await fetchBots();
      }
    };


    fetchBots();
    return {
      botList,
      bot,
      add,
      deletes,
      update,
      botUpdate,
      beforeUpdate
    };
  }
};
</script>



<style scoped>

</style>