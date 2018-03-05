<template>
	<div class="home">
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
        showUpdate:false
	    }
	  },
	  methods:{
	  	showdata(){
	  	},
      getListData:function(){
        var url='https://news-at.zhihu.com/api/4/news/latest';
      	$.get(this.requestUrl+"?url="+url,(data,status)=>{
			    try{
            data=JSON.parse(data);
            this.multiStoryDataList.push(data);
            this.btnFlag=true;
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
      $.get("http://m.stormpass.cn/zhihu/php/version?localversion="+this.zhiHuVersion,(data,status)=>{
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
      }
	  },
	  mounted(){
	  	this.showdata();
	  	this.getListData();
      this.hasNewVersion();
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
</style>