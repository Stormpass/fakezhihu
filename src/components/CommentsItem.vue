<template>
  <div class="card">
    <div class="card-left">
      <img :src="item.avatar">
    </div>
    <div class="card-right">
      <p>{{item.author}}</p>
    </div>
    <p class="card-attach">{{item.content}}</p>
  </div>
</template>

<script type="text/javascript">
   export default{
    name:"comments-item",
    props:['item'],
    data(){
      return {}
    }
  }
</script>

<style type="text/css" scoped>
  .card{
    position: relative;
    width: 100%;
    padding: 0px;
    margin: 0px;
    font-size: 15px;
    background: rgb(255,255,255);
    margin-bottom: 15px;
    overflow: hidden;
    border-bottom: 1px solid rgba(1,1,1,0.1);
  }
  .card-left{
    box-sizing: border-box;
    float: left;
    width: 10%;
    overflow: hidden;
    height: 40px;
    vertical-align: center;
    line-height: 40px;
    text-align: center;
  }
  .card-left img{
    width:80%;
  }
  .card-right{
    box-sizing: border-box;
    float: right;
    width: 90%;
    height: 40px;
    overflow: hidden;
    padding: 5px;
  }
  .card-right p{
    text-align: left;
    line-height: 30px;
    margin: 0px;
  }
  .card-attach{
    margin-top: 40px;
    margin-bottom: 10px;
    padding:0px 10px;
  }
</style>