<template>
<div :class="success_or_faild_css.css" role="alert"  @click="$emit('close', $event.target.value)">{{success_or_faild_css.text}}</div>  
</template>

<script>
export default {
  props:{
    type:String
  },
  computed:{
  	success_or_faild_css(){
  		if (this.type=="success") {
  			return {css:"alert alert-success",text:"儲存成功"}
  		}else if(this.type=="faild"){
  			return {css:"alert alert-primary",text:"失敗，請檢查"}
  		}else{
  			return {css:"hide",text:""}
  		}
  		
  	}
  }
}
</script>

<style scoped>
.hide{
	display: none;
}

</style>