<template>
  <div>
    <router-link  v-for="(item,i) in items" :to="{name:'StoryView',params:{id:item.id}}" :key='i'>
      <div class="card">
        <div class="card-left">
          <img :src="item.images[0]">
        </div>
        <div class="card-right">
          <p>{{item.title}}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script type="text/javascript">
  export default{
    name:"story-list",
    props:['items'],
    data(){
      return {}
    }
  }

</script>

<style type="text/css" scoped>
  .card{
    position: relative;
    width: 100%;
    height: 180px;
    padding: 0px;
    margin: 0px;
    font-size: 30px;
    background: #f0f0f0;
    border-radius: 4px;
    margin-bottom: 15px;
    overflow: hidden;
  }
  .card-left{
    box-sizing: border-box;
    float: left;
    width: 30%;
    padding: 20px 20px;
    overflow: hidden;
    height: 180px;
  }
  .card-left img{
    width: 100%;
  }
  .card-right{
    box-sizing: border-box;
    float: right;
    width: 70%;
    height: 180px;
    overflow: hidden;
    padding: 10px;
  }
  .card-right p{
    text-align: left;
  }
</style>