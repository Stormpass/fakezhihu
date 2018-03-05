<template>
	<div class="home">
		<header-bar></header-bar>
		<div class="list-container" v-for='storyDataList in multiStoryDataList'>
			<story-list  :items="storyDataList.stories" ></story-list>
		</div>
    <div @click='loadMore' class="load-btn" v-show="btnFlag">{{btnInfo}}</div>
    <div class="white"></div>
	</div>
</template>

<script type="text/javascript">
	import HeaderBar from "@/components/HeaderBar";
  import StoryList from "@/components/StoryList";
  //import {dataList} from "@/store/data.js";
	export default{
	  name:"home-view",
	  components:{ HeaderBar ,StoryList},
	  data(){
	    return {
        multiStoryDataList:[],
        btnInfo:'点击加载更多',
        btnFlag:'false'
	    }
	  },
	  methods:{
	  	showdata(){
	  		console.log(this.storyDataList);
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
      }
	  },
	  mounted(){
	  	this.showdata();
	  	this.getListData();
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
</style>