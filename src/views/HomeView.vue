<template>
	<div class="home">
		<header-bar></header-bar>
		<div class="list-container">
			<story-list  :items="storyDataList.stories" ></story-list>
		</div>
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
        storyDataList:{},
        timeArray:["1"]
	    }
	  },
	  methods:{
	  	showdata(){
	  		console.log(this.storyDataList);
	  	},
      getListData:function(){
        var url='https://news-at.zhihu.com/api/4/news/lastest';
      	$.get("http://localhost:8888/api?detail=latest",(data,status)=>{
			    try{
            data=JSON.parse(data);
            //this.timeArray.push(data['date']);
            this.storyDataList=data;
            //console.log(this.storyDataList);
            console.log(this);
			    }catch(e){
			    	console.log(e.message);
			    }
			  });
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
	}
	.list-container{
		box-sizing: border-box;
		padding: 20px;
	}
</style>