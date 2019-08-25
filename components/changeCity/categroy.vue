<template>
	<div>
    <dl class="m-categroy">
      <dt>按拼音字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+item">{{item}}</a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{item.title}}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{c}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
    name: "categroy",
    data(){
      return {
        list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        block:[]
      }
    },
    async mounted(){
      let blocks=[];
      let {status,data:{city}} = await this.$axios.get('/geo/city');
      if (status===200){
        let p;
        let c;
        let d={};//保存每个字母的数组
        city.forEach(item=>{
          p=pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1);
          c=p.charCodeAt(0);
          //a-z(97-122)
          if(c>96&&c<123){
            if(!d[p]){
              d[p]=[];
            }
            //根据a-z分组城市名
            d[p].push(item.name);
          }
        })
        //Object.entries() 可以把一个对象的键值以数组的形式遍历出来，结果和 for...in 一致，但不会遍历原型属性。
        for (let [k,v] of Object.entries(d)) {
          blocks.push({
            title:k.toUpperCase(),
            city:v
          })
        }
        blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0));
        this.block=blocks;
      }
    }
}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/categroy.scss";
</style>
