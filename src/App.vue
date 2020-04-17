<template>
  <div id="app">
<nav class="navbar navbar-light bg-light ">
  <a class="navbar-brand" href="#">
    <img src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="">
    IG網紅收集
  </a>
</nav>
 <div class="container">

<notice-comp :type="alert_type"></notice-comp>

<h4 class=" border-left border-success pl-3 mt-3">網紅基本資料</h4>
        <text-comp vname='名稱' :vv="store.name" @data-change="store.name=$event"></text-comp>
        <text-comp vname='email' :vv="store.email" @data-change="store.email=$event"></text-comp>
        <text-comp vname='粉絲數量' :vv="store.fanAmount" @data-change="store.fanAmount=$event"></text-comp>
        <text-comp vname='IG網址' :vv="store.igUrl" @data-change="store.igUrl=$event"></text-comp>
        <text-comp vname='其他網址' :vv="store.otherUrl" @data-change="store.otherUrl=$event"></text-comp>
        <h4 class=" border-left border-success pl-3 mt-3">網紅類型</h4>
        <check-comp vname='網紅類型(可複選)'  @data-change="store.tags=$event" :options="[`生活`,`開箱`,`穿搭`,`財經`,`遊戲`,`運動`,`親子`,`寵物`,`感情`,`星座`,`旅遊`,`美食`,`模仿`,`搞笑`,`魔術`,`舞蹈`,`音樂`,`攝影`,`電影`,`練字`,`插畫`,`法律`,`教育`,`3C`,`形像經營`,`語文`,`Cosplay`,`Line貼圖`]"></check-comp>
        <select-comp vname='資料建立者' :vv="store.author" @data-change="store.author=$event" :options="[`同事A`,`同事B`,`同事C`]"></select-comp>
                <a @click="save" class="btn btn-success btn-lg w-100 mt-2" href="#" role="button" id="save__btn">儲存資料</a>
        <a @click="goto" class="btn btn-primary btn-lg w-100 mt-2 mb-2" href="#" role="button" id="goto__btn">前往後台</a>
      </div>

  </div>

</template>

<style scoped>
h4{
  border-left: 8px solid  #229A80  !important;
}

</style>
<script>
import axios from 'axios';
import TextComp from './TextComp.vue'
import SelectComp from './SelectComp.vue'
import CheckComp from './CheckComp.vue'
import NoticeComp from './NoticeComp.vue'
import chrome_api from './chrome_api.js'
export default {
  data () {
    return {
      msg: '網紅搜集',
      current_host:"",
      alert_type:"",
      store:{
        name:"",
        email:"",
        igUrl:"",
        otherUrl:"",
        author:"",
        tags:""
      }
    }
  },
  components:{
    TextComp,SelectComp,CheckComp,NoticeComp
  },methods:{
    dig_from_page:function(){
      invoke_chrome_content_js_scope();
    },
    save:function(){
      //let endpoint="http://localhost:3303/admin/kol/save"
      let endpoint="https://dev.penker.tw/admin/kol/save"
      console.log(this.store)
      axios.post(endpoint,this.store)
      .then( response=> {
        console.log(response);
        this.alert_type="success"
      })
      .catch( error=> {
        console.log(error);
        this.alert_type="faild"
      });
    },
    goto:function(){
       let newUrl="https://YOUR__URL"
       chrome_api.launch_other_tab(newUrl)
    },
    save_author_to_chrome_storage:function(){
      chrome_api.set_chrome_storage_data({"author":this.store.author}).then(res=>{console.log("data save to chrome storage")})
    },
    update_value:function(key,event){
      console.log(key)
      console.log(event)

    }
  },
  watch:{
      store:{
       handler: function (val, oldVal) {
        console.log("auto save...")
        this.save_author_to_chrome_storage()
       },
         deep: true
      }
  },
  mounted:function(){
      //啟動後使用chrome.runtime.onMessage進行監聽
      //等待回傳的訊息
      chrome_api.on_message_from_chrome().then(req=>{
        this.store.igUrl=req.parser.ig_url
        this.store.name=req.parser.title
        this.store.email=req.parser.email
        this.store.fanAmount=req.parser.fans_qty
      });

      chrome_api.invoke_chrome_content_js_scope()

      chrome_api.get_chrome_storage_data().then(res=>{
        console.log(res.app_setting.author)

        this.store.author=res.app_setting.author
      })

    }
}
</script>