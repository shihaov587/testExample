<template>
  <div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:130px" @change="selectChange">
      <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </el-input>
</div>
</template>
<script>
export default {
  data() {
    return {
      input1: '',
      select: '餐厅名',
      out: '',
      selected: '',
      options: ["餐厅名", "订单号", "用户电话"]
    }
  },
  watch: {
    input1: function (value,oldValue) {
      console.log(value);
      console.log(oldValue);
      this.out = value + this.select;
      console.log(this.out)
    }
  },
  methods: {
    selectChange(val) {
      // console.log(val);
      this.selected = val.label
    }
  }
}
</script>