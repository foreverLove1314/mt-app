<template>
  <div class="m-menu">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menu" :key="index">
        <i :class="item.type"></i>{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
	name: "emenu",
  data(){
	  return {
	    menu:[
        {
          type:'food',
          name:'美食'
        },
        {
          type:'takeout',
          name:'外卖'
        },
        {
          type:'hotel',
          name:'酒店'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
