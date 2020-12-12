<template>
    <el-card class="car_card" :body-style="{ padding: '0px' }">
    <img :src="car.path" class="image">
    <div><span>{{car.mark}}</span></div>
    </el-card>
</template>

<script>
export default {
    props : ['car']
}

</script>

<style scoped>
.car_card
{
    max-width: 300px;
    min-width: 320px;
    margin-left: 10px;
    margin-right: 20px;
    min-height: 300px;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
  }

  .image {
    max-width: 320px;
    min-height: 200px;
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

</style>