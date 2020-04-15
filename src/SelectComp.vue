<template>
<div class="input-group mb-2">
  <div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">{{vname}}</label>
  </div>
  <select class="custom-select" id="inputGroupSelect01" :value="vv" v-on:change="$emit('data-change', $event.target.value)">
    <option selected value="">請選擇</option>
    
    <option v-for="(item,index) in options" :value="item">{{item}}</option>
  </select>
</div>
</template>

<script>
export default {
  props:{
    vname:String,
    placeholder:String,
    vv:String,
    options:Array
  }
}
</script>

<style scoped>


</style>