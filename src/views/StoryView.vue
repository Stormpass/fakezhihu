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
    <div class="comments-btn" @click='showComments' v-show='btnshow'>
      <span>{{btnInfo}}</span>
    </div>
    <div class="comments-container" v-show='commentsshow' > 
      <comments-item v-for="item in items" :item='item'></comments-item>
    </div>
    <div class="white"></div>
  </div>
</template>

<script type="text/javascript">
import CommentsItem from '@/components/CommentsItem';
export default{
  name: "story-view",
  components: { CommentsItem },
  data () {
    return {
      storyDetail:'',
      data:{image:"",image_source:"",title:""},
      commentsshow:false,
      btnshow:false,
      items:[],
      btnInfo:'查看短评',
    }
  },
  methods:{
    getStoryDetail:function(id){
      var url='https://news-at.zhihu.com/api/4/news/'+id;
      $.get(this.requestUrl+"?url="+url,(data,status)=>{
          try{
            data=JSON.parse(data);
            var html=data['body'];
            var newHtml=html.replace(/\\/g,"");
            this.storyDetail=html;
            this.data['image']=data['image'];
            this.data['image_source']=data['image_source'];
            this.data['title']=data['title'];
            this.btnshow=true;//页面加载成功再显示加载评论的按钮
          }catch(e){
            console.log(e.message);
          }
      });
    },
    handledata:function(){

    },
    showComments:function(){
      this.btnInfo='加载中......';
      var url='https://news-at.zhihu.com/api/4/story/'+localStorage.getItem('currentId')+'/short-comments';
      $.get(this.requestUrl+"?url="+url,(data,status)=>{
          try{
            data=JSON.parse(data);
            this.items=data['comments'];
            this.commentsshow=true;
            this.btnInfo='最近'+data['comments'].length+'条评论';
          }catch(e){
            console.log(e.message);
            this.btnInfo='抱歉,加载失败';
          }
      });
    }
  },
  mounted(){//页面加载完毕执行的函数
    if (this.$route.params.id) {                               //如果上层页面传入了id.
      localStorage.setItem('currentId', this.$route.params.id); //首先把id存到本地存储中去.
      this.getStoryDetail(this.$route.params.id);               //然后通过id获取信息
    }else if(localStorage.getItem('currentId')){               //如果没有传入id,那么到本地存储中找
      this.getStoryDetail(localStorage.getItem('currentId'));   //通过id获取信息
    }else{                                                     //如果两个地方都获取不到,
      console.log('无法获取id,因此无法获取详情');               //报错
    }
     //处理页面显示问题
    var i = document.getElementsByTagName("meta");
    i[1]["content"] = "user-scalable=no, width=device-width";  //历史遗留问题
    
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
    background: rgb(255,255,255);
    background-size:100% 100%;
  }
  .comments-container{
    box-sizing: border-box;
    border-radius: 5px;
    width: 90%;
    margin: 0px auto;
    background: (255,255,255);
    padding:10px;
    border: 1px solid rgba(1,1,1,0.1);
    margin: 20px auto 30px; 
  }
  .comments-btn{
    text-align: center;
  }
  .comments-btn span{
    display: inline-block;
    width: 70%;
    height: 30px;
    border:1px solid rgba(1,1,1,0.5);
    border-radius: 4px;
    line-height: 30px;
  }
  .white{
    height: 50px;
  }
</style>
