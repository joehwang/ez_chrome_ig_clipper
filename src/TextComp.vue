<template>
     <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{vname}}</span>
          </div>
          <input type="text" class="form-control" :placeholder="placeholder||vname" v-on:change="$emit('data-change', $event.target.value)" aria-describedby="basic-addon1" :value="vv">
    </div>
</template>

<script>
export default {
  props:{
    vname:String,
    placeholder:String,
    vv:String
  }
}
</script>

<style scoped>
h1 {
  color: green;
  display: block;
  width:200px;
  height: 200px;
}

.hello {
  font-size: 1.5em;
  color: blue;
}
</style>