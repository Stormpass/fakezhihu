<template>
  <div id="container" class="container">
    <div class="head-line">
      <div class="img-wrap">
        <h1 class="headline-title">{{data.title}}</h1>
        <span class="img-source">{{data.image_source}}</span>
        <img :src="data.image" alt="">
        <div class="img-mask"></div>
      </div>
    </div>
    <div class="body" v-html="storyDetail">{{storyDetail}}</div>

  </div>
</template>

<script type="text/javascript">
export default{
  name: "story-view",
  component: {},
  data () {
    return {
      storyDetail:'',
      data:{image:"",image_source:"",title:""}
    }
  },
  methods:{
    getStoryDetail:function(id){
      $.get("http://localhost:8888/api?detail="+id,(data,status)=>{
          try{
            data=JSON.parse(data);
            var html=data['body'];
            var newHtml=html.replace(/\\/g,"");
            this.storyDetail=html;
            this.data['image']=data['image'];
            this.data['image_source']=data['image_source'];
            this.data['title']=data['title'];
          }catch(e){
            console.log(e.message);
          }
      });
    },
    handledata:function(){

    }
  },
  mounted(){//页面加载完毕执行的函数
     if (this.$route.params.id) {
                                                   //首先把id存到本地存储中去.
      this.getStoryDetail(this.$route.params.id);  //然后通过id获取信息
     }else{
      console.log("无法获取文章id,不能获取详情");
     }
     //处理页面显示问题
     var i = document.getElementsByTagName("meta");
     i[1]["content"] = "user-scalable=no, width=device-width";
     
  },
}
</script>

<style>
  #container{
    text-align: left;
    overflow: scroll;
  }
  .head-line{
    height: 300px;
  }
  .img-wrap{
    height: 300px;
  }
  .img-wrap img{
    width: 100%!important;
  }
  a{
  	text-decoration: none;
  }
  .container{
    width: 100%;
    height: 100%;
    background: url("../assets/login_background.jpg");
    background-size:100% 100%;
  }
</style>
