<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/2fecdcf/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" placeholder="搜索商家或地点" @focus="focus" @blur="blur" @input="input"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"></i></button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in $store.state.home.hotPlace.slice(0,5)" :key="index">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item,index) in searchList" :key="index">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a :href="'/products?keyword='+encodeURIComponent(item.name)" v-for="(item,index) in $store.state.home.hotPlace.slice(0,5)" :key="index">{{item.name}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫影电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotal">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund"></i><p class="txt">随时退</p></li>
          <li><i class="single"></i><p class="txt">不满意免单</p></li>
          <li><i class="overdue"></i><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
	name: "searchbar",
  data(){
	  return {
      search:'',
	    isFocus:false,
      hotPlace:[],
      searchList:[]
    }
  },
  computed:{
	  isHotPlace(){
	    return this.isFocus&&!this.search;
    },
    isSearchList(){
	    return this.isFocus&&this.search;
    }
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur() {
      setTimeout(() => {
        this.isFocus = false;
      }, 200);
    },
    input(){
      let timer=''
      if(timer){
        window.clearTimeout(timer);
      }
      timer = setTimeout(async ()=>{
          let city = this.$store.state.geo.position.city.replace('市', '')
          this.searchList = []
          let {status, data: {top}} = await this.$axios.get('/search/top', {
            params: {
              input: this.search,
              city
            }
          })
          this.searchList = top.slice(0, 10)
      },300)
    }
  }
}
</script>

<style scoped>

</style>
