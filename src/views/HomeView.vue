<template>
	<div id="home" class="home">
		<header-bar></header-bar>
		<div class="list-container" v-for='storyDataList in multiStoryDataList'>
			<story-list  :items="storyDataList.stories" ></story-list>
		</div>
    <div @click='loadMore' class="load-btn" v-show="btnFlag">{{btnInfo}}</div>
    <div class="new-version" v-show='showUpdate'>
      <a id="newVersionUrl" href="">发现新版本点此下载</a>
      <span style="color:black">您也可以点击右边☞</span>
      <span @click="ignoreThisVersion">忽略此版本</span>
    </div>
    <div id="tap" class="tap" v-show='showTap' @click='scrollToTop'>Top</div>
    <div class="white"></div>
	</div>
</template>

<script type="text/javascript">
	import HeaderBar from "@/components/HeaderBar";
  import StoryList from "@/components/StoryList";
	export default{
	  name:"home-view",
	  components:{ HeaderBar ,StoryList},
	  data(){
	    return {
        multiStoryDataList:[],
        btnInfo:'点击加载更多',
        btnFlag:'false',
        newVersion:'',
        showUpdate:false,
        showTap:false
	    }
	  },
	  methods:{
      getListData:function(){
        console.log(new Date().getTime());
        var url='https://news-at.zhihu.com/api/4/news/latest';
      	$.get(this.requestUrl+"?url="+url,(data,status)=>{
			    try{
            data=JSON.parse(data);//把数据转成obj
            var cache=JSON.parse(localStorage.getItem('multiStoryDataList'));//取得本地存储中的数据

            if (cache) {//当cache存在时才判断
              
              while(cache.length>10){
                cache.pop();//如果数组长度超过了2,则把最后一个元素删除;
              }
              
              if (data['date']==cache[0]['date']) {
                cache[0]=data;//更新最新的数据
                this.multiStoryDataList=cache;
              }else {//用户可能是第二天打开软件,此时本地存储中第一个数组中的元素会是昨天或者前天的
                cache=[];//清空数组中的元素
                cache.unshift(data);
              }
            }else{//如果本地存储不存在,则初始化;
              cache=[];//初始化cache
              cache.unshift(data);
            }

            this.multiStoryDataList=cache;//执行完上述逻辑后,cache已经是最新的数据了,且长度不会超过3
            this.btnFlag=true;
            localStorage.setItem('multiStoryDataList',JSON.stringify(cache));
            
			    }catch(e){
			    	console.log(e.message);
			    }
			  });
      },
      loadMore: function(){
        this.btnInfo="加载中...";
        var day=this.getPreDay(this.multiStoryDataList[this.multiStoryDataList.length-1]['date']);
        var url='https://news-at.zhihu.com/api/4/news/before/'+day;
        $.get(this.requestUrl+"?url="+url,(data,status)=>{
          try{
            data=JSON.parse(data);
            this.multiStoryDataList.push(data);
            this.btnInfo="加载更多";
            localStorage.setItem('multiStoryDataList',JSON.stringify(this.multiStoryDataList));
          }catch(e){
            this.btnInfo="加载失败";
          }
        });
      },
      getPreDay:function(str){
        var str= str.split('');
        var temp=[];
        var j=0;
        for (var i=0; i < str.length; i++) {
          if (i==4||i==6) {
            temp[j]='-';
            j++;
          }
          temp[j]=str[i];
          j++;
        }
        temp=temp.join('');
        var d = new Date(temp);
        d = +d - 1000*60*60*24;
        d = new Date(d);
        var month=d.getMonth()+1
        if (month<10) {
          month='0'+month;
        }
        var day=d.getDate()
        if (day<10) {
          day='0'+day;
        }
        return ""+d.getFullYear()+month+day;
      },
      hasNewVersion:function(){
      $.get("http://m.stormpass.cn/php/version.php?localversion="+this.zhiHuVersion,(data,status)=>{
          try{
            data=JSON.parse(data);
            if (data['code']=='yes') {
              this.newVersion=data['newVersion'];
              try{
                var ignore=localStorage.getItem('ignoreversion');
                if(ignore==data['newVersion']){
                    return false;
                } 
              //向用户提示更新版本
              document.getElementById("newVersionUrl").setAttribute('href',data['updateUrl']);
              this.showUpdate=true;
              }catch(e){
                 console.log(e.mesaage);
              }
            }
          }catch(e){
            console.log(e.mesaage);
          }
        });
      },
      ignoreThisVersion:function(){
        localStorage.setItem('ignoreversion',this.newVersion);
        this.showUpdate=false;
      },
      homeOnScroll:function(){
        var home=document.getElementById('home');
        sessionStorage.setItem('homeScrollTop',home.scrollTop);
        if (home.scrollTop>4000) {
          this.showTap=true;
        }
        if (home.scrollTop<3000) {
          this.showTap=false;
        }
      },
      scrollToTop:function(){
        document.getElementById('home').scrollTop=0;
        this.showTap=false;
      }
	  },
	  mounted(){
      var t= new Date().getTime();//获取当前时间
      try{
        var cache=JSON.parse(localStorage.getItem('multiStoryDataList'));
        if (cache) {
          this.multiStoryDataList=cache;
          if (!localStorage.getItem('lastUpdateTime')||t-localStorage.getItem('lastUpdateTime')>20000) {
            this.getListData();
            localStorage.setItem('lastUpdateTime',t);
          }
        }else{
          this.getListData();
        }
      }catch(e){
        
      }
      this.hasNewVersion();
      var home= document.getElementById('home');
      home.addEventListener("scroll", this.homeOnScroll);

      setTimeout('home.scrollTop=sessionStorage.getItem("homeScrollTop");',1);//必须设置时间才有效,不知为何
	  	var i = document.getElementsByTagName("meta");
      i[1]["content"] = "width=640,maximum-scale=1,user-scalable=no";
	  },
	  computed:{
      
	  }
	}
</script>

<style>
  a {
    text-decoration: none;
    color: black; 	
  }
	.home{
		background: url(../assets/home_bg.png);
		width: 100%;
		height: 100%;
		padding: 20px 0px;
		text-decoration: solid;
		overflow: scroll;
    text-align: center;
	}
	.list-container{
		box-sizing: border-box;
		padding: 20px;
	}
  .white{
    height: 50px;
  }
  .load-btn{
    width: 93%;
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 6px;
    font-size: 30px;
    margin: 0px auto;
    box-sizing: border-box;
  }
  .new-version {
    position:fixed;
    bottom: 0px;
    width: 100%;
    font-size: 20px;
    background: white;
    height: 80px;
    line-height: 80px;
  }
  .new-version a{
    display: inline-block;
    font-size: 25px;
    line-height: 80px;
    float: left;
  }
  .tap{
    position: fixed;
    right:20px;
    bottom: 20px;
    width: 70px;
    height: 70px;
    background: orange;
    border-radius: 70px;
    line-height: 70px;
    font-size: 30px;
  }
</style>