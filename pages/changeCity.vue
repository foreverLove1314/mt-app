<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hots/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"></el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import hots from '@/components/changeCity/hot.vue'
export default {
  name: "changeCity",
  components:{
    iSelect,
    hots
  }
}
</script>

<style scoped>

</style>
