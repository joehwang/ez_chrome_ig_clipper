<template>
     <div class="input-group mb-2">
        <div class="form-check form-check-inline" v-for="(item,index) in options">
          <input name="tag[]" class="form-check-input" type="checkbox" :id="`inlineCheckbox${index}`" :value="item" v-on:change="render_and_emit">
          <label class="form-check-label" :for="`inlineCheckbox${index}`">{{item}}</label>
        </div>
   </div>
</template>

<script>
export default {
  data(){
    return {
      selected:[]
    }
  },
  props:{
    vname:String,
    placeholder:String,
    vv:String,
    options:Array
  },
  methods:{
    render_and_emit(e){
      this.selected.push(e.target.value)
      this.$emit('data-change', [...new Set(this.selected)])
    }
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