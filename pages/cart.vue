<template>
	<div class="page-cart">
    <el-row>
      <el-col v-if="cart.length" :span="24" class="m-cart">
        <list :cart-data="cart"/>
        <p>应付金额：<em class="money">￥{{total}}</em></p>
        <div class="post">
          <el-button type="primary" @click="submitOrder">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else :span="24" class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/cart/list.vue'
export default {
  name: "cart",
  components:{
    List
  },
  data() {
    return {
      cart:[]
    }
  },
  computed:{
    total(){
      let total = 0;
      this.cart.forEach(item=>{
        total+=item.price*item.count;
      });
      return total;
    }
  },
  methods:{
    async submitOrder(){
      let {status,data:{code,id}} = await this.$axios.post('/order/createOrder',{
        count: this.cart[0].count,
        price: this.cart[0].price,
        id:this.cartNo
      })
      if(status === 200 && code === 0){
        this.$alert(`恭喜您，已成功下单,订单号：${id}`,'下单成功',{
          confirmButtonText:'确定',
          callback:action=>{
            window.location.href='/order'
          }
        })
      }
    }
  },
  async asyncData(ctx){
    let {status,data:{code,data:{name,price}}} = await ctx.$axios.post('/cart/getCart',{
      id: ctx.query.id
    })
    console.log(status);
    if (status === 200){
      return {
        cart:[{
          name,
          price,
          count:1
        }],
        cartNo:ctx.query.id
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
