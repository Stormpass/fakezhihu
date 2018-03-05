<template>
	<div class="header">
		<h1 class="m-logo">
			<img src="../assets/zhihu_logo.png">		
		</h1>
		<span class="title">感受知识的乐趣</span>
	</div>
</template>

<script type="text/javascript">
	export default{
		props: ["data"],
		name:"header-bar",
		data(){
			return {

			}	
		}
	};	
</script>

<style scoped>
	.header{
		width: 600px;
		height: 65px;
		margin: 0px auto 30px;
		position: relative;
	}
	.header::before{
		clear:both;
		content: ".";
		overflow: hidden;
		display: block;
	}
	.header::after{
		clear:both;
		content: ".";
	}
	.m-logo{
		float: left;
		position: relative;
		margin: 0px;
		height: 65px;
		width: 150px;
	}
	.m-logo img{
		width: 65px;
		height: 65px;
	}
	.title{
		display: inline-block;
		float: left;
		font-weight: thin;
		font-size: 30px;
		line-height: 65px;
		color: rgb(255,255,255);
	}
</style> 