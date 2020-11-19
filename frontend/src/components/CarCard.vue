<template>
    <el-card :body-style="{ padding: '0px' }" class="car_card">
      <div style="padding: 14px;">
        <span>{{car.mark}}</span>
        <span>{{car.model}}</span>
      </div>
    </el-card>
</template>

<script>

export default {
    //name : 'car_card',
    props : ['car']
}

</script>

<style scoped>
.car_card
{
    max-width: 300px;
    margin-left: 10px;
}

</style>