<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue" placeholder="城市" :disabled="!city.length">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span class="name" style="margin-left: 20px;">直接搜索:</span>
    <el-select
      v-model="value"
      filterable
      remote
      reserve-keyword
      placeholder="请输入城市中文或拼音"
      :remote-method="remoteMethod"
      @change="handleChange"
      :loading="loading">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "iselect",
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      options: [],
      value: [],
      list: [],
      loading: false,
      cities: []
    }
  },
  watch: {
    pvalue: async function (newPvalue) {
      let {status, data: {city}} = await this.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        this.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.cvalue = ''
      }
    }
  },
  mounted: async function () {
    let {status: status1, data: {province}} = await this.$axios.get('/geo/province')
    if (status1 === 200) {
      this.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
    
    let {status: status2, data: {city}} = await this.$axios.get('/geo/city')
    if (status2 === 200) {
      this.list = city.map(item => {
        return {
          value: item.name,
          label: item.name
        }
      })
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    handleChange(item) {
      console.log(item)
    }
  }
  
}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/iselect.scss";
</style>
